'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "1ab4592a1d3b2be3e73e616189036f54",
"assets/FontManifest.json": "a862a402bca967396ddf6d15240157b4",
"assets/fonts/MaterialIcons-Regular.otf": "7e7a6cccddf6d7b20012a548461d5d81",
"assets/fonts/Montserrat-ExtraBold.ttf": "19ba7aa52a78c3896558ac1c0a5fb4c7",
"assets/fonts/Montserrat-Regular.ttf": "ee6539921d713482b8ccd4d0d23961bb",
"assets/images/appBarLogo.JPG": "201bf3ed0fba1a43fe6cb56ab0fbbc7f",
"assets/images/appBarLogo.PNG": "93d9185a04930976cf43561c7f20ace4",
"assets/images/appBarLogo1.png": "e88494827255708825932a1f12616cf2",
"assets/images/group.png": "0cdd13c4af4f30b3757d791271cb088a",
"assets/images/group_selected.png": "b5ff2e1581d128fa2b866cf4c444d260",
"assets/images/home.png": "806290e66b09a32e26f92d9dafe21cd7",
"assets/images/Home_select.png": "0cb51f7b86be9a6976dcafa4eaaf879d",
"assets/images/laptop1.png": "8cb724aec20ab2cfea7d84a74de57688",
"assets/images/laptop_select.png": "47961525a4d8ab4d7104f95a8809aa61",
"assets/images/pdf_logo.png": "ec41ee69f45547f2957dd399e1e4d15c",
"assets/images/pdf_logo.webp": "13aa2a23bacf9b4c08d808c2d11b69da",
"assets/images/projectIcon_projectlist.png": "9df2d3b8bf4ed212a4b0907b0ad9396f",
"assets/images/Project_IMG.png": "b46a828bc5ff9adb5afd06ab4d5f6643",
"assets/images/project_login.png": "63478a7f89dd3bfdcb695c62a45f7ba4",
"assets/images/Project_selected.png": "d7cc4205422a19454de1dacb44dca510",
"assets/images/report_appBar.png": "2f79663874dd15d6fdeed82b722d78fd",
"assets/images/report_detail.png": "b7087900bb6df596f5c84dea0fc21d61",
"assets/images/report_IMG.png": "7e8c172c1e968af59dbf4412d080ada6",
"assets/images/report_selected.png": "8ac798f278d17a4bc9d58aa6afd307d7",
"assets/images/splash.png": "ae02646a3696de8a564160444b2fbffd",
"assets/images/teste.png": "2cd8fbea1cab076d589e7924ade90439",
"assets/images/user.png": "8feff93941a2425f1d7b98118625a17d",
"assets/NOTICES": "5599514c21bf5d5d0a508ad6f8897ae5",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/expandable_widgets/assets/background.png": "f1f2b9f95d2c2bb481acc14f4fad8196",
"canvaskit/canvaskit.js": "c2b4e5f3d7a3d82aed024e7249a78487",
"canvaskit/canvaskit.wasm": "4b83d89d9fecbea8ca46f2f760c5a9ba",
"canvaskit/profiling/canvaskit.js": "ae2949af4efc61d28a4a80fffa1db900",
"canvaskit/profiling/canvaskit.wasm": "95e736ab31147d1b2c7b25f11d4c32cd",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "9b84c7a398deda8566f394df6dfe1c94",
"/": "9b84c7a398deda8566f394df6dfe1c94",
"main.dart.js": "19fdfe4cb3efa0f43a2de5fca330d771",
"manifest.json": "e29c46501d99dfc951abf3fb36aa75b4",
"splash/img/dark-1x.png": "799594a11e75a27fbf92e71d9cf5b1ea",
"splash/img/dark-2x.png": "fbfd6be00cac6bd6e59d565b92014ff9",
"splash/img/dark-3x.png": "9bff0078fa3b63447863c04a503a5f54",
"splash/img/dark-4x.png": "2f112ec05b95930dcbec8402f16b04d6",
"splash/img/light-1x.png": "799594a11e75a27fbf92e71d9cf5b1ea",
"splash/img/light-2x.png": "fbfd6be00cac6bd6e59d565b92014ff9",
"splash/img/light-3x.png": "9bff0078fa3b63447863c04a503a5f54",
"splash/img/light-4x.png": "2f112ec05b95930dcbec8402f16b04d6",
"splash/style.css": "dc159a1d8652b80837ff4bd7607c52df",
"version.json": "874f34d08fee69c4e2a27e0b94c9341c"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
