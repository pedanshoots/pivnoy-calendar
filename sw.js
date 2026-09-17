const CACHE='beer-calendar-v5';
const ASSETS=['./','./index.html','./manifest.webmanifest','./assets/me.jpg','./assets/raf.jpg','./assets/match.jpg','./assets/beer.jpg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const u=new URL(e.request.url);
  if(u.pathname.endsWith('/api.php')) return;
  e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{
    const copy=r.clone(); caches.open(CACHE).then(x=>x.put(e.request,copy)); return r;
  }).catch(()=>caches.match('./index.html'))));
});
