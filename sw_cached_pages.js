// Call Install event
// To do that we need to attach an even to the actual worker using self
self.addEventListener('install', e => {
  console.log('Service Worker Installed!');
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker Activated!');
});
