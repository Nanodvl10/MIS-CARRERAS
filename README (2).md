# CARRERAAP · v6.0

App personal para corredores de trail y asfalto. Se instala en el móvil como
una app (PWA), funciona sin conexión, se actualiza sola y **todos los datos se
guardan solo en el dispositivo**.

## Qué hace
- **Carreras**: hub con cuenta atrás, resultado e historial. Puedes crear las
  tuyas desde Ajustes (nombre, fecha, distancia...) y cargarles el GPX.
- **Plan por días**: sesiones editables, comidas con casillas y **sustituciones**
  equivalentes que respetan tus normas, registro de entrenos (manual o
  importando GPX/TCX con parciales y pulso).
- **Mapa**: trazado real y perfil interactivo (altura, pendiente, zona de ritmo,
  paso previsto).
- **Ritmos**: objetivo, zonas por tramo y avisos.
- **Día D**: cuenta atrás, modo carrera con cronómetro y próximo gel, tiempo
  previsto, checklist de material y resultado.
- **Progreso**: calendario mensual, km por semana, adherencia a la dieta, racha,
  peso, récords personales.
- **Herramientas**: calculadora de ritmos, predictor de tiempos (Riegel) y
  zonas de pulso (por FC máxima o edad).
- **Lista de la compra** generada de los menús.
- **Ajustes**: perfil editable, tema claro/oscuro, exportar calendario (.ics),
  CSV de entrenos, copia de seguridad y sincronización opcional.
- **Onboarding** para nuevos usuarios.

## Estructura
- `index.html`, `styles.css`, `app.js` — la app.
- `profile.js` — valores por defecto del perfil (lo editado en la app manda).
- `races/registry.js` + `races/<id>.js` — carreras con dieta y ritmos completos
  (generadas con Claude desde el GPX y el perfil). `_PLANTILLA.js` muestra el formato.
- `servidor/` — sincronización opcional con Strava (requiere suscripción a Strava).
- `manifest.json`, `service-worker.js`, iconos.

## Añadir una carrera
- **Desde la app** (Ajustes → Añadir carrera): básica, con calendario editable,
  mapa por GPX, día D y resultado.
- **Completa con dieta y ritmos**: pídele a Claude el archivo `races/<id>.js`,
  súbelo, añádelo a `races/registry.js` y sube la versión del service worker.

## Actualizar
Sustituye los archivos cambiados en el repo y sube la versión del `CACHE` del
service worker. La app avisa "Nueva versión lista".

## Desplegar
Cualquier hosting estático con https (GitHub Pages, Netlify, tu homelab).
Instalar: Safari → Compartir → Añadir a pantalla de inicio.
