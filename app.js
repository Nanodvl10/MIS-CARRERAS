(function(){
"use strict";
window.RACES = window.RACES || [];
window.registerRace = function(r){ window.RACES.push(r); };
var VERSION="6.0";
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
 swap:'<svg viewBox="0 0 24 24"><path d="M7 4L3 8l4 4"/><path d="M3 8h13a4 4 0 0 1 0 8h-1"/><path d="M17 20l4-4-4-4"/></svg>',
 cart:'<svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1.6"/><circle cx="18" cy="20" r="1.6"/><path d="M2 3h3l2.6 12.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6"/></svg>',
 sun:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>',
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
  race.days=race.days||[];race.zones=race.zones||[];race.segs=race.segs||[];race.warns=race.warns||[];race.raceDay=race.raceDay||{pre:[],dur:[],post:[],tactic:''};race.track=race.track||[];
  if(race._prepped){aplicarSesiones(race);return race;}
  var iso=race.planStart;
  race.days.forEach(function(x){if(x.w)return;x.iso=iso;x.planKm=x.race?0:parseKm(x.ent);x.isTraining=!x.race&&x.planKm>0;x._entOrig=x.ent;x._typeOrig=x.type;x._planOrig=x.planKm;iso=addDays(iso,1);});
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
function initScrubber(race){var wrapEl=document.getElementById('scrub');if(!wrapEl||!race.track||!race.track.length)return;var p=race.profile,W=p.viewBox[2];
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
/* ================= BARRA INFERIOR PERSISTENTE ================= */
/* Vive fuera de #app: al repintar la pantalla NO se destruye, solo se
   desliza el indicador. Ademas se puede arrastrar el dedo por encima. */
var NAV={sig:null,tabs:[],onSelect:null,active:null};
var HOME_TABS=[{key:'inicio',icon:I.home,label:'Inicio',route:'#/'},{key:'progreso',icon:I.chart,label:'Progreso',route:'#/progreso'},{key:'ajustes',icon:I.cog,label:'Ajustes',route:'#/ajustes'}];
function navHost(){var h=document.getElementById('navhost');if(!h){h=document.createElement('div');h.id='navhost';document.body.appendChild(h);}return h;}
function navEl(){return document.getElementById('nav');}
function navGeom(){var nav=navEl();if(!nav)return null;var ind=nav.querySelector('.nav-ind');var els=[].slice.call(nav.querySelectorAll('.navitem'));if(!ind||!els.length)return null;
  var nr=nav.getBoundingClientRect();var boxes=els.map(function(e){var r=e.getBoundingClientRect();return {x:r.left-nr.left,w:r.width};});
  if(!boxes[0].w)return null;return {nav:nav,ind:ind,els:els,boxes:boxes,rect:nr};}
function indicatorAt(idx){var G=navGeom();if(!G)return;var n=G.boxes.length-1;
  idx=Math.max(0,Math.min(n,idx));var i0=Math.floor(idx),i1=Math.min(n,i0+1),t=idx-i0;
  var a=G.boxes[i0],b=G.boxes[i1];var x=a.x+(b.x-a.x)*t,wd=a.w+(b.w-a.w)*t;
  G.ind.style.width=(wd-16)+'px';G.ind.style.transform='translateX('+(x+8)+'px)';G.ind.style.opacity='1';
  var near=Math.round(idx);
  G.els.forEach(function(el,i){var d=Math.max(0,1-Math.abs(i-idx));var ic=el.querySelector('.ni-ic');
    if(ic)ic.style.transform='translateY('+(-2*d).toFixed(2)+'px) scale('+(1+0.12*d).toFixed(3)+')';
    el.classList.toggle('active',i===near);});}
function navIndexOf(key){for(var i=0;i<NAV.tabs.length;i++)if(NAV.tabs[i].key===key)return i;return 0;}
function navSetActive(key){if(key)NAV.active=key;var G=navGeom();if(!G)return;indicatorAt(navIndexOf(NAV.active));}
function placeIndicator(){navSetActive(NAV.active);}
function navDot(key,on){var nav=navEl();if(!nav)return;var b=nav.querySelector('.navitem[data-k="'+key+'"] .ni-dot');if(b)b.classList.toggle('on',!!on);}
function mountNav(sig,tabs,onSelect,active){var host=navHost();NAV.tabs=tabs;NAV.onSelect=onSelect;
  if(host.dataset.sig!==sig){host.dataset.sig=sig;
    host.innerHTML='<nav class="bottomnav" id="nav"><span class="nav-ind"></span>'+tabs.map(function(t){return '<button class="navitem" data-k="'+t.key+'"><span class="ni-ic">'+t.icon+'<i class="ni-dot"></i></span><span class="ni-lb">'+t.label+'</span></button>';}).join('')+'</nav>';
    attachNavDrag();}
  NAV.active=active;navSetActive(active);
  /* Reajustes por si el layout aun no estaba listo. Sin argumento: recolocan
     SIEMPRE la pestana activa actual, nunca una antigua (evita el salto). */
  if(window.requestAnimationFrame)requestAnimationFrame(function(){navSetActive();});
  setTimeout(function(){navSetActive();},80);
  setTimeout(function(){navSetActive();},260);}
function attachNavDrag(){var nav=navEl();if(!nav)return;var dragging=false,last=-1;
  function idxFromX(cx){var G=navGeom();if(!G)return navIndexOf(NAV.active);
    var x=cx-G.rect.left;var c=G.boxes.map(function(b){return b.x+b.w/2;});
    if(x<=c[0])return 0;if(x>=c[c.length-1])return c.length-1;
    for(var i=0;i<c.length-1;i++){if(x<=c[i+1])return i+(x-c[i])/(c[i+1]-c[i]);}
    return c.length-1;}
  function move(cx){var idx=idxFromX(cx);indicatorAt(idx);var n=Math.round(idx);if(n!==last){last=n;buzz();}}
  function start(cx){dragging=true;last=navIndexOf(NAV.active);nav.classList.add('dragging');move(cx);}
  function end(){if(!dragging)return;dragging=false;nav.classList.remove('dragging');
    var i=Math.max(0,Math.min(NAV.tabs.length-1,last));var key=NAV.tabs[i].key;
    if(key!==NAV.active&&NAV.onSelect){NAV.onSelect(key);}else{navSetActive(NAV.active);}}
  nav.addEventListener('touchstart',function(e){if(e.touches.length!==1)return;start(e.touches[0].clientX);},{passive:true});
  nav.addEventListener('touchmove',function(e){if(!dragging)return;if(e.cancelable)e.preventDefault();move(e.touches[0].clientX);},{passive:false});
  nav.addEventListener('touchend',function(e){if(!dragging)return;if(e.cancelable)e.preventDefault();end();},{passive:false});
  nav.addEventListener('touchcancel',function(){dragging=false;nav.classList.remove('dragging');navSetActive(NAV.active);},{passive:true});
  nav.addEventListener('mousedown',function(e){e.preventDefault();start(e.clientX);});
  window.addEventListener('mousemove',function(e){if(dragging)move(e.clientX);});
  window.addEventListener('mouseup',function(){if(dragging)end();});
  nav.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('.navitem');if(!b||dragging)return;var k=b.dataset.k;if(k!==NAV.active&&NAV.onSelect)NAV.onSelect(k);});}
function buzz(){try{navigator.vibrate&&navigator.vibrate(8);}catch(e){}}
/* Zonas donde el gesto horizontal es SUYO (no debe cambiar de pestana):
   el perfil interactivo, el trazado, la fila de botones y los campos. */
var NOSWIPE='.scrub,.route-card,.jumps,input,textarea,select,[data-noswipe]';
function inNoSwipe(t){return !!(t&&t.closest&&t.closest(NOSWIPE));}
function initSwipe(el,onSwipe,nTabs){if(!el)return;var x0=null,y0=null,dx=0,lock=null,base=0;
  function drag(on){var n=navEl();if(n)n.classList.toggle('dragging',on);}
  el.addEventListener('touchstart',function(e){if(e.touches.length!==1)return;if(inNoSwipe(e.target)){x0=null;return;}x0=e.touches[0].clientX;y0=e.touches[0].clientY;dx=0;lock=null;base=navIndexOf(NAV.active);el.style.transition='none';},{passive:true});
  el.addEventListener('touchmove',function(e){if(x0==null)return;var t=e.touches[0];dx=t.clientX-x0;var dy=t.clientY-y0;
    if(lock===null&&(Math.abs(dx)>8||Math.abs(dy)>8)){lock=Math.abs(dx)>Math.abs(dy)*1.25?'x':'y';if(lock==='x')drag(true);}
    if(lock==='x'){if(e.cancelable)e.preventDefault();
      var W=el.clientWidth||360;var ratio=Math.max(-1,Math.min(1,dx/W));var idx=base-ratio*1.15;
      if(nTabs)idx=Math.max(0,Math.min(nTabs-1,idx));
      indicatorAt(idx);el.style.transform='translateX('+(dx*0.4)+'px)';el.style.opacity=String(Math.max(.55,1-Math.abs(dx)/700));}},{passive:false});
  function end(){if(x0==null)return;drag(false);el.style.transition='transform .3s cubic-bezier(.22,.9,.3,1),opacity .3s';el.style.transform='';el.style.opacity='';
    if(lock==='x'&&Math.abs(dx)>55){buzz();onSwipe(dx<0?1:-1);}else{placeIndicator();}x0=null;lock=null;}
  el.addEventListener('touchend',end,{passive:true});
  el.addEventListener('touchcancel',function(){drag(false);el.style.transition='';el.style.transform='';el.style.opacity='';placeIndicator();x0=null;lock=null;},{passive:true});}
function mountHomeNav(active){mountNav('home',HOME_TABS,function(k){var t=HOME_TABS.filter(function(x){return x.key===k;})[0];if(t)location.hash=t.route;},active);
  initSwipe(document.querySelector('.content'),function(dir){var i=navIndexOf(active)+dir;if(i<0||i>=HOME_TABS.length){placeIndicator();return;}location.hash=HOME_TABS[i].route;},HOME_TABS.length);}
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
  var races=window.RACES.slice().sort(function(a,b){return a.date<b.date?-1:1;});var featured=featuredRace();var rest=races.filter(function(r){return r!==featured;});var Pf=P();
  var html='<div class="view"><header class="home-head"><div class="hh-row"><div><div class="kicker">Mi app de carreras</div><h1>CARRERA<span class="devil">AP</span></h1></div>';
  if(featured){prep(featured);var sk=streak(featured);if(sk>0)html+='<div class="streak">'+I.fire+'<b>'+sk+'</b><span>racha</span></div>';}
  html+='</div><div class="meta">'+(Pf.nombre?'Hola, '+esc(Pf.nombre)+' &middot; ':'')+(Pf.peso?Pf.peso+' &middot; trail':'trail')+'</div></header><div class="wrap content">';
  if(featured){var past=daysLeft(featured.date)<0,dl=daysLeft(featured.date),today=findToday(featured),res=resultOf(featured.id);
    html+='<div class="section-label">Hoy &middot; '+DIAS[new Date().getDay()]+' '+fmtShort(todayISO())+'</div>';
    if(dl===0){html+='<div class="today race-day"><div class="td-body"><div class="td-ent">'+I.carrera+' HOY ES EL DIA</div><div class="td-sub">'+featured.name+' &middot; salida '+featured.time+'</div><div class="td-actions"><button class="btn primary" data-go="#/race/'+featured.id+'/carrera">Modo carrera '+I.arrow+'</button><button class="btn" data-go="#/race/'+featured.id+'/mapa">Mapa</button></div></div></div>';}
    else if(past){html+='<div class="today"><div class="td-body"><div class="td-ent">'+featured.name+' hecha</div><div class="td-sub">'+(res?'<span class="ok">'+I.trophy+' '+esc(res.tiempo)+(res.puesto?' &middot; puesto '+esc(res.puesto):'')+'</span>':'Registra tu resultado para guardarlo en tu historial')+'</div><div class="td-actions"><button class="btn primary" data-go="#/race/'+featured.id+'/carrera">'+(res?'Ver resultado':'Anotar resultado')+' '+I.arrow+'</button></div></div></div>';}
    else if(today){var log=getJ(KEYS(featured.id).log)[today.iso]||{};var nm=nextMeal(today);
      html+='<div class="today"><span class="bar b-'+today.type+'"></span><div class="td-body"><div class="td-ent">'+today.ent+'</div><div class="td-sub"><span class="tag t-'+today.type+'">'+typeName[today.type]+'</span><span>'+(today.mac?today.mac.split(' \u00b7 ')[0]:'')+'</span>'+(log.hecho?'<span class="ok">'+I.check+' hecho'+(log.km?' '+log.km+' km':'')+'</span>':'')+'</div>'+
        (nm?'<div class="td-meal">'+I.food+'<div><div class="tm-h">Ahora toca &middot; '+esc(nm.it[0])+'</div><div class="tm-t">'+esc(mealText(featured.id,today.iso,today.menu.indexOf(nm.it),nm.it[1]))+'</div></div></div>':(today.menu&&today.menu.length?'<div class="td-meal"><div class="tm-h">Comidas de hoy completadas</div></div>':''))+
        (today.isTraining?'<div class="td-w" id="td-w"></div>':'')+
        '<div class="td-actions"><button class="btn primary" data-go="#/race/'+featured.id+'/dias/'+today.iso+'">'+(today.menu&&today.menu.length?'Comidas de hoy ':'Ver el dia ')+I.arrow+'</button>'+(today.isTraining?'<button class="btn" data-go="#/race/'+featured.id+'/dias/'+today.iso+'/log">'+(log.hecho?'Ver entreno':'Registrar entreno')+'</button>':'')+'</div></div></div>';}
    else{html+='<div class="today"><div class="td-body"><div class="td-ent">Sin plan para hoy</div><div class="td-sub">'+(todayISO()<featured.planStart?'El plan de '+featured.name+' empieza el '+fmtShort(featured.planStart):'Dia libre')+'</div></div></div>';}
    (function(){var Fx=forma();if(Fx&&(Fx.estado==='Cargado'||Fx.estado==='Riesgo')){html+='<div class="suger">'+I.fire+'<div><b>Vas '+Fx.estado.toLowerCase()+'.</b> '+Fx.texto+'</div></div>';}})();
    html+='<div class="section-label">'+(past?'Ultima carrera':'Proxima carrera')+'</div><a class="hero-card" href="#/race/'+featured.id+'"><div class="hc-media">'+heroProfile(featured.profile,'')+'<div class="hc-fade"></div><span class="hc-tag">'+(featured.kind||'Trail')+' &middot; '+featured.gain+'</span><span class="hc-cd'+(past?' past':'')+'">'+(past?(res?I.trophy+' '+esc(res.tiempo):'hecha'):'faltan '+cd(featured.date))+'</span><div class="hc-body"><div class="hc-name">'+featured.name+'</div><div class="hc-sub">'+featured.subtitle+' &middot; '+fmtDate(featured.date)+', '+featured.time+'</div></div></div><div class="hc-stats"><div class="s"><div class="sv ember">'+featured.km+'</div><div class="sl">km</div></div><div class="s"><div class="sv ember">'+featured.dplus+'</div><div class="sl">metros +</div></div><div class="s"><div class="sv">'+featured.estimate+'</div><div class="sl">objetivo</div></div></div></a>'+
      '<div class="quick"><button class="qbtn" data-go="#/race/'+featured.id+'/mapa">'+I.mapa+'<span>Mapa</span></button><button class="qbtn" data-go="#/race/'+featured.id+'/carrera">'+I.carrera+'<span>Dia D</span></button><button class="qbtn" data-go="#/compra">'+I.cart+'<span>Compra</span></button><button class="qbtn" data-go="#/herramientas">'+I.ritmos+'<span>Calc</span></button></div>';}
  if(rest.length){html+='<div class="section-label">Otras carreras</div>';rest.forEach(function(r){var past=daysLeft(r.date)<0;var rs=resultOf(r.id);html+='<a class="minicard" href="#/race/'+r.id+'"><span class="mc-mini">'+miniProfile(r.profile)+'</span><span><span class="mc-n">'+r.name+'</span><span class="mc-d">'+fmtDate(r.date)+' &middot; '+r.dist+' &middot; '+r.gain+'</span></span><span class="mc-cd">'+(past?(rs?I.trophy+' '+esc(rs.tiempo):'hecha'):'faltan '+cd(r.date))+'</span></a>';});}
  if(!races.length)html+='<div class="card"><p class="lead" style="margin:0">Aun no hay carreras. Pasale a Claude un GPX y una fecha para anadir la primera.</p></div>';
  html+='</div></div>';app().innerHTML=html;window.scrollTo(0,0);mountHomeNav('inicio');
  var tw=document.getElementById('td-w');if(tw&&featured){var co=coordsEntreno(featured);if(co){tiempoDia(todayISO(),P().horaEntreno||'18:00',co,function(d){if(d)tw.innerHTML=chipTiempo(d)+'<small> a las '+d.hora+'</small>';});}}}

