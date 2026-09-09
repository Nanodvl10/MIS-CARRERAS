(function(){
"use strict";
window.RACES = window.RACES || [];
window.registerRace = function(r){ window.RACES.push(r); };
var VERSION="2.1";
var typeName={suave:"Suave",medio:"Rodaje",fuerte:"Fuerte",carga:"Carga",carrera:"Carrera"};
var MODE={hold:["#ecb63f","CONTEN"],steady:["#6f8fae","RITMO"],hike:["#ff4a30","ANDAR"],send:["#4fa76e","SUELTA"]};
var MESES=["ene","feb","mar","abr","may","jun","jul","ago","sept","oct","nov","dic"];
var DIAS=["dom","lun","mar","mie","jue","vie","sab"];
var I={
 dias:'<svg viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4"/></svg>',
 mapa:'<svg viewBox="0 0 24 24"><path d="M2 20l6-13 4 8 3-5 7 10z"/></svg>',
 ritmos:'<svg viewBox="0 0 24 24"><path d="M2 12h4l2.5 7L13 4l2.5 8H22"/></svg>',
 carrera:'<svg viewBox="0 0 24 24"><path d="M5 21V4"/><path d="M5 4c3-1.6 6 1.6 9 0s5 0 5 0v8s-2 1.6-5 0-6-1.6-9 0"/></svg>',
 home:'<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>',
 chart:'<svg viewBox="0 0 24 24"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
 cog:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
 back:'<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>',
 check:'<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
 arrow:'<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>',
 log:'<svg viewBox="0 0 24 24"><path d="M12 8v4l3 2"/><circle cx="12" cy="12" r="9"/></svg>',
 fire:'<svg viewBox="0 0 24 24"><path d="M12 22c4.4 0 7-2.9 7-7 0-3-2-5-3-6-.5 2-1.5 3-2.5 3.5C14 9 13 5 9 2c.5 3-1 5-2.5 7C5 10.5 5 13 5 15c0 4.1 2.6 7 7 7z"/></svg>',
 scale:'<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 9a4 4 0 0 1 8 0"/><path d="M12 9v3"/></svg>',
 share:'<svg viewBox="0 0 24 24"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v14"/></svg>',
 down:'<svg viewBox="0 0 24 24"><path d="M12 3v12M6 11l6 6 6-6M4 21h16"/></svg>',
 up:'<svg viewBox="0 0 24 24"><path d="M12 21V9M6 13l6-6 6 6M4 3h16"/></svg>',
 timer:'<svg viewBox="0 0 24 24"><circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6M12 2v3"/></svg>',
 bag:'<svg viewBox="0 0 24 24"><path d="M6 8h12l1 13H5z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
 trophy:'<svg viewBox="0 0 24 24"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0z"/><path d="M17 6h3v2a3 3 0 0 1-3 3M7 6H4v2a3 3 0 0 0 3 3"/></svg>',
 cal:'<svg viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9.5h18M8 2.5v4M16 2.5v4M9 15l2 2 4-4"/></svg>',
 food:'<svg viewBox="0 0 24 24"><path d="M4 3v7a3 3 0 0 0 6 0V3M7 3v18M17 3c-2 0-3 3-3 6v3h3v9"/></svg>'
};

/* ---------- utils ---------- */
function app(){return document.getElementById('app');}
function fmtDate(iso){var p=iso.split('-');return parseInt(p[2],10)+' '+MESES[parseInt(p[1],10)-1]+' '+p[0];}
function fmtShort(iso){var p=iso.split('-');return parseInt(p[2],10)+' '+MESES[parseInt(p[1],10)-1];}
function toISO(dt){return dt.getFullYear()+'-'+String(dt.getMonth()+1).padStart(2,'0')+'-'+String(dt.getDate()).padStart(2,'0');}
function todayISO(){return toISO(new Date());}
function addDays(iso,n){var d=new Date(iso+'T00:00:00');d.setDate(d.getDate()+n);return toISO(d);}
function daysLeft(iso){var t=new Date();t.setHours(0,0,0,0);var d=new Date(iso+'T00:00:00');return Math.round((d-t)/86400000);}
function cd(iso){var n=daysLeft(iso);if(n>1)return n+' dias';if(n===1)return 'manana';if(n===0)return 'HOY';return 'hecha';}
function esc(s){return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function parseKm(ent){var e=String(ent);var par=e.match(/\((\d+(?:[.,]\d+)?)\s*km\)/i);if(par)return parseFloat(par[1].replace(',','.'));var m=e.match(/(\d+(?:[.,]\d+)?)\s*km/gi);if(!m)return 0;return parseFloat(m[m.length-1].replace(',','.'));}
function parseTime(s){if(!s)return 0;var p=String(s).trim().split(':').map(Number);if(p.some(isNaN))return 0;if(p.length===3)return p[0]*3600+p[1]*60+p[2];if(p.length===2)return p[0]*60+p[1];return p[0]*60;}
function fmtPace(sec,km){if(!sec||!km)return '';var p=sec/km;var m=Math.floor(p/60),s=Math.round(p%60);if(s===60){m++;s=0;}return m+':'+String(s).padStart(2,'0')+' /km';}
function fmtDur(sec){sec=Math.max(0,Math.round(sec));var h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;return (h?h+':'+String(m).padStart(2,'0'):String(m))+':'+String(s).padStart(2,'0');}
function paceMid(str){var m=String(str).replace('~','').match(/(\d+):(\d{2})(?:\s*-\s*(\d+):(\d{2}))?/);if(!m)return 330;var a=+m[1]*60+ +m[2];var b=m[3]?+m[3]*60+ +m[4]:a;return (a+b)/2;}
function num(v){return (Math.round(v*10)/10).toFixed(1).replace('.',',');}
var store=(function(){try{var s=window.localStorage;s.setItem('__t','1');s.removeItem('__t');return s;}catch(e){return null;}})();
function getJ(k){try{return JSON.parse((store&&store.getItem(k))||'{}')||{};}catch(e){return {};}}
function setJ(k,v){try{store&&store.setItem(k,JSON.stringify(v));}catch(e){}}
var KEYS=function(id){return {log:'log-'+id,meals:'meals-'+id,checks:'cdd-checks-'+id,gear:'gear-'+id,result:'result-'+id,race:'race-'+id};};
var _timer=null;function clearTimer(){if(_timer){clearInterval(_timer);_timer=null;}}
function toast(msg,btn,fn){var t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';document.body.appendChild(t);}
  t.innerHTML='<span>'+msg+'</span>'+(btn?'<button>'+btn+'</button>':'');t.className='show';
  if(btn)t.querySelector('button').onclick=function(){fn&&fn();t.className='';};
  if(!btn)setTimeout(function(){t.className='';},2600);}

/* ---------- race prep ---------- */
function prep(race){
  if(race._prepped)return race;
  var iso=race.planStart;
  race.days.forEach(function(x){if(x.w)return;x.iso=iso;x.planKm=x.race?0:parseKm(x.ent);x.isTraining=!x.race&&x.planKm>0;iso=addDays(iso,1);});
  race.totalKm=race.totalKm||parseFloat(race.km)||16;
  /* planned timeline from zones */
  var tl=[{km:0,t:0}],t=0;
  (race.zones||[]).forEach(function(z){var r=String(z[0]).split('-');var a=parseInt(r[0],10)-1,b=parseInt(r[r.length-1],10);var pm=paceMid(z[2]);for(var k=a;k<b;k++){t+=pm;tl.push({km:k+1,t:t});}});
  if(tl.length>1&&tl[tl.length-1].km<race.totalKm){t+=(race.totalKm-tl[tl.length-1].km)*paceMid(race.zones[race.zones.length-1][2]);tl.push({km:race.totalKm,t:t});}
  race._tl=tl;race._planTotal=t;
  race._prepped=true;return race;
}
function etaAt(race,km){var tl=race._tl;for(var i=1;i<tl.length;i++){if(km<=tl[i].km){var a=tl[i-1],b=tl[i];return a.t+(km-a.km)/(b.km-a.km||1)*(b.t-a.t);}}return tl[tl.length-1].t;}
function kmAt(race,t){var tl=race._tl;for(var i=1;i<tl.length;i++){if(t<=tl[i].t){var a=tl[i-1],b=tl[i];return a.km+(t-a.t)/(b.t-a.t||1)*(b.km-a.km);}}return race.totalKm;}
function findToday(race){var t=todayISO();return race.days.filter(function(x){return !x.w&&x.iso===t;})[0];}
function zoneAt(race,km){for(var i=0;i<race.zones.length;i++){var z=race.zones[i];var r=String(z[0]).split('-');var a=parseInt(r[0],10)-1,b=parseInt(r[r.length-1],10);if(km>=a&&km<=b)return z;}return null;}
function nextMeal(day){if(!day||!day.menu)return null;var now=new Date();var cur=now.getHours()*60+now.getMinutes();var best=null;
  day.menu.forEach(function(it){var m=String(it[0]).match(/(\d{1,2}):(\d{2})/);if(!m)return;var mins=+m[1]*60+ +m[2];if(mins>=cur&&(!best||mins<best.mins))best={mins:mins,it:it};});
  return best;}
function featuredRace(){var races=window.RACES.slice().sort(function(a,b){return a.date<b.date?-1:1;});var up=races.filter(function(r){return daysLeft(r.date)>=0;});return up[0]||races[races.length-1];}
function resultOf(id){var r=getJ(KEYS(id).result);return r.tiempo?r:null;}

/* ---------- svg helpers ---------- */
function heroProfile(p,cls){return '<svg class="'+cls+'" viewBox="0 0 '+p.viewBox[2]+' '+p.viewBox[3]+'" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a2c" stop-opacity=".32"/><stop offset="1" stop-color="#ff5a2c" stop-opacity="0"/></linearGradient></defs><path d="'+p.area+'" fill="url(#hg)"/><path class="hp-line" d="'+p.line+'" fill="none" stroke="#ff5a2c" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/></svg>';}
function miniProfile(p){return '<svg viewBox="0 0 '+p.viewBox[2]+' '+p.viewBox[3]+'" preserveAspectRatio="none" aria-hidden="true"><path d="'+p.area+'" fill="rgba(255,90,44,.16)"/><path d="'+p.line+'" fill="none" stroke="#ff5a2c" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/></svg>';}
function buildProfileSVG(p){var t=p.techo,m=p.muro,g1=p.gel1,g2=p.gel2,bj=p.bajada;var tk=p.ticks||[];
  var ticks=tk.map(function(x,i){var a=i===0?'start':(i===tk.length-1?'end':'middle');return '<text class="axis" x="'+x[0]+'" y="'+(p.bot+18)+'" text-anchor="'+a+'">'+x[1]+'</text>';}).join('');
  var s='<svg viewBox="0 0 '+p.viewBox[2]+' '+p.viewBox[3]+'" role="img" aria-label="Perfil"><line class="gridline" x1="0" y1="'+p.bot+'" x2="'+p.viewBox[2]+'" y2="'+p.bot+'"/><path d="'+p.area+'" fill="url(#eg)"/><defs><linearGradient id="eg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a2c" stop-opacity=".28"/><stop offset="1" stop-color="#ff5a2c" stop-opacity="0"/></linearGradient></defs>';
  if(bj)s+='<rect x="'+bj.x1+'" y="'+p.top+'" width="'+(bj.x2-bj.x1)+'" height="'+(p.bot-p.top)+'" fill="#5b86c9" opacity="0.10"/><text class="zone-label" x="'+((bj.x1+bj.x2)/2)+'" y="'+(p.bot-6)+'" text-anchor="middle">'+(bj.label||'')+'</text>';
  s+='<path class="pline" d="'+p.line+'"/>';
  if(t)s+='<circle cx="'+t.x+'" cy="'+t.y+'" r="4.5" fill="#ff7a52"/><text class="peak-label" x="'+t.x+'" y="'+(t.y-10)+'" text-anchor="middle">'+(t.label||'')+'</text>';
  if(m)s+='<text class="peak-label" x="'+m.x+'" y="'+(m.y-14)+'" text-anchor="middle" fill="#ff4a30">'+(m.label||'')+'</text>';
  [g1,g2].forEach(function(g){if(!g)return;s+='<g class="marker"><circle class="glow" cx="'+g.x+'" cy="'+g.y+'" r="13"/><circle cx="'+g.x+'" cy="'+g.y+'" r="6"/><text class="mk-label" x="'+g.x+'" y="'+(g.y+26)+'" text-anchor="middle">'+(g.label||'')+'</text></g>';});
  return s+ticks+'</svg>';}
function nearestIdx(race,km){var tr=race.track;var lo=0,hi=tr.length-1;while(lo<hi){var mid=(lo+hi)>>1;if(tr[mid][0]<km)lo=mid+1;else hi=mid;}return lo;}
function routeSVG(race){var tr=race.track;var lat0=tr[0][1]*Math.PI/180;var cx=Math.cos(lat0);
  var xs=tr.map(function(p){return p[2]*cx;}),ys=tr.map(function(p){return -p[1];});
  var minx=Math.min.apply(null,xs),maxx=Math.max.apply(null,xs),miny=Math.min.apply(null,ys),maxy=Math.max.apply(null,ys);
  var W=1000,H=620,pad=60;var s=Math.min((W-2*pad)/((maxx-minx)||1),(H-2*pad)/((maxy-miny)||1));
  var ox=pad+((W-2*pad)-(maxx-minx)*s)/2,oy=pad+((H-2*pad)-(maxy-miny)*s)/2;
  race._proj=tr.map(function(p){return [ox+(p[2]*cx-minx)*s,oy+(-p[1]-miny)*s];});
  var d='M '+race._proj.map(function(q){return q[0].toFixed(1)+','+q[1].toFixed(1);}).join(' L ');
  var kmMarks='';var step=race.totalKm>25?5:2;
  for(var k=step;k<race.totalKm;k+=step){var i=nearestIdx(race,k);var q=race._proj[i];kmMarks+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="7" class="rt-km"/><text x="'+(q[0]+12)+'" y="'+(q[1]+5)+'" class="rt-kmlab">'+k+'</text>';}
  var st=race._proj[0];
  return '<svg class="route" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Trazado"><path d="'+d+'" class="rt-shadow"/><path d="'+d+'" class="rt-line"/>'+kmMarks+'<circle cx="'+st[0]+'" cy="'+st[1]+'" r="11" class="rt-start"/><text x="'+(st[0]+16)+'" y="'+(st[1]-10)+'" class="rt-lab">Salida</text><circle id="rt-dot-glow" cx="'+st[0]+'" cy="'+st[1]+'" r="22" class="rt-dotglow"/><circle id="rt-dot" cx="'+st[0]+'" cy="'+st[1]+'" r="11" class="rt-dot"/></svg>';}
function scrubSVG(race){var p=race.profile;return '<svg viewBox="0 0 '+p.viewBox[2]+' '+p.viewBox[3]+'" preserveAspectRatio="none"><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a2c" stop-opacity=".35"/><stop offset="1" stop-color="#ff5a2c" stop-opacity=".02"/></linearGradient></defs><path d="'+p.area+'" fill="url(#sg)"/><path d="'+p.line+'" class="sc-line"/><line id="sc-cursor" x1="0" y1="'+p.top+'" x2="0" y2="'+p.bot+'" class="sc-cursor"/><circle id="sc-dot" cx="0" cy="0" r="9" class="sc-dot"/></svg>';}
function initScrubber(race){var wrapEl=document.getElementById('scrub');if(!wrapEl)return;var p=race.profile,W=p.viewBox[2];
  var cursor=document.getElementById('sc-cursor'),dot=document.getElementById('sc-dot'),rdot=document.getElementById('rt-dot'),rglow=document.getElementById('rt-dot-glow');
  var o={};['km','ele','grad','gain','zone','pace','rest','eta'].forEach(function(k){o[k]=document.getElementById('o-'+k);});
  function yOf(e){return p.bot-(e-p.minEle)/((p.maxEle-p.minEle)||1)*(p.bot-p.top);}
  function update(km){km=Math.max(0,Math.min(race.totalKm,km));var i=nearestIdx(race,km),tr=race.track,pt=tr[i];var a=tr[Math.max(0,i-4)],b=tr[Math.min(tr.length-1,i+4)];var dist=(b[0]-a[0])*1000;var grad=dist>0?((b[3]-a[3])/dist*100):0;
    var x=km/race.totalKm*W,y=yOf(pt[3]);cursor.setAttribute('x1',x);cursor.setAttribute('x2',x);dot.setAttribute('cx',x);dot.setAttribute('cy',y);
    if(race._proj){var q=race._proj[i];rdot.setAttribute('cx',q[0]);rdot.setAttribute('cy',q[1]);rglow.setAttribute('cx',q[0]);rglow.setAttribute('cy',q[1]);}
    o.km.textContent=num(km);o.ele.textContent=pt[3].toLocaleString('es-ES');o.grad.textContent=(grad>0?'+':'')+grad.toFixed(0)+'%';o.grad.className='ov '+(grad>8?'up':grad<-8?'down':'flat');o.gain.textContent=pt[4];o.rest.textContent=num(race.totalKm-km);
    o.eta.textContent=fmtDur(etaAt(race,km));
    var z=zoneAt(race,km);if(z){var c=MODE[z[4]];o.zone.textContent=c[1];o.zone.style.color=c[0];o.pace.textContent=z[2]+' /km';}else{o.zone.textContent='-';o.pace.textContent='';}}
  function fromEvent(ev){var r=wrapEl.getBoundingClientRect();var cx=(ev.touches?ev.touches[0].clientX:ev.clientX);update((cx-r.left)/r.width*race.totalKm);}
  var down=false;wrapEl.addEventListener('touchstart',function(e){fromEvent(e);},{passive:true});wrapEl.addEventListener('touchmove',function(e){fromEvent(e);if(e.cancelable)e.preventDefault();},{passive:false});
  wrapEl.addEventListener('mousedown',function(e){down=true;fromEvent(e);});window.addEventListener('mousemove',function(e){if(down)fromEvent(e);});window.addEventListener('mouseup',function(){down=false;});
  [].forEach.call(document.querySelectorAll('[data-jump]'),function(b){b.addEventListener('click',function(){update(parseFloat(b.dataset.jump));});});
  var j=(race.jumps||[]);update(j[1]?j[1][1]:0);}

/* ---------- nav ---------- */
var HOME_ROUTES=['#/','#/progreso','#/ajustes'];
function homeNav(active){var it=[['inicio',I.home,'Inicio','#/'],['progreso',I.chart,'Progreso','#/progreso'],['ajustes',I.cog,'Ajustes','#/ajustes']];
  return '<nav class="bottomnav" id="nav"><span class="nav-ind"></span>'+it.map(function(x){return '<button class="navitem'+(active===x[0]?' active':'')+'" data-go="'+x[3]+'"><span class="ni-ic">'+x[1]+'</span><span class="ni-lb">'+x[2]+'</span></button>';}).join('')+'</nav>';}
function placeIndicator(){var nav=document.getElementById('nav');if(!nav)return;var act=nav.querySelector('.navitem.active');var ind=nav.querySelector('.nav-ind');if(!act||!ind)return;
  var r=act.getBoundingClientRect(),nr=nav.getBoundingClientRect();if(!r.width)return;
  ind.style.width=(r.width-16)+'px';ind.style.transform='translateX('+(r.left-nr.left+8)+'px)';ind.style.opacity='1';}
function buzz(){try{navigator.vibrate&&navigator.vibrate(8);}catch(e){}}
function initSwipe(el,onSwipe){if(!el)return;var x0=null,y0=null,dx=0,lock=null;
  el.addEventListener('touchstart',function(e){if(e.touches.length!==1)return;x0=e.touches[0].clientX;y0=e.touches[0].clientY;dx=0;lock=null;el.style.transition='none';},{passive:true});
  el.addEventListener('touchmove',function(e){if(x0==null)return;var t=e.touches[0];dx=t.clientX-x0;var dy=t.clientY-y0;
    if(lock===null&&(Math.abs(dx)>8||Math.abs(dy)>8))lock=Math.abs(dx)>Math.abs(dy)*1.25?'x':'y';
    if(lock==='x'){if(e.cancelable)e.preventDefault();el.style.transform='translateX('+(dx*0.4)+'px)';el.style.opacity=String(Math.max(.55,1-Math.abs(dx)/700));}},{passive:false});
  el.addEventListener('touchend',function(){if(x0==null)return;el.style.transition='transform .3s cubic-bezier(.22,.9,.3,1),opacity .3s';el.style.transform='';el.style.opacity='';
    if(lock==='x'&&Math.abs(dx)>55){buzz();onSwipe(dx<0?1:-1);}x0=null;lock=null;},{passive:true});
  el.addEventListener('touchcancel',function(){el.style.transition='';el.style.transform='';el.style.opacity='';x0=null;lock=null;},{passive:true});}
function initHomeNav(active){placeIndicator();setTimeout(placeIndicator,60);
  initSwipe(document.querySelector('.content'),function(dir){var i=HOME_ROUTES.indexOf(active==='inicio'?'#/':active==='progreso'?'#/progreso':'#/ajustes');var n=i+dir;if(n<0||n>=HOME_ROUTES.length)return;location.hash=HOME_ROUTES[n];});}
window.addEventListener('resize',function(){placeIndicator();});

/* ---------- stats helpers ---------- */
function adherence(race){var meals=getJ(KEYS(race.id).meals);var t=todayISO();var done=0,tot=0;race.days.forEach(function(x){if(x.w||!x.menu||x.iso>t)return;tot+=x.menu.length;var m=meals[x.iso]||{};done+=Object.keys(m).filter(function(k){return m[k];}).length;});return {done:done,tot:tot,pct:tot?Math.round(done/tot*100):0};}
function streak(race){var meals=getJ(KEYS(race.id).meals),logs=getJ(KEYS(race.id).log);var t=todayISO();var n=0;var iso=t;
  function ok(iso){var m=meals[iso]||{};var anyMeal=Object.keys(m).some(function(k){return m[k];});var l=logs[iso]||{};return anyMeal||!!l.hecho;}
  if(!ok(iso))iso=addDays(iso,-1);
  while(iso>=race.planStart&&ok(iso)){n++;iso=addDays(iso,-1);}return n;}
function weekStats(race){var logs=getJ(KEYS(race.id).log);var weeks=[];var cur=null;race.days.forEach(function(x){if(x.w){cur={label:x.w,plan:0,done:0,n:0,nd:0};weeks.push(cur);return;}if(!cur||!x.isTraining)return;cur.plan+=x.planKm;cur.n++;var l=logs[x.iso];if(l&&l.hecho){cur.done+=parseFloat(String(l.km).replace(',','.'))||0;cur.nd++;}});return weeks;}
function weekChart(weeks){var W=600,H=170,pad=28,bw=Math.min(70,(W-2*pad)/weeks.length-24);var max=Math.max.apply(null,weeks.map(function(w){return Math.max(w.plan,w.done);}).concat([1]));
  var s='<svg viewBox="0 0 '+W+' '+H+'" class="wchart">';
  weeks.forEach(function(w,i){var cxp=pad+(W-2*pad)/weeks.length*(i+.5);var hp=(H-50)*w.plan/max,hd=(H-50)*w.done/max;
    s+='<rect x="'+(cxp-bw/2)+'" y="'+(H-32-hp)+'" width="'+bw+'" height="'+hp+'" rx="8" class="wc-plan"/><rect x="'+(cxp-bw/2)+'" y="'+(H-32-hd)+'" width="'+bw+'" height="'+hd+'" rx="8" class="wc-done"/>';
    s+='<text x="'+cxp+'" y="'+(H-12)+'" text-anchor="middle" class="wc-lab">'+w.label.replace(/\s*·.*$/,'').replace('SEMANA','S')+'</text><text x="'+cxp+'" y="'+(H-38-Math.max(hp,hd))+'" text-anchor="middle" class="wc-val">'+num(w.done)+'/'+w.plan+'</text>';});
  return s+'</svg>';}
function sparkline(vals){if(vals.length<2)return '';var W=300,H=60,mn=Math.min.apply(null,vals),mx=Math.max.apply(null,vals);var rg=(mx-mn)||1;
  var pts=vals.map(function(v,i){return [(i/(vals.length-1))*(W-10)+5,H-8-(v-mn)/rg*(H-16)];});
  return '<svg viewBox="0 0 '+W+' '+H+'" class="spark"><polyline points="'+pts.map(function(p){return p[0].toFixed(1)+','+p[1].toFixed(1);}).join(' ')+'"/><circle cx="'+pts[pts.length-1][0]+'" cy="'+pts[pts.length-1][1]+'" r="4"/></svg>';}

/* ---------- HOME ---------- */
function renderHome(){clearTimer();
  var races=window.RACES.slice().sort(function(a,b){return a.date<b.date?-1:1;});var featured=featuredRace();var rest=races.filter(function(r){return r!==featured;});var P=window.PROFILE;
  var html='<div class="view"><header class="home-head"><div class="hh-row"><div><div class="kicker">Mi app de carreras</div><h1>Mis <span class="devil">carreras</span></h1></div>';
  if(featured){prep(featured);var sk=streak(featured);if(sk>0)html+='<div class="streak">'+I.fire+'<b>'+sk+'</b><span>racha</span></div>';}
  html+='</div><div class="meta">'+(P?P.peso+' &middot; trail':'trail')+'</div></header><div class="wrap content">';
  if(featured){var past=daysLeft(featured.date)<0,dl=daysLeft(featured.date),today=findToday(featured),res=resultOf(featured.id);
    html+='<div class="section-label">Hoy &middot; '+DIAS[new Date().getDay()]+' '+fmtShort(todayISO())+'</div>';
    if(dl===0){html+='<div class="today race-day"><div class="td-body"><div class="td-ent">'+I.carrera+' HOY ES EL DIA</div><div class="td-sub">'+featured.name+' &middot; salida '+featured.time+'</div><div class="td-actions"><button class="btn primary" data-go="#/race/'+featured.id+'/carrera">Modo carrera '+I.arrow+'</button><button class="btn" data-go="#/race/'+featured.id+'/mapa">Mapa</button></div></div></div>';}
    else if(past){html+='<div class="today"><div class="td-body"><div class="td-ent">'+featured.name+' hecha</div><div class="td-sub">'+(res?'<span class="ok">'+I.trophy+' '+esc(res.tiempo)+(res.puesto?' &middot; puesto '+esc(res.puesto):'')+'</span>':'Registra tu resultado para guardarlo en tu historial')+'</div><div class="td-actions"><button class="btn primary" data-go="#/race/'+featured.id+'/carrera">'+(res?'Ver resultado':'Anotar resultado')+' '+I.arrow+'</button></div></div></div>';}
    else if(today){var log=getJ(KEYS(featured.id).log)[today.iso]||{};var nm=nextMeal(today);
      html+='<div class="today"><span class="bar b-'+today.type+'"></span><div class="td-body"><div class="td-ent">'+today.ent+'</div><div class="td-sub"><span class="tag t-'+today.type+'">'+typeName[today.type]+'</span><span>'+(today.mac?today.mac.split(' \u00b7 ')[0]:'')+'</span>'+(log.hecho?'<span class="ok">'+I.check+' hecho'+(log.km?' '+log.km+' km':'')+'</span>':'')+'</div>'+
        (nm?'<div class="td-meal">'+I.food+'<div><div class="tm-h">Ahora toca &middot; '+esc(nm.it[0])+'</div><div class="tm-t">'+esc(nm.it[1])+'</div></div></div>':'<div class="td-meal"><div class="tm-h">Comidas de hoy hechas</div></div>')+
        '<div class="td-actions"><button class="btn primary" data-go="#/race/'+featured.id+'/dias/'+today.iso+'">Comidas de hoy '+I.arrow+'</button>'+(today.isTraining?'<button class="btn" data-go="#/race/'+featured.id+'/dias/'+today.iso+'/log">'+(log.hecho?'Ver entreno':'Registrar entreno')+'</button>':'')+'</div></div></div>';}
    else{html+='<div class="today"><div class="td-body"><div class="td-ent">Sin plan para hoy</div><div class="td-sub">'+(todayISO()<featured.planStart?'El plan de '+featured.name+' empieza el '+fmtShort(featured.planStart):'Dia libre')+'</div></div></div>';}
    html+='<div class="section-label">'+(past?'Ultima carrera':'Proxima carrera')+'</div><a class="hero-card" href="#/race/'+featured.id+'"><div class="hc-media">'+heroProfile(featured.profile,'')+'<div class="hc-fade"></div><span class="hc-tag">'+(featured.kind||'Trail')+' &middot; '+featured.gain+'</span><span class="hc-cd'+(past?' past':'')+'">'+(past?(res?I.trophy+' '+esc(res.tiempo):'hecha'):'faltan '+cd(featured.date))+'</span><div class="hc-body"><div class="hc-name">'+featured.name+'</div><div class="hc-sub">'+featured.subtitle+' &middot; '+fmtDate(featured.date)+', '+featured.time+'</div></div></div><div class="hc-stats"><div class="s"><div class="sv ember">'+featured.km+'</div><div class="sl">km</div></div><div class="s"><div class="sv ember">'+featured.dplus+'</div><div class="sl">metros +</div></div><div class="s"><div class="sv">'+featured.estimate+'</div><div class="sl">objetivo</div></div></div></a>'+
      '<div class="quick"><button class="qbtn" data-go="#/race/'+featured.id+'/mapa">'+I.mapa+'<span>Mapa</span></button><button class="qbtn" data-go="#/race/'+featured.id+'/ritmos">'+I.ritmos+'<span>Ritmos</span></button><button class="qbtn" data-go="#/race/'+featured.id+'/carrera">'+I.carrera+'<span>Dia D</span></button><button class="qbtn" data-go="#/progreso">'+I.chart+'<span>Progreso</span></button></div>';}
  if(rest.length){html+='<div class="section-label">Otras carreras</div>';rest.forEach(function(r){var past=daysLeft(r.date)<0;var rs=resultOf(r.id);html+='<a class="minicard" href="#/race/'+r.id+'"><span class="mc-mini">'+miniProfile(r.profile)+'</span><span><span class="mc-n">'+r.name+'</span><span class="mc-d">'+fmtDate(r.date)+' &middot; '+r.dist+' &middot; '+r.gain+'</span></span><span class="mc-cd">'+(past?(rs?I.trophy+' '+esc(rs.tiempo):'hecha'):'faltan '+cd(r.date))+'</span></a>';});}
  if(!races.length)html+='<div class="card"><p class="lead" style="margin:0">Aun no hay carreras. Pasale a Claude un GPX y una fecha para anadir la primera.</p></div>';
  html+='</div>'+homeNav('inicio')+'</div>';app().innerHTML=html;window.scrollTo(0,0);initHomeNav('inicio');}

/* ---------- PROGRESO ---------- */
function renderProgreso(){clearTimer();var race=featuredRace();var P=window.PROFILE||{};
  var html='<div class="view"><header class="home-head"><div class="kicker">Seguimiento</div><h1>Mi <span class="devil">progreso</span></h1>';
  if(!race){html+='</header><div class="wrap content"><div class="card"><p class="lead" style="margin:0">Sin carreras aun.</p></div></div>'+homeNav('progreso')+'</div>';app().innerHTML=html;initHomeNav('progreso');return;}
  prep(race);var logs=getJ(KEYS(race.id).log);var weeks=weekStats(race);var tp=0,td=0,np=0,nd=0;weeks.forEach(function(w){tp+=w.plan;td+=w.done;np+=w.n;nd+=w.nd;});
  var ad=adherence(race),sk=streak(race);
  html+='<div class="meta">'+race.name+' &middot; '+nd+'/'+np+' sesiones</div></header><div class="wrap content">';
  html+='<div class="summary"><div class="sm"><div class="sv">'+num(td)+'</div><div class="sl">km hechos</div></div><div class="sm"><div class="sv ember">'+(tp?Math.round(td/tp*100):0)+'%</div><div class="sl">del plan ('+tp+' km)</div></div><div class="sm"><div class="sv gold">'+ad.pct+'%</div><div class="sl">dieta cumplida</div></div></div>';
  html+='<div class="card chart-card"><div class="cc-h">'+I.chart+' Km por semana <span>hecho / plan</span></div>'+weekChart(weeks)+'</div>';
  html+='<div class="row2"><div class="card mini"><div class="cc-h">'+I.fire+' Racha</div><div class="big">'+sk+'<small> dias</small></div><div class="pf-note" style="margin-top:2px">Dias seguidos marcando comidas o entreno</div></div>';
  /* weight */
  var wt=getJ('weight');var isos=Object.keys(wt).sort();var vals=isos.map(function(k){return parseFloat(wt[k]);});var target=parseFloat(String(P.peso||'').replace(',','.'))||null;var last=vals.length?vals[vals.length-1]:null;var tIso=todayISO();
  html+='<div class="card mini"><div class="cc-h">'+I.scale+' Peso</div><div class="big">'+(last!=null?num(last)+'<small> kg</small>':'<small>sin datos</small>')+'</div>'+(vals.length>1?'<div class="pf-note" style="margin-top:2px">'+(vals[vals.length-1]-vals[0]>0?'+':'')+num(vals[vals.length-1]-vals[0])+' kg desde el inicio'+(target?' &middot; objetivo '+num(target):'')+'</div>':'<div class="pf-note" style="margin-top:2px">'+(target?'Objetivo '+num(target)+' kg':'')+'</div>')+'</div></div>';
  html+='<div class="card"><div class="wt-row"><input type="text" inputmode="decimal" id="wt-in" placeholder="'+(last!=null?num(last):'60,0')+'" value="'+(wt[tIso]?esc(wt[tIso]):'')+'"><span class="wt-u">kg hoy</span><button class="btn primary sm" id="wt-save">Guardar</button></div>'+sparkline(vals.slice(-14))+(isos.length?'<div class="pf-note">'+isos.length+' registros &middot; ultimo '+fmtShort(isos[isos.length-1])+'</div>':'')+'</div>';
  /* sessions */
  var week=null,wHtml='';function flush(){if(!week)return;html+='<div class="section-label">'+week.label+' <span class="wk">'+num(week.done)+' / '+week.plan+' km</span></div><div class="wbar"><div style="width:'+(week.plan?Math.min(100,week.done/week.plan*100):0)+'%"></div></div>'+wHtml;}
  var wi=-1;race.days.forEach(function(x){if(x.w){flush();wi++;week=weeks[wi];wHtml='';return;}if(!x.isTraining&&!x.race)return;var l=logs[x.iso]||{};var done=!!l.hecho;var isT=daysLeft(x.iso)===0;
    wHtml+='<button class="sess'+(done?' done':'')+(isT?' today':'')+'" data-go="#/race/'+race.id+'/dias/'+x.iso+(x.race?'':'/log')+'"><span class="bar b-'+x.type+'"></span><span class="date"><span class="d">'+x.d+'</span><span class="m">'+x.m+'</span></span><span class="mid"><span class="ent">'+(x.race?'CARRERA &middot; '+race.name:x.ent)+'</span><span class="kc">'+(done?(l.km?l.km+' km':'')+(l.tiempo?' &middot; '+l.tiempo:'')+(l.km&&l.tiempo?' &middot; '+fmtPace(parseTime(l.tiempo),parseFloat(String(l.km).replace(',','.'))):''):(x.race?'Dia D':'Pendiente &middot; '+x.planKm+' km'))+'</span></span><span class="st">'+(done?'<span class="ok">'+I.check+'</span>':I.arrow)+'</span></button>';});
  flush();
  html+='<button class="btn wide-btn" id="share-prog">'+I.share+' Compartir resumen</button></div>'+homeNav('progreso')+'</div>';app().innerHTML=html;window.scrollTo(0,0);initHomeNav('progreso');
  document.getElementById('wt-save').addEventListener('click',function(){var v=parseFloat(document.getElementById('wt-in').value.replace(',','.'));if(!v)return;var W=getJ('weight');W[todayISO()]=v;setJ('weight',W);toast('Peso guardado');renderProgreso();});
  document.getElementById('share-prog').addEventListener('click',function(){var txt='Progreso '+race.name+': '+num(td)+'/'+tp+' km ('+(tp?Math.round(td/tp*100):0)+'%), dieta '+ad.pct+'%, racha '+sk+' dias.';share('Mi progreso',txt);});}
function share(title,text){if(navigator.share){navigator.share({title:title,text:text}).catch(function(){});}else if(navigator.clipboard){navigator.clipboard.writeText(text).then(function(){toast('Copiado al portapapeles');});}else{toast(text);}}

/* ---------- AJUSTES ---------- */
function renderAjustes(){clearTimer();var P=window.PROFILE||{};var chips=function(a,c){return (a||[]).map(function(x){return '<span class="chip'+(c?' '+c:'')+'">'+x+'</span>';}).join('');};var race=featuredRace();
  var html='<div class="view"><header class="home-head"><div class="kicker">Configuracion</div><h1>Mis <span class="devil">ajustes</span></h1><div class="meta">Version '+VERSION+'</div></header><div class="wrap content">'+
    '<div class="section-label">Mi perfil</div><div class="card"><div class="pf-row"><span>Peso objetivo</span><b>'+(P.peso||'-')+'</b></div>'+(P.comidas?'<div class="pf-blk"><div class="pf-h">HORARIOS</div>'+chips(P.comidas)+'</div>':'')+(P.noGusta?'<div class="pf-blk"><div class="pf-h">NO ME GUSTA</div>'+chips(P.noGusta,'no')+'</div>':'')+(P.reglas?'<div class="pf-blk"><div class="pf-h">REGLAS</div>'+chips(P.reglas)+'</div>':'')+'<p class="pf-note">Cada dieta nueva respeta esto. Se edita en profile.js.</p></div>'+
    '<div class="section-label">Calendario y datos</div><div class="card">'+(race?'<button class="row-btn" id="ics">'+I.cal+'<span>Exportar plan al Calendario (.ics)</span>'+I.arrow+'</button>':'')+'<button class="row-btn" id="bk">'+I.down+'<span>Copia de seguridad (descargar)</span>'+I.arrow+'</button><label class="row-btn">'+I.up+'<span>Restaurar copia</span><input type="file" id="rs" accept="application/json,.json" hidden>'+I.arrow+'</label></div>'+
    '<div class="section-label">Reiniciar</div><div class="card"><button class="row-btn" data-reset="checks"><span>Checks del dia de carrera</span>'+I.arrow+'</button><button class="row-btn" data-reset="meals"><span>Casillas de comidas</span>'+I.arrow+'</button><button class="row-btn" data-reset="gear"><span>Lista de material</span>'+I.arrow+'</button><button class="row-btn danger" data-reset="log"><span>Registro de entrenos y peso</span>'+I.arrow+'</button></div>'+
    '<div class="section-label">Anadir carrera</div><div class="card"><p class="pf-note" style="margin:0">Pasale a Claude el GPX y la fecha. Te devuelve un archivo <b>races/nombre.js</b>: lo subes al repo, anades su nombre en <b>races/registry.js</b> y subes la version del service worker. Aparece sola aqui.</p></div>'+
    '<p class="foot">Mis carreras v'+VERSION+' &middot; PWA hecha para Ruben</p></div>'+homeNav('ajustes')+'</div>';
  app().innerHTML=html;window.scrollTo(0,0);initHomeNav('ajustes');
  [].forEach.call(document.querySelectorAll('[data-reset]'),function(b){b.addEventListener('click',function(){var what=b.dataset.reset;var msg={checks:'Reiniciar los checks del dia de carrera?',meals:'Reiniciar las casillas de comidas?',gear:'Reiniciar la lista de material?',log:'Borrar TODO el registro de entrenos y peso? No se puede deshacer.'}[what];if(!confirm(msg))return;
    window.RACES.forEach(function(r){var K=KEYS(r.id);try{store&&store.removeItem({checks:K.checks,meals:K.meals,gear:K.gear,log:K.log}[what]);}catch(e){}});if(what==='log'){try{store&&store.removeItem('weight');}catch(e){}}toast('Hecho');});});
  var ics=document.getElementById('ics');if(ics)ics.addEventListener('click',function(){downloadText('plan-'+race.id+'.ics',buildICS(race),'text/calendar');toast('Calendario generado. Abrelo y anade los eventos.');});
  document.getElementById('bk').addEventListener('click',function(){var data={v:VERSION,at:new Date().toISOString(),items:{}};if(store){for(var i=0;i<store.length;i++){var k=store.key(i);if(/^(log-|meals-|cdd-checks-|gear-|result-|race-|weight$)/.test(k))data.items[k]=store.getItem(k);}}downloadText('mis-carreras-backup.json',JSON.stringify(data,null,2),'application/json');});
  document.getElementById('rs').addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){try{var d=JSON.parse(rd.result);Object.keys(d.items||{}).forEach(function(k){store&&store.setItem(k,d.items[k]);});toast('Copia restaurada');setTimeout(function(){location.hash='#/';},600);}catch(err){toast('Archivo no valido');}};rd.readAsText(f);});}
function downloadText(name,text,mime){var b=new Blob([text],{type:mime});var u=URL.createObjectURL(b);var a=document.createElement('a');a.href=u;a.download=name;document.body.appendChild(a);a.click();setTimeout(function(){document.body.removeChild(a);URL.revokeObjectURL(u);},800);}
function buildICS(race){prep(race);var L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Mis carreras//ES','CALSCALE:GREGORIAN'];function dt(iso){return iso.replace(/-/g,'');}function dtt(iso,hm){return iso.replace(/-/g,'')+'T'+hm.replace(':','')+'00';}function ev(uid,lines){L.push('BEGIN:VEVENT','UID:'+uid+'@miscarreras','DTSTAMP:'+new Date().toISOString().replace(/[-:]/g,'').split('.')[0]+'Z');lines.forEach(function(l){L.push(l);});L.push('END:VEVENT');}
  race.days.forEach(function(x){if(x.w||x.race)return;var kcal=x.mac?x.mac.split(' \u00b7 ')[0]:'';ev(race.id+'-'+x.iso,['DTSTART;VALUE=DATE:'+dt(x.iso),'DTEND;VALUE=DATE:'+dt(addDays(x.iso,1)),'SUMMARY:'+(x.isTraining?'\uD83C\uDFC3 ':'')+x.ent+' ('+typeName[x.type]+')','DESCRIPTION:Dia '+typeName[x.type]+' '+kcal+'. Abre la app para ver las comidas.']);});
  var h=race.time.split(':');var end=String(parseInt(h[0],10)+2).padStart(2,'0')+':'+h[1];
  ev(race.id+'-race',['DTSTART:'+dtt(race.date,race.time),'DTEND:'+dtt(race.date,end),'SUMMARY:\uD83C\uDFC1 '+race.name+' ('+race.dist+' / '+race.gain+')','LOCATION:'+race.subtitle,'DESCRIPTION:Objetivo '+race.objective.replace(/&[a-z]+;/g,'-')+'. Modo carrera en la app.','BEGIN:VALARM','TRIGGER:-PT12H','ACTION:DISPLAY','DESCRIPTION:Manana carrera: prepara el material','END:VALARM','BEGIN:VALARM','TRIGGER:-PT3H','ACTION:DISPLAY','DESCRIPTION:Desayuno de carrera','END:VALARM']);
  (race.raceDay.pre||[]).forEach(function(it,i){var m=String(it[0]).match(/(\d{1,2}):(\d{2})/);if(!m)return;var hm=m[1].padStart(2,'0')+':'+m[2];ev(race.id+'-pre'+i,['DTSTART:'+dtt(race.date,hm),'DTEND:'+dtt(race.date,hm),'SUMMARY:\uD83C\uDF4C '+it[1].split(':')[0],'DESCRIPTION:'+it[1],'BEGIN:VALARM','TRIGGER:-PT0M','ACTION:DISPLAY','DESCRIPTION:'+it[1],'END:VALARM']);});
  L.push('END:VCALENDAR');return L.join('\r\n');}

/* ---------- RACE ---------- */
var DEFAULT_GEAR=["Dorsal e imperdibles / chip","Geles (uno con cafeina)","Bidon con isotonica","Reloj cargado","Zapatillas (las de siempre)","Ropa segun el tiempo + cortavientos","Gorra y gafas","Desayuno preparado","Recuperador para la meta","Ropa de cambio y toalla","Coche con gasolina, salir con margen"];
function renderRace(race,tab,focusIso,openLog){clearTimer();prep(race);tab=tab||'dias';var past=daysLeft(race.date)<0,dl=daysLeft(race.date);var K=KEYS(race.id);var res=resultOf(race.id);var jumps=race.jumps||[["Salida",0],["Meta",race.totalKm]];
  var html='<div class="view"><div class="topbar" id="topbar"><button class="tb-back" data-go="#/">'+I.back+'</button><span class="tb-title">'+race.name+'</span></div><button class="backfab" data-go="#/" aria-label="Volver">'+I.back+'</button><div class="cd-pill'+(past?' past':'')+'">'+(past?(res?I.trophy+' '+esc(res.tiempo):'hecha'):'faltan '+cd(race.date))+'</div>'+
    '<div class="rhero">'+heroProfile(race.profile,'rhero-svg')+'<div class="rhero-fade"></div><div class="rhero-body"><div class="rhero-kick">'+(race.kind||'Trail')+' &middot; plan de carrera</div><div class="rhero-title">'+(race.nameHTML||race.name)+'</div><div class="rhero-sub">'+race.subtitle+' &middot; <b>'+fmtDate(race.date)+', '+race.time+'</b></div></div></div>'+
    '<div class="stats"><div class="stat"><div class="n ember">'+race.km+'</div><div class="l">km</div></div><div class="stat"><div class="n ember">'+race.dplus+'</div><div class="l">metros +</div></div><div class="stat"><div class="n">'+race.estimate+'</div><div class="l">objetivo</div></div></div>'+
    '<div class="content wrap">'+
    '<section class="panel" id="dias"><div class="readout">'+race.readout+'</div><p class="lead">Toca un dia: comidas con casillas y, si hay entreno, el registro de tiempos.</p><div class="legend"><span><i class="dot hc"></i>Hidratos</span><span><i class="dot pr"></i>Proteina</span><span><i class="dot gr"></i>Grasa buena</span><span><i class="dot fi"></i>Fibra</span></div><div id="daylist"></div></section>'+
    '<section class="panel" id="mapa"><p class="lead">Arrastra el dedo por el perfil: altura, pendiente, zona de ritmo y hora prevista de paso. El punto del trazado se mueve contigo.</p><div class="card route-card">'+routeSVG(race)+'</div><div class="scrub-card"><div id="scrub" class="scrub">'+scrubSVG(race)+'</div>'+
      '<div class="out"><div class="ob big"><span class="ok2">km</span><b id="o-km">0</b></div><div class="ob big"><b id="o-ele">0</b><span class="ok2">m</span></div><div class="ob"><span class="ok2">pendiente</span><b id="o-grad" class="ov">0%</b></div><div class="ob"><span class="ok2">D+ acum.</span><b id="o-gain">0</b></div><div class="ob"><span class="ok2">paso previsto</span><b id="o-eta">0:00</b></div><div class="ob"><span class="ok2">quedan</span><b id="o-rest">0</b><span class="ok2">km</span></div><div class="ob wide"><span class="ok2">zona</span><b id="o-zone">-</b><span id="o-pace" class="ok2"></span></div></div>'+
      '<div class="jumps">'+jumps.map(function(j){return '<button class="jbtn" data-jump="'+j[1]+'">'+j[0]+'</button>';}).join('')+'</div></div><p class="lead" style="font-size:12.5px">Paso previsto = tiempo de carrera acumulado segun tus ritmos por tramo. Pendiente sobre ~250 m.</p></section>'+
    '<section class="panel" id="ritmos"><div class="profile-card">'+buildProfileSVG(race.profile)+'</div><div class="obj"><div class="t">OBJETIVO</div><div class="n"><b>'+race.objective+'</b></div><div class="s">'+race.objectiveNote+'</div></div><div id="strip" class="strip"></div><div class="striplab"><span>km 0</span><span>km '+Math.round(race.totalKm/2)+'</span><span>km '+Math.round(race.totalKm)+'</span></div><div id="zones"></div><div class="phase">A vigilar</div><div id="warns"></div>'+(race.terrainNote?'<p class="lead" style="margin-top:12px">'+race.terrainNote+'</p>':'')+'</section>'+
    '<section class="panel raceday" id="carrera"><div id="racemode"></div><p class="lead">Salida '+race.time+', objetivo '+race.estimate+'. ~50-60 g de hidratos por hora. Marca cada paso.</p><div class="phase">Antes</div><div id="pre"></div><div class="tactic"><div class="th">Tactica ligada al perfil</div>'+race.raceDay.tactic+'</div><div class="phase">Durante ('+race.time+')</div><div id="dur"></div><div class="phase">Meta y recuperacion</div><div id="post"></div>'+
      '<div class="phase">'+I.bag+' Que llevar</div><div id="gear"></div>'+
      '<div class="phase">'+I.trophy+' Mi resultado</div><div class="card"><div class="lb-grid"><label>Tiempo<input type="text" inputmode="numeric" id="r-t" value="'+esc(res?res.tiempo:'')+'" placeholder="h:mm:ss"></label><label>Puesto<input type="text" id="r-p" value="'+esc(res?res.puesto:'')+'" placeholder="2º / 15º cat"></label><label class="wide">Notas<input type="text" id="r-n" value="'+esc(res?res.notas:'')+'" placeholder="Como fue, sensaciones, que repetir..."></label></div><div class="lb-foot"><span class="lb-pace" id="r-pace">'+(res&&res.tiempo?fmtPace(parseTime(res.tiempo),race.totalKm):'')+'</span><button class="btn sm" id="r-share">'+I.share+'</button><button class="btn primary sm" id="r-save">Guardar</button></div></div>'+
      '<p class="foot">Cantidades para '+(window.PROFILE?window.PROFILE.peso:'tu peso')+'. Ajusta al hambre real.</p></section>'+
    '</div><nav class="bottomnav" id="nav"><span class="nav-ind"></span>'+[['dias',I.dias,'Dias'],['mapa',I.mapa,'Mapa'],['ritmos',I.ritmos,'Ritmos'],['carrera',I.carrera,'Carrera']].map(function(t){return '<button class="navitem" data-tab="'+t[0]+'"><span class="ni-ic">'+t[1]+'<i class="ni-dot"></i></span><span class="ni-lb">'+t[2]+'</span></button>';}).join('')+'</nav></div>';
  app().innerHTML=html;window.scrollTo(0,0);

  /* days */
  var dlEl=document.getElementById('daylist');var meals=getJ(K.meals);var logs=getJ(K.log);var focusEl=null;
  race.days.forEach(function(x){if(x.w){var h=document.createElement('div');h.className='week';h.textContent=x.w;dlEl.appendChild(h);return;}
    var el=document.createElement('div');el.className='acc'+(x.race?' race':'');el.dataset.open="0";el.id='day-'+x.iso;var mC=meals[x.iso]||{};var nM=x.menu?x.menu.length:0;var nC=Object.keys(mC).filter(function(k){return mC[k];}).length;var lg=logs[x.iso]||{};var isT=daysLeft(x.iso)===0;
    function kcTxt(){var m=getJ(K.meals)[x.iso]||{};var n=Object.keys(m).filter(function(k){return m[k];}).length;var l=getJ(K.log)[x.iso]||{};return (x.race?'Plan de carrera aparte':x.mac.split(' \u00b7 ')[0])+(n?' &middot; comidas '+n+'/'+nM:'')+(l.hecho?' &middot; <span class="ok">entreno hecho</span>':'');}
    var head='<button aria-expanded="false"><span class="bar b-'+x.type+'"></span><span class="date"><span class="d">'+x.d+'</span><span class="m">'+x.m+'</span></span><span class="mid"><span class="ent">'+x.ent+(isT?' <span class="today-chip">HOY</span>':'')+'</span><br><span class="kc">'+kcTxt()+'</span></span><span class="tag t-'+x.type+'">'+typeName[x.type]+'</span><span class="chev">\u203a</span></button>';
    if(x.race){el.innerHTML=head+'<div class="body"><div class="body-in"><p style="font-size:13px;color:#cdd4df;margin:6px 0">El dia de carrera tiene su plan en la pestana <b style="color:var(--ember-soft)">Carrera</b>.</p></div></div>';el.querySelector('button').addEventListener('click',function(){switchTab('carrera');});dlEl.appendChild(el);return;}
    var rows=x.menu.map(function(it,i){return '<label class="meal mchk"><input type="checkbox" data-mi="'+i+'"'+(mC[i]?' checked':'')+'><span class="mtxt"><span class="when">'+it[0]+'</span><span class="what">'+it[1]+'</span>'+(it[2].length?'<span class="dots">'+it[2].map(function(d){return '<i class="dot '+d+'"></i>';}).join('')+'</span>':'')+'</span></label>';}).join('');
    if(x.tip)rows+='<div class="tip">'+x.tip+'</div>';var mac=x.mac.split(' \u00b7 ').map(function(pp){return '<span><b>'+pp+'</b></span>';}).join('');
    var logHtml=x.isTraining?'<div class="logbox"><div class="lb-h">'+I.log+' Mi entreno &middot; previsto '+x.planKm+' km</div><div class="lb-grid"><label>Km<input type="text" inputmode="decimal" data-f="km" value="'+esc(lg.km||'')+'" placeholder="'+x.planKm+'"></label><label>Tiempo<input type="text" inputmode="numeric" data-f="tiempo" value="'+esc(lg.tiempo||'')+'" placeholder="mm:ss"></label><label class="wide">Notas<input type="text" data-f="notas" value="'+esc(lg.notas||'')+'" placeholder="Sensaciones, terreno..."></label></div><div class="lb-foot"><span class="lb-pace">'+(lg.km&&lg.tiempo?fmtPace(parseTime(lg.tiempo),parseFloat(String(lg.km).replace(',','.'))):'')+'</span><label class="lb-done"><input type="checkbox" data-f="hecho"'+(lg.hecho?' checked':'')+'><span>Hecho</span></label><button class="btn primary sm" data-save="1">Guardar</button></div></div>':'';
    el.innerHTML=head+'<div class="body"><div class="body-in"><div class="macrobar">'+mac+'</div>'+rows+logHtml+'</div></div>';
    var b=el.querySelector('button'),body=el.querySelector('.body');function setOpen(o){el.dataset.open=o?"1":"0";b.setAttribute('aria-expanded',String(o));body.style.maxHeight=o?body.scrollHeight+"px":null;}b.addEventListener('click',function(){setOpen(el.dataset.open!=="1");});el._setOpen=setOpen;
    [].forEach.call(el.querySelectorAll('input[data-mi]'),function(inp){inp.addEventListener('change',function(){var m=getJ(K.meals);m[x.iso]=m[x.iso]||{};m[x.iso][inp.dataset.mi]=inp.checked;setJ(K.meals,m);el.querySelector('.kc').innerHTML=kcTxt();});});
    var sv=el.querySelector('[data-save]');if(sv){var box=el.querySelector('.logbox');function recalc(){var km=parseFloat(box.querySelector('[data-f=km]').value.replace(',','.')),t=parseTime(box.querySelector('[data-f=tiempo]').value);box.querySelector('.lb-pace').textContent=(km&&t)?fmtPace(t,km):'';body.style.maxHeight=body.scrollHeight+'px';}
      [].forEach.call(box.querySelectorAll('input[data-f=km],input[data-f=tiempo]'),function(i){i.addEventListener('input',recalc);});
      sv.addEventListener('click',function(){var Lg=getJ(K.log);Lg[x.iso]={km:box.querySelector('[data-f=km]').value,tiempo:box.querySelector('[data-f=tiempo]').value,notas:box.querySelector('[data-f=notas]').value,hecho:box.querySelector('[data-f=hecho]').checked};setJ(K.log,Lg);sv.textContent='Guardado';sv.classList.add('saved');setTimeout(function(){sv.textContent='Guardar';sv.classList.remove('saved');},1200);el.querySelector('.kc').innerHTML=kcTxt();toast('Entreno guardado');});}
    dlEl.appendChild(el);if(focusIso&&x.iso===focusIso)focusEl=el;});

  /* ritmos */
  var zc=document.getElementById('zones');race.zones.forEach(function(z){var c=MODE[z[4]][0];var el=document.createElement('div');el.className='zone';el.innerHTML='<span class="zbar" style="background:'+c+'"></span><span class="zkm">'+z[0]+'<small style="color:'+c+'">'+MODE[z[4]][1]+'</small></span><span class="zmid"><span class="zter">'+z[1]+'</span><span class="zcue">'+z[3]+'</span></span><span class="zpace"><span class="p">'+z[2]+'</span> <span class="u">/km</span></span>';zc.appendChild(el);});
  var st=document.getElementById('strip');var segTot=race.segs.reduce(function(a,s){return a+s[0];},0)||race.totalKm;race.segs.forEach(function(sg){var d=document.createElement('div');d.style.width=(sg[0]/segTot*100)+'%';d.style.background=MODE[sg[1]][0];st.appendChild(d);});
  var wc=document.getElementById('warns');race.warns.forEach(function(w,i){var el=document.createElement('div');el.className='check';el.style.cursor='default';el.innerHTML='<span class="num">'+(i+1)+'</span><span class="txt"><span class="t-what">'+w+'</span></span>';wc.appendChild(el);});

  /* carrera: checks, gear, result */
  var saved=getJ(K.checks);function fill(id,arr,pfx){var c=document.getElementById(id);arr.forEach(function(it,i){var k=pfx+i;var l=document.createElement('label');l.className='check'+(it[2]?' fuel':'');l.innerHTML='<input type="checkbox"><span class="txt"><span class="t-when">'+it[0]+'</span><span class="t-what">'+it[1]+'</span></span>';var inp=l.querySelector('input');if(saved[k])inp.checked=true;inp.addEventListener('change',function(){saved[k]=inp.checked;setJ(K.checks,saved);});c.appendChild(l);});}
  fill('pre',race.raceDay.pre,'a');fill('dur',race.raceDay.dur,'b');fill('post',race.raceDay.post,'c');
  var gear=getJ(K.gear);var gl=document.getElementById('gear');(race.gear||DEFAULT_GEAR).forEach(function(g,i){var l=document.createElement('label');l.className='check';l.innerHTML='<input type="checkbox"'+(gear[i]?' checked':'')+'><span class="txt"><span class="t-what">'+g+'</span></span>';l.querySelector('input').addEventListener('change',function(e){gear[i]=e.target.checked;setJ(K.gear,gear);});gl.appendChild(l);});
  var rt=document.getElementById('r-t');rt.addEventListener('input',function(){document.getElementById('r-pace').textContent=fmtPace(parseTime(rt.value),race.totalKm);});
  document.getElementById('r-save').addEventListener('click',function(){var R={tiempo:rt.value.trim(),puesto:document.getElementById('r-p').value.trim(),notas:document.getElementById('r-n').value.trim()};setJ(K.result,R);toast('Resultado guardado');var pill=document.querySelector('.cd-pill');if(pill&&R.tiempo&&past)pill.innerHTML=I.trophy+' '+esc(R.tiempo);});
  document.getElementById('r-share').addEventListener('click',function(){var R=getJ(K.result);share(race.name,race.name+' ('+race.dist+' / '+race.gain+'): '+(R.tiempo||rt.value||'-')+(R.puesto?', puesto '+R.puesto:'')+'.');});
  renderRaceMode(race);

  /* tabs */
  var TABS=['dias','mapa','ritmos','carrera'];
  var items=[].slice.call(document.querySelectorAll('.navitem[data-tab]'));var panels={dias:document.getElementById('dias'),mapa:document.getElementById('mapa'),ritmos:document.getElementById('ritmos'),carrera:document.getElementById('carrera')};var scrubInit=false;var curTab=null;
  window.switchTab=function(name,noScroll){if(name===curTab&&!noScroll)return;
    var dir=(curTab==null)?0:(TABS.indexOf(name)>TABS.indexOf(curTab)?1:-1);curTab=name;
    items.forEach(function(t){t.classList.toggle('active',t.dataset.tab===name);});
    Object.keys(panels).forEach(function(k){var p=panels[k];p.classList.remove('slide-r','slide-l');p.classList.toggle('on',k===name);});
    if(dir){panels[name].classList.add(dir>0?'slide-r':'slide-l');}
    if(name==='mapa'&&!scrubInit){scrubInit=true;initScrubber(race);}
    placeIndicator();
    var h='#/race/'+race.id+(name==='dias'?'':'/'+name);if(location.hash!==h){history.replaceState(null,'',h);}
    if(!noScroll)window.scrollTo({top:0,behavior:'smooth'});};
  items.forEach(function(t){t.addEventListener('click',function(){buzz();switchTab(t.dataset.tab);});});switchTab(tab,true);
  setTimeout(placeIndicator,60);
  initSwipe(document.querySelector('.content'),function(d){var i=TABS.indexOf(curTab)+d;if(i<0||i>=TABS.length)return;switchTab(TABS[i]);});
  /* nav dots */
  (function(){var t=todayISO();var td=race.days.filter(function(x){return !x.w&&x.iso===t;})[0];
    if(td&&td.menu){var m=getJ(K.meals)[t]||{};var n=Object.keys(m).filter(function(k){return m[k];}).length;
      if(n<td.menu.length){var b=items[0].querySelector('.ni-dot');b&&b.classList.add('on');}}
    if(daysLeft(race.date)===0){var c=items[3].querySelector('.ni-dot');c&&c.classList.add('on');}})();
  /* iOS-style top bar on scroll */
  (function(){var tb=document.getElementById('topbar');if(!tb)return;var f=false;
    window.addEventListener('scroll',function(){var s=window.scrollY>170;if(s!==f){f=s;tb.classList.toggle('show',s);}},{passive:true});})();
  if(focusEl){focusEl._setOpen&&focusEl._setOpen(true);setTimeout(function(){focusEl.scrollIntoView({behavior:'smooth',block:'start'});if(openLog){var inp=focusEl.querySelector('.logbox input');inp&&inp.focus();}},120);}
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches){var hl=document.querySelector('.rhero-svg .hp-line');if(hl&&hl.getTotalLength){try{var len=hl.getTotalLength();hl.style.strokeDasharray=len;hl.style.strokeDashoffset=len;requestAnimationFrame(function(){hl.style.transition='stroke-dashoffset 1.4s ease';hl.style.strokeDashoffset=0;});}catch(e){}}}}

