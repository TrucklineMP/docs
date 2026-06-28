#!/bin/bash
set -e

LOG_FILE="/var/log/truckline-docs-deploy.log"
REPO_DIR="/home/truckline/web_servers/docs"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting deploy..." >> "$LOG_FILE"

if [ ! -d "$REPO_DIR" ]; then
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: Repo directory $REPO_DIR does not exist" >> "$LOG_FILE"
    exit 1
fi

cd "$REPO_DIR"

git pull origin main >> "$LOG_FILE" 2>&1

# Only rebuild the docs service. The webhook service keeps running so it can
# respond to GitHub; rebuild it manually when you update the webhook code.
docker compose -f docker-compose.yml up -d --build docs >> "$LOG_FILE" 2>&1

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Deploy finished" >> "$LOG_FILE"
