const nazivKesMem = "prvaVerzija";

const statSadrzaj = [
    '/',
    'index.html',
    'ponuda.html',
    'onama.html',
    'cenovnik.html',
    'kontakt.html',
    'manifest.json',
    'stil.css',
    'js/app.js',
    'js/jquery-2.1.4.js',
    'images/kolaci.jpg',
    'images/enterijer.jpg',
    'images/ponuda.jpg',
    'images/icons/icon-192x192.png',
    'images/icons/icon-256x256.png',
    'images/icons/icon-384x384.png',
    'images/icons/icon-512x512.png'
];
//instalacija service worker-a
self.addEventListener('install', async e => {
    console.log("instaliran sw");

    const kesMem = await caches.open(nazivKesMem);
    await kesMem.addAll(statSadrzaj);

    return self.skipWaiting();
    });

//aktiviranje service worker-a
self.addEventListener('activate', async e => {
    console.log("aktiviran sw");

    self.clients.claim();
});

//fetch event
self.addEventListener('fetch', async dog => {
    const zahtev = dog.request;
    const url = new URL(zahtev.url);

    if (url.origin === location.origin) {
        dog.respondWith(vratiIzKesMemorije(zahtev));
    } else {
        dog.respondWith(vratiSaMrezeIliIzKesMemorije
            (zahtev));
    }

});

async function vratiIzKesMemorije(zahtev) {
    const kes = await caches.open(nazivKesMem);
    const kesiraniPodaci = await kes.match(zahtev);
    return kesiraniPodaci || fetch(zahtev);
}

async function vratiSaMrezeIliIzKesMemorije(zahtev) {
    const kes = await caches.open(nazivKesMem);

    try {
        const najnovijiPodaci = await fetch(zahtev);
        await kes.put(zahtev, najnovijiPodaci.clone());
        return najnovijiPodaci;
    } catch (error) {
        const kesiraniPodaci = await kes.match(zahtev);
        return kesiraniPodaci;
    }

}
