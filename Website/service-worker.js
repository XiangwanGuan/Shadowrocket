const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/Shadowrocket/Website/Redirect.html", 
  "/Shadowrocket/Website/ModuleHelper.html",
  "/Shadowrocket/Website/style.css",
  "/Shadowrocket/Website/script.js",
  "/Shadowrocket/Website/favicon-light.png",
  "/Shadowrocket/Website/favicon-dark.png",
  "/Shadowrocket/Website/pwa-icon.png",
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
