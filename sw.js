self.addEventListener("install", (event) => {
  // fires whenever the app requests a resource (file or data)
  event.waitUntil(
    caches.open("static").then((cache) => {
      return cache.addAll([
        "./",
        "./style.css",
        "images/sun.png",
        "images/rain.png",
        "./main.js",
      ]);
    })
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
