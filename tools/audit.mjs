// Auditoría de HTML y comportamiento en DOM simulado; no sustituye pruebas visuales en navegador.
import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {parseHTML} from 'linkedom';
const root = new URL('../',import.meta.url);
const read=f=>fs.readFileSync(new URL(f,root),'utf8');
let pages=0;
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))) {
 const source=read(file), {document,window}=parseHTML(source);
 document.cookie='';
 for(const el of document.querySelectorAll('select')) Object.defineProperty(el,'value',{value:el.querySelector('option')?.getAttribute('value')||'',configurable:true,writable:true});
 const schemas=[...document.querySelectorAll('script[type="application/ld+json"]')].map(s=>JSON.parse(s.textContent));
 assert.equal(schemas.length,1,file); const data=schemas[0];
 assert.equal(data.name,'CLIMATSOL'); assert.equal(data.telephone,'+34968842143'); assert.equal(data.address.postalCode,'30158');
 assert.equal(data.openingHoursSpecification[0].closes,'19:00'); assert.equal(data.openingHoursSpecification[1].closes,'15:00');
 assert.equal(data.geo.latitude,37.9512931); assert.equal(data.aggregateRating,undefined); assert.equal(data.review,undefined);
 assert.equal(document.querySelectorAll('h1').length,1,file);
 const ids=[...document.querySelectorAll('[id]')].map(e=>e.id);assert.equal(new Set(ids).size,ids.length,'IDs duplicados: '+file);
 assert.match(document.title,/CLIMATSOL/);
 assert.equal(document.querySelector('link[rel="canonical"]'),null);
 assert.equal(data.url,undefined);
 assert.equal(data['@id'],undefined);
 for(const a of document.querySelectorAll('a[href^="tel:"]')) assert.equal(a.getAttribute('href'),'tel:+34968842143');
 assert.equal(document.querySelectorAll('[data-whatsapp-link], a[href^="mailto:"]').length,0);
 const store=new Map(), callbacks=[]; let downloadedBlob, downloadedName;
 const originalAdd=document.addEventListener.bind(document);
 document.addEventListener=(event,fn,...rest)=>event==='DOMContentLoaded'?callbacks.push(fn):originalAdd(event,fn,...rest);
 for(const form of document.querySelectorAll('form')) for(const el of form.querySelectorAll('input,select,textarea')) {if(el.id) form[el.id]=el;if(el.tagName==='SELECT') Object.defineProperty(el,'value',{value:'',configurable:true,writable:true});}
 class TestFormData extends Map {constructor(form){super();for(const el of form.querySelectorAll('input,select,textarea')) if(el.name && (!['checkbox','radio'].includes(el.type)||el.checked)) this.set(el.name,el.value||'');}append(k,v){this.set(k,v);}}
 const context=vm.createContext({document,window:{document,innerWidth:390,scrollY:0,location:{search:'',href:''},addEventListener(){},matchMedia:()=>({matches:false,addEventListener(){}})},console,localStorage:{getItem:k=>store.get(k)||null,setItem:(k,v)=>store.set(k,v)},setTimeout,clearTimeout,URLSearchParams,FormData:TestFormData,Blob,URL:{createObjectURL(blob){downloadedBlob=blob;return 'blob:local-audit';},revokeObjectURL(){}},fetch:()=>{throw Error('No se permite envío remoto durante esta prueba');}});
 const create=document.createElement.bind(document);
 document.createElement=tag=>{const e=create(tag);if(tag==='a') e.click=()=>{downloadedName=e.download;};return e;};
 for(const script of document.querySelectorAll('script')) {
   if(script.type==='application/ld+json') continue;
   vm.runInContext(script.src?read(script.src):script.textContent,context,{filename:script.src||file});
 }
 callbacks.forEach(fn=>fn());
 const toggle=document.querySelector('.nav-toggle'); if(toggle){toggle.click();assert.equal(toggle.getAttribute('aria-expanded'),'true');toggle.click();assert.equal(toggle.getAttribute('aria-expanded'),'false');}
 document.querySelector('[data-cookie-reject]')?.click(); assert.equal(JSON.parse(store.get('climatsol_cookie_consent')).stats,false);
 if(file==='sobre-nosotros.html') {assert.equal(document.querySelectorAll('.testimonial').length,2); assert.equal(document.getElementById('trust-testimonials').hidden,false);}
 if(file==='index.html') assert.equal(document.querySelectorAll('#home-gallery img').length,8);
 if(file==='tienda.html') {
  assert.equal(document.querySelectorAll('.product-card').length,15);
  document.getElementById('filterBrand').value='Daikin'; vm.runInContext('renderProducts()',context);
  assert.equal(document.querySelectorAll('.product-card').length,2);
  document.getElementById('clearFiltersBtn').click();
  document.getElementById('searchInput').value='Sensira'; vm.runInContext('renderProducts()',context);
  assert.equal(document.querySelectorAll('.product-card').length,1);
  document.querySelector('[data-view-product]').click(); assert.ok(document.getElementById('productModal').classList.contains('is-open'));
  assert.match(document.getElementById('modalContent').textContent,/Sensira/);
  document.getElementById('modalCloseBtn').click(); assert.equal(document.getElementById('productModal').classList.contains('is-open'),false);
  document.getElementById('clearFiltersBtn').click();
  document.getElementById('sortSelect').value='precio-asc'; vm.runInContext('renderProducts()',context);
  assert.match(document.querySelector('.product-model').textContent,/Portátil/);
  document.getElementById('filterPriceMax').value='800'; vm.runInContext('renderProducts()',context);
  assert.equal(document.querySelectorAll('.product-card').length,3);
  document.getElementById('toggleFiltersBtn').click(); assert.equal(document.getElementById('toggleFiltersBtn').getAttribute('aria-expanded'),'true');
 }
 if(file==='galeria.html') {assert.equal(document.querySelectorAll('#galleryGrid img').length,24);vm.runInContext("renderGallery('split')",context);assert.ok(document.querySelectorAll('#galleryGrid img').length>0);document.querySelector('#galleryGrid button').click();assert.ok(document.getElementById('lightbox').classList.contains('is-open'));document.getElementById('lightboxClose').click();}
 if(file==='contacto.html'||file==='presupuesto.html') {
  const form=document.querySelector('form');context.testForm=form;
  const validation=file==='contacto.html'?'validateContactForm':'validateQuoteForm';assert.equal(vm.runInContext(validation+'(testForm)',context),false);
  for(const el of form.querySelectorAll('input,textarea')) { if(el.type==='checkbox') el.checked=true; else if(el.name==='website') el.value=''; else if(el.type==='email') el.value='prueba@example.com'; else if(el.type==='tel') el.value='968842143'; else if(el.type==='number') el.value='25'; else if(el.name==='cp') el.value='30158';else el.value='Consulta de prueba local'; }
  if(form.qServicio) Object.defineProperty(form.qServicio,'value',{value:'Calefacción',configurable:true});
  assert.equal(vm.runInContext(validation+'(testForm)',context),true);
  form.__openedAt=Date.now()-5000;assert.equal(await vm.runInContext("FormGuard.send(testForm,'Prueba local CLIMATSOL')",context),true);assert.equal(downloadedName,'solicitud-climatsol.txt');assert.match(await downloadedBlob.text(),/No enviado a la empresa/);
  if(file==='contacto.html'){document.getElementById('loadMap').click();assert.match(document.querySelector('#mapContainer iframe').src,/3869468522116903768/);}
 }
 console.log('OK HTML / DOM simulado: '+file);pages++;
}
console.log(`${pages} páginas: JSON-LD, SEO, enlaces tel, menú, cookies, reseñas, galería y formularios comprobados.`);
