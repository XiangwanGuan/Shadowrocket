const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/Shadowrocket/Static/ModuleHelper.html",
  "/Shadowrocket/Static/style.css",
  "/Shadowrocket/Static/script.js",
  "/Shadowrocket/Static/favicon-light.png",
  "/Shadowrocket/Static/favicon-dark.png",
  "/Shadowrocket/Static/pwa-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
