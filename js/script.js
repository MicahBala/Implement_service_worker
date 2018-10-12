// This is the actual Service Worker, which will be registered in the main script file

// Make sure service worker is supported in the browser
if ('serviceWorker' in navigator) {
  // we want to register it when the window loads
  window.addEventListener('load', () => {
    // console.log('Service worker Registered!');
    navigator.serviceWorker
      .register('./sw_cached_pages.js')
      .then(reg => console.log('Service Worker: Registered'))
      .catch(err => console.log(`Service Worker Error: ${err}`));
  });
}
