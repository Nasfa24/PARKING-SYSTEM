const CACHE_NAME = 'parkir-pintar-v1';
const urlsToCache = [
  './',
  './index.html',
  './masuk.html',
  './keluar.html',
  './pengaturan.html',
  './cek-tiket.html'
];

// Menginstall Service Worker dan menyimpan file HTML ke Cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Membuka cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Mengambil data dari Cache agar aplikasi memuat secepat kilat
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan versi cache jika ada
        }
        return fetch(event.request); // Jika tidak ada, ambil dari internet
      })
  );
});