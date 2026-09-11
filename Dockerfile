FROM python:3.12-slim

RUN apt-get update && apt-get install -y --no-install-recommends git ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY strava_sync.py entrypoint.sh ./
RUN chmod +x entrypoint.sh

# Cada cuanto sincroniza (segundos). 900 = 15 min
ENV INTERVALO=900
CMD ["./entrypoint.sh"]
