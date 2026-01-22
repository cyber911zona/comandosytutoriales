const CACHE_NAME = 'v2-comandos-cache'; // Cambiado a v2 para forzar actualización
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/javascript.js',
  './manifest.json',
  './img/iconos/favicon.png',
  './img/iconos/apple-touch-icon.png',
  './img/iconos/favicon-32x32.png',
  './img/iconos/favicon-16x16.png',
  './img/fondos/header-bg1.jpg', // IMPORTANTE: Mayúscula en Fondos
  './img/fondos/header-bg2.jpg',
  './img/fondos/header-bg3.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      for (const url of ASSETS) {
        try {
          await cache.add(url);
        } catch (error) {
          console.error(`❌ Error en caché: ${url}`, error);
        }
      }
      console.log('✅ Instalación limpia completada');
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  );
});