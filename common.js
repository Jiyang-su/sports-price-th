const $=id=>document.getElementById(id),fmt=n=>'฿'+Number(n).toLocaleString('th-TH'),esc=s=>String(s??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ACC={'วิ่ง':'#2f9e5b','แบดมินตัน':'#2ecc71','ฟุตบอล/ฟุตซอล':'#3fa9ff','เทนนิส/พิกเคิลบอล':'#d4e157','ฟิตเนส/เวทเทรนนิ่ง':'#ff5c7a','จักรยาน':'#f5c518','ว่ายน้ำ/กีฬาทางน้ำ':'#26c6da','เดินป่า/แคมป์ปิ้ง':'#8bc34a','บาสเกตบอล':'#ff8f4d','กอล์ฟ':'#66bb6a','โยคะ/พิลาทิส':'#b39ddb','มวย/ศิลปะการต่อสู้':'#ef5350'};
const acc=c=>ACC[c]||'#9aa4b2';const TH_M=['ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
const thDate=s=>{const d=new Date(s+'T00:00:00');return d.getDate()+' '+TH_M[d.getMonth()]+' '+(d.getFullYear()+543)};
const NAV=[['index.html','หน้าแรก'],['shoes.html','Shoe Verse'],['trends.html','เทรนด์คนรุ่นใหม่'],['vaikao.html','วิ่งดีวัยเก๋า'],['picks.html','สนับสนุนวิ่งดี'],['deals.html','คุ้มค่าตอนนี้'],['running-shoe-finder.html','ตัวช่วยเลือก'],['events.html','ปฏิทินงานวิ่ง'],['trust.html','รู้จักวิ่งดี']];
document.addEventListener('DOMContentLoaded',()=>{document.body.dataset.pg=(location.pathname.split('/').pop()||'index.html').replace('.html','');const here0=/\/articles\/[^/]+$/.test(location.pathname)||/^(insights|guides)\.html$/.test(location.pathname.split('/').pop())?'articles.html':(location.pathname.split('/').pop()||'index.html'),here=NAV.some(n=>n[0]==here0+location.search)?here0+location.search:here0;
 document.body.insertAdjacentHTML('afterbegin',`<nav class="top"><a class="brand" href="index.html" aria-label="วิ่งดี VingDee หน้าแรก"><img class="bfull" src="img/brand/D-badge_nav_light.svg" alt="วิ่งดี VingDee" width="150" height="32"><img class="bicon" src="img/brand/D-badge_icon-small_light.svg" alt="วิ่งดี VingDee" width="32" height="32"></a><div class="links">${NAV.map(([h,t])=>`<a href="${h}" data-n="${h.replace('.html','')}" class="${h==here?'on':''}">${t}</a>`).join('')}</div></nav>`);
 {const L=document.querySelector('nav.top .links'),on=L&&L.querySelector('a.on');if(on&&L.scrollWidth>L.clientWidth)L.scrollLeft=Math.max(0,on.offsetLeft-L.offsetLeft-40)}
 document.body.insertAdjacentHTML('beforeend',`<footer class="f"><div style="margin-bottom:10px"><img src="img/brand/D-badge_nav_light.svg" alt="วิ่งดี VingDee" height="28" style="height:28px;width:auto"></div><div class="up" style="color:var(--fg);margin-bottom:8px">หมายเหตุ</div>ลิงก์ร้านค้าบางลิงก์เป็นลิงก์พันธมิตร (affiliate) เมื่อมีการซื้อ วิ่งดีได้ค่าคอมเล็กน้อยจากร้าน โดยคุณจ่ายราคาเท่าเดิม และไม่มีผลต่อการแนะนำหรือการเรียงลำดับสินค้า · นับเฉพาะจำนวนคลิกแบบไม่ระบุตัวตน ไม่ใช้คุกกี้ · ราคาเป็นราคา ณ วันที่เก็บข้อมูลที่แสดงในแต่ละรายการ และอาจเปลี่ยนแปลงได้ · การสั่งซื้อ การจัดส่ง และการคืนสินค้า ดำเนินการโดยร้านค้าแต่ละร้านโดยตรง กรุณาติดต่อร้านค้า · คำแนะนำอ้างอิงจากชื่อรุ่นและข้อมูลสาธารณะ ควรลองสวมจริงก่อนซื้อ · <div class="flinks" id="fstores">ร้านค้าทางการ: ${storeList('footer-stores')}</div><div class="flinks"><a href="trust.html">รู้จักวิ่งดี</a> · <a href="about.html">เว็บนี้หารายได้อย่างไร / ความเป็นส่วนตัว</a> · <a href="img/CREDITS.md">เครดิตภาพ (Wikimedia Commons / Unsplash, สัญญาอนุญาตเสรี)</a> · <a href="trust.html#changelog">อัปเดตล่าสุดของเว็บ</a> · <span id="contact">ติดต่อเรา: LINE <a href="https://line.me/R/ti/p/@682aeske" target="_blank" rel="nofollow noopener" data-out="line" data-pos="footer">@682aeske</a> · อีเมล <a href="mailto:hello@vingdee.com" rel="nofollow noopener" data-out="mail" data-pos="footer">hello@vingdee.com</a></span></div><div class="meta" id="dataStamp">${dataStamp()}</div><span style="color:#8a6d00">เวอร์ชันต้นแบบ (prototype)</span></footer>`);fillPC()});
let HIST=null;const histP=fetch('history/series.json').then(r=>r.json()).then(j=>HIST=j).catch(()=>HIST={meta:{start:'2026-10-19',days:1},series:{}});
function priceInfo(url,cur){const s=HIST&&HIST.series[url];if(!s||s.length<2)return{label:`เริ่มติดตามราคา ${thDate((HIST&&HIST.meta.start)||'2026-10-19')}`,cls:'',s:null};
 const ps=s.map(x=>x[1]),mn=Math.min(...ps),sorted=[...ps].sort((a,b)=>a-b),med=sorted[Math.floor(sorted.length/2)];
 return cur<=mn?{label:'ราคาดี · ต่ำสุดที่เคยบันทึก',cls:'a',s}:cur<=med?{label:'ราคาปกติ',cls:'',s}:{label:'สูงกว่าปกติ · อาจรอได้',cls:'',s}}
function spark(s){if(!s)return'';const W=300,H=70,ps=s.map(x=>x[1]),mn=Math.min(...ps),mx=Math.max(...ps)||1,n=s.length;
 const pts=s.map((x,i)=>`${(i/(n-1))*W},${H-6-((x[1]-mn)/((mx-mn)||1))*(H-12)}`).join(' ');return `<svg viewBox="0 0 ${W} ${H}" width="100%" height="${H}" role="img" aria-label="กราฟราคา"><polyline fill="none" stroke="var(--acc)" stroke-width="2" points="${pts}"/></svg><div class="meta">${thDate(s[0][0])} – ${thDate(s[n-1][0])} · ต่ำสุด ${fmt(mn)} · สูงสุด ${fmt(mx)}</div>`}
function openProduct(p){let ov=$('pov');if(!ov){document.body.insertAdjacentHTML('beforeend','<div class="ov" id="pov" role="dialog" aria-label="รายละเอียดสินค้า"><div class="box" id="pbox"></div></div>');ov=$('pov');ov.onclick=e=>{if(e.target==ov)ov.style.display='none'}}
 const e=p.sale_price??p.price,pi=priceInfo(p.url,e);$('pbox').style.setProperty('--acc',acc(p.category));
 $('pbox').innerHTML=`<button class="btn sm" style="float:right" onclick="$('pov').style.display='none'">ปิด</button><h3 style="margin:0 0 14px;max-width:85%">${esc(p.name)}</h3>
 <div style="display:grid;grid-template-columns:minmax(0,220px) 1fr;gap:20px" class="pgrid"><img class="pi" src="${esc(p.image)}" alt="" style="width:100%;background:#fff;border-radius:4px;padding:6px">
 <div><div class="pr">${fmt(e)}</div><div class="meta">${esc(p.brand)} · ${esc(p.category)} · ข้อมูล ณ ${thDate(p.scraped)}</div><p>${shopBtn(p.link||p.url,p.store,"catalog-popup","btn acc","")}</p>
 <h4 class="up" style="margin:18px 0 6px;font-size:12px;color:var(--mut)">ประวัติราคา</h4>${pi.s?spark(pi.s)+`<span class="tag ${pi.cls}">${pi.label}</span>`:`<div class="note">${pi.label} · กราฟและป้าย "ราคานี้ดีไหม" จะแสดงเมื่อมีข้อมูลอย่างน้อย 2 วัน</div>`}
 <h4 class="up" style="margin:18px 0 6px;font-size:12px;color:var(--mut)">แจ้งเตือนเมื่อราคาลด</h4><button class="btn sm" disabled>🔔 แจ้งเตือนทาง LINE</button> <span class="proto">เร็วๆ นี้</span><div class="meta">ระบบแจ้งเตือนผ่าน LINE ยังไม่เปิดใช้งาน (ต้นแบบหน้าจอเท่านั้น)</div></div></div>
 <h4 class="up" style="margin:26px 0 6px;font-size:12px;color:var(--mut)">รีวิวจากคนเล่นจริง <span class="proto">ต้นแบบ</span></h4><div class="note">ยังไม่มีรีวิวสำหรับสินค้านี้ — เป็นคนแรกที่รีวิว</div>
 <form onsubmit="event.preventDefault()" style="display:grid;gap:8px;margin-top:10px"><div style="display:flex;gap:8px"><input type="number" min="0" placeholder="ใช้ไปแล้วกี่กิโลเมตร / กี่ชั่วโมง" aria-label="ระยะใช้งาน"><select aria-label="คะแนน"><option>ให้คะแนน</option><option>★★★★★</option><option>★★★★</option><option>★★★</option><option>★★</option><option>★</option></select></div>
 <textarea rows="3" placeholder="เล่าประสบการณ์การใช้งานจริง" aria-label="รีวิว"></textarea><button class="btn sm" disabled>ส่งรีวิว (ยังไม่เปิดระบบ)</button></form>`;ov.style.display='block'}

// v5: estimated cost per km = price / typical shoe lifespan 500-800 km (ESTIMATE, not measured)
const KM_LO=500,KM_HI=800,r1=v=>v<10?v.toFixed(1):Math.round(v);
function perKm(e){return `<div class="km" title="ประมาณการ: ราคา ÷ อายุการใช้งานทั่วไป ${KM_LO}–${KM_HI} กม. ใช้จริงขึ้นกับน้ำหนักตัว พื้น และการดูแล">≈ ฿${r1(e/KM_HI)}–${r1(e/KM_LO)} ต่อกม. <span>(ประมาณการ ${KM_LO}–${KM_HI} กม.)</span></div>`}

// v6: outbound shop links — rel + disclosure label + tracking attributes in ONE place
const AFF=new Set((window.SITE_CONFIG||{}).AFFILIATE_STORES||[]);
const relFor=store=>AFF.has(store)?'sponsored nofollow noopener':'nofollow noopener';
const isAffLink=(u,st)=>!!(prodAff(u)||PTPL[st]);
function affLbl(u,st,tag='div',cls='aff'){return isAffLink(u,st)?`<${tag} class="${cls}" onclick="event.stopPropagation()">ขอบคุณที่สนับสนุนวิ่งดี · <a href="about.html">เว็บนี้หารายได้อย่างไร</a></${tag}>`:''}
// v14: generic affiliate mechanism. PRODUCT_TPL[store] = product URL template ({url} or {url_enc}); STORE_LINKS[store].aff = store-level (homepage) affiliate link.
const PTPL=(window.SITE_CONFIG||{}).PRODUCT_TPL||{},SLINK=(window.SITE_CONFIG||{}).STORE_LINKS||{};
const PAFF=(window.SITE_CONFIG||{}).PRODUCT_AFF||{};
function affKey(u){try{const x=new URL(u);return (x.host.replace(/^www\./,'')+x.pathname.replace(/\/+$/,'')).toLowerCase()}catch(e){return ''}}
const prodAff=u=>PAFF[affKey(u)]||'';
function affUrl(url,store){const o=prodAff(url);if(o)return o;const t=PTPL[store];return t?t.replace('{url_enc}',encodeURIComponent(url)).replace('{url}',url):url}
function storeA(store,pos,inner,cls='',style=''){const L=SLINK[store]||{},u=L.aff||L.site;if(!u)return esc(store);return `<a${cls?` class="${cls}"`:''}${style?` style="${style}"`:''} href="${esc(u)}" target="_blank" rel="${L.aff?'nofollow noopener sponsored':'nofollow noopener'}" data-store="${esc(store)}" data-aff="${L.aff?'store':''}" data-pos="${pos}">${inner||esc(store)}</a>`}
function storeList(pos){return Object.keys(SLINK).filter(k=>SLINK[k].site).map(k=>storeA(k,pos)).join(' · ')}
function shopA(url,store,pos,inner,cls='',style=''){return `<a${cls?` class="${cls}"`:''}${style?` style="${style}"`:''} href="${esc(affUrl(url,store))}" target="_blank" rel="${prodAff(url)?'nofollow noopener sponsored':relFor(store)}"${prodAff(url)?' data-aff="product"':''} data-out="${esc(store)}" data-pos="${pos}" onclick="event.stopPropagation()">${inner}</a>`}
// v7: delivery info per store (only what the store states; source in stores.json -> SITE_CONFIG.SHIPPING)
const SHIP=(window.SITE_CONFIG||{}).SHIPPING||{};
function addWorkdays(d,n){d=new Date(d);while(n>0){d.setDate(d.getDate()+1);const w=d.getDay();if(w!=0&&w!=6)n--}return d}
function bkkToday(){const s=new Date().toLocaleString('en-CA',{timeZone:'Asia/Bangkok'}).slice(0,10);return new Date(s+'T00:00:00')}
function etaRange(days){const m=String(days||'').match(/(\d+)\D+(\d+)/);if(!m)return'';const t=bkkToday(),a=addWorkdays(t,+m[1]),b=addWorkdays(t,+m[2]),f=d=>d.getDate()+' '+TH_M[d.getMonth()];return `${f(a)}–${f(b)}`}
function shipLine(store){const s=SHIP[store];if(!s||!s.source_url)return `<div class="ship">การจัดส่ง: ดูเงื่อนไขที่ร้าน</div>`;
 const d=s.days_bkk?`ปกติได้รับ ${s.days_bkk} วันทำการ${s.days_upcountry&&s.days_upcountry!=s.days_bkk?` (กทม.) · ต่างจังหวัด ${s.days_upcountry} วัน`:''}`:'ดูระยะเวลาที่ร้าน';
 const e=etaRange(s.days_bkk);return `<div class="ship" title="ข้อมูลจาก ${esc(s.source_url)} ตรวจเมื่อ ${esc(s.checked)}">🚚 ${d}${s.free_short?` · ${esc(s.free_short)}`:s.free_over?` · ส่งฟรีเมื่อซื้อครบ ${fmt(s.free_over)}`:''} <span>(ตามที่ร้านแจ้ง)</span>${e?`<br><span>สั่งวันนี้ ประมาณ ${e} · ประมาณการ ไม่นับเสาร์-อาทิตย์/วันหยุดนักขัตฤกษ์</span>`:''}</div>`}
function shipTable(){return `<div style="overflow-x:auto"><table class="ship-t"><tr><th>ร้าน</th><th>กทม./ปริมณฑล</th><th>ต่างจังหวัด</th><th>ค่าส่ง</th><th>ส่งฟรี</th><th>รับที่ร้าน</th><th>ที่มา</th></tr>${Object.entries(SHIP).map(([k,s])=>s.source_url?`<tr><td><b>${storeA(k,'ship-table')}</b></td><td>${esc(s.days_bkk||'–')} วันทำการ</td><td>${s.days_upcountry?esc(s.days_upcountry)+' วันทำการ':'ร้านไม่ได้ระบุแยก'}</td><td>${esc(s.fee||'ดูเงื่อนไขที่ร้าน')}</td><td>${esc(s.free_note||'–')}</td><td>${esc(s.pickup||'ร้านไม่ได้ระบุ')}</td><td><a href="${esc(s.source_url)}" target="_blank" rel="nofollow noopener">หน้านโยบายร้าน</a><br><span class="meta">ตรวจ ${thDate(s.checked)}</span>${s.note?`<br><span class="meta">${esc(s.note)}</span>`:''}</td></tr>`:`<tr><td><b>${esc(k)}</b></td><td colspan="6">ดูเงื่อนไขที่ร้าน</td></tr>`).join('')}</table></div>`}
// v9 trust: price-checked stamp, honest price context, anonymous "report wrong info"
const UPD=(window.SITE_CONFIG||{}).DATA_UPDATED||{};
function thDT(iso){if(!iso)return'';const d=new Date(iso);return d.getDate()+' '+TH_M[d.getMonth()]+' '+String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0')}
function dataStamp(){const t=UPD._site;return t?`วิ่งดี VingDee · ข้อมูลราคาอัปเดตล่าสุด ${thDT(t)} น. (เวลาไทย) · อัปเดตอัตโนมัติทุกวันประมาณ 06:00 น.`:''}
function checkedLine(store){const t=UPD[store];return `<div class="chk">เช็กราคาล่าสุด ${t?thDT(t)+' น.':'—'} · ${esc(store)} · ราคาอาจเปลี่ยน ตรวจสอบที่ร้านอีกครั้ง</div>`}
const hid=u=>{let h=5381;for(const c of String(u))h=((h<<5)+h+c.charCodeAt(0))>>>0;return h.toString(36)};
function reportBtn(url,store){return `<button type="button" class="rep" data-store="${esc(store)}" data-id="${hid(url)}" onclick="event.stopPropagation();reportItem(this)">แจ้งข้อมูลผิด</button>`}
function reportItem(b){const pg=(window.track&&track.pageName&&track.pageName())||'page',sl=(window.track&&track.slug)||(x=>x);
 window.track&&track.event(`report/${sl(b.dataset.store)}/${pg}/${b.dataset.id}`);b.disabled=true;b.textContent='ขอบคุณ ส่งแล้ว';toast('ขอบคุณที่ช่วยแจ้ง 🙏 เราบันทึกแบบไม่ระบุตัวตน (ไม่เก็บชื่อ อีเมล หรือคุกกี้) และจะตรวจสอบรายการนี้กับหน้าร้านอีกครั้ง')}
function toast(m){let t=document.getElementById('toast');if(!t){document.body.insertAdjacentHTML('beforeend','<div id="toast" role="status" aria-live="polite"></div>');t=document.getElementById('toast')}t.textContent=m;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),5000)}
function pcBadge(u){const days=HIST&&HIST.meta?HIST.meta.days:0,s=HIST&&HIST.series[u];
 if(days<7)return `<span class="pc">กำลังเก็บประวัติราคา (เริ่ม ${thDate((HIST&&HIST.meta&&HIST.meta.start)||'2026-10-19')})</span>`;
 if(!s)return `<span class="pc">ราคาเท่าเดิมตลอด ${days} วันที่เก็บข้อมูล</span>`;
 const ps=s.map(x=>x[1]),cur=ps[ps.length-1],mn=Math.min(...ps),srt=[...ps].sort((a,b)=>a-b),med=srt[Math.floor(srt.length/2)];
 return cur<=mn?`<span class="pc a">ต่ำสุดใน ${days} วันที่เก็บข้อมูล</span>`:cur<=med?`<span class="pc">ราคาปกติ (เทียบ ${days} วัน)</span>`:`<span class="pc">สูงกว่าปกติ (เทียบ ${days} วัน)</span>`}
function fillPC(){const run=()=>document.querySelectorAll('.pcx:not([data-done])').forEach(e=>{e.dataset.done=1;e.innerHTML=pcBadge(e.dataset.u)});
 histP.then(()=>{run();if(!window._pcObs){window._pcObs=new MutationObserver(run);window._pcObs.observe(document.body,{childList:true,subtree:true})}})}
function trustBits(url,store){return `<div class="trust"><span class="pcx" data-u="${esc(url)}"></span>${checkedLine(store)}${reportBtn(url,store)}</div>`}
// v9b: compact line on mobile; full details behind a toggle (desktop always shows details)
function compactLine(store){const s=SHIP[store],t=UPD[store];return `<div class="cl">🚚 ${s&&s.days_bkk?esc(s.days_bkk)+' วัน':'ดูที่ร้าน'} · เช็กราคา ${t?thDT(t):'—'} <button type="button" class="dt" aria-expanded="false" onclick="event.stopPropagation();toggleDx(this)">รายละเอียด</button></div>`}
function toggleDx(b){const d=b.closest('.cl').nextElementSibling,o=!d.classList.contains('open');d.classList.toggle('open',o);b.setAttribute('aria-expanded',o);b.textContent=o?'ซ่อน':'รายละเอียด'}
function shopBtn(url,store,pos,cls='btn sm acc',style='margin-top:auto;text-align:center',text='ไปที่หน้าร้าน'){return shopA(url,store,pos,text,cls,style)+affLbl(url,store)+compactLine(store)+`<div class="dx">${shipLine(store)}${trustBits(url,store)}</div>`}
// v23: install to home screen (footer button; Android uses beforeinstallprompt, iOS shows a tip). Hidden when standalone/installed.
(function(){const SA=matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
 if('serviceWorker' in navigator&&location.protocol==='https:')addEventListener('load',()=>navigator.serviceWorker.register('/sw.js').catch(()=>{}));
 let ev=null;const ios=/iphone|ipad|ipod/i.test(navigator.userAgent)&&!/crios|fxios|edgios/i.test(navigator.userAgent),edge=/Edg(A|iOS)?\/|SamsungBrowser|FBAN|FBAV|Messenger|\bLine\//i.test(navigator.userAgent);
 function box(){let b=document.getElementById('a2hs');if(b)return b;const f=document.querySelector('footer.f');if(!f)return null;
  f.insertAdjacentHTML('beforeend','<a class="fqr" id="fqr" href="install.html"><img src="img/promo/qr-install.png" width="84" height="84" loading="lazy" alt="QR โค้ดไปหน้าเพิ่มวิ่งดีลงหน้าจอ"><span><b>สแกนเพื่อเพิ่มวิ่งดีลงมือถือ</b><br><span class="meta">เปิดกล้องมือถือแล้วสแกน</span></span></a>');f.insertAdjacentHTML('beforeend','<div id="a2hs" hidden class="a2hs"><button type="button" class="btn solid" id="a2hsBtn">📲 เพิ่มวิ่งดีลงหน้าจอ</button><span class="meta" id="a2hsNote">เปิดวิ่งดีได้ในแตะเดียว ไม่ต้องโหลดแอปจาก App Store หรือ Play Store ไม่ขอสิทธิ์เข้าถึงข้อมูลในเครื่อง ลบได้เหมือนไอคอนทั่วไป</span><span id="a2hsTip" class="meta" hidden>บน iPhone: แตะปุ่มแชร์ (สี่เหลี่ยมมีลูกศรขึ้น) แล้วเลือก “เพิ่มไปยังหน้าจอโฮม” · <a href="install.html">ดูวิธีทุกเบราว์เซอร์</a></span></div>');
  document.getElementById('a2hsBtn').onclick=async()=>{if(ev){ev.prompt();const r=await ev.userChoice;ev=null;if(r.outcome==='accepted')hide()}else if(ios)document.getElementById('a2hsTip').hidden=false;else location.href='install.html'};return document.getElementById('a2hs')}
 function show(){if(SA||localStorage.getItem('vd_installed'))return;const b=box();if(b)b.hidden=false}
 function hide(){const b=document.getElementById('a2hs');if(b)b.hidden=true}
 addEventListener('beforeinstallprompt',e=>{e.preventDefault();ev=e;show()});
 addEventListener('appinstalled',()=>{try{localStorage.setItem('vd_installed','1')}catch(e){}hide()});
 addEventListener('DOMContentLoaded',()=>{box();if((ios||edge)&&!SA)show()});if(document.readyState!=='loading'){box();if((ios||edge)&&!SA)show()}
 window.__a2hs={show,hide}})();
