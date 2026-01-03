---
title: Getting Started
---

<div style={{ textAlign: 'center', padding: '0 0 2rem 0' }}>
  <img src="/img/logo.png" alt="M3U Editor logo" style={{ width: '220px', maxWidth: '10%' }} />
</div>

# Getting Started with m3u-editor

:::tip Server Access
M3U Editor Defaults to **Port 36400**. -- **This can be changed in the docker-compose file.**

**Default Username:** admin

**Default Password:** admin
:::

## 🤔 Pick Your Deployment

**M3U-Proxy with External Setup (Recommended)**

Multiple concurrent users. Stream pooling: one provider subscription serves multiple viewers via shared connection. Separate containers for app, proxy, and Redis cache.


[Jump to example](#deployment-recommended)


**M3U-Proxy Embedded**

Single container. Same pooling concept, no Redis. Good for light to moderate use.

**Internal PostgreSQL**

Better reliability than SQLite. PostgreSQL container managed by Docker Compose. Better for concurrent access and crash resilience.

**External PostgreSQL**

Point m3u-editor to your existing Postgres instance elsewhere.

## 🏷️ Image Versions

M3U Editor is available in the following versions:

|                                               Version                                              |                     Description                     |                  Docker Image                 |
| :------------------------------------------------------------------------------------------------: | :-------------------------------------------------: | :-------------------------------------------: |
|       **[sparkison/m3u-editor:latest](https://github.com/sparkison/m3u-editor/tree/master)**       |              Recommended Stable Branch              |    docker pull sparkison/m3u-editor:latest    |
|          **[sparkison/m3u-editor:dev](https://github.com/sparkison/m3u-editor/tree/dev)**          |             Stable-ish, quick bug fixes             |      docker pull sparkison/m3u-editor:dev     |
| **[sparkison/m3u-editor:experimental](https://github.com/sparkison/m3u-editor/tree/experimental)** | Bleeding edge features -- **There be dragons here** | docker pull sparkison/m3u-editor:experimental |

## 🐳 Deployment Examples

### M3U-Proxy with External Setup (Recommended){#deployment-recommended}

```yaml
services:
  m3u-editor:
    image: sparkison/m3u-editor:latest
    container_name: m3u-editor
    environment:
      - TZ=Etc/UTC
      - APP_URL=http://localhost
      - APP_PORT=36400
      # Postgres (recommended for performance)
      - ENABLE_POSTGRES=true
      - PG_DATABASE=m3ue
      - PG_USER=m3ue
      - PG_PASSWORD=changeme
      - DB_CONNECTION=pgsql
      - DB_HOST=localhost
      - DB_PORT=5432
      - DB_DATABASE=m3ue
      - DB_USERNAME=m3ue
      - DB_PASSWORD=changeme
      # Redis (external)
      - REDIS_ENABLED=false
      - REDIS_HOST=redis
      - REDIS_SERVER_PORT=6379
      # M3U Proxy (external)
      - M3U_PROXY_ENABLED=false
      - M3U_PROXY_HOST=m3u-proxy
      - M3U_PROXY_PORT=38085
      - M3U_PROXY_TOKEN=your-secure-token
    volumes:
      - ./data:/var/www/config
      - pgdata:/var/lib/postgresql/data
    restart: unless-stopped
    ports:
      - 36400:36400
    networks:
      - m3u-network
    depends_on:
      - m3u-proxy
      - redis

  m3u-proxy:
    image: sparkison/m3u-proxy:latest
    container_name: m3u-proxy
    environment:
      - API_TOKEN=your-secure-token  # Must match M3U_PROXY_TOKEN above
      - PORT=38085
      - REDIS_ENABLED=true
      - REDIS_HOST=redis
      - REDIS_PORT=6379
      - REDIS_DB=6
      - ENABLE_REDIS_POOLING=true
      - LOG_LEVEL=INFO
    restart: unless-stopped
    networks:
      - m3u-network
    depends_on:
      - redis
    # Optional: Hardware acceleration
    # devices:
    #   - /dev/dri:/dev/dri

  redis:
    image: redis:alpine
    container_name: redis
    restart: unless-stopped
    networks:
      - m3u-network
    volumes:
      - redis_data:/data
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

networks:
  m3u-network:
    driver: bridge

volumes:
  pgdata:
  redis_data:
```

***

:::info Disclaimer
M3U Editor is an independent, open‑source playlist manager — not an IPTV provider. We don’t host channels or partner with streaming services; please only use content you’re authorized to access.
:::