/* ---------- PROGRESO ---------- */
function renderProgreso(sub){clearTimer();var race=featuredRace();var Pf=P();sub=sub||getJ('ui').progSub||'resumen';
  var html='<div class="view"><header class="home-head"><div class="kicker">Seguimiento</div><h1>Mi <span class="devil">progreso</span></h1>';
  if(!race){html+='</header><div class="wrap content"><div class="card"><p class="lead" style="margin:0">Sin carreras aun.</p></div></div></div>';app().innerHTML=html;mountHomeNav('progreso');return;}
  prep(race);var logs=getJ(KEYS(race.id).log);var weeks=weekStats(race);var tp=0,td=0,np=0,nd=0;weeks.forEach(function(w){tp+=w.plan;td+=w.done;np+=w.n;nd+=w.nd;});
  var ad=adherence(race),sk=streak(race);
  html+='<div class="meta">'+race.name+' &middot; '+nd+'/'+np+' sesiones</div></header><div class="wrap content">'+
    '<div class="segbtns">'+[['resumen','Resumen'],['entrenos','Entrenos'],['cuerpo','Cuerpo']].map(function(t){return '<button class="segb'+(t[0]===sub?' on':'')+'" data-sub="'+t[0]+'">'+t[1]+'</button>';}).join('')+'</div>';
  if(sub==='resumen'){
    html+='<div class="summary"><div class="sm"><div class="sv">'+num(td)+'</div><div class="sl">km hechos</div></div><div class="sm"><div class="sv ember">'+(tp?Math.round(td/tp*100):0)+'%</div><div class="sl">del plan</div></div><div class="sm"><div class="sv gold">'+ad.pct+'%</div><div class="sl">dieta</div></div><div class="sm"><div class="sv">'+sk+'</div><div class="sl">racha</div></div></div>';
    html+=cardPrediccion(race)+cardForma();
    var now=new Date();var cm=getJ('calmes');var cy=cm.y!=null?cm.y:now.getFullYear(),cmo=cm.m!=null?cm.m:now.getMonth();
    html+='<div class="card cal-card"><div class="cc-h">'+I.dias+' <button class="cal-nav" data-cal="-1">&#8249;</button><span class="cal-t">'+MESES[cmo]+' '+cy+'</span><button class="cal-nav" data-cal="1">&#8250;</button></div>'+calMes(race,cy,cmo)+'<div class="cal-leg"><span><i class="l-plan"></i>previsto</span><span><i class="l-hecho"></i>hecho</span><span><i class="l-carrera"></i>carrera</span></div></div>';
    html+='<button class="btn wide-btn" data-go="#/evolucion">'+I.chart+' Graficas de evolucion</button>';
    var LG=logros();if(LG.length)html+='<div class="card soft"><div class="cc-h">'+I.trophy+' Logros</div><div class="logros">'+LG.map(function(a){return '<div class="logro"><span class="lg-e">'+a[0]+'</span><b>'+a[1]+'</b><small>'+a[2]+'</small></div>';}).join('')+'</div></div>';
  }
  if(sub==='entrenos'){
    html+='<div class="card chart-card"><div class="cc-h">'+I.chart+' Km por semana <span>hecho / plan</span></div>'+weekChart(weeks)+'</div>';
    var R=records();if(R)html+='<div class="card soft"><div class="cc-h">'+I.trophy+' Records <span>'+R.n+' registros</span></div><div class="rec-grid">'+
      (R.masLargo?'<div><span class="ok2">mas largo</span><b>'+num(R.masLargo.km)+' km</b><small>'+fmtShort(R.masLargo.iso)+'</small></div>':'')+
      (R.masRapido?'<div><span class="ok2">mejor ritmo (&ge;5 km)</span><b>'+fmtPace(R.masRapido.sec,R.masRapido.km).replace(' /km','')+'</b><small>'+num(R.masRapido.km)+' km &middot; '+fmtShort(R.masRapido.iso)+'</small></div>':'')+
      (R.m5?'<div><span class="ok2">5 km estimado</span><b>'+fmtDur(R.m5.t)+'</b><small>por Riegel</small></div>':'')+(R.m10?'<div><span class="ok2">10 km estimado</span><b>'+fmtDur(R.m10.t)+'</b><small>por Riegel</small></div>':'')+'</div></div>';
    var week=null,wHtml='';function flush(){if(!week)return;html+='<div class="section-label">'+week.label+' <span class="wk">'+num(week.done)+' / '+week.plan+' km</span></div><div class="wbar"><div style="width:'+(week.plan?Math.min(100,week.done/week.plan*100):0)+'%"></div></div>'+wHtml;}
    var wi=-1;race.days.forEach(function(x){if(x.w){flush();wi++;week=weeks[wi];wHtml='';return;}if(!x.isTraining&&!x.race)return;var l=logs[x.iso]||{};var done=!!l.hecho;var isT=daysLeft(x.iso)===0;var tz=tiempoEnZonas(l);
      wHtml+='<button class="sess'+(done?' done':'')+(isT?' today':'')+'" data-sess="'+x.iso+'"><span class="bar b-'+x.type+'"></span><span class="date"><span class="d">'+x.d+'</span><span class="m">'+x.m+'</span></span><span class="mid"><span class="ent">'+(x.race?'CARRERA &middot; '+race.name:esc(x.ent))+'</span><span class="kc">'+(done?(l.km?l.km+' km':'')+(l.tiempo?' &middot; '+l.tiempo:'')+(l.km&&l.tiempo?' &middot; '+fmtPace(parseTime(l.tiempo),parseFloat(String(l.km).replace(',','.'))):'')+(l.hrAvg?' &middot; <span class="hr">'+l.hrAvg+' ppm'+(zonaDe(l.hrAvg)?' Z'+zonaDe(l.hrAvg).z:'')+'</span>':''):(x.race?'Dia D':'Pendiente &middot; '+x.planKm+' km'))+'</span>'+(tz?barraZonas(tz).split('</div>')[0]+'</div>':'')+'</span><span class="st">'+(done?'<span class="ok">'+I.check+'</span>':I.arrow)+'</span></button>';});
    flush();
    html+='<button class="btn primary wide-btn" data-go="#/importar">'+I.up+' Importar entreno (GPX/TCX)</button>';
  }
  if(sub==='cuerpo'){
    var wt=getJ('weight');var isos=Object.keys(wt).sort();var vals=isos.map(function(k){return parseFloat(wt[k]);});var target=parseFloat(String(Pf.peso||'').replace(',','.'))||null;var last=vals.length?vals[vals.length-1]:null;var tIso=todayISO();
    html+='<div class="card"><div class="cc-h">'+I.scale+' Peso</div><div class="big" style="font-size:30px;font-weight:800;letter-spacing:-.02em">'+(last!=null?num(last)+'<small style="font-size:14px;color:var(--dim)"> kg</small>':'<small style="font-size:14px;color:var(--dim)">sin datos</small>')+'</div>'+(vals.length>1?'<div class="pf-note">'+(vals[vals.length-1]-vals[0]>0?'+':'')+num(vals[vals.length-1]-vals[0])+' kg desde el inicio'+(target?' &middot; objetivo '+num(target):'')+'</div>':'')+
      '<div class="wt-row" style="margin-top:12px"><input type="text" inputmode="decimal" id="wt-in" placeholder="'+(last!=null?num(last):'60,0')+'" value="'+(wt[tIso]?esc(wt[tIso]):'')+'"><span class="wt-u">kg hoy</span><button class="btn primary sm" id="wt-save">Guardar</button></div>'+sparkline(vals.slice(-14))+(isos.length?'<div class="pf-note">'+isos.length+' registros &middot; ultimo '+fmtShort(isos[isos.length-1])+'</div>':'')+'</div>';
    var Z=zonasFC();if(Z)html+='<div class="card soft"><div class="cc-h">'+I.fire+' Mis zonas de pulso'+(Z[0].custom?' <span>personalizadas</span>':'')+'</div><div class="zonas">'+Z.map(function(z){return '<div class="zona"><span class="zc" style="background:'+z.c+'"></span><span class="zn">Z'+z.z+' &middot; '+z.n+'</span><span class="zr">'+(z.hi>=999?z.lo+'+':z.lo+'-'+z.hi)+'</span></div>';}).join('')+'</div><button class="btn wide-btn" data-go="#/perfil" style="margin-top:10px">Editar en el perfil</button></div>';
    html+='<button class="btn wide-btn" data-go="#/herramientas">'+I.ritmos+' Calculadora y predictor</button>';
  }
  html+='<button class="btn wide-btn" id="share-prog" style="margin-top:10px">'+I.share+' Compartir resumen</button></div></div>';app().innerHTML=html;window.scrollTo(0,0);mountHomeNav('progreso');
  [].forEach.call(document.querySelectorAll('[data-sub]'),function(b){b.addEventListener('click',function(){var u=getJ('ui');u.progSub=b.dataset.sub;setJ('ui',u);renderProgreso(b.dataset.sub);});});
  [].forEach.call(document.querySelectorAll('[data-cal]'),function(b){b.addEventListener('click',function(){var d=parseInt(b.dataset.cal,10);var m=cmo+d,y=cy;if(m<0){m=11;y--;}if(m>11){m=0;y++;}setJ('calmes',{y:y,m:m});renderProgreso('resumen');});});
  [].forEach.call(document.querySelectorAll('[data-sess]'),function(b){b.addEventListener('click',function(){detalleSesion(race,b.dataset.sess);});});
  var ws=document.getElementById('wt-save');if(ws)ws.addEventListener('click',function(){var v=parseFloat(document.getElementById('wt-in').value.replace(',','.'));if(!v)return;var W=getJ('weight');W[todayISO()]=v;setJ('weight',W);toast('Peso guardado');renderProgreso('cuerpo');});
  document.getElementById('share-prog').addEventListener('click',function(){var txt='Progreso '+race.name+': '+num(td)+'/'+tp+' km ('+(tp?Math.round(td/tp*100):0)+'%), dieta '+ad.pct+'%, racha '+sk+' dias.';share('Mi progreso',txt);});}
function analisisSesion(race,x,l){
  var km=parseFloat(String(l.km||'').replace(',','.'))||0,sec=parseTime(l.tiempo);if(!km||!sec)return '';
  var msgs=[];var tz=tiempoEnZonas(l);
  if(tz){var top=0,ti=0;tz.pct.forEach(function(pp,i){if(pp>top){top=pp;ti=i;}});var Z=zonasFC();
    if(Z)msgs.push('Mayormente en <b style="color:'+Z[ti].c+'">Z'+(ti+1)+' '+Z[ti].n+'</b> ('+top+'%).');
    var alto=(tz.pct[3]||0)+(tz.pct[4]||0);
    if((x.type==='suave'||/facil|suave|rodaje/i.test(x.ent))&&alto>=30)msgs.push('Era un dia suave y has ido '+alto+'% en Z4-Z5: baja el ritmo en los rodajes de recuperacion.');
    if((x.type==='fuerte'||/tempo|serie|ritmo|cuesta/i.test(x.ent))&&alto<20)msgs.push('Para ser calidad has ido suave; la proxima aprieta mas en los tramos fuertes.');}
  var M=marcasBase(60);
  if(M.length>=2){var avg=M.reduce(function(a,m){return a+planoEquivalente(m.km,m.sec,m.gain,m.gain>150)/m.km;},0)/M.length;
    var flat=planoEquivalente(km,sec,l.gain||0,(l.gain||0)>150)/km;var dif=Math.round(flat-avg);
    if(dif<=-8)msgs.push('Ritmo (ajustado por desnivel) <b>'+Math.abs(dif)+'s/km mas rapido</b> que tu media reciente. Buen dia.');
    else if(dif>=10)msgs.push('Hoy '+dif+'s/km mas lento que tu media (ajustado por desnivel). Normal si tocaba suave o venias cargado.');}
  if(l.hrAvg&&km>=8&&l.splits&&l.splits.length>=6){var mit=Math.floor(l.splits.length/2),h1=0,n1=0,h2=0,n2=0;
    l.splits.forEach(function(sp,i){if(!sp.hr)return;if(i<mit){h1+=sp.hr;n1++;}else{h2+=sp.hr;n2++;}});
    if(n1&&n2){var dd=Math.round(h2/n2-h1/n1);if(dd>=8)msgs.push('Deriva cardiaca: +'+dd+' ppm en la 2a mitad. Signo de fatiga o calor; cuida la hidratacion.');}}
  if(!msgs.length)return '';
  return '<div class="analisis"><div class="cc-h">'+I.ritmos+' Analisis</div>'+msgs.map(function(m){return '<p>'+m+'</p>';}).join('')+'</div>';}

function detalleSesion(race,iso){var x=race.days.filter(function(d){return d.iso===iso;})[0];if(!x)return;var l=getJ(KEYS(race.id).log)[iso]||{};var tz=tiempoEnZonas(l);
  if(!l.hecho&&!x.race){location.hash='#/race/'+race.id+'/dias/'+iso+'/log';return;}
  if(x.race){location.hash='#/race/'+race.id+'/carrera';return;}
  var km=parseFloat(String(l.km||'').replace(',','.'))||0,sec=parseTime(l.tiempo);
  var cuerpo='<div class="imp-grid"><div><span class="ok2">distancia</span><b>'+num(km)+'<small> km</small></b></div><div><span class="ok2">tiempo</span><b>'+(l.tiempo||'-')+'</b></div>'+(km&&sec?'<div><span class="ok2">ritmo</span><b>'+fmtPace(sec,km).replace(' /km','')+'<small> /km</small></b></div>':'')+(l.gain!=null&&l.gain!==''?'<div><span class="ok2">desnivel +</span><b>'+l.gain+'<small> m</small></b></div>':'')+(l.hrAvg?'<div><span class="ok2">FC media</span><b class="hr">'+l.hrAvg+'</b></div>':'')+(l.hrMax?'<div><span class="ok2">FC max</span><b class="hr">'+l.hrMax+'</b></div>':'')+'</div>'+
    (tz?'<div class="cc-h" style="margin-top:8px">Tiempo en zonas</div>'+barraZonas(tz):'')+(l.route&&l.route.length?routeMini(l.route):'')+(l.splits&&l.splits.length?'<div class="cc-h" style="margin-top:10px">Parciales</div>'+splitsChart(l.splits):'')+analisisSesion(race,x,l)+(l.notas?'<p class="pf-note" style="margin-top:10px">&ldquo;'+esc(l.notas)+'&rdquo;</p>':'')+
    '<button class="btn wide-btn" data-go="#/race/'+race.id+'/dias/'+iso+'/log" style="margin-top:12px">Editar este entreno</button>';
  abrirHoja(esc(x.ent),fmtDate(iso)+(l.src==='import'?' &middot; importado':l.src==='strava'?' &middot; Strava':''),cuerpo);}
function share(title,text){if(navigator.share){navigator.share({title:title,text:text}).catch(function(){});}else if(navigator.clipboard){navigator.clipboard.writeText(text).then(function(){toast('Copiado al portapapeles');});}else{toast(text);}}

