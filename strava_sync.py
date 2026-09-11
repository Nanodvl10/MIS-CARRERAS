#!/usr/bin/env python3
"""
Mis carreras · sincronizador de Strava
======================================

Consulta tus actividades en Strava, las cifra y las publica en tu repositorio
para que la app las importe sola.

Por que asi:
  - El "client secret" de Strava nunca sale de tu servidor.
  - El archivo publicado va CIFRADO (AES-256-GCM): aunque el repositorio sea
    publico, solo tu movil con tu contrasena puede leerlo.
  - Tu servidor solo necesita salida a internet. Nada de abrir puertos,
    dominios ni certificados.

Uso:
    python3 strava_sync.py            # lee la configuracion de las variables de entorno
    python3 strava_sync.py --dry-run  # muestra lo que haria, sin publicar

Variables de entorno (ver .env.example):
    STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REFRESH_TOKEN
    SYNC_PASSPHRASE     contrasena de cifrado (la misma que pondras en la app)
    REPO_DIR            copia local del repositorio de la app
    SALIDA              ruta del archivo dentro del repositorio
    GIT_PUSH            "1" para hacer commit y push automaticos
    DIAS, MAX_ACTIVIDADES, INCLUIR_RUTA
"""
from __future__ import annotations

import argparse
import base64
import json
import os
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

API = "https://www.strava.com/api/v3"
TIPOS_CARRERA = {"Run", "TrailRun", "VirtualRun"}
ESTADO = Path(__file__).with_name(".estado.json")


# --------------------------------------------------------------------------
# utilidades
# --------------------------------------------------------------------------
def log(msg: str) -> None:
    print(f"[{datetime.now():%H:%M:%S}] {msg}", flush=True)


def morir(msg: str) -> None:
    print(f"ERROR: {msg}", file=sys.stderr)
    raise SystemExit(1)


def entorno(nombre: str, por_defecto: str | None = None, obligatorio: bool = False) -> str | None:
    valor = os.environ.get(nombre, por_defecto)
    if obligatorio and not valor:
        morir(f"falta la variable de entorno {nombre}")
    return valor


def http_post(url: str, datos: dict) -> dict:
    peticion = urllib.request.Request(
        url, data=urllib.parse.urlencode(datos).encode(), method="POST"
    )
    with urllib.request.urlopen(peticion, timeout=30) as r:
        return json.load(r)


def http_get(url: str, token: str, params: dict | None = None) -> dict | list:
    if params:
        url += "?" + urllib.parse.urlencode(params)
    peticion = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
    with urllib.request.urlopen(peticion, timeout=30) as r:
        return json.load(r)


# --------------------------------------------------------------------------
# Strava
# --------------------------------------------------------------------------
def leer_estado() -> dict:
    if ESTADO.exists():
        try:
            return json.loads(ESTADO.read_text())
        except Exception:
            pass
    return {}


def guardar_estado(datos: dict) -> None:
    try:
        ESTADO.write_text(json.dumps(datos, indent=2))
        ESTADO.chmod(0o600)
    except Exception as e:
        log(f"aviso: no he podido guardar el estado ({e})")


def token_acceso() -> str:
    """Renueva el token. Strava rota el refresh_token, asi que lo guardamos."""
    cid = entorno("STRAVA_CLIENT_ID", obligatorio=True)
    secreto = entorno("STRAVA_CLIENT_SECRET", obligatorio=True)
    refresh = leer_estado().get("refresh_token") or entorno(
        "STRAVA_REFRESH_TOKEN", obligatorio=True
    )
    try:
        tok = http_post(
            "https://www.strava.com/oauth/token",
            {
                "client_id": cid,
                "client_secret": secreto,
                "grant_type": "refresh_token",
                "refresh_token": refresh,
            },
        )
    except urllib.error.HTTPError as e:
        morir(f"Strava rechazo el refresh_token ({e.code}). Vuelve a autorizar la app.")
    nuevo = tok.get("refresh_token")
    if nuevo and nuevo != refresh:
        guardar_estado({"refresh_token": nuevo})
        log("refresh_token renovado y guardado")
    return tok["access_token"]


