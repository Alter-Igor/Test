
// Names of the two caches used in this version of the service worker.
// Change to v2, etc. when you update any of the local resources, which will
// in turn trigger the install event again.
const PRECACHE = 'precache-v6';
const RUNTIME = 'runtime';
const enabled = true;

// A list of local resources we always want to be cached.
const PRECACHE_URLS = [
  '/',
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
    console.log("%csw:Installing", "color: pink");
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
      console.log("%csw:activate", "color: pink");
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
     
  if (!enabled) {
    console.log("%csw:disabled", "color: pink");
    return fetch(event.request).then(function (response) {
      return response;
    });
  }

  // Skip cross-origin requests, like those for Google Analytics.
  
  if (event.request.method != "GET") {
    console.log("%cNot a GET request, not caching", "color: blue");
    return fetch(event.request).then(function (response) {
        
        return response;
      });
    }
    
  if (event.request.url.startsWith(self.location.origin)) {
    
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          console.log("%csw:Found in cache: " + event.request.url, "color: green");
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              console.log("%csw:Not Found in cache: " + event.request.url, "color: red");
              return response;
            });
          });
        });
      })
    );
  }
});