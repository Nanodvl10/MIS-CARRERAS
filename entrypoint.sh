#!/bin/sh
# Bucle simple: mas facil de depurar que cron dentro de un contenedor.
set -e
git config --global --add safe.directory "${REPO_DIR:-/repo}"
echo "Sincronizador en marcha. Cada ${INTERVALO}s."
while true; do
    python3 /app/strava_sync.py || echo "fallo esta vuelta, reintento luego"
    sleep "${INTERVALO}"
done