def decodificar_polilinea(cadena: str) -> list[list[float]]:
    """Decodifica el formato polyline de Google que usa Strava para el mapa."""
    puntos: list[list[float]] = []
    indice = lat = lng = 0
    while indice < len(cadena):
        for eje in ("lat", "lng"):
            resultado = desplazamiento = 0
            while True:
                byte = ord(cadena[indice]) - 63
                indice += 1
                resultado |= (byte & 0x1F) << desplazamiento
                desplazamiento += 5
                if byte < 0x20:
                    break
            delta = ~(resultado >> 1) if resultado & 1 else (resultado >> 1)
            if eje == "lat":
                lat += delta
            else:
                lng += delta
        puntos.append([round(lat * 1e-5, 5), round(lng * 1e-5, 5)])
    return puntos


def adelgazar(puntos: list, maximo: int = 140) -> list:
    if len(puntos) <= maximo:
        return puntos
    paso = (len(puntos) - 1) / (maximo - 1)
    return [puntos[int(round(i * paso))] for i in range(maximo)]


def construir(actividad: dict, token: str, incluir_ruta: bool) -> dict:
    """Pide el detalle de una actividad y lo deja en el formato de la app."""
    d = http_get(f"{API}/activities/{actividad['id']}", token)

    parciales = []
    for s in d.get("splits_metric") or []:
        parciales.append(
            {
                "k": round(s.get("split") or 0),
                "sec": int(s.get("moving_time") or s.get("elapsed_time") or 0),
                "hr": round(s["average_heartrate"]) if s.get("average_heartrate") else None,
            }
        )

    ruta: list = []
    if incluir_ruta:
        mapa = d.get("map") or {}
        polilinea = mapa.get("polyline") or mapa.get("summary_polyline")
        if polilinea:
            try:
                ruta = adelgazar(decodificar_polilinea(polilinea))
            except Exception as e:
                log(f"aviso: no he podido decodificar el mapa ({e})")

    return {
        "id": f"strava-{d['id']}",
        "date": d["start_date_local"][:10],
        "name": d.get("name", ""),
        "km": round((d.get("distance") or 0) / 1000.0, 2),
        "sec": int(d.get("moving_time") or 0),
        "hrAvg": round(d["average_heartrate"]) if d.get("average_heartrate") else None,
        "hrMax": round(d["max_heartrate"]) if d.get("max_heartrate") else None,
        "gain": round(d.get("total_elevation_gain") or 0),
        "splits": parciales,
        "route": ruta,
    }


# --------------------------------------------------------------------------
# cifrado
# --------------------------------------------------------------------------
def cifrar(texto: str, contrasena: str) -> dict:
    """AES-256-GCM con clave derivada por PBKDF2. Compatible con el navegador."""
    try:
        from cryptography.hazmat.primitives import hashes
        from cryptography.hazmat.primitives.ciphers.aead import AESGCM
        from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC
    except ImportError:
        morir("falta la libreria de cifrado. Instalala con:  pip3 install cryptography")

    sal = os.urandom(16)
    iv = os.urandom(12)
    iteraciones = 210_000
    kdf = PBKDF2HMAC(algorithm=hashes.SHA256(), length=32, salt=sal, iterations=iteraciones)
    clave = kdf.derive(contrasena.encode())
    cifrado = AESGCM(clave).encrypt(iv, texto.encode(), None)
    b64 = lambda b: base64.b64encode(b).decode()
    return {"v": 1, "alg": "AES-GCM", "it": iteraciones, "salt": b64(sal), "iv": b64(iv), "ct": b64(cifrado)}


