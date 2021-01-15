var cacheName = 'shell-content'

self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(cacheName).then(cache => {
        return cache.addAll([
          `/`,
          `/index.html`,
          '/assets/iconReact.png',
          `/assets/icon/favicon.png`,
          `/assets/icon/icon.png`,
          `/assets/shapes.svg`,
          `/manifest.json`,
          `../src/components/LoginForm.tsx`,
          `../src/components/LoginForm.scss`,
          `../src/components/SingupForm.tsx`,
          `../src/components/ExploreContainer.tsx`
        ])
        .then(() => self.skipWaiting());
      })
    );
  });
  
  self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener('fetch', event => {
    event.respondWith(
      caches.open(cacheName)
        .then(cache => cache.match(event.request, {ignoreSearch: true}))
        .then(response => {
        return response || fetch(event.request);
      })
    );
  });