/* ---------- AJUSTES ---------- */
function renderAjustes(){clearTimer();var Pf=P();var chips=function(a,c){return (a||[]).map(function(x){return '<span class="chip'+(c?' '+c:'')+'">'+x+'</span>';}).join('');};var race=featuredRace();
  var html='<div class="view"><header class="home-head"><div class="kicker">Configuracion</div><h1>Mis <span class="devil">ajustes</span></h1><div class="meta">Version '+VERSION+'</div></header><div class="wrap content">'+
    '<div class="section-label">Mi perfil</div><div class="card"><div class="pf-row"><span>'+esc(Pf.nombre||'Corredor')+'</span><b>'+(Pf.peso||'-')+(Pf.edad?' &middot; '+esc(Pf.edad)+' anos':'')+'</b></div>'+(Pf.noGusta&&Pf.noGusta.length?'<div class="pf-blk"><div class="pf-h">NO ME GUSTA</div>'+chips(Pf.noGusta,'no')+'</div>':'')+(Pf.reglas&&Pf.reglas.length?'<div class="pf-blk"><div class="pf-h">REGLAS</div>'+chips(Pf.reglas)+'</div>':'')+'<button class="btn wide-btn" data-go="#/perfil" style="margin-top:12px">Editar perfil</button></div>'+
    '<div class="section-label">Sincronizacion automatica</div><div class="card"><div class="sync-h"><span class="pf-h" style="margin:0">FEED DE ENTRENOS (STRAVA)</span><span class="sync-st" id="syncst"></span></div>'+
    '<input class="sync-url" id="syncurl" type="url" inputmode="url" placeholder="https://usuario.github.io/REPO/datos/entrenos.json" value="'+esc(syncCfg().url||'')+'">'+
    '<input class="sync-url" id="synckey" type="password" placeholder="Contrasena de cifrado" value="'+esc(syncCfg().key||'')+'" style="margin-top:8px">'+
    '<div class="sync-row"><label class="lb-done"><input type="checkbox" id="syncoff"'+(syncCfg().off?'':' checked')+'><span>Auto al abrir</span></label><button class="btn sm" id="syncsave">Guardar</button><button class="btn primary sm" id="syncgo">Sincronizar</button></div>'+
    (syncCfg().err?'<p class="sync-err">'+esc(syncCfg().err)+'</p>':'')+
    '<p class="pf-note">Tu servidor consulta Strava, cifra los datos y los publica; la app los descifra en tu movil con esa contrasena. Nadie mas puede leerlos.</p></div>'+
    '<div class="section-label">Aspecto</div><div class="card"><div class="pf-row"><span>Tema</span><span class="theme-sw"><button class="segb'+(getJ('ui').theme==='light'?'':' on')+'" data-theme="dark">Oscuro</button><button class="segb'+(getJ('ui').theme==='light'?' on':'')+'" data-theme="light">Claro</button></span></div></div>'+
    '<div class="section-label">Herramientas</div><div class="card"><button class="row-btn" data-go="#/herramientas">'+I.ritmos+'<span>Calculadora, predictor y zonas</span>'+I.arrow+'</button><button class="row-btn" id="csv">'+I.down+'<span>Exportar entrenos (CSV)</span>'+I.arrow+'</button><button class="row-btn" data-go="#/acerca">'+I.check+'<span>Acerca de y privacidad</span>'+I.arrow+'</button></div>'+
    '<div class="section-label">Calendario y datos</div><div class="card">'+(race?'<button class="row-btn" id="ics">'+I.cal+'<span>Exportar plan al Calendario (.ics)</span>'+I.arrow+'</button>':'')+'<button class="row-btn" id="bk">'+I.down+'<span>Copia de seguridad (descargar)</span>'+I.arrow+'</button><label class="row-btn">'+I.up+'<span>Restaurar copia</span><input type="file" id="rs" accept="application/json,.json" hidden>'+I.arrow+'</label></div>'+
    '<div class="section-label">Reiniciar</div><div class="card"><button class="row-btn" data-reset="checks"><span>Checks del dia de carrera</span>'+I.arrow+'</button><button class="row-btn" data-reset="meals"><span>Casillas de comidas</span>'+I.arrow+'</button><button class="row-btn" data-reset="gear"><span>Lista de material</span>'+I.arrow+'</button><button class="row-btn danger" data-reset="log"><span>Registro de entrenos y peso</span>'+I.arrow+'</button></div>'+
    '<div class="section-label">Carreras</div><div class="card"><button class="row-btn" data-go="#/nueva">'+I.carrera+'<span>Anadir carrera</span>'+I.arrow+'</button>'+window.RACES.map(function(r){return '<button class="row-btn" data-go="#/race/'+r.id+'">'+(r.custom?I.dias:I.mapa)+'<span>'+esc(r.name)+' <small style="color:var(--dim2)">'+fmtShort(r.date)+(r.custom?' &middot; tuya':'')+'</small></span>'+I.arrow+'</button>';}).join('')+
    '<p class="pf-note">Las carreras con dieta completa las genera Claude a partir del GPX y tu perfil (archivo en races/). Las que creas aqui tienen calendario, sesiones, mapa por GPX, dia D y resultado.</p></div>'+
    '<p class="foot">APP CARRERAA v'+VERSION+' &middot; hecha para Ruben</p></div></div>';
  app().innerHTML=html;window.scrollTo(0,0);mountHomeNav('ajustes');
  [].forEach.call(document.querySelectorAll('[data-reset]'),function(b){b.addEventListener('click',function(){var what=b.dataset.reset;var msg={checks:'Reiniciar los checks del dia de carrera?',meals:'Reiniciar las casillas de comidas?',gear:'Reiniciar la lista de material?',log:'Borrar TODO el registro de entrenos y peso? No se puede deshacer.'}[what];if(!confirm(msg))return;
    window.RACES.forEach(function(r){var K=KEYS(r.id);try{store&&store.removeItem({checks:K.checks,meals:K.meals,gear:K.gear,log:K.log}[what]);}catch(e){}});if(what==='log'){try{store&&store.removeItem('weight');}catch(e){}}toast('Hecho');});});
  (function(){var c=syncCfg();var st=document.getElementById('syncst');
    if(st)st.innerHTML=c.last?('ultima: '+new Date(c.last).toLocaleString('es-ES',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'})):'sin usar';
    function leer(){var cc=syncCfg();cc.url=document.getElementById('syncurl').value.trim();cc.key=document.getElementById('synckey').value;cc.off=!document.getElementById('syncoff').checked;return cc;}
    var sv=document.getElementById('syncsave');if(sv)sv.addEventListener('click',function(){syncSaveCfg(leer());toast('Guardado');});
    var go=document.getElementById('syncgo');if(go)go.addEventListener('click',function(){syncSaveCfg(leer());go.textContent='...';syncNow(false,function(){go.textContent='Sincronizar';renderAjustes();});});})();
  [].forEach.call(document.querySelectorAll('.theme-sw [data-theme]'),function(b){b.addEventListener('click',function(){var u=getJ('ui');u.theme=b.dataset.theme;setJ('ui',u);aplicarTema();renderAjustes();});});
  var csv=document.getElementById('csv');if(csv)csv.addEventListener('click',exportarCSV);
  var ics=document.getElementById('ics');if(ics)ics.addEventListener('click',function(){downloadText('plan-'+race.id+'.ics',buildICS(race),'text/calendar');toast('Calendario generado. Abrelo y anade los eventos.');});
  document.getElementById('bk').addEventListener('click',function(){var data={v:VERSION,at:new Date().toISOString(),items:{}};if(store){for(var i=0;i<store.length;i++){var k=store.key(i);if(k&&k.indexOf('meteo-')!==0&&k!=='__t')data.items[k]=store.getItem(k);}}downloadText('mis-carreras-backup.json',JSON.stringify(data,null,2),'application/json');});
  document.getElementById('rs').addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;var rd=new FileReader();rd.onload=function(){try{var d=JSON.parse(rd.result);Object.keys(d.items||{}).forEach(function(k){store&&store.setItem(k,d.items[k]);});toast('Copia restaurada');setTimeout(function(){location.hash='#/';location.reload();},600);}catch(err){toast('Archivo no valido');}};rd.readAsText(f);});}
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
    '<section class="panel" id="dias"><details class="fold"><summary>'+I.ritmos+'<span>Estrategia de la carrera</span></summary><div class="fold-in"><div class="readout" style="margin:8px 0 4px">'+race.readout+'</div><div class="legend" style="margin-top:10px"><span><i class="dot hc"></i>Hidratos</span><span><i class="dot pr"></i>Proteina</span><span><i class="dot gr"></i>Grasa</span><span><i class="dot fi"></i>Fibra</span></div></div></details><div id="daylist"></div></section>'+
    '<section class="panel" id="mapa">'+(race.track&&race.track.length?'<p class="hint">Arrastra el dedo por el perfil.</p><div class="card route-card">'+routeSVG(race)+'</div><div class="scrub-card"><div id="scrub" class="scrub">'+scrubSVG(race)+'</div>'+
      '<div class="out"><div class="ob big"><span class="ok2">km</span><b id="o-km">0</b></div><div class="ob big"><b id="o-ele">0</b><span class="ok2">m</span></div><div class="ob"><span class="ok2">pendiente</span><b id="o-grad" class="ov">0%</b></div><div class="ob"><span class="ok2">D+ acum.</span><b id="o-gain">0</b></div><div class="ob"><span class="ok2">paso previsto</span><b id="o-eta">0:00</b></div><div class="ob"><span class="ok2">quedan</span><b id="o-rest">0</b><span class="ok2">km</span></div><div class="ob wide"><span class="ok2">zona</span><b id="o-zone">-</b><span id="o-pace" class="ok2"></span></div></div>'+
      '<div class="jumps">'+jumps.map(function(j){return '<button class="jbtn" data-jump="'+j[1]+'">'+j[0]+'</button>';}).join('')+'</div></div><p class="lead" style="font-size:12.5px">Paso previsto = tiempo de carrera acumulado segun tus ritmos por tramo. Pendiente sobre ~250 m.</p>':
      '<div class="card" style="margin-top:14px;text-align:center"><div class="cc-h" style="justify-content:center">'+I.mapa+' Sin recorrido</div><p class="pf-note" style="margin:6px 0 14px">Carga el GPX de la carrera (lo suele publicar la organizacion, o de Wikiloc/Strava) y tendras el trazado, el perfil interactivo y el tiempo del dia D.</p><label class="btn primary" style="justify-content:center">'+I.up+' Cargar GPX<input type="file" id="gpx-race" accept=".gpx,.tcx,.xml" hidden></label></div>')+
      (race.custom&&race.track&&race.track.length?'<label class="btn wide-btn" style="justify-content:center;margin-top:6px">'+I.up+' Cambiar recorrido (GPX)<input type="file" id="gpx-race" accept=".gpx,.tcx,.xml" hidden></label>':'')+'</section>'+
    '<section class="panel" id="ritmos"><div class="profile-card">'+buildProfileSVG(race.profile)+'</div><div class="obj"><div class="t">OBJETIVO</div><div class="n"><b>'+race.objective+'</b></div><div class="s">'+race.objectiveNote+'</div></div>'+cardPrediccion(race)+(race.zones.length?'<div id="strip" class="strip"></div><div class="striplab"><span>km 0</span><span>km '+Math.round(race.totalKm/2)+'</span><span>km '+Math.round(race.totalKm)+'</span></div><div id="zones"></div><details class="fold"><summary>'+I.check+'<span>A vigilar</span></summary><div class="fold-in" id="warns"></div></details>':'<div class="card"><p class="pf-note" style="margin:0">Esta carrera aun no tiene ritmos por tramo. Usa la calculadora de ritmos en Herramientas para fijar tu objetivo, o pidele a Claude un plan de ritmos con el recorrido.</p></div><div id="strip" hidden></div><div id="zones" hidden></div><div id="warns" hidden></div>')+(race.terrainNote?'<p class="hint">'+race.terrainNote+'</p>':'')+'</section>'+
    '<section class="panel raceday" id="carrera"><div id="racemode"></div><div id="meteo"></div><div class="phase">Antes</div><div id="pre"></div><div class="tactic"><div class="th">Tactica ligada al perfil</div>'+race.raceDay.tactic+'</div><div class="phase">Durante ('+race.time+')</div><div id="dur"></div><div class="phase">Meta y recuperacion</div><div id="post"></div>'+
      '<details class="fold"'+(dl<=2&&dl>=0?' open':'')+'><summary>'+I.bag+'<span>Que llevar</span></summary><div class="fold-in" id="gear"></div></details>'+
      '<details class="fold"'+(past?' open':'')+'><summary>'+I.trophy+'<span>Mi resultado</span></summary><div class="fold-in"><div class="card" style="margin:8px 0 0"><div class="lb-grid"><label>Tiempo<input type="text" id="r-t" value="'+esc(res?res.tiempo:'')+'" placeholder="h:mm:ss"></label><label>Puesto<input type="text" id="r-p" value="'+esc(res?res.puesto:'')+'" placeholder="2º / 15º cat"></label><label class="wide">Notas<input type="text" id="r-n" value="'+esc(res?res.notas:'')+'" placeholder="Como fue, sensaciones, que repetir..."></label></div><div class="lb-foot"><span class="lb-pace" id="r-pace">'+(res&&res.tiempo?fmtPace(parseTime(res.tiempo),race.totalKm):'')+'</span><button class="btn sm" id="r-share">'+I.share+'</button><button class="btn primary sm" id="r-save">Guardar</button></div></div></div></details>'+
      (race.custom?'<button class="btn wide-btn danger-btn" id="race-del">Eliminar esta carrera</button>':'')+'<p class="foot">Cantidades para '+(P().peso||'tu peso')+'. Ajusta al hambre real.</p></section>'+
    '</div></div>';
  app().innerHTML=html;window.scrollTo(0,0);

  /* days */
  var dlEl=document.getElementById('daylist');var meals=getJ(K.meals);var logs=getJ(K.log);var focusEl=null;
  race.days.forEach(function(x){if(x.w){var h=document.createElement('div');h.className='week';h.textContent=x.w;dlEl.appendChild(h);return;}
    var el=document.createElement('div');el.className='acc'+(x.race?' race':'');el.dataset.open="0";el.id='day-'+x.iso;var mC=meals[x.iso]||{};var nM=x.menu?x.menu.length:0;var nC=Object.keys(mC).filter(function(k){return mC[k];}).length;var lg=logs[x.iso]||{};var isT=daysLeft(x.iso)===0;
    function kcTxt(){var m=getJ(K.meals)[x.iso]||{};var n=Object.keys(m).filter(function(k){return m[k];}).length;var l=getJ(K.log)[x.iso]||{};return (x.race?'Plan de carrera aparte':(x.mac?x.mac.split(' \u00b7 ')[0]:(x.isTraining?x.planKm+' km previstos':'Sin plan de comidas')))+(n?' &middot; comidas '+n+'/'+nM:'')+(l.hecho?' &middot; <span class="ok">entreno hecho</span>':'');}
    var head='<button aria-expanded="false"><span class="bar b-'+x.type+'"></span><span class="date"><span class="d">'+x.d+'</span><span class="m">'+x.m+'</span></span><span class="mid"><span class="ent">'+esc(x.ent)+(isT?' <span class="today-chip">HOY</span>':'')+(x.editada?' <span class="swap-badge">editada</span>':'')+'</span><br><span class="kc">'+kcTxt()+'</span></span><span class="tag t-'+x.type+'">'+typeName[x.type]+'</span><span class="chev">\u203a</span></button>';
    if(x.race){el.innerHTML=head+'<div class="body"><div class="body-in"><p style="font-size:13px;color:#cdd4df;margin:6px 0">El dia de carrera tiene su plan en la pestana <b style="color:var(--ember-soft)">Carrera</b>.</p></div></div>';el.querySelector('button').addEventListener('click',function(){switchTab('carrera');});dlEl.appendChild(el);return;}
    var rows=x.menu.map(function(it,i){var txt=mealText(race.id,x.iso,i,it[1]);var cam=!!swapsOf(race.id,x.iso)[i];
      return '<div class="meal mchk'+(cam?' swapped':'')+'"><label class="mchk-l"><input type="checkbox" data-mi="'+i+'"'+(mC[i]?' checked':'')+'><span class="mtxt"><span class="when">'+it[0]+(cam?' <span class="swap-badge">cambiado</span>':'')+'</span><span class="what">'+esc(txt)+'</span>'+(it[2].length?'<span class="dots">'+it[2].map(function(d){return '<i class="dot '+d+'"></i>';}).join('')+'</span>':'')+'</span></label>'+
      '<button class="swap-btn" data-swap="'+i+'" aria-label="Cambiar">'+I.swap+'</button></div>';}).join('');
    if(x.tip)rows+='<div class="tip">'+x.tip+'</div>';
    if(!x.menu||!x.menu.length)rows='<p class="pf-note" style="margin:6px 0 4px">Este dia no tiene plan de comidas. '+(race.custom?'Las dietas se generan con Claude a partir de tu perfil y tu calendario.':'')+'</p>';
    var mac=x.mac?x.mac.split(' \u00b7 ').map(function(pp){return '<span><b>'+pp+'</b></span>';}).join(''):'';
    var logHtml=(!x.isTraining)?'<div class="logbox lite"><div class="lb-h">'+I.dias+' Notas del dia</div><div class="lb-grid"><label class="wide"><input type="text" data-f="notas" value="'+esc(lg.notas||'')+'" placeholder="Sensaciones, sueno, molestias..."></label></div><div class="lb-foot"><span class="lb-pace"></span><button class="btn primary sm" data-save="1">Guardar</button></div></div>':'<div class="logbox"><div class="lb-h">'+I.log+' Mi entreno &middot; previsto '+x.planKm+' km</div><div class="lb-grid"><label>Km<input type="text" inputmode="decimal" data-f="km" value="'+esc(lg.km||'')+'" placeholder="'+x.planKm+'"></label><label>Tiempo<input type="text" data-f="tiempo" value="'+esc(lg.tiempo||'')+'" placeholder="mm:ss"></label><label class="wide">Notas<input type="text" data-f="notas" value="'+esc(lg.notas||'')+'" placeholder="Sensaciones, terreno..."></label></div><div class="lb-foot"><span class="lb-pace">'+(lg.km&&lg.tiempo?fmtPace(parseTime(lg.tiempo),parseFloat(String(lg.km).replace(',','.'))):'')+'</span><label class="lb-done"><input type="checkbox" data-f="hecho"'+(lg.hecho?' checked':'')+'><span>Hecho</span></label><button class="btn primary sm" data-save="1">Guardar</button></div>'+
      '<div class="mood" data-mood-cur="'+(lg.mood||'')+'"><span class="mood-h">Como te has sentido</span>'+['\ud83d\ude04','\ud83d\ude42','\ud83d\ude10','\ud83d\ude2b','\ud83e\udd15'].map(function(e){return '<button type="button" class="mood-b'+(lg.mood===e?' on':'')+'" data-mood="'+e+'">'+e+'</button>';}).join('')+'</div>'+'<button class="btn sm imp-btn" data-go="#/importar/'+x.iso+'">'+I.up+' Importar archivo del reloj</button>'+
      (lg.src==='import'?'<div class="imp-mini">'+(lg.hrAvg?'<span class="hr">'+lg.hrAvg+' ppm medias</span>':'')+(lg.hrMax?'<span class="hr">max '+lg.hrMax+'</span>':'')+(lg.gain!=null?'<span>+'+lg.gain+' m</span>':'')+'</div>'+(lg.route&&lg.route.length?routeMini(lg.route):'')+(lg.splits&&lg.splits.length?splitsChart(lg.splits):''):'')+'</div>';
    var editBtn='<div class="day-tools"><button class="btn sm" data-edit="1">'+I.dias+' '+(x.isTraining?'Editar sesion':'Anadir sesion')+'</button>'+(daysLeft(x.iso)>=0&&daysLeft(x.iso)<=15?'<button class="btn sm" data-meteo="1">'+I.sun+' Tiempo</button>':'')+'</div><div class="day-meteo" id="dm-'+x.iso+'"></div>';
    el.innerHTML=head+'<div class="body"><div class="body-in">'+(mac?'<div class="macrobar">'+mac+'</div>':'')+rows+'<div id="bal-'+x.iso+'">'+cardBalance(race,x)+'</div>'+logHtml+editBtn+'</div></div>';
    var b=el.querySelector('button'),body=el.querySelector('.body');function setOpen(o){el.dataset.open=o?"1":"0";b.setAttribute('aria-expanded',String(o));body.style.maxHeight=o?body.scrollHeight+"px":null;}b.addEventListener('click',function(){setOpen(el.dataset.open!=="1");});el._setOpen=setOpen;
    [].forEach.call(el.querySelectorAll('input[data-mi]'),function(inp){inp.addEventListener('change',function(){var m=getJ(K.meals);m[x.iso]=m[x.iso]||{};m[x.iso][inp.dataset.mi]=inp.checked;setJ(K.meals,m);el.querySelector('.kc').innerHTML=kcTxt();var bx=el.querySelector('#bal-'+x.iso);if(bx){bx.innerHTML=cardBalance(race,x);wireBalance(el,race,x,body);}body.style.maxHeight=body.scrollHeight+'px';});});
    wireBalance(el,race,x,body);
    var eb=el.querySelector('[data-edit]');if(eb)eb.addEventListener('click',function(ev){ev.preventDefault();editarSesion(race,x,function(){renderRace(race,'dias',x.iso,false);});});
    var mrow=el.querySelector('.mood');if(mrow)[].forEach.call(mrow.querySelectorAll('[data-mood]'),function(mb){mb.addEventListener('click',function(){mrow.dataset.moodCur=mb.dataset.mood;[].forEach.call(mrow.querySelectorAll('.mood-b'),function(o){o.classList.toggle('on',o===mb);});});});
    var mb=el.querySelector('[data-meteo]');if(mb)mb.addEventListener('click',function(ev){ev.preventDefault();var out=document.getElementById('dm-'+x.iso);var co=coordsEntreno(race);if(!co){out.innerHTML='<p class="pf-note">Guarda tu ubicacion en el perfil para ver el tiempo.</p>';body.style.maxHeight=body.scrollHeight+'px';return;}
      out.innerHTML='<p class="pf-note">Consultando...</p>';body.style.maxHeight=body.scrollHeight+'px';var hora=x.race?race.time:(P().horaEntreno||'18:00');
      tiempoDia(x.iso,hora,co,function(d){out.innerHTML=d?'<div class="day-w">'+chipTiempo(d)+'<small>a las '+hora+(co.src==='carrera'?' en la salida de la carrera':'')+'</small></div>':'<p class="pf-note">Sin prevision disponible.</p>';body.style.maxHeight=body.scrollHeight+'px';});});
    [].forEach.call(el.querySelectorAll('[data-swap]'),function(b){b.addEventListener('click',function(ev){ev.preventDefault();ev.stopPropagation();
      var i=parseInt(b.dataset.swap,10);abrirCambio(race,x,i,x.menu[i][1],function(){renderRace(race,'dias',x.iso,false);});});});
    var sv=el.querySelector('[data-save]');if(sv){var box=el.querySelector('.logbox');function recalc(){var ki=box.querySelector('[data-f=km]'),ti=box.querySelector('[data-f=tiempo]');if(!ki||!ti)return;var km=parseFloat(ki.value.replace(',','.')),t=parseTime(ti.value);box.querySelector('.lb-pace').textContent=(km&&t)?fmtPace(t,km):'';body.style.maxHeight=body.scrollHeight+'px';}
      [].forEach.call(box.querySelectorAll('input[data-f=km],input[data-f=tiempo]'),function(i){i.addEventListener('input',recalc);});
      sv.addEventListener('click',function(){var Lg=getJ(K.log);var prev=Lg[x.iso]||{};var gv=function(f){var e=box.querySelector('[data-f='+f+']');return e?e.value:(prev[f]||'');};var hc=box.querySelector('[data-f=hecho]');
        var mr=box.querySelector('.mood');Lg[x.iso]={km:gv('km'),tiempo:gv('tiempo'),notas:gv('notas'),hecho:hc?hc.checked:!!prev.hecho,mood:(mr?mr.dataset.moodCur:prev.mood)||'',hrAvg:prev.hrAvg||null,hrMax:prev.hrMax||null,gain:prev.gain!=null?prev.gain:null,splits:prev.splits||[],route:prev.route||[],src:prev.src||'',name:prev.name||''};setJ(K.log,Lg);sv.textContent='Guardado';sv.classList.add('saved');setTimeout(function(){sv.textContent='Guardar';sv.classList.remove('saved');},1200);el.querySelector('.kc').innerHTML=kcTxt();toast(x.isTraining?'Entreno guardado':'Notas guardadas');});}
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
  renderRaceMode(race);try{cargarTiempo(race);}catch(e){}
  var rdel=document.getElementById('race-del');if(rdel)rdel.addEventListener('click',function(){if(!confirm('Eliminar '+race.name+' y todos sus datos?'))return;borrarCarrera(race);toast('Carrera eliminada');location.hash='#/';});

  var gr=document.getElementById('gpx-race');if(gr)gr.addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;var rd=new FileReader();
    rd.onload=function(){try{adjuntarRecorrido(race,rd.result);toast('Recorrido cargado: '+race.dist+' / '+race.gain);renderRace(race,'mapa');}catch(err){toast('No he podido leerlo: '+err.message);}};rd.readAsText(f);});
  /* tabs */
  var TABS=['dias','mapa','ritmos','carrera'];
  var RACE_TABS=[{key:'dias',icon:I.dias,label:'Dias'},{key:'mapa',icon:I.mapa,label:'Mapa'},{key:'ritmos',icon:I.ritmos,label:'Ritmos'},{key:'carrera',icon:I.carrera,label:'Carrera'}];
  var panels={dias:document.getElementById('dias'),mapa:document.getElementById('mapa'),ritmos:document.getElementById('ritmos'),carrera:document.getElementById('carrera')};var scrubInit=false;var curTab=null;
  window.switchTab=function(name,noScroll){if(name===curTab&&!noScroll)return;
    var dir=(curTab==null)?0:(TABS.indexOf(name)>TABS.indexOf(curTab)?1:-1);curTab=name;
    Object.keys(panels).forEach(function(k){var p=panels[k];p.classList.remove('slide-r','slide-l');p.classList.toggle('on',k===name);});
    if(dir){panels[name].classList.add(dir>0?'slide-r':'slide-l');}
    if(name==='mapa'&&!scrubInit){scrubInit=true;initScrubber(race);}
    navSetActive(name);
    var h='#/race/'+race.id+(name==='dias'?'':'/'+name);if(location.hash!==h){history.replaceState(null,'',h);}
    if(!noScroll)window.scrollTo({top:0,behavior:'smooth'});};
  mountNav('race:'+race.id,RACE_TABS,function(k){switchTab(k);},tab);
  switchTab(tab,true);
  initSwipe(document.querySelector('.content'),function(d){var i=TABS.indexOf(curTab)+d;if(i<0||i>=TABS.length){placeIndicator();return;}switchTab(TABS[i]);},TABS.length);
  (function(){var t=todayISO();var td=race.days.filter(function(x){return !x.w&&x.iso===t;})[0];
    var pend=false;if(td&&td.menu){var m=getJ(K.meals)[t]||{};pend=Object.keys(m).filter(function(k){return m[k];}).length<td.menu.length;}
    navDot('dias',pend);navDot('carrera',daysLeft(race.date)===0);})();
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