# --------------------------------------------------------------------------
# publicacion
# --------------------------------------------------------------------------
def git(repo: Path, *args: str) -> subprocess.CompletedProcess:
    return subprocess.run(
        ["git", "-C", str(repo), *args], capture_output=True, text=True
    )


def publicar(repo: Path, archivo: Path) -> None:
    relativo = archivo.relative_to(repo)
    estado = git(repo, "status", "--porcelain", str(relativo))
    if not estado.stdout.strip():
        log("sin cambios que publicar")
        return
    git(repo, "add", str(relativo))
    mensaje = f"entrenos: {datetime.now():%Y-%m-%d %H:%M}"
    commit = git(repo, "commit", "-m", mensaje)
    if commit.returncode != 0 and "nothing to commit" not in commit.stdout:
        log(f"aviso en commit: {commit.stdout.strip()} {commit.stderr.strip()}")
    push = git(repo, "push")
    if push.returncode != 0:
        morir(f"git push fallo: {push.stderr.strip()}")
    log("publicado en el repositorio")


# --------------------------------------------------------------------------
def main() -> None:
    ap = argparse.ArgumentParser(description="Sincroniza Strava con la app Mis carreras")
    ap.add_argument("--dry-run", action="store_true", help="no escribe ni publica nada")
    ap.add_argument("--dias", type=int, default=int(entorno("DIAS", "60")))
    ap.add_argument("--max", type=int, default=int(entorno("MAX_ACTIVIDADES", "40")))
    args = ap.parse_args()

    contrasena = entorno("SYNC_PASSPHRASE", obligatorio=True)
    incluir_ruta = entorno("INCLUIR_RUTA", "1") == "1"
    repo = Path(entorno("REPO_DIR", obligatorio=True)).expanduser()
    salida = Path(entorno("SALIDA", str(repo / "datos" / "entrenos.json"))).expanduser()
    if not repo.is_dir():
        morir(f"REPO_DIR no existe: {repo}")

    token = token_acceso()
    desde = int(time.time()) - args.dias * 86400
    actividades = http_get(API + "/athlete/activities", token, {"after": desde, "per_page": 100})
    carreras = [a for a in actividades if (a.get("type") or "") in TIPOS_CARRERA]
    log(f"{len(carreras)} carreras en los ultimos {args.dias} dias")

    # Reutilizamos lo ya procesado para no repetir llamadas a la API
    cache = Path(__file__).with_name(".cache.json")
    previos: dict[str, dict] = {}
    if cache.exists():
        try:
            previos = {a["id"]: a for a in json.loads(cache.read_text())}
        except Exception:
            previos = {}

    resultado: list[dict] = []
    nuevas = 0
    for act in carreras[: args.max]:
        clave = f"strava-{act['id']}"
        if clave in previos:
            resultado.append(previos[clave])
            continue
        try:
            resultado.append(construir(act, token, incluir_ruta))
            nuevas += 1
            log(f"  + {act.get('name','(sin nombre)')}")
            time.sleep(1)  # cuidamos el limite de la API
        except Exception as e:
            log(f"  ! error con {act.get('id')}: {e}")

    resultado.sort(key=lambda a: a["date"], reverse=True)
    resultado = resultado[: args.max]
    documento = {
        "updated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "activities": resultado,
    }
    log(f"{len(resultado)} actividades ({nuevas} nuevas)")

    if args.dry_run:
        log("dry-run: no escribo nada")
        print(json.dumps(documento["activities"][:2], indent=2, ensure_ascii=False))
        return

    cache.write_text(json.dumps(resultado, ensure_ascii=False))
    sobre = cifrar(json.dumps(documento, ensure_ascii=False), contrasena)

    salida.parent.mkdir(parents=True, exist_ok=True)
    temporal = salida.with_suffix(".tmp")
    temporal.write_text(json.dumps(sobre))
    temporal.replace(salida)
    log(f"cifrado -> {salida}")

    if entorno("GIT_PUSH", "1") == "1":
        publicar(repo, salida)


if __name__ == "__main__":
    main()
