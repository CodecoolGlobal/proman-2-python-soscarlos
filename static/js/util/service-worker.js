const CACHE_NAME = "static_cache";
const STATIC_ASSETS = [
    '/templates/index.html',
    '/static/css/main.css',
]

async function preCache() {
    const cache = await caches.open(CACHE_NAME);
    console.log(cache);
    return cache.addAll(STATIC_ASSETS);
}

self.addEventListener('install', event => {
    console.log("[SW] installed");
    event.waitUntil(preCache());
});

self.addEventListener('activate', event => {
    console.log("[SW] activated");
});

async function fetchAssets(event) {
    try {
        const response = fetch(event.request);
        return response;

    } catch (err) {
        const cache = await caches.open(CACHE_NAME);
        return cache.match(event.request);
    }
}

self.addEventListener('fetch', event => {
    console.log("[SW] fetched");
    event.respondWith(fetchAssets(event));
});