/* ---------- RACE MODE (dia D) ---------- */
function renderRaceMode(race){var box=document.getElementById('racemode');if(!box)return;var K=KEYS(race.id);var dl=daysLeft(race.date);var RM=getJ(K.race);
  var startAt=new Date(race.date+'T'+race.time+':00').getTime();
  function fuelList(){return (race.raceDay.dur||[]).map(function(it){var m=String(it[0]).match(/km\s*(\d+(?:[.,]\d+)?)/i);return m?{km:parseFloat(m[1].replace(',','.')),label:it[1].split('.')[0]}:null;}).filter(Boolean);}
  function draw(){var now=Date.now();
    if(RM.startTs&&!RM.endTs){var el=(now-RM.startTs)/1000;var km=kmAt(race,el);var z=zoneAt(race,km);var fl=fuelList();var nx=fl.filter(function(f){return f.km>km;})[0];var eta=nx?etaAt(race,nx.km)-el:null;
      box.innerHTML='<div class="rm live"><div class="rm-h">'+I.timer+' EN CARRERA</div><div class="rm-big">'+fmtDur(el)+'</div><div class="rm-grid"><div><span class="ok2">km estimado</span><b>'+num(km)+'</b></div><div><span class="ok2">zona</span><b style="color:'+(z?MODE[z[4]][0]:'#fff')+'">'+(z?MODE[z[4]][1]:'-')+'</b><small>'+(z?z[2]:'')+'</small></div><div><span class="ok2">quedan</span><b>'+num(race.totalKm-km)+' km</b></div><div><span class="ok2">meta prevista</span><b>'+fmtDur(race._planTotal)+'</b></div></div>'+(nx?'<div class="rm-next">'+I.food+'<div><div class="tm-h">Proximo: '+esc(nx.label)+'</div><div class="tm-t">km '+nx.km+' &middot; en ~'+Math.max(0,Math.round(eta/60))+' min segun tu ritmo</div></div></div>':'<div class="rm-next"><div class="tm-h">Sin mas tomas: a por la meta</div></div>')+'<div class="td-actions"><button class="btn primary" id="rm-finish">'+I.carrera+' Meta</button><button class="btn" id="rm-reset">Reiniciar</button></div><p class="pf-note">El km estimado sale de tus ritmos por tramo; es orientativo.</p></div>';
      document.getElementById('rm-finish').onclick=function(){RM.endTs=Date.now();setJ(K.race,RM);var t=document.getElementById('r-t');if(t&&!t.value){t.value=fmtDur((RM.endTs-RM.startTs)/1000);t.dispatchEvent(new Event('input'));}clearTimer();draw();toast('Enhorabuena. Anota tu resultado abajo.');};
      document.getElementById('rm-reset').onclick=function(){if(!confirm('Reiniciar el cronometro?'))return;RM={};setJ(K.race,RM);clearTimer();draw();};
      return;}
    if(RM.startTs&&RM.endTs){box.innerHTML='<div class="rm"><div class="rm-h">'+I.trophy+' CARRERA TERMINADA</div><div class="rm-big">'+fmtDur((RM.endTs-RM.startTs)/1000)+'</div><div class="pf-note">Tiempo del cronometro. Guardalo abajo en "Mi resultado" con tu puesto.</div><div class="td-actions"><button class="btn" id="rm-reset">Reiniciar cronometro</button></div></div>';document.getElementById('rm-reset').onclick=function(){if(!confirm('Reiniciar?'))return;RM={};setJ(K.race,RM);draw();};return;}
    if(dl===0){var s=(startAt-now)/1000;box.innerHTML='<div class="rm live"><div class="rm-h">'+I.carrera+' HOY ES EL DIA</div><div class="rm-big">'+(s>0?fmtDur(s):'0:00')+'</div><div class="pf-note" style="text-align:center">'+(s>0?'para la salida de las '+race.time:'Ya deberias estar corriendo')+'</div><div class="td-actions" style="justify-content:center"><button class="btn primary" id="rm-start">'+I.timer+' Salgo</button></div></div>';document.getElementById('rm-start').onclick=function(){RM={startTs:Date.now()};setJ(K.race,RM);clearTimer();_timer=setInterval(draw,1000);draw();};return;}
    if(dl>0){box.innerHTML='<div class="rm"><div class="rm-h">'+I.timer+' CUENTA ATRAS</div><div class="rm-big">'+dl+'<small> dias</small></div><div class="pf-note" style="text-align:center">'+fmtDate(race.date)+' a las '+race.time+'. El dia D aqui tendras el modo carrera.</div></div>';return;}
    box.innerHTML='';}
  draw();if((RM.startTs&&!RM.endTs)||dl===0){clearTimer();_timer=setInterval(draw,1000);}}

