const CACHE_NAME = "cantina-cache-v1";
const urlsToCache = [
  "index.html",
  "manifest.json",
  "service-worker.js",
  "icon-192.png",
  "icon-512.png",
  "app.js"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(c => c !== CACHE_NAME)
                  .map(c => caches.delete(c))
      );
    })
  );
});