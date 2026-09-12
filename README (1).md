# Sincronización automática con Strava

Cuando Runna sube el entreno a Strava, tu app lo registra sola.

## Cómo funciona

```
  Runna  ──►  Strava  ──►  [ tu homelab ]  ──►  repositorio  ──►  tu móvil
                            consulta la API      archivo            descifra
                            y CIFRA los datos    cifrado            y registra
```

Puntos clave:

- El **client secret** de Strava nunca sale de tu servidor.
- El archivo publicado va **cifrado con AES-256-GCM**. Aunque el repositorio
  sea público, sin tu contraseña son bytes sin sentido.
- Tu servidor solo necesita **salida** a internet: nada de abrir puertos,
  dominios ni certificados.
- Funciona desde cualquier sitio, no solo en casa.

---

## 1 · Crear la app en Strava (una vez)

1. Entra en <https://www.strava.com/settings/api> y crea una aplicación.
2. En *Authorization Callback Domain* pon `localhost`.
3. Apunta el **Client ID** y el **Client Secret**.

## 2 · Conseguir el refresh token (una vez)

Abre esto en el navegador cambiando `TU_CLIENT_ID`:

```
https://www.strava.com/oauth/authorize?client_id=TU_CLIENT_ID&response_type=code&redirect_uri=http://localhost&approval_prompt=force&scope=activity:read_all
```

Acepta. Te llevará a `http://localhost/?...&code=XXXXX...`; la página dará
error (normal, no hay nada escuchando ahí), pero **el `code` está en la URL**.
Cópialo y canjéalo:

```bash
curl -X POST https://www.strava.com/oauth/token \
  -d client_id=TU_CLIENT_ID \
  -d client_secret=TU_CLIENT_SECRET \
  -d code=XXXXX \
  -d grant_type=authorization_code
```

De la respuesta guarda el **`refresh_token`**.

## 3 · Preparar el servidor

```bash
mkdir -p /opt/miscarreras && cd /opt/miscarreras
# copia aquí el contenido de esta carpeta "servidor"

# copia local del repositorio de la app (donde se publicará el archivo)
git clone https://github.com/TUUSUARIO/MIS-CARRERAS.git repo
cd repo
git config user.name  "sincronizador"
git config user.email "sync@localhost"
cd ..

cp .env.example .env   # y rellénalo
```

Para que pueda publicar sin pedir contraseña, crea un **token de acceso** en
GitHub (Settings → Developer settings → Personal access tokens → Fine-grained,
permiso *Contents: Read and write* solo sobre ese repositorio) y configúralo:

```bash
cd repo
git remote set-url origin https://TUUSUARIO:TU_TOKEN@github.com/TUUSUARIO/MIS-CARRERAS.git
cd ..
```

## 4 · Ejecutarlo

**Con Docker (recomendado):**

```bash
docker compose up -d --build
docker compose logs -f      # para ver que va bien
```

**Sin Docker:**

```bash
pip3 install -r requirements.txt
set -a && . ./.env && set +a
python3 strava_sync.py --dry-run   # prueba sin publicar
python3 strava_sync.py             # de verdad
```

Y lo programas con cron cada 15 minutos:

```cron
*/15 * * * * cd /opt/miscarreras && set -a && . ./.env && set +a && /usr/bin/python3 strava_sync.py >> sync.log 2>&1
```

## 5 · Configurar la app

En la app: **Ajustes → Sincronización automática**

- **URL**: `https://TUUSUARIO.github.io/MIS-CARRERAS/datos/entrenos.json`
- **Contraseña**: la misma que pusiste en `SYNC_PASSPHRASE`
- Deja marcado *Auto al abrir* y pulsa **Sincronizar**

A partir de ahí, cada vez que abras la app importará lo nuevo y te avisará.

---

## Detalles

- Solo importa actividades cuya fecha coincida con un día de tu plan, y nunca
  repite una ya importada.
- Trae distancia, tiempo en movimiento, parciales por km **con pulsaciones**,
  FC media y máxima, desnivel y recorrido.
- Strava rota el `refresh_token`: el script guarda el nuevo en `.estado.json`
  automáticamente, no tienes que hacer nada.
- `.cache.json` evita volver a pedir a la API actividades ya procesadas.
- Si prefieres no publicar el recorrido, pon `INCLUIR_RUTA=0`.
- **No subas nunca el `.env` al repositorio.**

## Alternativa sin servidor

Si no quieres montar esto, la app también acepta un enlace directo que puedes
generar con un **Atajo de iOS** al terminar el entreno:

```
https://TUUSUARIO.github.io/MIS-CARRERAS/#/sync?km=9.25&t=41:04&hr=152&d=39&date=2026-09-10
```

Parámetros: `km`, `t` (mm:ss o h:mm:ss) o `sec`; opcionales `hr`, `hrmax`,
`d` (desnivel), `date`, `name`, `id`.
