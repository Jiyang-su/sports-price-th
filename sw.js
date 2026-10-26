// วิ่งดี service worker: app shell only. HTML/JSON always network-first (never stale prices); offline falls back to cache.
const V='vd-1793000248',SHELL=['/','/style.css?v=1793000248','/common.js?v=1793000248','/config.js?v=1793000248','/track.js?v=1793000248','/guides.js?v=1793000248','/icon-192.png','/favicon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(K=>Promise.all(K.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
 const doc=r.mode==='navigate'||/\.(html|json)$/.test(u.pathname)||u.pathname.endsWith('/');
 if(doc){e.respondWith(fetch(r).then(x=>{if(r.mode==='navigate'&&x.ok){const y=x.clone();caches.open(V).then(c=>c.put(r,y))}return x}).catch(()=>caches.match(r).then(m=>m||caches.match('/'))));return}
 if(SHELL.includes(u.pathname+u.search))e.respondWith(caches.match(r).then(m=>m||fetch(r)))});