/* ================= PERFIL (editable en la app) ================= */
/* profile.js aporta valores por defecto; lo que guardas aqui manda. */
function P(){var base=window.PROFILE||{};var mio=getJ('perfil');var out={};
  Object.keys(base).forEach(function(k){out[k]=base[k];});Object.keys(mio).forEach(function(k){out[k]=mio[k];});
  if(!out.comidas||!out.comidas.length)out.comidas=['Desayuno 08:00','Comida 14:00','Cena 21:00'];
  return out;}
function perfilGuardar(o){setJ('perfil',o);}
function pesoNum(){var v=parseFloat(String(P().peso||'').replace(',','.'));return isNaN(v)?null:v;}
function fcMax(){var p=P();if(p.fcmax)return parseInt(p.fcmax,10);if(p.edad)return Math.round(208-0.7*parseInt(p.edad,10));return null;}
var ZCOL=['#6f8fae','#4fa76e','#ecb63f','#e79030','#ff4a30'],ZNOM=['Recuperacion','Aerobico','Tempo','Umbral','VO2max'];
function zonasFC(){var p=P();var z=p.zonas;
  if(z&&z.length===4&&z.every(function(v){return v>0;})){var lims=[0].concat(z.map(Number));
    return lims.map(function(lo,i){return {z:i+1,n:ZNOM[i],lo:i?lo+1:0,hi:i<4?lims[i+1]:999,c:ZCOL[i],custom:true};});}
  var m=fcMax();if(!m)return null;
  return [.5,.6,.7,.8,.9].map(function(f,i){return {z:i+1,n:ZNOM[i],lo:Math.round(m*f),hi:i<4?Math.round(m*[.6,.7,.8,.9][i]):m,c:ZCOL[i]};});}
function tiempoEnZonas(l){var Z=zonasFC();if(!Z||!l||!l.splits||!l.splits.length)return null;var acc=[0,0,0,0,0],tot=0;
  l.splits.forEach(function(sp){if(!sp.hr)return;var z=zonaDe(sp.hr);if(!z)return;acc[z.z-1]+=sp.sec||0;tot+=sp.sec||0;});
  if(!tot)return null;return {tot:tot,pct:acc.map(function(a){return Math.round(a/tot*100);}),sec:acc};}
function barraZonas(tz){if(!tz)return '';var Z=zonasFC();return '<div class="zbar">'+tz.pct.map(function(p,i){return p?'<i style="width:'+p+'%;background:'+Z[i].c+'" title="Z'+(i+1)+' '+p+'%"></i>':'';}).join('')+'</div><div class="zbar-l">'+tz.pct.map(function(p,i){return p>=8?'<span style="color:'+Z[i].c+'">Z'+(i+1)+' '+p+'%</span>':'';}).join('')+'</div>';}
function zonaDe(hr){var Z=zonasFC();if(!Z||!hr)return null;for(var i=Z.length-1;i>=0;i--){if(hr>=Z[i].lo)return Z[i];}return Z[0];}
function chipsEdit(id,arr,placeholder){return '<div class="chips-edit" id="'+id+'">'+(arr||[]).map(function(x){return '<span class="chip ed">'+esc(x)+'<button data-del="'+esc(x)+'" aria-label="quitar">&times;</button></span>';}).join('')+
  '<span class="chip-add"><input type="text" placeholder="'+placeholder+'"><button data-add="1">+</button></span></div>';}
function leerChips(id){return [].map.call(document.querySelectorAll('#'+id+' .chip.ed'),function(c){return c.firstChild.textContent;});}
function wireChips(id){var box=document.getElementById(id);if(!box)return;
  box.addEventListener('click',function(e){var d=e.target.closest('[data-del]');if(d){d.parentNode.remove();return;}
    var a=e.target.closest('[data-add]');if(a){var inp=box.querySelector('.chip-add input');var v=inp.value.trim();if(!v)return;
      var sp=document.createElement('span');sp.className='chip ed';sp.innerHTML=esc(v)+'<button data-del="'+esc(v)+'" aria-label="quitar">&times;</button>';box.insertBefore(sp,box.querySelector('.chip-add'));inp.value='';}});
  var inp=box.querySelector('.chip-add input');inp.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();box.querySelector('[data-add]').click();}});}
function formPerfil(p){
  return '<div class="card"><div class="pf-h">SOBRE TI</div><div class="lb-grid">'+
    '<label>Nombre<input type="text" id="pf-nombre" value="'+esc(p.nombre||'')+'" placeholder="Tu nombre"></label>'+
    '<label>Peso (kg)<input type="text" inputmode="decimal" id="pf-peso" value="'+esc(String(p.peso||'').replace(' kg',''))+'" placeholder="60"></label>'+
    '<label>Edad<input type="text" inputmode="numeric" id="pf-edad" value="'+esc(p.edad||'')+'" placeholder="26"></label>'+
    '<label>FC maxima<input type="text" inputmode="numeric" id="pf-fcmax" value="'+esc(p.fcmax||'')+'" placeholder="auto por edad"></label></div>'+
    '<p class="pf-note">Si no rellenas tus zonas, se estiman por FC maxima o por edad.</p></div>'+
    '<div class="card"><div class="pf-h">MIS ZONAS DE PULSO (limite superior de cada una)</div><div class="lb-grid z4"><label>Z1 hasta<input type="text" inputmode="numeric" id="pf-z1" value="'+esc((p.zonas||[])[0]||'')+'" placeholder="126"></label><label>Z2 hasta<input type="text" inputmode="numeric" id="pf-z2" value="'+esc((p.zonas||[])[1]||'')+'" placeholder="157"></label><label>Z3 hasta<input type="text" inputmode="numeric" id="pf-z3" value="'+esc((p.zonas||[])[2]||'')+'" placeholder="173"></label><label>Z4 hasta<input type="text" inputmode="numeric" id="pf-z4" value="'+esc((p.zonas||[])[3]||'')+'" placeholder="188"></label></div><p class="pf-note">Z5 es todo lo que pase de Z4.</p></div>'+
    '<div class="card"><div class="pf-h">DONDE Y CUANDO ENTRENO (para el tiempo)</div><div class="pf-row"><span>Ubicacion</span><b id="pf-loc">'+(p.lat?'guardada':'sin definir')+'</b></div><div class="td-actions" style="margin-top:8px"><button class="btn sm" id="pf-geo">Usar mi ubicacion actual</button></div><div class="lb-grid" style="margin-top:10px"><label>Hora habitual de entreno<input type="time" id="pf-hora" value="'+esc(p.horaEntreno||'18:00')+'"></label></div><p class="pf-note">Con esto cada dia de entreno te dira el tiempo previsto a esa hora.</p></div>'+
    '<div class="card"><div class="pf-h">HORARIOS DE COMIDA</div>'+chipsEdit('pf-comidas',p.comidas,'Ej: Almuerzo 12:00')+'</div>'+
    '<div class="card"><div class="pf-h">NO ME GUSTA</div>'+chipsEdit('pf-nogusta',p.noGusta,'Ej: Atun')+'</div>'+
    '<div class="card"><div class="pf-h">REGLAS DE LA DIETA</div>'+chipsEdit('pf-reglas',p.reglas,'Ej: Sin tomate')+'<p class="pf-note">Las nuevas dietas y las sustituciones respetan esto.</p></div>';}
function leerPerfil(){var p=P();p.nombre=document.getElementById('pf-nombre').value.trim();var peso=document.getElementById('pf-peso').value.trim().replace(',','.');p.peso=peso?(peso+' kg'):p.peso;
  p.edad=document.getElementById('pf-edad').value.trim();p.fcmax=document.getElementById('pf-fcmax').value.trim();
  p.comidas=leerChips('pf-comidas');p.noGusta=leerChips('pf-nogusta');p.reglas=leerChips('pf-reglas');
  var zs=['pf-z1','pf-z2','pf-z3','pf-z4'].map(function(id){var e=document.getElementById(id);return e?parseInt(e.value,10)||0:0;});p.zonas=zs.every(function(v){return v>0;})?zs:null;
  var h=document.getElementById('pf-hora');if(h&&h.value)p.horaEntreno=h.value;return p;}
function wireGeo(){var b=document.getElementById('pf-geo');if(!b)return;b.addEventListener('click',function(){if(!navigator.geolocation){toast('Este navegador no da ubicacion');return;}b.textContent='Buscando...';
  navigator.geolocation.getCurrentPosition(function(pos){var p=P();p.lat=+pos.coords.latitude.toFixed(4);p.lon=+pos.coords.longitude.toFixed(4);perfilGuardar(p);document.getElementById('pf-loc').textContent='guardada';b.textContent='Ubicacion guardada';toast('Ubicacion guardada');},function(){b.textContent='Usar mi ubicacion actual';toast('No he podido obtener la ubicacion. Activa el permiso en Ajustes del iPhone.');},{timeout:8000});});}
function renderPerfil(){clearTimer();var p=P();
  app().innerHTML='<div class="view"><button class="backfab static" data-go="#/ajustes">'+I.back+'</button><header class="home-head"><div class="kicker">Ajustes</div><h1>Mi <span class="devil">perfil</span></h1></header><div class="wrap content">'+formPerfil(p)+
    '<button class="btn primary wide-btn" id="pf-save">Guardar perfil</button></div></div>';
  ['pf-comidas','pf-nogusta','pf-reglas'].forEach(wireChips);wireGeo();mountHomeNav('ajustes');
  document.getElementById('pf-save').addEventListener('click',function(){perfilGuardar(leerPerfil());toast('Perfil guardado');location.hash='#/ajustes';});}
function renderOnboarding(){clearTimer();var p=P();
  app().innerHTML='<div class="view onb"><header class="home-head"><div class="kicker">Bienvenido a</div><h1>CARRERA<span class="devil">AP</span></h1><div class="meta">Tu app para preparar cada carrera: plan, comidas, ritmos, mapa y dia D. Todo se guarda solo en tu movil.</div></header><div class="wrap content">'+
    '<div class="onb-steps"><div class="onb-s">'+I.dias+'<span>Plan y dieta por dias</span></div><div class="onb-s">'+I.mapa+'<span>Mapa y perfil interactivo</span></div><div class="onb-s">'+I.timer+'<span>Modo carrera el dia D</span></div><div class="onb-s">'+I.chart+'<span>Progreso, pulso y records</span></div></div>'+
    formPerfil(p)+'<button class="btn primary wide-btn" id="onb-go">Empezar</button><p class="foot">Podras cambiarlo en Ajustes cuando quieras.</p></div></div>';
  ['pf-comidas','pf-nogusta','pf-reglas'].forEach(wireChips);wireGeo();
  var host=document.getElementById('navhost');if(host){host.innerHTML='';host.dataset.sig='';}
  document.getElementById('onb-go').addEventListener('click',function(){var np=leerPerfil();np.onboarded=true;perfilGuardar(np);location.hash='#/';router();});}


