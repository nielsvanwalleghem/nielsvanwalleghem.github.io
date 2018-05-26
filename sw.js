var cacheName = 'v2';
var cacheFiles = [
    './',
    './index.html',
    './record.html',
    './songs.html',
    './stylesheets/reset.css',
    './stylesheets/screen.css',
    './stylesheets/style.css',
    "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css",
    './javascripts/app.js',
    './javascripts/recorder.js',
    './javascripts/tuner.js',
    './javascripts/jquery-3.2.1.js',
    './javascripts/sources/_libs.js',
    './javascripts/sources/tuner.generator.audio.js',
    './javascripts/sources/tuner.generator.js',
    './javascripts/sources/tuner.js',
    './javascripts/sources/tuner.note.js',
    './javascripts/sources/tuner.source.audio.js',
    './javascripts/sources/tuner.source.guitarix.js',
    './javascripts/sources/tuner.source.js',
    './javascripts/sources/tuner.ui.debug.js',
    './javascripts/sources/tuner.ui.js',
    './manifest/manifest.json',
    './manifest/images/icons/icon-72x72.png',
    './manifest/images/icons/icon-96x96.png',
    './manifest/images/icons/icon-128x128.png',
    './manifest/images/icons/icon-144x144.png',
    './manifest/images/icons/icon-152x152.png',
    './manifest/images/icons/icon-192x192.png',
    './manifest/images/icons/icon-384x384.png',
    './manifest/images/icons/icon-512x512.png',
    './webfonts/fa-brands-400.eot',
    './webfonts/fa-brands-400.svg',
    './webfonts/fa-brands-400.ttf',
    './webfonts/fa-brands-400.woff',
    './webfonts/fa-brands-400.woff2',
    './webfonts/fa-regular-400.eot',
    './webfonts/fa-regular-400.svg',
    './webfonts/fa-regular-400.ttf',
    './webfonts/fa-regular-400.woff',
    './webfonts/fa-regular-400.woff2',
    './webfonts/fa-solid-900.eot',
    './webfonts/fa-solid-900.svg',
    './webfonts/fa-solid-900.ttf',
    './webfonts/fa-solid-900.woff',
    './webfonts/fa-solid-900.woff2',
    './webfonts/fontawesome-all.min.css',
    './images/E.PNG',
    './images/KnipseAMl.PNG',
    './images/KnipselC.PNG',
    './images/KnipselD.PNG',
    './images/KnipselDM.PNG',
    './images/KnipselEM.PNG',
    './images/KnipselA.PNG',
    './images/KnipselG.PNG'






];


self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');

    // e.waitUntil Delays the event until the Promise is resolved
    e.waitUntil(

        // Open the cache
        caches.open(cacheName).then(function(cache) {

            // Add all the default files to the cache
            console.log('[ServiceWorker] Caching cacheFiles');
            return cache.addAll(cacheFiles);
        })
    ); // end e.waitUntil
});


self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');

    e.waitUntil(

        // Get all the cache keys (cacheName)
        caches.keys().then(function(cacheNames) {
            return Promise.all(cacheNames.map(function(thisCacheName) {

                // If a cached item is saved under a previous cacheName
                if (thisCacheName !== cacheName) {

                    // Delete that cached file
                    console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
                    return caches.delete(thisCacheName);
                }
            }));
        })
    );

});


self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);


    e.respondWith(


        caches.match(e.request)


            .then(function(response) {


                if ( response ) {
                    console.log("[ServiceWorker] Found in Cache", e.request.url, response);

                    return response;
                }



                var requestClone = e.request.clone();
                fetch(requestClone)
                    .then(function(response) {

                        if ( !response ) {
                            console.log("[ServiceWorker] No response from fetch ")
                            return response;
                        }

                        var responseClone = response.clone();


                        caches.open(cacheName).then(function(cache) {


                            cache.put(e.request, responseClone);
                            console.log('[ServiceWorker] New Data Cached', e.request.url);


                            return response;

                        });

                    })
                    .catch(function(err) {
                        console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
                    });


            })
    );
});

