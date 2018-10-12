const cacheName = 'v2.0';

// Call Install event
// To do that we need to attach an even to the actual worker using self
self.addEventListener('install', e => {
  console.log('Service Worker Installed!');
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

// Call the fetch even to make contents available offline from the cahed storage
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching content...');
  e.respondWith(
    fetch(e.request)
      .then(res => {
        //   Make clone of response from server
        const resClone = res.clone();

        // Open cache
        caches.open(cacheName).then(cache => {
          // Add response to cache
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(err => caches.match(e.request).then(res => res))
  );
});
