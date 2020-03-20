import { precacheAndRoute } from 'workbox-precaching'
precacheAndRoute(
  (self as any).__WB_MANIFEST.concat({
    url: 'index.html',
    revision: process.env.COMMITHASH
  })
)
