/* Lưu game vào máy để chơi offline. Khi sửa game, tăng số VERSION để máy tải bản mới. */
const VERSION='v1';
const CACHE='be-hoc-tieng-anh-'+VERSION;
const FILES=[
  "./",
  "./fonts/baloo-2-latin-600-normal.woff2",
  "./fonts/baloo-2-latin-700-normal.woff2",
  "./fonts/baloo-2-latin-800-normal.woff2",
  "./fonts/baloo-2-latin-ext-600-normal.woff2",
  "./fonts/baloo-2-latin-ext-700-normal.woff2",
  "./fonts/baloo-2-latin-ext-800-normal.woff2",
  "./fonts/baloo-2-vietnamese-600-normal.woff2",
  "./fonts/baloo-2-vietnamese-700-normal.woff2",
  "./fonts/baloo-2-vietnamese-800-normal.woff2",
  "./icons/apple-touch-icon.png",
  "./icons/favicon-32.png",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./index.html",
  "./manifest.webmanifest",
  "./vendor/three.min.js",
];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  e.respondWith(caches.match(e.request,{ignoreSearch:true}).then(hit=>hit||fetch(e.request).then(res=>{
    if(res.ok&&new URL(e.request.url).origin===location.origin){const copy=res.clone();caches.open(CACHE).then(c=>c.put(e.request,copy))}
    return res;
  }).catch(()=>caches.match('./index.html'))));
});
