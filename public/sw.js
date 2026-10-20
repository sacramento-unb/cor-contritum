self.addEventListener('install', event => event.waitUntil(self.skipWaiting().then(() => caches.open('cor-contritum-v1').then(cache => cache.add('/')))))
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()))
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
    const copy = response.clone()
    caches.open('cor-contritum-v1').then(cache => cache.put(event.request, copy))
    return response
  })))
})