/* ================= CARRERAS Y SESIONES CREADAS POR EL USUARIO ================= */
function slug(t){return String(t).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');}
function perfilPlano(totalKm){var W=1000,H=300,bot=270,top=24;var pts=[];for(var i=0;i<=40;i++){var x=i/40*W;var y=bot-40-Math.sin(i/40*Math.PI*3)*6;pts.push(x.toFixed(1)+','+y.toFixed(1));}
  return {viewBox:[0,0,W,H],line:'M '+pts.join(' L '),area:'M 0,'+bot+' L '+pts.join(' L ')+' L '+W+','+bot+' Z',bot:bot,top:top,minEle:0,maxEle:100,ticks:[[0,'0'],[W/2,String(Math.round(totalKm/2))],[W,String(Math.round(totalKm))]]};}
function generarDias(inicio,fin,nombre){var dias=[],iso=inicio,semana=0,cur=null;
  while(iso<=fin){var d=new Date(iso+'T00:00:00');var dow=d.getDay();
    if(!cur||dow===1){semana++;cur={w:'SEMANA '+semana+' \u00b7 '+fmtShort(iso)};dias.push(cur);}
    var esCarrera=iso===fin;
    dias.push({d:d.getDate(),m:DIAS[dow],ent:esCarrera?nombre.toUpperCase():'Descanso',type:esCarrera?'carrera':'suave',mac:'',menu:[],race:esCarrera?1:0});
    iso=addDays(iso,1);}
  return dias;}
function crearCarrera(f){
  var id=slug(f.nombre)+'-'+f.fecha.slice(0,4);if(window.RACES.some(function(r){return r.id===id;}))id+='-'+Date.now().toString(36).slice(-3);
  var km=parseFloat(String(f.km).replace(',','.'))||10,dplus=parseInt(f.dplus,10)||0;
  var hoy=todayISO();var inicio=f.inicio||hoy;if(inicio>f.fecha)inicio=f.fecha;
  var r={id:id,custom:true,name:f.nombre,nameHTML:esc(f.nombre),kind:f.tipo||'Asfalto',subtitle:f.lugar||'',date:f.fecha,time:f.hora||'09:00',
    planStart:inicio,km:String(Math.round(km)),dplus:'+'+dplus,dist:num(km)+' km',gain:'+'+dplus+' m',estimate:f.objetivo||'-',totalKm:km,
    readout:'<b>Carrera creada por ti.</b> Anade sesiones en cada dia del calendario, carga el recorrido (GPX) en Mapa y ajusta tus ritmos en Ritmos.',
    objective:f.objetivo||'-',objectiveNote:'Define tu objetivo y tus ritmos por tramo.',profile:perfilPlano(km),track:[],jumps:[['Salida',0],['Meta',km]],
    days:generarDias(inicio,f.fecha,f.nombre),zones:[],segs:[],warns:[],gear:null,
    raceDay:{pre:[['3 h antes','Desayuno alto en hidratos, bajo en fibra y grasa.',0],['1 h antes','Mini-toma: platano o gel + agua.',0]],dur:[['Desde el inicio','Bebe a sorbos; ~50-60 g de hidratos por hora si dura mas de 75 min.',1]],post:[['Meta','Recuperador o batido en los primeros 30 min.',0]],tactic:'Sal conservador los 2 primeros km y ve subiendo.'}};
  var C=getJ('custom-races');C[id]=r;setJ('custom-races',C);window.RACES.push(r);return r;}
function cargarCustom(){var C=getJ('custom-races');Object.keys(C).forEach(function(id){if(!window.RACES.some(function(r){return r.id===id;}))window.RACES.push(C[id]);});}
function guardarCustom(race){if(!race.custom)return;var C=getJ('custom-races');var copia={};Object.keys(race).forEach(function(k){if(k.charAt(0)!=='_')copia[k]=race[k];});C[race.id]=copia;setJ('custom-races',C);}
function borrarCarrera(race){var C=getJ('custom-races');delete C[race.id];setJ('custom-races',C);window.RACES=window.RACES.filter(function(r){return r.id!==race.id;});
  var K=KEYS(race.id);['log','meals','checks','gear','result','race'].forEach(function(k){try{store&&store.removeItem(K[k]);}catch(e){}});try{store&&store.removeItem('sessions-'+race.id);store&&store.removeItem('swaps-'+race.id);}catch(e){}}
/* GPX -> perfil y trazado para cualquier carrera */
function perfilDesdePuntos(pts){
  var cum=[0];for(var i=1;i<pts.length;i++){var d=(pts[i].lat!=null&&pts[i-1].lat!=null)?hav(pts[i-1],pts[i]):0;if(d>200)d=0;cum.push(cum[i-1]+d);}
  var total=cum[cum.length-1];if(total<500)throw new Error('El recorrido es demasiado corto');
  var eles=pts.map(function(p){return isNaN(p.ele)?null:p.ele;});var hayEle=eles.some(function(e){return e!=null;});
  var w=8,sm=[];for(i=0;i<pts.length;i++){var lo=Math.max(0,i-w),hi=Math.min(pts.length,i+w+1);var sl=[];for(var j=lo;j<hi;j++)if(eles[j]!=null)sl.push(eles[j]);sm.push(sl.length?sl.reduce(function(a,b){return a+b;},0)/sl.length:0);}
  var mn=Math.min.apply(null,sm),mx=Math.max.apply(null,sm);if(mx-mn<1){mx=mn+1;}
  var gain=[0];for(i=1;i<sm.length;i++){var dd=sm[i]-sm[i-1];gain.push(gain[i-1]+(dd>0?dd:0));}
  var W=1000,H=300,bot=270,top=24,N=200;var line=[],track=[];
  function idxAt(m){var lo2=0,hi2=cum.length-1;while(lo2<hi2){var mid=(lo2+hi2)>>1;if(cum[mid]<m)lo2=mid+1;else hi2=mid;}return lo2;}
  for(i=0;i<=N;i++){var m=i/N*total;var k=idxAt(m);var y=bot-(sm[k]-mn)/(mx-mn)*(bot-top);line.push((i/N*W).toFixed(1)+','+y.toFixed(1));}
  var M=260;for(i=0;i<=M;i++){var mm=i/M*total;var kk=idxAt(mm);track.push([+(mm/1000).toFixed(3),+pts[kk].lat.toFixed(5),+pts[kk].lon.toFixed(5),Math.round(sm[kk]),Math.round(gain[kk])]);}
  var km=total/1000;var ticks=[];var paso=km>25?5:2;for(var t=0;t<=km;t+=paso)ticks.push([+(t/km*W).toFixed(1),String(t)]);
  var maxI=sm.indexOf(mx);var techoKm=cum[maxI]/1000;
  return {profile:{viewBox:[0,0,W,H],line:'M '+line.join(' L '),area:'M 0,'+bot+' L '+line.join(' L ')+' L '+W+','+bot+' Z',bot:bot,top:top,minEle:Math.round(mn),maxEle:Math.round(mx),ticks:ticks,
      techo:hayEle&&mx-mn>30?{x:+(techoKm/km*W).toFixed(1),y:+(top).toFixed(1),label:Math.round(mx).toLocaleString('es-ES')+' m \u00b7 km '+techoKm.toFixed(1)}:null},
    track:track,totalKm:+km.toFixed(2),gain:Math.round(gain[gain.length-1]),techoKm:techoKm};}
function adjuntarRecorrido(race,texto){var pts=parseActivity(texto).filter(function(p){return p.lat!=null;});var r=perfilDesdePuntos(pts);
  race.profile=r.profile;race.track=r.track;race.totalKm=r.totalKm;race.km=String(Math.round(r.totalKm));race.dist=num(r.totalKm)+' km';
  race.dplus='+'+r.gain;race.gain='+'+r.gain+' m';race.jumps=[['Salida',0]].concat(r.techoKm>0.5&&r.techoKm<r.totalKm-0.5?[['Techo',+r.techoKm.toFixed(1)]]:[]).concat([['Meta',+(r.totalKm-0.05).toFixed(1)]]);
  race._proj=null;guardarCustom(race);}
/* sesiones editadas por el usuario (para cualquier carrera) */
function sesionesDe(race){return getJ('sessions-'+race.id);}
function aplicarSesiones(race){var S=sesionesDe(race);race.days.forEach(function(x){if(x.w||x.race)return;var o=S[x.iso];
  if(o){x.ent=o.ent;x.type=o.type||'medio';x.planKm=o.km||0;x.isTraining=x.planKm>0;x.editada=true;}
  else if(x._entOrig!=null){x.ent=x._entOrig;x.type=x._typeOrig;x.planKm=x._planOrig;x.isTraining=x.planKm>0;x.editada=false;}});}
function editarSesion(race,dia,alRefrescar){
  var S=sesionesDe(race);var o=S[dia.iso]||{ent:dia.editada?dia.ent:(dia.isTraining?dia.ent:''),type:dia.type==='carga'?'suave':dia.type,km:dia.planKm||''};
  var tipos=[['suave','Descanso / suave'],['medio','Rodaje'],['fuerte','Fuerte']];
  var h=abrirHoja('Sesion del '+fmtShort(dia.iso),'Que te toca ese dia',
    '<div class="lb-grid"><label class="wide">Sesion<input type="text" id="se-ent" value="'+esc(o.ent)+'" placeholder="Ej: Rodaje facil 8 km"></label>'+
    '<label>Km previstos<input type="text" inputmode="decimal" id="se-km" value="'+esc(o.km)+'" placeholder="8"></label>'+
    '<label>Tipo de dia<select id="se-type">'+tipos.map(function(t){return '<option value="'+t[0]+'"'+(o.type===t[0]?' selected':'')+'>'+t[1]+'</option>';}).join('')+'</select></label></div>'+
    '<div class="td-actions" style="margin-top:12px"><button class="btn primary" id="se-save">Guardar</button>'+(S[dia.iso]?'<button class="btn" id="se-del">Quitar cambio</button>':'')+'</div>');
  h.querySelector('#se-save').addEventListener('click',function(){var ent=h.querySelector('#se-ent').value.trim();var km=parseFloat(h.querySelector('#se-km').value.replace(',','.'))||0;var type=h.querySelector('#se-type').value;
    if(!ent){toast('Escribe la sesion');return;}S[dia.iso]={ent:ent,km:km,type:type};setJ('sessions-'+race.id,S);cerrarHoja();toast('Sesion guardada');alRefrescar&&alRefrescar();});
  var d=h.querySelector('#se-del');if(d)d.addEventListener('click',function(){delete S[dia.iso];setJ('sessions-'+race.id,S);cerrarHoja();alRefrescar&&alRefrescar();});}
function renderNuevaCarrera(){clearTimer();
  app().innerHTML='<div class="view"><button class="backfab static" data-go="#/ajustes">'+I.back+'</button><header class="home-head"><div class="kicker">Nueva</div><h1>Anadir <span class="devil">carrera</span></h1><div class="meta">Con los datos basicos ya tienes cuenta atras, dia D, material y resultado. Luego podras cargar el recorrido.</div></header><div class="wrap content">'+
    '<div class="card"><div class="lb-grid"><label class="wide">Nombre<input type="text" id="nc-nombre" placeholder="Ej: San Silvestre Salmantina"></label>'+
    '<label>Fecha<input type="date" id="nc-fecha" value="'+addDays(todayISO(),30)+'"></label><label>Hora de salida<input type="time" id="nc-hora" value="10:00"></label>'+
    '<label>Distancia (km)<input type="text" inputmode="decimal" id="nc-km" placeholder="10"></label><label>Desnivel + (m)<input type="text" inputmode="numeric" id="nc-dplus" placeholder="50"></label>'+
    '<label class="wide">Lugar<input type="text" id="nc-lugar" placeholder="Salamanca"></label>'+
    '<label>Tipo<select id="nc-tipo"><option>Asfalto</option><option>Trail</option><option>Cross</option><option>Pista</option></select></label>'+
    '<label>Objetivo<input type="text" id="nc-obj" placeholder="~40 min"></label>'+
    '<label class="wide">Empezar el plan el<input type="date" id="nc-inicio" value="'+todayISO()+'"></label></div></div>'+
    '<button class="btn primary wide-btn" id="nc-go">Crear carrera</button></div></div>';
  mountHomeNav('ajustes');
  document.getElementById('nc-go').addEventListener('click',function(){var g=function(id){return document.getElementById(id).value.trim();};
    if(!g('nc-nombre')||!g('nc-fecha')){toast('Nombre y fecha son obligatorios');return;}
    var r=crearCarrera({nombre:g('nc-nombre'),fecha:g('nc-fecha'),hora:g('nc-hora'),km:g('nc-km'),dplus:g('nc-dplus'),lugar:g('nc-lugar'),tipo:g('nc-tipo'),objetivo:g('nc-obj'),inicio:g('nc-inicio')});
    toast('Carrera creada');location.hash='#/race/'+r.id;});}

/* ================= SUSTITUCIONES DE COMIDAS ================= */
/* Respetan tus normas: sin tomate, verdura solo en crema/pure, sin datiles,
   sin manzanilla, sin atun, crema de cacahuete, gambas ni salmon ahumado. */
var SWAPS=[
 {re:/(crema|pure)\s+de\s+[a-z\u00e0-\u00fa\-\s]+?(?=\s*\+|\s*\.|,|$)/i,tipo:'Verdura en crema',nota:'Mismo papel: verdura en textura suave',
  opts:['crema de calabaza','crema de calabacin','crema de puerro','crema de zanahoria','crema de espinacas','crema de calabaza y zanahoria','pure de patata y guisantes','caldo de verduras con fideos finos','crema de champinones']},
 {re:/\b\d*\s*g?\s*(arroz blanco|arroz|pasta blanca|pasta|patata panadera|patata cocida|patata|boniato asado|boniato|cuscus)\b/i,tipo:'Hidrato de la comida',nota:'Cantidades equivalentes en energia',
  opts:['60 g de arroz (en seco)','70 g de pasta (en seco)','200 g de patata cocida','200 g de boniato asado','60 g de cuscus (en seco)','200 g de patata panadera']},
 {re:/\b\d*\s*g?\s*(pechuga de pollo|pollo desmenuzado|pollo|pavo a la plancha|pavo|ternera magra|ternera|lomo de cerdo magro|lomo de cerdo|merluza|pescado azul \(caballa o sardina\)|pescado azul|caballa|sardina)\b/i,tipo:'Proteina',nota:'Mismo aporte de proteina',
  opts:['150 g de pechuga de pollo','150 g de pavo a la plancha','150 g de ternera magra','150 g de lomo de cerdo magro','180 g de merluza','150 g de pescado azul (caballa o sardina)','2 huevos + 1 clara','150 g de bacalao fresco']},
 {re:/\b(yogur griego|queso batido\/requeson|queso batido|requeson|yogur natural)\b/i,tipo:'Lacteo',nota:'Similar en proteina',
  opts:['200 g de yogur griego','200 g de queso batido','200 g de requeson','2 yogures naturales','200 g de skyr']},
 {re:/\b\d*\s*g?\s*(copos de avena|avena|granola|biscotes integrales|biscotes|pan integral|pan blanco|pan)\b/i,tipo:'Cereal del desayuno',nota:'Equivalente en hidratos',
  opts:['40 g de copos de avena','40 g de granola','2 biscotes integrales','1 tostada de pan integral','1 tostada de pan blanco','40 g de cereales sin azucar']},
 {re:/\b(1 platano maduro|1 platano pequeno|1 platano|platano|1 manzana|manzana asada con canela|manzana|1 pera|pera|1 kiwi|kiwi|arandanos|compota de manzana)\b/i,tipo:'Fruta',nota:'Cambia sin problema',
  opts:['1 platano','1 manzana','1 pera','1 kiwi','2 mandarinas','1 melocoton','un punado de arandanos','compota de manzana']},
 {re:/\b\d*\s*g?\s*(nueces|almendras|pipas de girasol|frutos secos)\b/i,tipo:'Frutos secos',nota:'Misma grasa buena',
  opts:['15 g de nueces','20 g de almendras','15 g de anacardos','20 g de avellanas','15 g de pipas de girasol']},
 {re:/\b\d*\s*g?\s*(jamon serrano|jamon|queso fresco|queso)\b/i,tipo:'Embutido o queso',nota:'Equivalente',
  opts:['30 g de jamon serrano','40 g de pavo en lonchas','30 g de queso fresco','30 g de queso curado','2 lonchas de jamon cocido']},
 {re:/\b(tortilla de 2 huevos|tortilla francesa de 1 huevo|revuelto de 2 huevos|2 huevos|1 huevo cocido|1 huevo)\b/i,tipo:'Huevo',nota:'Mismo aporte',
  opts:['tortilla de 2 huevos','revuelto de 2 huevos','2 huevos cocidos','2 huevos a la plancha','tortilla francesa de 1 huevo']},
 {re:/\b(miel|mermelada)\b/i,tipo:'Dulce',nota:'Hidrato rapido',opts:['miel','mermelada','1 cdta de azucar moreno','canela y un poco de miel']},
];
function swapStore(id){return 'swaps-'+id;}
function swapsOf(raceId,iso){var S=getJ(swapStore(raceId));return (S[iso]||{});}
function mealText(raceId,iso,i,original){var o=swapsOf(raceId,iso)[i];return o||original;}
function detectar(texto){
  var hallados=[];
  SWAPS.forEach(function(g){var m=texto.match(g.re);if(m)hallados.push({grupo:g,encontrado:m[0].trim()});});
  return hallados;}
/* --- hoja inferior estilo iOS --- */
function cerrarHoja(){var h=document.getElementById('sheet');if(!h)return;h.classList.remove('on');document.body.classList.remove('sheet-open');setTimeout(function(){h.remove();},280);}
function abrirHoja(titulo,subtitulo,contenidoHTML){
  cerrarHoja();
  var h=document.createElement('div');h.id='sheet';h.className='sheet';
  h.innerHTML='<div class="sheet-bg"></div><div class="sheet-card"><div class="sheet-grip"></div>'+
    '<div class="sheet-h"><div class="sheet-t">'+titulo+'</div>'+(subtitulo?'<div class="sheet-s">'+subtitulo+'</div>':'')+'</div>'+
    '<div class="sheet-body">'+contenidoHTML+'</div><button class="btn wide-btn sheet-close">Cerrar</button></div>';
  document.body.appendChild(h);
  document.body.classList.add('sheet-open');
  requestAnimationFrame(function(){h.classList.add('on');});
  h.querySelector('.sheet-bg').addEventListener('click',cerrarHoja);
  h.querySelector('.sheet-close').addEventListener('click',cerrarHoja);
  /* arrastrar hacia abajo para cerrar (desde el asa o cuando el contenido esta arriba del todo) */
  var card=h.querySelector('.sheet-card'),y0=null,dy=0,ok=false;
  card.addEventListener('touchstart',function(e){y0=e.touches[0].clientY;dy=0;ok=card.scrollTop<=0||e.target.closest('.sheet-grip,.sheet-h');card.style.transition='none';},{passive:true});
  card.addEventListener('touchmove',function(e){if(y0==null||!ok)return;dy=e.touches[0].clientY-y0;if(dy>0){if(e.cancelable)e.preventDefault();card.style.transform='translateY('+dy+'px)';}},{passive:false});
  card.addEventListener('touchend',function(){if(y0==null)return;card.style.transition='';if(dy>90){cerrarHoja();}else{card.style.transform='';}y0=null;},{passive:true});
  return h;}
function abrirCambio(race,dia,i,original,alRefrescar){
  var actual=mealText(race.id,dia.iso,i,original);
  var hallados=detectar(actual);
  var cambiado=!!swapsOf(race.id,dia.iso)[i];
  var cuerpo='';
  if(!hallados.length){cuerpo='<p class="sheet-empty">No he encontrado nada que cambiar aqui. Puedes anotarlo en las notas del dia.</p>';}
  hallados.forEach(function(h,gi){
    var opciones=h.grupo.opts.filter(function(o){return o.toLowerCase().replace(/\d+\s*g\s*de\s*/,'')!==h.encontrado.toLowerCase();});
    cuerpo+='<div class="swap-g"><div class="swap-h"><span class="swap-tipo">'+h.grupo.tipo+'</span><span class="swap-act">ahora: '+esc(h.encontrado)+'</span></div>'+
      '<div class="swap-nota">'+h.grupo.nota+'</div><div class="swap-opts">'+
      opciones.map(function(o){return '<button class="swap-o" data-g="'+gi+'" data-o="'+esc(o)+'">'+esc(o)+'</button>';}).join('')+
      '</div></div>';});
  if(cambiado)cuerpo+='<button class="btn wide-btn swap-reset">Volver a la comida original</button>';
  var h=abrirHoja('Cambiar esta comida','Opciones equivalentes que respetan tus normas',cuerpo);
  [].forEach.call(h.querySelectorAll('.swap-o'),function(b){b.addEventListener('click',function(){
    var g=hallados[parseInt(b.dataset.g,10)];var nuevo=b.dataset.o;
    var texto=mealText(race.id,dia.iso,i,original);
    var reemplazo=texto.replace(g.grupo.re,nuevo);
    var S=getJ(swapStore(race.id));S[dia.iso]=S[dia.iso]||{};S[dia.iso][i]=reemplazo;setJ(swapStore(race.id),S);
    buzz();cerrarHoja();toast('Cambiado por '+nuevo);alRefrescar&&alRefrescar();});});
  var r=h.querySelector('.swap-reset');
  if(r)r.addEventListener('click',function(){var S=getJ(swapStore(race.id));if(S[dia.iso]){delete S[dia.iso][i];setJ(swapStore(race.id),S);}
    cerrarHoja();toast('Vuelta a la original');alRefrescar&&alRefrescar();});}

/* ================= IMPORTAR ENTRENO (GPX / TCX) ================= */
function tagsLocal(root,name){var out=[],all=root.getElementsByTagName('*');
  for(var i=0;i<all.length;i++){var t=all[i].tagName,c=t.indexOf(':');if((c>=0?t.slice(c+1):t)===name)out.push(all[i]);}return out;}
function firstLocal(el,name){var r=tagsLocal(el,name);return r.length?r[0]:null;}
function txt(el){return el?el.textContent.trim():null;}
function hav(a,b){var R=6371000,r=Math.PI/180;var la1=a.lat*r,la2=b.lat*r,dla=(b.lat-a.lat)*r,dlo=(b.lon-a.lon)*r;
  var x=Math.sin(dla/2)*Math.sin(dla/2)+Math.cos(la1)*Math.cos(la2)*Math.sin(dlo/2)*Math.sin(dlo/2);
  return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));}
function parseActivity(text){
  var doc=new DOMParser().parseFromString(text,'application/xml');
  if(firstLocal(doc,'parsererror'))throw new Error('Archivo no valido');
  var pts=[],tp=tagsLocal(doc,'trkpt');
  if(tp.length){ /* GPX */
    tp.forEach(function(p){var la=parseFloat(p.getAttribute('lat')),lo=parseFloat(p.getAttribute('lon'));
      if(isNaN(la)||isNaN(lo))return;
      var hrEl=firstLocal(p,'hr');
      pts.push({lat:la,lon:lo,ele:parseFloat(txt(firstLocal(p,'ele'))),t:Date.parse(txt(firstLocal(p,'time'))||''),hr:hrEl?parseInt(txt(hrEl),10):null,d:null});});
  }else{ /* TCX */
    tagsLocal(doc,'Trackpoint').forEach(function(p){
      var pos=firstLocal(p,'Position');var la=pos?parseFloat(txt(firstLocal(pos,'LatitudeDegrees'))):NaN,lo=pos?parseFloat(txt(firstLocal(pos,'LongitudeDegrees'))):NaN;
      var hrEl=firstLocal(p,'HeartRateBpm');var dm=txt(firstLocal(p,'DistanceMeters'));
      pts.push({lat:isNaN(la)?null:la,lon:isNaN(lo)?null:lo,ele:parseFloat(txt(firstLocal(p,'AltitudeMeters'))),
        t:Date.parse(txt(firstLocal(p,'Time'))||''),hr:hrEl?parseInt(txt(firstLocal(hrEl,'Value')),10):null,d:dm?parseFloat(dm):null});});
  }
  pts=pts.filter(function(p){return p.t&&!isNaN(p.t);});
  if(pts.length<2)throw new Error('El archivo no tiene puntos con hora');
  return pts;}
function analyze(pts){
  var hasPos=pts.some(function(p){return p.lat!=null;});
  var cum=[0];
  for(var i=1;i<pts.length;i++){var d;
    if(pts[i].d!=null&&pts[i-1].d!=null)d=Math.max(0,pts[i].d-pts[i-1].d);
    else if(hasPos&&pts[i].lat!=null&&pts[i-1].lat!=null)d=hav(pts[i-1],pts[i]);else d=0;
    if(d>200)d=0; cum.push(cum[i-1]+d);}
  var total=cum[cum.length-1];
  var sec=Math.round((pts[pts.length-1].t-pts[0].t)/1000);
  /* pausas largas fuera del tiempo en movimiento */
  var mov=0;for(i=1;i<pts.length;i++){var dt=(pts[i].t-pts[i-1].t)/1000;if(dt>0&&dt<25)mov+=dt;}
  var hrs=pts.map(function(p){return p.hr;}).filter(function(h){return h&&h>30&&h<230;});
  var hrAvg=hrs.length?Math.round(hrs.reduce(function(a,b){return a+b;},0)/hrs.length):null;
  var hrMax=hrs.length?Math.max.apply(null,hrs):null;
  var eles=pts.map(function(p){return p.ele;}).filter(function(e){return e!=null&&!isNaN(e);});
  var gain=null;
  if(eles.length>5){var w=6,sm=[];for(i=0;i<eles.length;i++){var lo2=Math.max(0,i-w),hi=Math.min(eles.length,i+w+1);var sl=eles.slice(lo2,hi);sm.push(sl.reduce(function(a,b){return a+b;},0)/sl.length);}
    gain=0;for(i=1;i<sm.length;i++){var dd=sm[i]-sm[i-1];if(dd>0)gain+=dd;}gain=Math.round(gain);}
  /* parciales por km */
  var splits=[],nextKm=1000,lastT=pts[0].t,acc=[],hrAcc=[];
  for(i=1;i<pts.length;i++){if(pts[i].hr)hrAcc.push(pts[i].hr);
    while(cum[i]>=nextKm&&nextKm<=total){var frac=(nextKm-cum[i-1])/((cum[i]-cum[i-1])||1);
      var tAt=pts[i-1].t+(pts[i].t-pts[i-1].t)*frac;
      splits.push({k:Math.round(nextKm/1000),sec:Math.round((tAt-lastT)/1000),hr:hrAcc.length?Math.round(hrAcc.reduce(function(a,b){return a+b;},0)/hrAcc.length):null});
      lastT=tAt;hrAcc=[];nextKm+=1000;}}
  var restM=total-(splits.length*1000);
  if(restM>150)splits.push({k:+(total/1000).toFixed(2),sec:Math.round((pts[pts.length-1].t-lastT)/1000),hr:hrAcc.length?Math.round(hrAcc.reduce(function(a,b){return a+b;},0)/hrAcc.length):null,part:true});
  var route=[];
  if(hasPos){var ok=pts.filter(function(p){return p.lat!=null;});var N=Math.min(140,ok.length);
    for(i=0;i<N;i++){var q=ok[Math.floor(i/(N-1||1)*(ok.length-1))];route.push([+q.lat.toFixed(5),+q.lon.toFixed(5)]);}}
  return {km:+(total/1000).toFixed(2),sec:sec,mov:Math.round(mov),hrAvg:hrAvg,hrMax:hrMax,gain:gain,splits:splits,route:route,
    date:toISO(new Date(pts[0].t)),hora:new Date(pts[0].t).toTimeString().slice(0,5),n:pts.length};}
