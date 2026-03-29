// Education Evolution Simulator — Service Worker
// Offline-first PWA caching strategy

const CACHE_NAME = 'edu-evolution-v1.2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './author.jpg'
];

// INSTALL — cache all assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching app shell...');
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// ACTIVATE — clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// FETCH — cache-first strategy for offline support
self.addEventListener('fetch', event => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Only cache valid responses
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        const cloned = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        return response;
      }).catch(() => {
        // Return cached index.html for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// BACKGROUND SYNC — save simulation data
self.addEventListener('sync', event => {
  if (event.tag === 'sync-simulations') {
    console.log('[SW] Background sync triggered');
  }
});
