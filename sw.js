// ===================================
// V11.2 Stock App
// Service Worker
// ===================================

const CACHE_NAME = "v11-stock-cache-v1";

const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./style.css",
    "./script.js",
    "./manifest.json"

];


// 설치

self.addEventListener(
    "install",
    event => {

        console.log(
            "V11.2 Service Worker 설치"
        );

        event.waitUntil(

            caches.open(CACHE_NAME)
            .then(
                cache => {

                    return cache.addAll(
                        FILES_TO_CACHE
                    );

                }
            )

        );

    }
);



// 실행

self.addEventListener(
    "activate",
    event => {

        console.log(
            "V11.2 Service Worker 활성화"
        );

    }
);



// 파일 요청

self.addEventListener(
    "fetch",
    event => {

        event.respondWith(

            caches.match(
                event.request
            )
            .then(
                response => {

                    return response ||
                    fetch(event.request);

                }

            )

        );

    }
);
