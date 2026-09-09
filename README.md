# Mis carreras — app personal de trail (PWA)

App tuya para gestionar carreras: cada una con su recorrido, dieta dia a dia,
ritmos por tramo y plan del dia de carrera. Se instala en el movil como una app
normal, funciona sin conexion y no cuesta nada.

## Estructura
- `index.html` — arranque (solo enlaza estilos, motor y carreras).
- `styles.css` — estilos.
- `app.js` — el motor: pinta la pantalla "Mis carreras" y cualquier carrera desde sus datos.
- `profile.js` — TUS preferencias (peso, horarios, alimentos que no te gustan, reglas).
- `races/` — una carrera por archivo. `corral-del-diablo.js` es la primera.
- `manifest.json`, `service-worker.js`, iconos.

## Como anadir una carrera nueva
1. Pasale a Claude el **GPX + fecha y hora**. Te devuelve un archivo tipo
   `races/mi-carrera.js` con el recorrido, la dieta (respetando tu `profile.js`),
   los ritmos y el plan.
2. Copia ese archivo en la carpeta `races/`.
3. En `index.html`, anade una linea junto a la del Corral:
   `<script src="races/mi-carrera.js"></script>`
4. En `service-worker.js`: anade el archivo a la lista `ASSETS` y sube la version
   del `CACHE` (p. ej. `carreras-v2`) para forzar el refresco.
5. Redespliega. La carrera aparece sola en la lista "Mis carreras".

## Desplegar (necesita URL https)
- **GitHub Pages** (rapido, gratis): sube todo a un repo, Settings -> Pages ->
  branch main / carpeta raiz. Tendras `https://usuario.github.io/repo/`.
- **Homelab**: sirve la carpeta con Nginx/Caddy detras de tu reverse proxy
  (el https te lo da el proxy). Ejemplo Nginx en Docker:
  `docker run -d -p 8080:80 -v "$PWD":/usr/share/nginx/html:ro nginx:alpine`

## Instalar en el movil
Abre la URL en Safari (iPhone) o Chrome (Android) -> Compartir / menu ->
**Anadir a pantalla de inicio**. Icono propio y pantalla completa.

Los checks del dia de carrera se guardan por carrera en el propio movil.