/* ---------- ROUTER ---------- */
function router(){var h=location.hash||'#/';var m;
  if((m=h.match(/^#\/race\/([^\/]+)(?:\/([a-z]+))?(?:\/(\d{4}-\d{2}-\d{2}))?(?:\/(log))?$/))){var f=window.RACES.filter(function(x){return x.id===m[1];})[0];if(f){renderRace(f,m[2]||'dias',m[3]||null,!!m[4]);return;}}
  if(h==='#/progreso'||h==='#/entrenos'){renderProgreso();return;}if(h==='#/ajustes'){renderAjustes();return;}renderHome();}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-go]');if(b){e.preventDefault();var to=b.dataset.go;if(location.hash===to){router();}else{location.hash=to;}}});
window.addEventListener('hashchange',router);

/* ---------- boot: load race files from registry ---------- */
function boot(){if(window.RACES.length||!window.RACE_FILES||!window.RACE_FILES.length){router();return;}
  var left=window.RACE_FILES.length;window.RACE_FILES.forEach(function(f){var s=document.createElement('script');s.src='races/'+f;s.onload=s.onerror=function(){if(--left===0)router();};document.head.appendChild(s);});}
window.addEventListener('DOMContentLoaded',boot);

/* ---------- service worker + auto update ---------- */
if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('service-worker.js').then(function(reg){reg.addEventListener('updatefound',function(){var nw=reg.installing;if(!nw)return;nw.addEventListener('statechange',function(){if(nw.state==='installed'&&navigator.serviceWorker.controller){toast('Nueva version lista','Actualizar',function(){location.reload();});}});});}).catch(function(){});});}
})();
