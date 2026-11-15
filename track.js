// Provider-agnostic, cookie-less click/page tracker.
// API: track.page(), track.event(name, title?), track.out(store, pos, brand, model)
// Every call is logged to console.debug('[track]',...) and window.__track (used by test_v3.py).
// If SITE_CONFIG.ANALYTICS_CODE is empty or invalid, nothing is sent anywhere (no-op, no errors).
// Outbound clicks: GoatCounter event path out/<store>/<brand>, title "<model> · <page>".
// UTM on landing (utm_source/medium/campaign/content/term) is kept in sessionStorage so later
// pageviews and clicks can still be attributed; count.js also sends location.search as `q`
// for the Campaigns widget. Page path is pathname only so ?utm_* and filter queries do not
// fragment /shoes.html totals. GoatCounter.count uses sendBeacon when available.
(function(){
 const C=window.SITE_CONFIG||{},code=String(C.ANALYTICS_CODE||'').trim().toLowerCase(),ok=/^[a-z0-9][a-z0-9-]{1,48}$/.test(code);
 const log=window.__track=[];let ready=false;const q=[];
 const UTM_KEYS=['utm_source','utm_medium','utm_campaign','utm_content','utm_term'];
 const readUtm=()=>{const o={};try{const sp=new URLSearchParams(location.search);UTM_KEYS.forEach(k=>{const v=sp.get(k);if(v)o[k]=v});if(Object.keys(o).length){try{sessionStorage.setItem('vd_utm',JSON.stringify(o))}catch(e){}return o}return JSON.parse(sessionStorage.getItem('vd_utm')||'null')||{}}catch(e){return{}}};
 const srcLabel=u=>!u||!u.utm_source?'':(u.utm_campaign?u.utm_source+'/'+u.utm_campaign:u.utm_source);
 const P={goatcounter:{
   load(done){const s=document.createElement('script');s.async=true;s.src='https://gc.zgo.at/count.js';
     s.setAttribute('data-goatcounter',`https://${code}.goatcounter.com/count`);s.setAttribute('data-goatcounter-settings','{"no_onload":true}');
     s.onload=done;s.onerror=()=>{};document.head.appendChild(s)},
   page(vars){window.goatcounter&&window.goatcounter.count(vars||{})},
   event(n,vars){window.goatcounter&&window.goatcounter.count(Object.assign({path:n,title:(vars&&vars.title)||n,event:true},vars||{}))}}};
 const prov=ok?P[C.ANALYTICS_PROVIDER||'goatcounter']:null;
 const send=(t,n,vars)=>{try{t=='page'?prov.page(vars):prov.event(n,vars)}catch(e){}};
 function emit(t,n,vars){const rec={type:t,name:n};if(vars&&vars.title)rec.title=vars.title;log.push(rec);try{console.debug('[track]',t,n,vars&&vars.title||'',prov?'':'(off: ANALYTICS_CODE empty)')}catch(e){}
   if(!prov)return;ready?send(t,n,vars):q.push([t,n,vars])}
 const slug=s=>String(s||'other').toLowerCase().replace(/^https?:\/\/(www\.)?/,'').split('/')[0].replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'')||'other';
 const brandSlug=s=>String(s||'other').trim().toLowerCase().replace(/[^a-z0-9\u0e00-\u0e7f]+/g,'-').replace(/^-+|-+$/g,'')||'other';
 const page=()=>((location.pathname.split('/').pop()||'index.html').replace(/\.html$/,'')||'index');
 const pagePath=()=>location.pathname||'/';
 const fromLink=a=>{const card=a.closest&&a.closest('article.card,.card,tr,.pcard');
   const brand=a.dataset.brand||(card&&card.dataset.brand)||'';
   const model=a.dataset.model||(card&&card.dataset.model)||(card&&card.querySelector&&card.querySelector('.nm')&&card.querySelector('.nm').textContent)||'';
   return{brand:String(brand||'').trim(),model:String(model||'').trim()}};
 window.track={
   page:()=>{const u=readUtm(),vars={path:pagePath(),title:document.title};if(srcLabel(u)&&!new URLSearchParams(location.search).get('utm_source'))vars.referrer=srcLabel(u);emit('page',page(),vars)},
   event:(n,title)=>emit('event',n,title?{title}:undefined),
   out:(store,pos,brand,model)=>{const u=readUtm(),path=`out/${slug(store)}/${brandSlug(brand)}`,title=[model||'',page(),pos||'',srcLabel(u)].filter(Boolean).join(' · '),vars={title,event:true};if(srcLabel(u))vars.referrer=srcLabel(u);emit('event',path,vars)},
   slug,brandSlug,pageName:page,utm:readUtm,enabled:!!prov};
 if(prov)try{prov.load(()=>{ready=true;q.splice(0).forEach(([t,n,vars])=>send(t,n,vars))})}catch(e){}
 const onOut=e=>{const a=e.target.closest&&e.target.closest('a[href]');if(!a)return;
   if(a.dataset.out!==undefined){const m=fromLink(a);track.out(a.dataset.out||a.href,a.dataset.pos||'link',m.brand,m.model);return}
   if(a.dataset.tile){track.event(`tile/${slug(a.dataset.tile)}/${page()}/home-tile`);return}
   if(a.host&&a.host!==location.host){const m=fromLink(a);track.out(a.dataset.store||a.href,a.dataset.pos||'link',m.brand,m.model)}};
 document.addEventListener('click',onOut,true);
 document.addEventListener('auxclick',e=>{if(e.button===1)onOut(e)},true);
 document.readyState=='loading'?document.addEventListener('DOMContentLoaded',()=>track.page()):track.page();
})();