function routeMini(route){
  if(!route||route.length<2)return '';
  var lat0=route[0][0]*Math.PI/180,cx=Math.cos(lat0);
  var xs=route.map(function(p){return p[1]*cx;}),ys=route.map(function(p){return -p[0];});
  var mnx=Math.min.apply(null,xs),mxx=Math.max.apply(null,xs),mny=Math.min.apply(null,ys),mxy=Math.max.apply(null,ys);
  var W=600,H=300,pad=24;var s=Math.min((W-2*pad)/((mxx-mnx)||1e-9),(H-2*pad)/((mxy-mny)||1e-9));
  var ox=pad+((W-2*pad)-(mxx-mnx)*s)/2,oy=pad+((H-2*pad)-(mxy-mny)*s)/2;
  var d='M '+route.map(function(p,i){return (ox+(xs[i]-mnx)*s).toFixed(1)+','+(oy+(ys[i]-mny)*s).toFixed(1);}).join(' L ');
  return '<svg class="imp-route" viewBox="0 0 '+W+' '+H+'"><path d="'+d+'" class="rt-shadow"/><path d="'+d+'" class="rt-line"/></svg>';}
function splitsChart(sp){
  if(!sp.length)return '';
  var paces=sp.map(function(x){return x.sec;});var mx=Math.max.apply(null,paces),mn=Math.min.apply(null,paces);
  return '<div class="splits">'+sp.map(function(x){
    var w=mx>mn?18+(x.sec-mn)/(mx-mn)*72:60;
    return '<div class="sp"><span class="sk">'+(x.part?'\u21b3':'km '+x.k)+'</span><span class="sb"><i style="width:'+w.toFixed(0)+'%"></i></span><span class="sv">'+fmtPace(x.sec,x.part?1:1).replace(' /km','')+'</span>'+(x.hr?'<span class="sh">'+x.hr+'</span>':'')+'</div>';}).join('')+'</div>';}
var IMP=null;
function renderImport(preIso){clearTimer();var race=featuredRace();if(race)prep(race);
  var html='<div class="view"><header class="home-head"><div class="kicker">Registro automatico</div><h1>Importar <span class="devil">entreno</span></h1><div class="meta">GPX o TCX de Strava, Runna, Garmin, Polar...</div></header><div class="wrap content">'+
   '<label class="dropzone" id="dz">'+I.up+'<span class="dz-t">Elegir archivo</span><span class="dz-s">.gpx o .tcx</span><input type="file" id="file" accept=".gpx,.tcx,.xml,application/gpx+xml,text/xml" hidden></label>'+
   '<div id="impout"></div>'+
   '<details class="prefs" style="margin-top:12px"><summary>Como saco el archivo</summary><div class="prefs-in">'+
   '<p class="pf-note" style="margin:0 0 8px"><b>Desde Runna:</b> el entreno se sincroniza solo con Strava (Ajustes &rarr; Conexiones).</p>'+
   '<p class="pf-note" style="margin:0 0 8px"><b>Desde Strava (movil):</b> abre la actividad &rarr; los tres puntos &rarr; <b>Exportar GPX</b>. Guardalo en Archivos y elígelo aqui.</p>'+
   '<p class="pf-note" style="margin:0"><b>Con el Polar H10:</b> si grabas con el pulsometro emparejado, el archivo trae las pulsaciones y las veras aqui (media, maxima y por kilometro). El TCX de Strava las conserva mejor que el GPX.</p>'+
   '</div></details></div></div>';
  app().innerHTML=html;window.scrollTo(0,0);mountNav('home',HOME_TABS,function(k){var t=HOME_TABS.filter(function(x){return x.key===k;})[0];if(t)location.hash=t.route;},'progreso');
  var dz=document.getElementById('dz'),fi=document.getElementById('file'),out=document.getElementById('impout');
  function handle(file){if(!file)return;out.innerHTML='<div class="card"><p class="lead" style="margin:0">Leyendo '+esc(file.name)+'...</p></div>';
    var rd=new FileReader();
    rd.onload=function(){try{var A=analyze(parseActivity(rd.result));IMP=A;showResult(A,file.name);}catch(err){out.innerHTML='<div class="card"><p class="lead" style="margin:0;color:#ff8a7a">No he podido leerlo: '+esc(err.message)+'</p></div>';}};
    rd.onerror=function(){out.innerHTML='<div class="card"><p class="lead" style="margin:0">Error leyendo el archivo</p></div>';};
    rd.readAsText(file);}
  fi.addEventListener('change',function(e){handle(e.target.files[0]);});
  dz.addEventListener('dragover',function(e){e.preventDefault();dz.classList.add('over');});
  dz.addEventListener('dragleave',function(){dz.classList.remove('over');});
  dz.addEventListener('drop',function(e){e.preventDefault();dz.classList.remove('over');handle(e.dataTransfer.files[0]);});
  function showResult(A,fname){
    var opts='';var match=preIso||A.date;
    if(race)race.days.forEach(function(x){if(x.w||x.race)return;opts+='<option value="'+x.iso+'"'+(x.iso===match?' selected':'')+'>'+fmtShort(x.iso)+' - '+esc(x.ent)+'</option>';});
    out.innerHTML='<div class="card imp-card"><div class="cc-h">'+I.check+' '+esc(fname)+'</div>'+
      '<div class="imp-grid"><div><span class="ok2">distancia</span><b>'+num(A.km)+'<small> km</small></b></div>'+
      '<div><span class="ok2">tiempo</span><b>'+fmtDur(A.mov||A.sec)+'</b></div>'+
      '<div><span class="ok2">ritmo medio</span><b>'+fmtPace(A.mov||A.sec,A.km).replace(' /km','')+'<small> /km</small></b></div>'+
      (A.gain!=null?'<div><span class="ok2">desnivel +</span><b>'+A.gain+'<small> m</small></b></div>':'')+
      (A.hrAvg?'<div><span class="ok2">FC media</span><b class="hr">'+A.hrAvg+'<small> ppm</small></b></div>':'')+
      (A.hrMax?'<div><span class="ok2">FC maxima</span><b class="hr">'+A.hrMax+'<small> ppm</small></b></div>':'')+
      '</div>'+routeMini(A.route)+
      (A.splits.length?'<div class="cc-h" style="margin-top:12px">'+I.ritmos+' Parciales'+(A.hrAvg?' <span>ritmo / ppm</span>':'')+'</div>'+splitsChart(A.splits):'')+
      '<div class="imp-save"><label class="imp-day"><span class="pf-h">GUARDAR EN</span><select id="impday">'+(opts||'<option>Sin plan</option>')+'</select></label>'+
      '<button class="btn primary" id="impsave">Guardar entreno</button></div>'+
      '<p class="pf-note">Detectado el '+fmtDate(A.date)+' a las '+A.hora+' &middot; '+A.n+' puntos'+(A.hrAvg?' &middot; con pulsometro':'')+'</p></div>';
    var sv=document.getElementById('impsave');
    if(sv)sv.addEventListener('click',function(){if(!race)return;var iso=document.getElementById('impday').value;
      var L=getJ(KEYS(race.id).log);var prev=L[iso]||{};
      L[iso]={km:num(A.km),tiempo:fmtDur(A.mov||A.sec),notas:prev.notas||'',hecho:true,
        hrAvg:A.hrAvg,hrMax:A.hrMax,gain:A.gain,splits:A.splits,route:A.route,src:'import'};
      setJ(KEYS(race.id).log,L);toast('Entreno guardado en '+fmtShort(iso));
      setTimeout(function(){location.hash='#/progreso';},700);});}
  if(preIso)toast('Elige el archivo del '+fmtShort(preIso));}





/* ================= GRAFICAS DE EVOLUCION ================= */
function lineChart(pts,opt){opt=opt||{};if(!pts.length)return '<p class="pf-note">Sin datos aun.</p>';
  var W=600,H=opt.h||150,pad=opt.pad||{t:12,r:10,b:20,l:10};
  var ys=pts.map(function(p){return p.y;});var mn=opt.min!=null?opt.min:Math.min.apply(null,ys),mx=opt.max!=null?opt.max:Math.max.apply(null,ys);
  if(mx===mn){mx=mn+1;mn=mn-1;}var rg=mx-mn;
  var iw=W-pad.l-pad.r,ih=H-pad.t-pad.b;
  var X=function(i){return pad.l+(pts.length<2?iw/2:i/(pts.length-1)*iw);};
  var Y=function(v){return pad.t+ih-(v-mn)/rg*ih;};
  var d=pts.map(function(p,i){return (i?'L':'M')+X(i).toFixed(1)+' '+Y(p.y).toFixed(1);}).join(' ');
  var area='M'+X(0).toFixed(1)+' '+(pad.t+ih)+' '+pts.map(function(p,i){return 'L'+X(i).toFixed(1)+' '+Y(p.y).toFixed(1);}).join(' ')+'L'+X(pts.length-1).toFixed(1)+' '+(pad.t+ih)+'Z';
  var col=opt.color||'#ff5a2c';var id='g'+Math.random().toString(36).slice(2,7);
  var dots=pts.map(function(p,i){return '<circle cx="'+X(i).toFixed(1)+'" cy="'+Y(p.y).toFixed(1)+'" r="3.5" fill="'+col+'"/>';}).join('');
  var labs=pts.map(function(p,i){return (i%Math.ceil(pts.length/6||1)===0||i===pts.length-1)?'<text x="'+X(i).toFixed(1)+'" y="'+(H-6)+'" text-anchor="middle" class="lc-x">'+p.x+'</text>':'';}).join('');
  var tline=opt.target!=null&&opt.target>=mn&&opt.target<=mx?'<line x1="'+pad.l+'" y1="'+Y(opt.target).toFixed(1)+'" x2="'+(W-pad.r)+'" y2="'+Y(opt.target).toFixed(1)+'" class="lc-target"/>':'';
  return '<svg class="lchart" viewBox="0 0 '+W+' '+H+'"><defs><linearGradient id="'+id+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+col+'" stop-opacity=".28"/><stop offset="1" stop-color="'+col+'" stop-opacity="0"/></linearGradient></defs>'+
    tline+'<path d="'+area+'" fill="url(#'+id+')"/><path d="'+d+'" fill="none" stroke="'+col+'" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>'+dots+labs+'</svg>';}
function serieSemanal(){ /* km hechos y ritmo medio por semana ISO, ultimas 8 con datos */
  var byWeek={};window.RACES.forEach(function(r){prep(r);var L=getJ(KEYS(r.id).log);Object.keys(L).forEach(function(iso){var l=L[iso];if(!l.hecho)return;var km=parseFloat(String(l.km||'').replace(',','.'))||0;if(!km)return;
    var d=new Date(iso+'T00:00:00');var on=(d.getDay()+6)%7;var lun=addDays(iso,-on);var o=byWeek[lun]||{km:0,sec:0,skm:0};o.km+=km;var sec=parseTime(l.tiempo);if(sec){o.sec+=sec;o.skm+=km;}byWeek[lun]=o;});});
  return Object.keys(byWeek).sort().slice(-8).map(function(k){var o=byWeek[k];return {iso:k,km:o.km,pace:o.skm?o.sec/o.skm:null};});}
function serie(clave){ /* peso o fc reposo: [{iso,v}] */
  var raw=getJ(clave);return Object.keys(raw).sort().map(function(iso){return {iso:iso,v:parseFloat(raw[iso])};}).filter(function(p){return !isNaN(p.v);});}
function renderEvolucion(){clearTimer();var Pf=P();
  var sem=serieSemanal();var peso=serie('weight');var fcr=serie('fcreposo');
  var kmPts=sem.map(function(w){return {x:fmtShort(w.iso).replace(/ .*/,''),y:Math.round(w.km)};});
  var pacePts=sem.filter(function(w){return w.pace;}).map(function(w){return {x:fmtShort(w.iso).replace(/ .*/,''),y:Math.round(w.pace)};});
  var target=parseFloat(String(Pf.peso||'').replace(',','.'))||null;
  var html='<div class="view"><button class="backfab static" data-go="#/progreso">'+I.back+'</button><header class="home-head"><div class="kicker">Progreso</div><h1>Mi <span class="devil">evolucion</span></h1></header><div class="wrap content">'+
    '<div class="card"><div class="cc-h">'+I.chart+' Volumen semanal <span>km hechos</span></div>'+lineChart(kmPts,{color:'#ff5a2c',min:0})+'</div>'+
    '<div class="card"><div class="cc-h">'+I.ritmos+' Ritmo medio <span>min/km por semana</span></div>'+(pacePts.length?lineChart(pacePts,{color:'#4fa76e'})+'<p class="pf-note">Mas abajo = mas rapido. '+(pacePts.length>1?'De '+fmtDur(pacePts[0].y)+' a '+fmtDur(pacePts[pacePts.length-1].y)+' /km.':'')+'</p>':'<p class="pf-note">Registra entrenos con tiempo para ver tu ritmo.</p>')+'</div>'+
    '<div class="card"><div class="cc-h">'+I.scale+' Peso <span>'+(target?'objetivo '+num(target):'kg')+'</span></div>'+(peso.length?lineChart(peso.map(function(p){return {x:fmtShort(p.iso).replace(/ .*/,''),y:p.v};}),{color:'#ecb63f',target:target})+'<p class="pf-note">'+(peso.length>1?(peso[peso.length-1].v-peso[0].v>0?'+':'')+num(peso[peso.length-1].v-peso[0].v)+' kg desde el inicio.':'Ve apuntando en Cuerpo para ver la tendencia.')+'</p>':'<p class="pf-note">Apunta tu peso en Progreso &rarr; Cuerpo.</p>')+'</div>'+
    '<div class="card"><div class="cc-h">'+I.fire+' FC en reposo <span>ppm al despertar</span></div><div class="wt-row"><input type="text" inputmode="numeric" id="fcr-in" placeholder="'+(fcr.length?fcr[fcr.length-1].v:'48')+'"><span class="wt-u">ppm hoy</span><button class="btn primary sm" id="fcr-save">Guardar</button></div>'+(fcr.length?lineChart(fcr.map(function(p){return {x:fmtShort(p.iso).replace(/ .*/,''),y:p.v};}),{color:'#6f8fae'})+'<p class="pf-note">Si sube varios dias seguidos, tu cuerpo pide descanso.</p>':'<p class="pf-note">Tomatelas nada mas despertar, tumbado. Es el mejor aviso de fatiga.</p>')+'</div>'+
    '</div></div>';
  app().innerHTML=html;window.scrollTo(0,0);mountHomeNav('progreso');
  var b=document.getElementById('fcr-save');if(b)b.addEventListener('click',function(){var v=parseInt(document.getElementById('fcr-in').value,10);if(!v)return;var F=getJ('fcreposo');F[todayISO()]=v;setJ('fcreposo',F);toast('FC en reposo guardada');renderEvolucion();});}

function logros(){var kmTot=0,nHr=0,masL=0,res=0,sk=0;
  window.RACES.forEach(function(r){prep(r);var L=getJ(KEYS(r.id).log);Object.keys(L).forEach(function(iso){var l=L[iso];if(!l.hecho)return;var km=parseFloat(String(l.km||'').replace(',','.'))||0;kmTot+=km;if(l.hrAvg)nHr++;if(km>masL)masL=km;});var v=streak(r);if(v>sk)sk=v;if(resultOf(r.id))res++;});
  var out=[];if(kmTot>0)out.push(['\ud83d\udc5f',Math.round(kmTot)+' km','acumulados']);if(sk>=2)out.push(['\ud83d\udd25',sk+' dias','de racha']);if(masL)out.push(['\ud83c\udfc3',num(masL)+' km','tu mas largo']);if(nHr)out.push(['\u2764\ufe0f',nHr,'con pulsometro']);if(res)out.push(['\ud83c\udfc6',res,res===1?'carrera hecha':'carreras hechas']);return out;}

/* ================= BALANCE NUTRICIONAL DEL DIA ================= */
function objetivoDia(race,dia){ /* kcal e HC objetivo del dia, del mac del plan */
  if(dia&&dia.mac){var kc=parseInt(String(dia.mac).replace(/[.\s]/g,'').match(/(\d+)kcal/i)?RegExp.$1:'0',10);var hc=(String(dia.mac).match(/HC\s*(\d+)/i)||[])[1];return {kcal:kc||null,hc:hc?parseInt(hc,10):null};}
  return {kcal:null,hc:null};}
function gastoEntreno(l,peso){if(!l||!l.hecho)return 0;var km=parseFloat(String(l.km||'').replace(',','.'))||0;if(!km)return 0;var p=peso||60;var sub=(l.gain||0)*p*0.0018;return Math.round(km*p*0.95+sub);}
function balanceDia(race,dia){
  var meals=getJ(KEYS(race.id).meals)[dia.iso]||{};var n=dia.menu?dia.menu.length:0;var hechas=Object.keys(meals).filter(function(k){return meals[k];}).length;
  var obj=objetivoDia(race,dia);var frac=n?hechas/n:0;
  var consumidoKcal=obj.kcal?Math.round(obj.kcal*frac):null;var consumidoHC=obj.hc?Math.round(obj.hc*frac):null;
  var l=getJ(KEYS(race.id).log)[dia.iso];var gasto=gastoEntreno(l,pesoNum());
  return {obj:obj,hechas:hechas,n:n,frac:frac,consumidoKcal:consumidoKcal,consumidoHC:consumidoHC,gasto:gasto};}
function anillo(pct,color,size){size=size||64;var r=(size-8)/2,c=2*Math.PI*r,off=c*(1-Math.max(0,Math.min(1,pct)));
  return '<svg class="ring" width="'+size+'" height="'+size+'" viewBox="0 0 '+size+' '+size+'"><circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" stroke="var(--g750)" stroke-width="6"/><circle cx="'+size/2+'" cy="'+size/2+'" r="'+r+'" fill="none" stroke="'+color+'" stroke-width="6" stroke-linecap="round" stroke-dasharray="'+c.toFixed(1)+'" stroke-dashoffset="'+off.toFixed(1)+'" transform="rotate(-90 '+size/2+' '+size/2+')"/></svg>';}
function cardBalance(race,dia){var B=balanceDia(race,dia);if(!B.obj.kcal&&!B.n)return '';
  var hidr=getJ('hidr')[dia.iso]||0;
  return '<div class="card balance"><div class="cc-h">'+I.food+' Balance del dia <span>'+B.hechas+'/'+B.n+' comidas</span></div>'+
    '<div class="bal-rings">'+
    (B.obj.kcal?'<div class="bal-r"><div class="ring-wrap">'+anillo(B.frac,'#ecb63f')+'<span class="ring-c">'+Math.round(B.frac*100)+'%</span></div><div class="bal-t"><b>'+(B.consumidoKcal||0)+'</b><small>/ '+B.obj.kcal+' kcal</small></div></div>':'')+
    (B.obj.hc?'<div class="bal-r"><div class="ring-wrap">'+anillo(B.frac,'#ff5a2c')+'<span class="ring-c">'+(B.consumidoHC||0)+'</span></div><div class="bal-t"><b>'+(B.consumidoHC||0)+' g</b><small>/ '+B.obj.hc+' g HC</small></div></div>':'')+
    (B.gasto?'<div class="bal-r"><div class="ring-wrap">'+anillo(1,'#4fa76e')+'<span class="ring-c">'+I.fire+'</span></div><div class="bal-t"><b>+'+B.gasto+'</b><small>kcal gastadas</small></div></div>':'')+
    '</div>'+
    (B.obj.kcal&&B.gasto?'<p class="pf-note">Balance neto estimado: <b>'+((B.consumidoKcal||0)-B.gasto)+' kcal</b> (comido '+(B.consumidoKcal||0)+' &minus; gastado '+B.gasto+'). El plan ya cuenta con el entreno.</p>':'')+
    '<div class="hidr"><span class="pf-h">HIDRATACION</span><div class="hidr-row"><button class="hidr-b" data-h="-1">&minus;</button><div class="hidr-glasses">'+Array.from({length:8},function(_,i){return '<i class="'+(i<hidr?'on':'')+'"></i>';}).join('')+'</div><button class="hidr-b" data-h="1">+</button></div><small class="pf-note">'+hidr+' / 8 vasos (~'+(hidr*250)+' ml)</small></div>'+
    '</div>';}

