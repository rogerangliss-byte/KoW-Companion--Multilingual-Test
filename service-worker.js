const CACHE_PREFIX='kow-';
self.addEventListener('install',event=>{self.skipWaiting();});
self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(k=>k.startsWith(CACHE_PREFIX)).map(k=>caches.delete(k))))
      .then(()=>self.clients.claim())
  );
});
self.addEventListener('fetch',event=>{
  if(event.request.method!=='GET')return;
  event.respondWith(
    fetch(event.request,{cache:'no-store'}).catch(()=>new Response('Offline — reconnect to load KoW Companion.',{status:503,headers:{'Content-Type':'text/plain'}}))
  );
});
