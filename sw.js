/* =====================================================================
 * Service worker: lo que hace que la app abra sin señal.
 *
 * En el pañol no hay wifi y el celular puede no tener datos. Sin esto,
 * la segunda vez que alguien abre la app estando adentro del galpón ve
 * la pantalla de dinosaurio de Chrome y se terminó el relevamiento.
 *
 * Los datos cargados NO pasan por acá: viven en IndexedDB, que es del
 * navegador y no depende de la red.
 * ===================================================================== */

// Subir el número en cada cambio: es lo que hace que los teléfonos que
// ya tienen la app guardada se bajen la versión nueva.
const CACHE = 'relevamiento-v1';

const ARCHIVOS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icono-192.png',
  './icono-512.png',
  './logo-aconcagua.png'
];

self.addEventListener('install', ev => {
  ev.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ARCHIVOS))
      // Sin esto, la versión nueva queda esperando a que se cierren
      // todas las pestañas, cosa que en un celular no pasa nunca.
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', ev => {
  ev.waitUntil(
    caches.keys()
      .then(claves => Promise.all(
        claves.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', ev => {
  if (ev.request.method !== 'GET') return;
  // Primero la copia guardada: la app no cambia durante el relevamiento
  // y así abre instantánea aunque haya una señal mala, que es peor que
  // no tener señal porque el navegador espera el timeout.
  ev.respondWith(
    caches.match(ev.request).then(guardado => guardado || fetch(ev.request))
  );
});