function wireBalance(el,race,x,body){var bx=el.querySelector('#bal-'+x.iso);if(!bx)return;[].forEach.call(bx.querySelectorAll('[data-h]'),function(b){b.addEventListener('click',function(ev){ev.preventDefault();var H=getJ('hidr');var v=(H[x.iso]||0)+parseInt(b.dataset.h,10);v=Math.max(0,Math.min(8,v));H[x.iso]=v;setJ('hidr',H);bx.innerHTML=cardBalance(race,x);wireBalance(el,race,x,body);if(body)body.style.maxHeight=body.scrollHeight+'px';});});}

/* ================= HERRAMIENTAS DEL CORREDOR ================= */
function riegel(t1,d1,d2){return t1*Math.pow(d2/d1,1.06);}
function mejoresMarcas(){var out=[];window.RACES.forEach(function(r){prep(r);var L=getJ(KEYS(r.id).log);Object.keys(L).forEach(function(iso){var l=L[iso];var km=parseFloat(String(l.km||'').replace(',','.'));var sec=parseTime(l.tiempo);if(km>0&&sec>0&&l.hecho)out.push({km:km,sec:sec,iso:iso,pace:sec/km,name:l.name||'',race:r.name,hr:l.hrAvg||null});});
  var R=resultOf(r.id);if(R&&R.tiempo){var sec2=parseTime(R.tiempo);if(sec2>0)out.push({km:r.totalKm,sec:sec2,iso:r.date,pace:sec2/r.totalKm,name:r.name,race:r.name,esCarrera:true});}});
  return out;}
function records(){var M=mejoresMarcas();if(!M.length)return null;
  var masLargo=M.reduce(function(a,b){return b.km>a.km?b:a;});var masRapido=M.filter(function(x){return x.km>=5;}).sort(function(a,b){return a.pace-b.pace;})[0]||null;
  var carreras=M.filter(function(x){return x.esCarrera;});
  function mejorA(d){var c=M.filter(function(x){return x.km>=d*0.97;}).map(function(x){return {t:riegel(x.sec,x.km,d),src:x};}).sort(function(a,b){return a.t-b.t;})[0];return c||null;}
  return {n:M.length,km:M.reduce(function(a,b){return a+b.km;},0),masLargo:masLargo,masRapido:masRapido,carreras:carreras.length,m5:mejorA(5),m10:mejorA(10),m21:mejorA(21.097)};}
function renderHerramientas(){clearTimer();var Z=zonasFC();var R=records();var base=R&&(R.masRapido||R.masLargo);
  var html='<div class="view"><button class="backfab static" data-go="#/progreso">'+I.back+'</button><header class="home-head"><div class="kicker">Utilidades</div><h1>Herra<span class="devil">mientas</span></h1></header><div class="wrap content">'+
   /* calculadora */
   '<div class="section-label">Calculadora de ritmos</div><div class="card"><p class="pf-note" style="margin:0 0 10px">Rellena dos y te calculo el tercero.</p><div class="lb-grid"><label>Distancia (km)<input type="text" inputmode="decimal" id="c-km" placeholder="10"></label><label>Tiempo<input type="text" id="c-t" placeholder="45:00"></label><label class="wide">Ritmo (min/km)<input type="text" id="c-p" placeholder="4:30"></label></div>'+
   '<div class="calc-out" id="c-out"></div><div class="td-actions" style="margin-top:8px"><button class="btn primary" id="c-go">Calcular</button><button class="btn" id="c-clr">Limpiar</button></div>'+
   '<div class="calc-tab" id="c-splits"></div></div>'+
   /* predictor */
   '<div class="section-label">Predictor de tiempos</div><div class="card"><p class="pf-note" style="margin:0 0 10px">Formula de Riegel a partir de una marca reciente'+(base?' (precargada de tu mejor registro)':'')+'.</p><div class="lb-grid"><label>Distancia (km)<input type="text" inputmode="decimal" id="p-km" value="'+(base?num(base.km):'')+'" placeholder="9.25"></label><label>Tiempo<input type="text" id="p-t" value="'+(base?fmtDur(base.sec):'')+'" placeholder="41:04"></label></div><div id="p-out" class="pred-grid"></div><button class="btn primary" id="p-go" style="margin-top:10px">Predecir</button></div>'+
   /* zonas FC */
   '<div class="section-label">Zonas de pulso</div><div class="card">'+(Z?'<div class="pf-row"><span>FC maxima</span><b>'+fcMax()+' ppm'+(P().fcmax?'':' <small style="color:var(--dim2)">(estimada)</small>')+'</b></div><div class="zonas">'+Z.map(function(z){return '<div class="zona"><span class="zc" style="background:'+z.c+'"></span><span class="zn">Z'+z.z+' &middot; '+z.n+'</span><span class="zr">'+z.lo+'-'+z.hi+'</span></div>';}).join('')+'</div><p class="pf-note">Con el pulsometro, cada entreno importado te dira en que zona has ido por kilometro.</p>':'<p class="pf-note" style="margin:0">Pon tu edad o tu FC maxima en el perfil para ver tus zonas.</p><button class="btn wide-btn" data-go="#/perfil" style="margin-top:10px">Ir al perfil</button>')+'</div>'+
   '</div></div>';
  app().innerHTML=html;window.scrollTo(0,0);mountHomeNav('progreso');
  var g=function(id){return document.getElementById(id);};
  g('c-go').addEventListener('click',function(){var km=parseFloat(g('c-km').value.replace(',','.'))||0,t=parseTime(g('c-t').value),pc=parseTime(g('c-p').value);var out=g('c-out'),sp=g('c-splits');sp.innerHTML='';
    if(km&&t){var pace=t/km;g('c-p').value=fmtPace(t,km).replace(' /km','');out.innerHTML='<b>'+fmtPace(t,km)+'</b>';var rows='';for(var k=1;k<=Math.floor(km);k++)rows+='<div><span>km '+k+'</span><b>'+fmtDur(pace*k)+'</b></div>';if(km>Math.floor(km))rows+='<div><span>meta</span><b>'+fmtDur(t)+'</b></div>';sp.innerHTML='<div class="cc-h">Pasos parciales</div><div class="calc-rows">'+rows+'</div>';}
    else if(km&&pc){var tt=km*pc;g('c-t').value=fmtDur(tt);out.innerHTML='Tiempo final <b>'+fmtDur(tt)+'</b>';}
    else if(t&&pc){var dd=t/pc;g('c-km').value=num(dd);out.innerHTML='Distancia <b>'+num(dd)+' km</b>';}
    else out.innerHTML='<span style="color:var(--dim)">Rellena dos campos</span>';});
  g('c-clr').addEventListener('click',function(){['c-km','c-t','c-p'].forEach(function(i){g(i).value='';});g('c-out').innerHTML='';g('c-splits').innerHTML='';});
  function predecir(){var km=parseFloat(g('p-km').value.replace(',','.'))||0,t=parseTime(g('p-t').value);var o=g('p-out');if(!km||!t){o.innerHTML='';return;}
    o.innerHTML=[[5,'5 km'],[10,'10 km'],[21.097,'Media'],[42.195,'Maraton'],[16,'16 km trail*']].map(function(d){var tt=riegel(t,km,d[0]);return '<div><span class="ok2">'+d[1]+'</span><b>'+fmtDur(tt)+'</b><small>'+fmtPace(tt,d[0]).replace(' /km','')+'/km</small></div>';}).join('')+'<p class="pf-note" style="grid-column:1/-1">*En trail suma un 15-30% segun desnivel. La formula asume terreno llano.</p>';}
  g('p-go').addEventListener('click',predecir);if(base)predecir();}
function renderAcerca(){clearTimer();
  app().innerHTML='<div class="view"><button class="backfab static" data-go="#/ajustes">'+I.back+'</button><header class="home-head"><div class="kicker">CARRERAAP v'+VERSION+'</div><h1>Acerca <span class="devil">de</span></h1></header><div class="wrap content">'+
   '<div class="card"><div class="cc-h">Privacidad</div><p class="pf-note" style="margin:0;font-size:13px;color:#cdd4df">Todos tus datos (perfil, entrenos, comidas, peso, resultados) se guardan <b>unicamente en este dispositivo</b>. No hay servidor, ni cuenta, ni se envia nada a nadie. La prevision del tiempo consulta Open-Meteo con las coordenadas de la carrera, sin identificarte. Si borras la app, se borran los datos: haz copias desde Ajustes.</p></div>'+
   '<div class="card"><div class="cc-h">Como funciona</div><p class="pf-note" style="margin:0;font-size:13px;color:#cdd4df">Es una aplicacion web progresiva (PWA): se instala desde el navegador, funciona sin conexion y se actualiza sola. Los planes de dieta y ritmos de cada carrera se generan con Claude a partir del recorrido y de tu perfil.</p></div>'+
   '<div class="card"><div class="cc-h">Creditos</div><p class="pf-note" style="margin:0;font-size:13px;color:#cdd4df">Disenada para corredores de trail y asfalto. Tiempo por Open-Meteo. Hecha con carino para Ruben.</p></div>'+
   '</div></div>';mountHomeNav('ajustes');}
function exportarCSV(){var filas=['fecha;carrera;sesion;km;tiempo;ritmo;fc_media;fc_max;desnivel;notas'];
  window.RACES.forEach(function(r){prep(r);var L=getJ(KEYS(r.id).log);r.days.forEach(function(x){if(x.w)return;var l=L[x.iso];if(!l||!l.hecho)return;var km=parseFloat(String(l.km||'').replace(',','.'))||0;var sec=parseTime(l.tiempo);
    filas.push([x.iso,r.name,x.ent,String(km).replace('.',','),l.tiempo||'',km&&sec?fmtPace(sec,km).replace(' /km',''):'',l.hrAvg||'',l.hrMax||'',l.gain!=null?l.gain:'',(l.notas||'').replace(/[;\n]/g,' ')].join(';'));});});
  downloadText('entrenos-carreraap.csv','\ufeff'+filas.join('\n'),'text/csv;charset=utf-8');toast('CSV descargado');}
/* ---- calendario mensual ---- */
function calMes(race,year,month){var L=getJ(KEYS(race.id).log);var first=new Date(year,month,1);var dow=(first.getDay()+6)%7;var dias=new Date(year,month+1,0).getDate();var hoy=todayISO();
  var mapa={};race.days.forEach(function(x){if(!x.w)mapa[x.iso]=x;});
  var html='<div class="cal"><div class="cal-h">'+['L','M','X','J','V','S','D'].map(function(d){return '<span>'+d+'</span>';}).join('')+'</div><div class="cal-g">';
  for(var i=0;i<dow;i++)html+='<span class="cal-e"></span>';
  for(var d=1;d<=dias;d++){var iso=toISO(new Date(year,month,d));var x=mapa[iso];var cls='cal-d';if(iso===hoy)cls+=' hoy';var dot='';
    if(x){if(x.race)cls+=' carrera';else if(x.isTraining){var l=L[iso];cls+=(l&&l.hecho)?' hecho':' plan';dot='<i class="b-'+x.type+'"></i>';}}
    html+='<button class="'+cls+'" data-go="#/race/'+race.id+'/dias/'+iso+'">'+d+dot+'</button>';}
  return html+'</div></div>';}


/* ================= PREDICCION DE CARRERA (desde tus entrenos) ================= */
/* Coste del desnivel: subida 1.6 s/m, bajada 0.3 s/m en trail (0.9 / 0.15 en asfalto). */
function planoEquivalente(km,sec,gain,trail){var g=gain||0;var up=trail?1.6:0.9,dn=trail?0.3:0.15;var sf=sec-g*up-g*dn;return sf>0?sf:sec;}
function marcasBase(diasAtras){var out=[];var lim=addDays(todayISO(),-(diasAtras||42));
  window.RACES.forEach(function(r){prep(r);var L=getJ(KEYS(r.id).log);Object.keys(L).forEach(function(iso){var l=L[iso];if(iso<lim||!l.hecho)return;var km=parseFloat(String(l.km||'').replace(',','.'));var sec=parseTime(l.tiempo);if(km>=5&&sec>0)out.push({km:km,sec:sec,iso:iso,gain:l.gain||0,hr:l.hrAvg||null,ent:(r.days.filter(function(x){return x.iso===iso;})[0]||{}).ent||''});});});
  return out;}
function prediccion(race){prep(race);var M=marcasBase(42);if(!M.length)return null;
  var trail=(race.kind||'Trail')==='Trail';var gain=parseInt(String(race.dplus||'0').replace('+',''),10)||0;
  /* mejor ritmo plano-equivalente de cada entreno, proyectado a la distancia de carrera */
  var cand=M.map(function(m){var flat=planoEquivalente(m.km,m.sec,m.gain,m.gain>150);var proy=riegel(flat,m.km,race.totalKm);return {m:m,flat:flat,proy:proy};}).sort(function(a,b){return a.proy-b.proy;});
  var best=cand[0];var top=cand.slice(0,3);var mediaProy=top.reduce(function(a,c){return a+c.proy;},0)/top.length;
  var coste=gain*(trail?1.6:0.9)+gain*(trail?0.3:0.15);
  var mid=mediaProy+coste;
  return {mid:mid,low:mid*0.96,high:mid*1.05,best:best.m,n:M.length,coste:coste,flatPace:best.flat/best.m.km};}
function cardPrediccion(race){var Pd=prediccion(race);if(!Pd)return '<div class="card soft"><div class="cc-h">'+I.ritmos+' Prediccion del dia D</div><p class="pf-note" style="margin:0">Registra o importa entrenos de 5 km o mas y te calculo un tiempo previsto para '+esc(race.name)+'.</p></div>';
  var obj=race._planTotal||0;var dif=obj?Math.round((Pd.mid-obj)/60):null;
  return '<div class="card pred"><div class="cc-h">'+I.ritmos+' Prediccion del dia D <span>'+Pd.n+' entrenos</span></div>'+
    '<div class="pred-big">'+fmtDur(Pd.low)+' <small>a</small> '+fmtDur(Pd.high)+'</div><div class="pred-mid">estimacion central <b>'+fmtDur(Pd.mid)+'</b> &middot; '+fmtPace(Pd.mid,race.totalKm)+'</div>'+
    '<div class="pred-rows"><div><span>Tu mejor referencia</span><b>'+num(Pd.best.km)+' km en '+fmtDur(Pd.best.sec)+'</b><small>'+fmtShort(Pd.best.iso)+(Pd.best.ent?' &middot; '+esc(Pd.best.ent):'')+'</small></div>'+
    '<div><span>Ritmo plano equivalente</span><b>'+fmtPace(Pd.flatPace,1)+'</b></div><div><span>Coste del desnivel ('+race.gain+')</span><b>+'+Math.round(Pd.coste/60)+' min</b></div>'+
    (obj?'<div><span>Frente al plan de ritmos ('+fmtDur(obj)+')</span><b style="color:'+(dif<=0?'var(--medio)':dif<=5?'var(--gold)':'#ff7a6b')+'">'+(dif>0?'+':'')+dif+' min</b></div>':'')+'</div>'+
    '<p class="pf-note">Se recalcula sola con cada entreno que registres. Modelo: Riegel sobre tu mejor ritmo reciente + coste del desnivel.</p></div>';}

/* ================= ESTADO DE FORMA (carga aguda / cronica) ================= */
function cargaDia(l,tipo){var km=parseFloat(String(l.km||'').replace(',','.'))||0;if(!l.hecho||!km)return 0;var f={suave:1,medio:1.15,fuerte:1.5,carga:1,carrera:1.8}[tipo]||1.15;
  if(l.hrAvg){var z=zonaDe(l.hrAvg);if(z)f=[0.9,1.1,1.35,1.6,1.9][z.z-1];}return km*f;}
function forma(){var hoy=todayISO();var cargas={};window.RACES.forEach(function(r){prep(r);var L=getJ(KEYS(r.id).log);r.days.forEach(function(x){if(x.w)return;var l=L[x.iso];if(l)cargas[x.iso]=(cargas[x.iso]||0)+cargaDia(l,x.type);});});
  var a7=0,c28=0,n=0;for(var i=0;i<28;i++){var iso=addDays(hoy,-i);var c=cargas[iso]||0;c28+=c;if(i<7)a7+=c;if(c)n++;}
  if(!n)return null;var aguda=a7/7,cronica=c28/28;var ratio=cronica?aguda/cronica:0;
  var est=ratio<0.8?['Fresco','Llegas descansado. Buen momento para calidad o para afinar.','#6f8fae']:ratio<=1.3?['Optimo','Carga equilibrada: estas asimilando bien.','#4fa76e']:ratio<=1.5?['Cargado','Has subido mas de lo habitual. Vigila el descanso.','#ecb63f']:['Riesgo','Pico de carga alto. Toca aflojar unos dias.','#ff4a30'];
  return {ratio:ratio,a7:a7,c28:c28,estado:est[0],texto:est[1],color:est[2],n:n};}
function cardForma(){var F=forma();if(!F)return '';var pos=Math.max(4,Math.min(96,F.ratio/2*100));
  return '<div class="card soft"><div class="cc-h">'+I.fire+' Estado de forma <span style="color:'+F.color+';font-weight:800">'+F.estado+'</span></div>'+
    '<div class="forma-bar"><i style="left:'+pos+'%;background:'+F.color+'"></i></div><div class="forma-l"><span>fresco</span><span>optimo</span><span>cargado</span><span>riesgo</span></div>'+
    '<p class="pf-note" style="margin-top:8px">'+F.texto+' Carga 7 dias: <b>'+Math.round(F.a7*7)+'</b> &middot; media 28 dias: <b>'+Math.round(F.c28*7)+'</b>/sem.</p></div>';}

/* ================= TIEMPO DIARIO (entrenos) ================= */
function metCodigo(c){if(c==null)return '';if(c===0)return '\u2600\ufe0f';if(c<=2)return '\u26c5';if(c===3)return '\u2601\ufe0f';if(c<=48)return '\ud83c\udf2b\ufe0f';if(c<=67)return '\ud83c\udf27\ufe0f';if(c<=77)return '\u2744\ufe0f';if(c<=82)return '\ud83c\udf26\ufe0f';return '\u26c8\ufe0f';}
function coordsEntreno(race){var p=P();if(p.lat&&p.lon)return {lat:p.lat,lon:p.lon,src:'perfil'};if(race&&race.track&&race.track.length)return {lat:race.track[0][1],lon:race.track[0][2],src:'carrera'};return null;}
function tiempoDia(iso,hora,coords,cb){if(typeof fetch!=='function'||!coords){cb(null);return;}
  var k='meteo-dia-'+iso+'-'+hora;var c=getJ(k);if(c.at&&Date.now()-c.at<60*60*1000&&c.d){cb(c.d);return;}
  var dl=daysLeft(iso);if(dl<0||dl>15){cb(null);return;}
  var url='https://api.open-meteo.com/v1/forecast?latitude='+coords.lat+'&longitude='+coords.lon+'&hourly=temperature_2m,precipitation_probability,wind_speed_10m,weather_code&timezone=auto&start_date='+iso+'&end_date='+iso;
  try{fetch(url).then(function(r){return r.json();}).then(function(d){var h=d&&d.hourly;if(!h||!h.time)throw 0;var hh=parseInt(hora.split(':')[0],10);var i=0;for(var j=0;j<h.time.length;j++){if(parseInt(h.time[j].slice(11,13),10)===hh){i=j;break;}}
    var out={t:Math.round(h.temperature_2m[i]),ll:h.precipitation_probability[i]||0,v:Math.round(h.wind_speed_10m[i]||0),c:h.weather_code[i],hora:hora,at:Date.now()};setJ(k,{at:Date.now(),d:out});cb(out);}).catch(function(){cb(null);});}catch(e){cb(null);}}
