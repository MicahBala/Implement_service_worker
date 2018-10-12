const cacheName = 'v1.0';

const cacheAsset = [
  'index.html',
  'styles/main.css',
  'styles/responsive.css',
  'js/script.js'
];

// Call Install event
// To do that we need to attach an even to the actual worker using self
self.addEventListener('install', e => {
  console.log('Service Worker Installed!');

  // Handle cahing of assets
  //   Wait untill our promise is finished
  e.waitUntil(
    caches
      .open(cacheName)
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAsset);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker Activated!');

  //   Remove unwanted cahes
  e.waitUntil(
    // Loop through the cache and have a condition that says if the current cache is not what we are looping through in the current iteration, we delete it.
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Deleting Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
