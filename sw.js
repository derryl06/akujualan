const CACHE_NAME = "akujualan-v2";
const ASSETS_TO_CACHE = [
    "index.html",
    "akugambar/index.html",
    "akugambar/services.html",
    "akugambar/portfolio.html",
    "css/styles.css",
    "akujualan/css/style.css",
    "js/common.js",
    "js/index.js",
    "js/supabase.js",
    "js/config.js",
    "assets/favicon.png",
    "assets/akujualan-hero-new.png",
    "assets/head.png"
];

// Install Service Worker
self.addEventListener("install", (event) => {
    self.skipWaiting(); // Force the waiting service worker to become the active service worker
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Activate Service Worker
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
            );
        })
    );
    self.clients.claim(); // Take control of all open tabs immediately
});

// Fetch Assets with Stale-While-Revalidate Strategy
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            const fetchPromise = fetch(event.request).then((networkResponse) => {
                // Only cache successful responses and same-origin requests
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // If network fails, we already have the cached response (even if undefined)
                return cachedResponse;
            });

            // Return cached response if available, or wait for fetch
            return cachedResponse || fetchPromise;
        })
    );
});