function chipTiempo(d){if(!d)return '';return '<span class="wchip">'+metCodigo(d.c)+' <b>'+d.t+'&deg;</b> &middot; '+d.ll+'% \ud83d\udca7 &middot; '+d.v+' km/h</span>';}

/* ================= LISTA DE LA COMPRA ================= */
var DESPENSA=[
 ['Carne y pescado',['pollo','pavo','ternera','lomo de cerdo','merluza','pescado azul','caballa','sardina','bacalao','jamon serrano','jamon cocido']],
 ['Huevos y lacteos',['huevo','yogur griego','yogur natural','queso batido','requeson','skyr','leche','queso fresco','queso curado','queso','mantequilla']],
 ['Fruta y verdura',['platano','manzana','pera','kiwi','mandarina','melocoton','arandanos','compota','calabaza','calabacin','puerro','zanahoria','espinacas','guisantes','patata','boniato','champinones','aguacate','limon']],
 ['Despensa',['arroz','pasta','cuscus','avena','granola','pan integral','pan blanco','biscotes','fideos','miel','mermelada','aceite','AOVE','canela','cacao','azucar moreno','sal']],
 ['Frutos secos',['nueces','almendras','anacardos','avellanas','pipas de girasol']],
 ['Suplementos',['gel','isotonica','recuperador','226ERS','barrita','sales']],
];
function listaCompra(race,dias){
  var hoy=todayISO();var fin=addDays(hoy,dias-1);var enc={};
  race.days.forEach(function(x){if(x.w||!x.menu)return;if(x.iso<hoy||x.iso>fin)return;
    x.menu.forEach(function(it,i){var t=mealText(race.id,x.iso,i,it[1]).toLowerCase();
      DESPENSA.forEach(function(cat){cat[1].forEach(function(ing){
        if(t.indexOf(ing.toLowerCase())>=0){var k=cat[0]+'|'+ing;enc[k]=(enc[k]||0)+1;}});});});});
  /* tomas del dia de carrera */
  if(race.date>=hoy&&race.date<=fin){['gel','isotonica','recuperador'].forEach(function(g){var k='Suplementos|'+g;enc[k]=(enc[k]||0)+1;});}
  var grupos={};Object.keys(enc).forEach(function(k){var p=k.split('|');(grupos[p[0]]=grupos[p[0]]||[]).push({n:p[1],c:enc[k]});});
  /* si ya esta "queso batido", sobra el generico "queso" */
  Object.keys(grupos).forEach(function(g){
    grupos[g]=grupos[g].filter(function(a){return !grupos[g].some(function(b){return b.n!==a.n&&b.n.toLowerCase().indexOf(a.n.toLowerCase())>=0;});});
    grupos[g].sort(function(a,b){return b.c-a.c;});});
  return grupos;}
function renderCompra(){clearTimer();var race=featuredRace();
  var html='<div class="view"><header class="home-head"><div class="kicker">De tu plan de comidas</div><h1>Lista de <span class="devil">la compra</span></h1>';
  if(!race){html+='</header><div class="wrap content"><div class="card"><p class="lead" style="margin:0">Sin carreras aun.</p></div></div></div>';app().innerHTML=html;mountHomeNav('inicio');return;}
  prep(race);
  var cfg=getJ('compra');var dias=cfg.dias||7;var marcados=getJ('compra-ok');
  var grupos=listaCompra(race,dias);var total=0;Object.keys(grupos).forEach(function(g){total+=grupos[g].length;});
  html+='<div class="meta">Proximos '+dias+' dias &middot; '+total+' articulos</div></header><div class="wrap content">'+
    '<div class="segbtns">'+[3,7,14].map(function(d){return '<button class="segb'+(d===dias?' on':'')+'" data-dias="'+d+'">'+d+' dias</button>';}).join('')+'</div>';
  if(!total)html+='<div class="card"><p class="lead" style="margin:0">No hay comidas planificadas en ese periodo.</p></div>';
  Object.keys(grupos).forEach(function(g){
    html+='<div class="section-label">'+g+'</div><div class="card compra-c">'+grupos[g].map(function(it){var k=g+'|'+it.n;
      return '<label class="compra-i'+(marcados[k]?' ok':'')+'"><input type="checkbox" data-k="'+esc(k)+'"'+(marcados[k]?' checked':'')+'><span class="ci-n">'+esc(it.n)+'</span>'+(it.c>1?'<span class="ci-c">x'+it.c+'</span>':'')+'</label>';}).join('')+'</div>';});
  if(total)html+='<button class="btn wide-btn" id="compra-share">'+I.share+' Compartir lista</button><button class="btn wide-btn" id="compra-reset" style="margin-top:8px">Desmarcar todo</button>';
  html+='<p class="foot">Sale de tus menus, ya con los cambios que hayas hecho.</p></div></div>';
  app().innerHTML=html;window.scrollTo(0,0);mountHomeNav('inicio');
  [].forEach.call(document.querySelectorAll('[data-dias]'),function(b){b.addEventListener('click',function(){var c=getJ('compra');c.dias=parseInt(b.dataset.dias,10);setJ('compra',c);renderCompra();});});
  [].forEach.call(document.querySelectorAll('.compra-i input'),function(i){i.addEventListener('change',function(){var m=getJ('compra-ok');m[i.dataset.k]=i.checked;setJ('compra-ok',m);i.closest('.compra-i').classList.toggle('ok',i.checked);});});
  var sh=document.getElementById('compra-share');if(sh)sh.addEventListener('click',function(){var t='Compra ('+dias+' dias):\n';
    Object.keys(grupos).forEach(function(g){t+='\n'+g+':\n';grupos[g].forEach(function(it){t+='- '+it.n+(it.c>1?' x'+it.c:'')+'\n';});});share('Lista de la compra',t);});
  var rs=document.getElementById('compra-reset');if(rs)rs.addEventListener('click',function(){setJ('compra-ok',{});renderCompra();});}

/* ================= TIEMPO EL DIA DE CARRERA ================= */
function wireMeteo(race){var b=document.getElementById('meteo-ref');if(b)b.addEventListener('click',function(){window._meteoForce=true;cargarTiempo(race);});}
function cargarTiempo(race){
  var caja=document.getElementById('meteo');if(!caja)return;
  var dl=daysLeft(race.date);if(dl<0||dl>15){caja.innerHTML='';return;}
  if(!race.track||!race.track.length)return;
  var lat=race.track[0][1],lon=race.track[0][2];
  var cache=getJ('meteo-'+race.id);
  if(!window._meteoForce&&cache.at&&Date.now()-cache.at<60*60*1000&&cache.html){caja.innerHTML=cache.html;wireMeteo(race);return;}window._meteoForce=false;
  caja.innerHTML='<div class="card meteo-c"><div class="cc-h">'+I.sun+' Tiempo previsto</div><p class="pf-note" style="margin:0">Consultando...</p></div>';
  if(typeof fetch!=='function'){caja.innerHTML='';return;}
  var url='https://api.open-meteo.com/v1/forecast?latitude='+lat+'&longitude='+lon+
    '&hourly=temperature_2m,precipitation_probability,wind_speed_10m,weather_code&timezone=auto&start_date='+race.date+'&end_date='+race.date;
  try{fetch(url).then(function(r){return r.json();}).then(function(d){
    var h=d&&d.hourly;if(!h||!h.time)throw new Error('sin datos');
    var hora=parseInt(race.time.split(':')[0],10);
    function idx(hh){for(var i=0;i<h.time.length;i++){if(parseInt(h.time[i].slice(11,13),10)===hh)return i;}return 0;}
    var i0=idx(hora),i1=idx(Math.min(23,hora+2));
    var t0=Math.round(h.temperature_2m[i0]),t1=Math.round(h.temperature_2m[i1]);
    var lluvia=Math.max(h.precipitation_probability[i0]||0,h.precipitation_probability[i1]||0);
    var viento=Math.round(Math.max(h.wind_speed_10m[i0]||0,h.wind_speed_10m[i1]||0));
    var consejo=[];
    if(t0<=6)consejo.push('Fresco en la salida: manguitos y guantes finos, y quitatelos en la primera subida.');
    else if(t0<=12)consejo.push('Temperatura ideal para correr. Camiseta de manga corta y poco mas.');
    else if(t0<=18)consejo.push('Templado: vigila la hidratacion en la subida.');
    else consejo.push('Va a hacer calor: bebe mas y moja la gorra en los avituallamientos.');
    if(lluvia>=40)consejo.push('Probabilidad de lluvia: la bajada tecnica del km 8-12 estara resbaladiza, pisa corto.');
    if(viento>=25)consejo.push('Viento fuerte arriba: abrigate para el techo del km 7.');
    var ahora=new Date();var html='<div class="card meteo-c"><div class="cc-h">'+I.sun+' Tiempo previsto <span>'+fmtShort(race.date)+' &middot; <button class="lnk" id="meteo-ref">actualizado '+String(ahora.getHours()).padStart(2,'0')+':'+String(ahora.getMinutes()).padStart(2,'0')+' &#8635;</button></span></div>'+
      '<div class="meteo-g"><div><span class="ok2">salida '+race.time+'</span><b>'+t0+'&deg;</b></div>'+
      '<div><span class="ok2">a mitad</span><b>'+t1+'&deg;</b></div>'+
      '<div><span class="ok2">lluvia</span><b>'+lluvia+'%</b></div>'+
      '<div><span class="ok2">viento</span><b>'+viento+'<small> km/h</small></b></div></div>'+
      consejo.map(function(c){return '<p class="meteo-t">'+c+'</p>';}).join('')+'</div>';
    caja.innerHTML=html;setJ('meteo-'+race.id,{at:Date.now(),html:html});wireMeteo(race);})
  .catch(function(){caja.innerHTML='<div class="card meteo-c"><div class="cc-h">'+I.sun+' Tiempo previsto</div><p class="pf-note" style="margin:0">No he podido consultarlo ahora. Se vera cuando haya conexion.</p></div>';});
  }catch(e){caja.innerHTML='';}}

/* ================= SINCRONIZACION AUTOMATICA ================= */
/* Dos vias, ambas sin exponer secretos en la web:
   1) URL de sincronizacion (#/sync?...) -> la llama un Atajo de iOS al acabar el entreno.
   2) Feed JSON remoto -> lo genera tu servidor/homelab desde la API de Strava. */
function syncCfg(){var c=getJ('synccfg');if(!c.url&&window.PROFILE&&window.PROFILE.syncUrl)c.url=window.PROFILE.syncUrl;return c;}
function syncSaveCfg(c){setJ('synccfg',c);}
function importedIds(){return getJ('syncids');}
function markImported(id){var m=getJ('syncids');m[id]=Date.now();setJ('syncids',m);}
function saveActivity(race,A,iso){
  var K=KEYS(race.id);var L=getJ(K.log);var prev=L[iso]||{};
  L[iso]={km:num(A.km),tiempo:fmtDur(A.sec),notas:prev.notas||'',hecho:true,
    hrAvg:A.hrAvg||null,hrMax:A.hrMax||null,gain:(A.gain==null?null:A.gain),
    splits:A.splits||[],route:A.route||[],src:A.src||'sync',name:A.name||''};
  setJ(K.log,L);return true;}
function dayExists(race,iso){return race.days.some(function(x){return !x.w&&x.iso===iso;});}
/* --- via 1: Atajo de iOS --- */
function handleSyncURL(qs){
  var p={};qs.replace(/^\?/,'').split('&').forEach(function(kv){if(!kv)return;var i=kv.indexOf('=');var k=decodeURIComponent(kv.slice(0,i<0?kv.length:i));var v=i<0?'':decodeURIComponent(kv.slice(i+1).replace(/\+/g,' '));p[k]=v;});
  var race=featuredRace();if(!race){location.hash='#/';return;}prep(race);
  var km=parseFloat(String(p.km||'').replace(',','.'));
  var sec=p.sec?parseInt(p.sec,10):parseTime(p.t||p.tiempo||'');
  var iso=(p.date||p.fecha||todayISO()).slice(0,10);
  if(!km||!sec){toast('Datos incompletos en el enlace');location.hash='#/';return;}
  var id=p.id||('sc-'+iso+'-'+Math.round(km*100)+'-'+sec);
  if(importedIds()[id]){toast('Ese entreno ya estaba');location.hash='#/progreso';return;}
  var A={km:km,sec:sec,hrAvg:p.hr?parseInt(p.hr,10):null,hrMax:p.hrmax?parseInt(p.hrmax,10):null,
    gain:p.d!=null&&p.d!==''?Math.round(parseFloat(p.d)):null,splits:[],route:[],src:'atajo',name:p.name||''};
  if(!dayExists(race,iso))iso=todayISO();
  saveActivity(race,A,iso);markImported(id);
  toast('Entreno registrado: '+num(km)+' km &middot; '+fmtDur(sec));
  location.hash='#/race/'+race.id+'/dias/'+iso;}
/* --- via 2: feed remoto (cifrado) --- */
function b64bytes(b64){var bin=atob(b64);var a=new Uint8Array(bin.length);for(var i=0;i<bin.length;i++)a[i]=bin.charCodeAt(i);return a;}
function descifrar(sobre,clave){
  if(!window.crypto||!crypto.subtle)return Promise.reject(new Error('Este navegador no puede descifrar (hace falta https)'));
  var enc=new TextEncoder();
  return crypto.subtle.importKey('raw',enc.encode(clave),{name:'PBKDF2'},false,['deriveKey'])
    .then(function(base){return crypto.subtle.deriveKey({name:'PBKDF2',salt:b64bytes(sobre.salt),iterations:sobre.it||210000,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['decrypt']);})
    .then(function(k){return crypto.subtle.decrypt({name:'AES-GCM',iv:b64bytes(sobre.iv)},k,b64bytes(sobre.ct));})
    .then(function(buf){return JSON.parse(new TextDecoder().decode(buf));})
    .catch(function(){throw new Error('contrasena incorrecta o archivo corrupto');});}
function syncNow(silent,cb){
  var c=syncCfg();if(!c.url){if(!silent)toast('Configura antes la URL de sincronizacion');cb&&cb(0);return;}
  var race=featuredRace();if(!race){cb&&cb(0);return;}prep(race);
  if(typeof fetch!=='function'){if(!silent)toast('Este navegador no puede sincronizar');cb&&cb(-1);return;}
  fetch(c.url+(c.url.indexOf('?')<0?'?':'&')+'_='+Date.now(),{cache:'no-store'})
    .then(function(r){if(!r.ok)throw new Error('HTTP '+r.status);return r.json();})
    .then(function(doc){
      if(doc&&doc.ct){if(!c.key)throw new Error('el archivo esta cifrado: pon tu contrasena en Ajustes');return descifrar(doc,c.key);}
      return doc;})
    .then(function(data){
      var list=(data&&data.activities)||[];var n=0;
      list.forEach(function(a){
        var id=String(a.id||('feed-'+a.date+'-'+a.km));if(importedIds()[id])return;
        var iso=String(a.date||'').slice(0,10);if(!iso)return;
        if(!dayExists(race,iso))return;
        saveActivity(race,{km:a.km,sec:a.sec,hrAvg:a.hrAvg,hrMax:a.hrMax,gain:a.gain,splits:a.splits||[],route:a.route||[],src:'strava',name:a.name},iso);
        markImported(id);n++;});
      c.last=Date.now();c.lastN=n;c.err='';syncSaveCfg(c);
      if(n>0){toast(n+(n===1?' entreno nuevo importado':' entrenos nuevos importados'),'Ver',function(){location.hash='#/progreso';});}
      else if(!silent)toast('Todo al dia, sin entrenos nuevos');
      cb&&cb(n);})
    .catch(function(e){var cc=syncCfg();cc.err=e.message;syncSaveCfg(cc);if(!silent)toast('No ha podido sincronizar: '+e.message);cb&&cb(-1);});}
function autoSync(){var c=syncCfg();if(!c.url||c.off)return;
  if(c.last&&Date.now()-c.last<10*60*1000)return;   /* como mucho cada 10 min */
  syncNow(true);}

/* ---------- ROUTER ---------- */
function router(){var h=location.hash||'#/';var m;
  if(h.indexOf('#/sync')===0){handleSyncURL(h.slice(6));return;}
  if(!P().onboarded&&h!=='#/onboarding'){renderOnboarding();return;}
  if(h==='#/onboarding'){renderOnboarding();return;}
  if(h==='#/perfil'){renderPerfil();return;}
  if(h==='#/nueva'){renderNuevaCarrera();return;}
  if(h==='#/herramientas'){renderHerramientas();return;}
  if(h==='#/evolucion'){renderEvolucion();return;}
  if(h==='#/acerca'){renderAcerca();return;}
  if((m=h.match(/^#\/race\/([^\/]+)(?:\/([a-z]+))?(?:\/(\d{4}-\d{2}-\d{2}))?(?:\/(log))?$/))){var f=window.RACES.filter(function(x){return x.id===m[1];})[0];if(f){renderRace(f,m[2]||'dias',m[3]||null,!!m[4]);return;}}
  if((m=h.match(/^#\/importar(?:\/(\d{4}-\d{2}-\d{2}))?$/))){renderImport(m[1]||null);return;}
  if(h==='#/compra'){renderCompra();return;}
  if(h==='#/progreso'||h==='#/entrenos'){renderProgreso();return;}if(h==='#/ajustes'){renderAjustes();return;}renderHome();}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-go]');if(b){e.preventDefault();var to=b.dataset.go;if(location.hash===to){router();}else{location.hash=to;}}});
window.addEventListener('hashchange',router);

/* ---------- boot: load race files from registry ---------- */
function aplicarTema(){var t=getJ('ui').theme||'dark';document.documentElement.setAttribute('data-theme',t);var m=document.querySelector('meta[name=theme-color]');if(m)m.setAttribute('content',t==='light'?'#f4f5f8':'#101219');}
function boot(){aplicarTema();function go(){cargarCustom();router();setTimeout(autoSync,1200);}
  if(window.RACES.length||!window.RACE_FILES||!window.RACE_FILES.length){go();return;}
  var left=window.RACE_FILES.length;window.RACE_FILES.forEach(function(f){var s=document.createElement('script');s.src='races/'+f;s.onload=s.onerror=function(){if(--left===0)go();};document.head.appendChild(s);});}
document.addEventListener('visibilitychange',function(){if(!document.hidden)autoSync();});
window.addEventListener('DOMContentLoaded',boot);

/* ---------- service worker + auto update ---------- */
if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('service-worker.js').then(function(reg){reg.addEventListener('updatefound',function(){var nw=reg.installing;if(!nw)return;nw.addEventListener('statechange',function(){if(nw.state==='installed'&&navigator.serviceWorker.controller){toast('Nueva version lista','Actualizar',function(){location.reload();});}});});}).catch(function(){});});}
})();
