if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/service-worker.js')
        .then(function() {
            // console.log('Service Worker Registered');
        });
}
const cacheName = 'teye';
let filesToCache = [
    '/',
    'css/cropper.min.css',
    'css/nprogress.css',
    'js/jquery.min.js',
    'logo.png',
    '/A1X.png',
    '/A3.png',
    '/A3A TMO.png',
    '/A3A 8 4G.png',
    '/A5.png',
    '/A30A XL TMO.png',
    '/A70A XL MPCS.png',
    '/Curie.png',
    '/N4.png',
    '/Pepito VDF.png',
    '/Pepito VZM.png',
    '/U3A 7 3G.png',
    '/U50A PLUS TMO.png',
    'https://cdn.bootcss.com/echarts/4.2.0-rc.2/echarts.min.js',
    'https://cdn.bootcss.com/moment.js/2.24.0/moment.min.js',
    'https://cdn.bootcss.com/echarts/4.2.1-rc1/extension/bmap.min.js'
];

self.addEventListener('install', function(e) {
    // console.log('[ServiceWorker] Install');
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            // console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});
self.addEventListener('activate', function(e) {
    // console.log('[ServiceWorker] Activate');
    e.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                // console.log('[ServiceWorker] Removing old cache', key);
                if (key !== cacheName) {
                    return caches.delete(key);
                }
            }));
        })
    );
});
self.addEventListener('fetch', function(e) {
    // console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});