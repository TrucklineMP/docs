# Auto-deploy via GitHub webhook

This folder contains a small webhook listener that automatically rebuilds and redeploys the docs site when a push is made to the `main` branch on GitHub.

## How it works

1. GitHub sends a `push` webhook to `https://docs.yourdomain.com/webhook/docs`.
2. The webhook container validates the webhook signature using a shared secret.
3. If valid and the push was to `main`, the listener runs `deploy.sh`.
4. `deploy.sh` does `git pull`, then rebuilds and restarts only the `docs` service.

The webhook listener itself runs as a Docker container on the same VPS.

## Files

- `webhook-server.py` — small Python HTTP server that listens for GitHub webhooks
- `deploy.sh` — pulls latest code and rebuilds the docs container
- `webhook.Dockerfile` — container image for the webhook listener
- `webhook.service` — optional systemd service if you prefer not to use Docker
- `.env.example` — example environment file

## Setup on the VPS

### 1. Copy files to the VPS

Make sure the whole repo lives at `/home/truckline/web_servers/docs/`:

```bash
cd /home/truckline/web_servers/docs
```

### 2. Create the environment file

```bash
cp deploy/.env.example .env
nano .env
```

Generate a secret and put it in `.env`:

```bash
openssl rand -hex 32
```

```env
WEBHOOK_SECRET=your-random-secret-here
```

### 3. Create the log file

```bash
sudo touch /var/log/truckline-docs-deploy.log
sudo chown truckline:truckline /var/log/truckline-docs-deploy.log
```

### 4. Start the stack

```bash
docker compose up -d --build
```

This builds and starts both the `docs` site (port `3995`) and the `webhook` listener (port `9000` inside the Docker network).

Check that both containers are running:

```bash
docker compose ps
```

### 5. Make sure the `truckline` user can use Docker

The webhook container talks to the host's Docker daemon to rebuild the docs container. Make sure your host user is in the `docker` group:

```bash
sudo usermod -aG docker truckline
```

Then log out and back in, or run `newgrp docker`.

## Expose the webhook securely

The webhook listener is available inside the Docker network at `truckline-docs-webhook:9000`. It should not be exposed directly to the internet.

### Nginx Proxy Manager + Cloudflare Tunnel

This matches a setup where NPM and `cloudflared` already run on the VPS.

#### In Nginx Proxy Manager

1. Add or edit a Proxy Host for `docs.trucklinemp.com`:
   - **Scheme**: `http`
   - **Forward Hostname / IP**: `truckline-docs`
   - **Forward Port**: `80`

2. Open the **Custom Locations** tab and add:
   - **Location**: `/webhook/docs`
   - **Scheme**: `http`
   - **Forward Hostname / IP**: `truckline-docs-webhook`
   - **Forward Port**: `9000`

3. On the **SSL** tab, set up your Cloudflare origin certificate or an NPM-managed certificate.

> NPM and the webhook container must be on the same Docker network (`truckline-network`) so NPM can resolve `truckline-docs-webhook`.

#### In Cloudflare Tunnel

Point `docs.trucklinemp.com` to your NPM web port:

```yaml
- hostname: docs.trucklinemp.com
  service: http://nginx-proxy-manager:80
```

If `cloudflared` runs directly on the host, use `http://localhost:80` instead.

#### Alternative: separate subdomain

If NPM custom locations cause issues, use a second subdomain:

- `docs.trucklinemp.com` → `truckline-docs:80`
- `docs-webhook.trucklinemp.com` → `truckline-docs-webhook:9000`

Then set the GitHub Payload URL to `https://docs-webhook.trucklinemp.com/webhook/docs`.

### Manual Nginx config

If you prefer plain Nginx instead of NPM:

```nginx
server {
    listen 443 ssl http2;
    server_name docs.trucklinemp.com;

    # your SSL config here

    location /webhook/docs {
        proxy_pass http://truckline-docs-webhook:9000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location / {
        proxy_pass http://truckline-docs:80;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

## Configure GitHub

1. Go to `https://github.com/TrucklineMP/docs/settings/hooks`
2. Click **Add webhook**
3. **Payload URL**: `https://docs.trucklinemp.com/webhook/docs`
4. **Content type**: `application/json`
5. **Secret**: the same secret you put in `.env`
6. **Which events?**: select **Just the push event**
7. Click **Add webhook**

GitHub will send a test ping. The listener ignores ping events, which is fine.

## Testing

Make a small commit and push to `main`, then watch the logs:

```bash
tail -f /var/log/truckline-docs-deploy.log
docker logs -f truckline-docs-webhook
```

You should see the deploy script pull the latest code and rebuild the `docs` container.

## Updating the webhook itself

`deploy.sh` only rebuilds the `docs` service so the webhook container stays alive during deploys. If you change the webhook code or Dockerfile, rebuild it manually:

```bash
docker compose up -d --build webhook
```

## Notes

- The listener ignores pushes to branches other than `main`.
- The deploy runs in the background so GitHub gets an immediate `200 OK` response.
- The webhook container mounts the host's Docker socket (`/var/run/docker.sock`) so it can rebuild the docs container. This is a privileged operation; only run this container in a trusted environment.
