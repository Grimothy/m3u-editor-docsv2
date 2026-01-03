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

***

:::info Disclaimer
M3U Editor is an independent, open‑source playlist manager — not an IPTV provider. We don’t host channels or partner with streaming services; please only use content you’re authorized to access.
:::
