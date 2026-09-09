# Mis carreras — app personal de trail (PWA) · v2.0

App para gestionar carreras: recorrido interactivo, dieta dia a dia con casillas,
registro de entrenos, ritmos, modo carrera el dia D, progreso, peso y resultados.
Se instala en el movil como app, funciona sin conexion y es gratis.

## Estructura
- `index.html`      arranque (solo enlaza estilos, motor, perfil y registro).
- `styles.css`      estilos.
- `app.js`          motor: pinta todo a partir de los datos.
- `profile.js`      TUS preferencias (peso, horarios, lo que no te gusta, reglas).
- `races/registry.js`  lista de archivos de carrera que carga la app.
- `races/<id>.js`   una carrera por archivo. `_PLANTILLA.js` muestra la estructura.
- `manifest.json`, `service-worker.js`, iconos.

## Anadir una carrera (p. ej. la San Silvestre)
1. Pasale a Claude el GPX (o el recorrido) + fecha y hora. Te devuelve `races/san-silvestre-salmantina.js`.
2. Sube ese archivo a la carpeta `races/` del repo.
3. En `races/registry.js` anade `"san-silvestre-salmantina.js"` a la lista.
4. En `service-worker.js` sube la version del `CACHE` (p. ej. `carreras-v5`).
   (Opcional: anade el archivo a `ASSETS` para que este offline desde el primer arranque.)
5. Commit. Al abrir la app vera "Nueva version lista" -> Actualizar. La carrera aparece sola.

## Actualizar la app (cuando cambien app.js / styles.css / datos)
Sustituye los archivos cambiados en el repo y sube la version del `CACHE` del
service worker. El movil avisa con "Nueva version lista".

## Datos
Todo se guarda en el movil (localStorage): entrenos, casillas, checks, material,
resultado, cronometro y peso. En Ajustes puedes exportar una copia de seguridad
(JSON) y restaurarla, y exportar el plan al Calendario (.ics) con avisos.

## Desplegar (URL https)
- GitHub Pages: repo -> Settings -> Pages -> branch main / root.
- Homelab: cualquier servidor estatico (Nginx/Caddy) detras de tu reverse proxy.

## Instalar en el iPhone
Safari -> Compartir -> Anadir a pantalla de inicio (marcar "Abrir como app web").
