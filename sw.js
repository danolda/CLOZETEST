const CACHE_NAME = 'yds-v2';
self.addEventListener('install', e => {
  self.skipWaiting();
});
self.addEventListener('activate', e => {
  e.waitUntil(clients.claim());
});
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request).catch(() => new Response('Offline')))
  );
});
// Push notification support
self.addEventListener('push', e => {
  const data = e.data ? e.data.json() : { title: 'YDS Wars', body: 'Bildirim!' };
  e.waitUntil(
    self.registration.showNotification(data.title || 'YDS Wars', {
      body: data.body || '',
      icon: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" rx="20" fill="%230d6efd"/%3E%3Ctext x="50" y="68" font-size="50" text-anchor="middle" fill="white"%3E⚔️%3C/text%3E%3C/svg%3E',
      badge: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Crect width="100" height="100" rx="20" fill="%230d6efd"/%3E%3C/svg%3E'
    })
  );
});
