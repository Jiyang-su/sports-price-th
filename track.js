// Provider-agnostic, cookie-less click/page tracker. API: track.page(), track.event(name), track.out(store,position)
// Every call is logged to console.debug('[track]',...) and window.__track (used by test_v3.py).
// If SITE_CONFIG.ANALYTICS_CODE is empty or invalid, nothing is sent anywhere (no-op, no errors).
(function(){
 const C=window.SITE_CONFIG||{},code=String(C.ANALYTICS_CODE||'').trim().toLowerCase(),ok=/^[a-z0-9][a-z0-9-]{1,48}$/.test(code);
 const log=window.__track=[];let ready=false;const q=[];
 const P={goatcounter:{
   load(done){const s=document.createElement('script');s.async=true;s.src='https://gc.zgo.at/count.js';
     s.setAttribute('data-goatcounter',`https://${code}.goatcounter.com/count`);s.setAttribute('data-goatcounter-settings','{"no_onload":true}');
     s.onload=done;s.onerror=()=>{};document.head.appendChild(s)},
   page(){window.goatcounter&&window.goatcounter.count()},
   event(n){window.goatcounter&&window.goatcounter.count({path:n,title:n,event:true})}}};
 const prov=ok?P[C.ANALYTICS_PROVIDER||'goatcounter']:null;
 const send=(t,n)=>{try{t=='page'?prov.page():prov.event(n)}catch(e){}};
 function emit(t,n){log.push({type:t,name:n});try{console.debug('[track]',t,n,prov?'':'(off: ANALYTICS_CODE empty)')}catch(e){}
   if(!prov)return;ready?send(t,n):q.push([t,n])}
 const slug=s=>String(s||'other').toLowerCase().replace(/^https?:\/\/(www\.)?/,'').split('/')[0].replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'other';
 const page=()=>((location.pathname.split('/').pop()||'index.html').replace(/\.html$/,'')||'index');
 window.track={page:()=>emit('page',page()),event:n=>emit('event',n),out:(store,pos)=>emit('event',`out/${slug(store)}/${page()}/${slug(pos)}`),slug,pageName:page,enabled:!!prov};
 if(prov)try{prov.load(()=>{ready=true;q.splice(0).forEach(([t,n])=>send(t,n))})}catch(e){}
 // capture phase so stopPropagation() in card handlers cannot swallow the event
 document.addEventListener('click',e=>{const a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
   if(a.dataset.out!==undefined){track.out(a.dataset.out||a.href,a.dataset.pos||'link');return}
   if(a.dataset.tile){track.event(`tile/${slug(a.dataset.tile)}/${page()}/home-tile`);return}
   if(a.host&&a.host!==location.host)track.out(a.href,a.dataset.pos||'link')},true);
 document.readyState=='loading'?document.addEventListener('DOMContentLoaded',()=>track.page()):track.page();
})();
