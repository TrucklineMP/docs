FROM python:3-alpine

RUN apk add --no-cache git docker-cli docker-cli-compose

WORKDIR /app
COPY webhook-server.py deploy.sh ./

RUN chmod +x deploy.sh webhook-server.py

EXPOSE 9000

CMD ["python3", "webhook-server.py"]
