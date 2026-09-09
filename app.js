(function(){
"use strict";
window.RACES = window.RACES || [];
window.registerRace = function(r){ window.RACES.push(r); };
var VERSION="1.2";
var typeName={suave:"Suave",medio:"Rodaje",fuerte:"Fuerte",carga:"Carga",carrera:"Carrera"};
var MODE={hold:["#ecb63f","CONTEN"],steady:["#6f8fae","RITMO"],hike:["#ff4a30","ANDAR"],send:["#4fa76e","SUELTA"]};
var MESES=["ene","feb","mar","abr","may","jun","jul","ago","sept","oct","nov","dic"];
var DIAS=["dom","lun","mar","mie","jue","vie","sab"];
var ICON={
  dias:'<svg viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9.5h18"/><path d="M8 2.5v4M16 2.5v4"/></svg>',
  mapa:'<svg viewBox="0 0 24 24"><path d="M2 20l6-13 4 8 3-5 7 10z"/></svg>',
  ritmos:'<svg viewBox="0 0 24 24"><path d="M2 12h4l2.5 7L13 4l2.5 8H22"/></svg>',
  carrera:'<svg viewBox="0 0 24 24"><path d="M5 21V4"/><path d="M5 4c3-1.6 6 1.6 9 0s5 0 5 0v8s-2 1.6-5 0-6-1.6-9 0"/></svg>',
  home:'<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/></svg>',
  log:'<svg viewBox="0 0 24 24"><path d="M12 8v4l3 2"/><circle cx="12" cy="12" r="9"/></svg>',
  cog:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
  back:'<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>',
  check:'<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>',
  arrow:'<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>'
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
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function parseKm(ent){var e=String(ent);var par=e.match(/\((\d+(?:[.,]\d+)?)\s*km\)/i);if(par)return parseFloat(par[1].replace(',','.'));var m=e.match(/(\d+(?:[.,]\d+)?)\s*km/gi);if(!m)return 0;return parseFloat(m[m.length-1].replace(',','.'));}
function parseTime(s){if(!s)return 0;var p=String(s).trim().split(':').map(Number);if(p.some(isNaN))return 0;if(p.length===3)return p[0]*3600+p[1]*60+p[2];if(p.length===2)return p[0]*60+p[1];return p[0]*60;}
function fmtPace(sec,km){if(!sec||!km)return '';var p=sec/km;var m=Math.floor(p/60),s=Math.round(p%60);if(s===60){m++;s=0;}return m+':'+String(s).padStart(2,'0')+' /km';}
function fmtDur(sec){if(!sec)return '';var h=Math.floor(sec/3600),m=Math.floor(sec%3600/60),s=sec%60;return (h?h+':'+String(m).padStart(2,'0'):m)+':'+String(s).padStart(2,'0');}
var store=(function(){try{var s=window.localStorage;s.setItem('__t','1');s.removeItem('__t');return s;}catch(e){return null;}})();
function getJ(k){try{return JSON.parse((store&&store.getItem(k))||'{}')||{};}catch(e){return {};}}
function setJ(k,v){try{store&&store.setItem(k,JSON.stringify(v));}catch(e){}}

/* assign ISO dates + planned km to day entries */
function prep(race){
  if(race._prepped)return race;
  var iso=race.planStart;
  race.days.forEach(function(x){if(x.w)return;x.iso=iso;x.planKm=x.race?0:parseKm(x.ent);x.isTraining=!x.race&&x.planKm>0;iso=addDays(iso,1);});
  race._prepped=true;return race;
}
function findToday(race){var t=todayISO();return race.days.filter(function(x){return !x.w&&x.iso===t;})[0];}
function zoneAt(race,km){
  for(var i=0;i<race.zones.length;i++){var z=race.zones[i];var r=String(z[0]).split('-');var a=parseInt(r[0],10)-1,b=parseInt(r[r.length-1],10);
    if(km>=a&&km<=b)return z;}
  return null;
}

/* ---------- profile svgs ---------- */
function heroProfile(p,cls){
  return '<svg class="'+cls+'" viewBox="0 0 '+p.viewBox[2]+' '+p.viewBox[3]+'" preserveAspectRatio="none" aria-hidden="true">'+
    '<defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a2c" stop-opacity=".32"/><stop offset="1" stop-color="#ff5a2c" stop-opacity="0"/></linearGradient></defs>'+
    '<path d="'+p.area+'" fill="url(#hg)"/><path class="hp-line" d="'+p.line+'" fill="none" stroke="#ff5a2c" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/></svg>';
}
function miniProfile(p){
  return '<svg viewBox="0 0 '+p.viewBox[2]+' '+p.viewBox[3]+'" preserveAspectRatio="none" aria-hidden="true"><path d="'+p.area+'" fill="rgba(255,90,44,.16)"/><path d="'+p.line+'" fill="none" stroke="#ff5a2c" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/></svg>';
}
function buildProfileSVG(p){
  var t=p.techo,m=p.muro,g1=p.gel1,g2=p.gel2,bj=p.bajada;
  var ticks=(p.ticks||[]).map(function(tk){var a=tk[1]==='0'?'start':(tk[1]==='16'?'end':'middle');return '<text class="axis" x="'+tk[0]+'" y="'+(p.bot+18)+'" text-anchor="'+a+'">'+tk[1]+'</text>';}).join('');
  return '<svg viewBox="0 0 '+p.viewBox[2]+' '+p.viewBox[3]+'" role="img" aria-label="Perfil">'+
    '<line class="gridline" x1="0" y1="'+p.bot+'" x2="'+p.viewBox[2]+'" y2="'+p.bot+'"/><path d="'+p.area+'" fill="url(#eg)"/>'+
    '<defs><linearGradient id="eg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a2c" stop-opacity=".28"/><stop offset="1" stop-color="#ff5a2c" stop-opacity="0"/></linearGradient></defs>'+
    '<rect x="'+bj.x1+'" y="'+p.top+'" width="'+(bj.x2-bj.x1)+'" height="'+(p.bot-p.top)+'" fill="#5b86c9" opacity="0.10"/>'+
    '<text class="zone-label" x="'+((bj.x1+bj.x2)/2)+'" y="'+(p.bot-6)+'" text-anchor="middle">'+(bj.label||'')+'</text>'+
    '<path class="pline" d="'+p.line+'"/><circle cx="'+t.x+'" cy="'+t.y+'" r="4.5" fill="#ff7a52"/>'+
    '<text class="peak-label" x="'+t.x+'" y="'+(t.y-10)+'" text-anchor="middle">'+(t.label||'')+'</text>'+
    '<text class="peak-label" x="'+m.x+'" y="'+(m.y-14)+'" text-anchor="middle" fill="#ff4a30">'+(m.label||'')+'</text>'+
    '<g class="marker"><circle class="glow" cx="'+g1.x+'" cy="'+g1.y+'" r="13"/><circle cx="'+g1.x+'" cy="'+g1.y+'" r="6"/><text class="mk-label" x="'+g1.x+'" y="'+(g1.y+26)+'" text-anchor="middle">'+(g1.label||'')+'</text></g>'+
    '<g class="marker"><circle class="glow" cx="'+g2.x+'" cy="'+g2.y+'" r="13"/><circle cx="'+g2.x+'" cy="'+g2.y+'" r="6"/><text class="mk-label" x="'+g2.x+'" y="'+(g2.y+26)+'" text-anchor="middle">'+(g2.label||'')+'</text></g>'+ticks+'</svg>';
}

/* ---------- route outline ---------- */
function routeSVG(race){
  var tr=race.track;var lat0=tr[0][1]*Math.PI/180;var cx=Math.cos(lat0);
  var xs=tr.map(function(p){return p[2]*cx;}),ys=tr.map(function(p){return -p[1];});
  var minx=Math.min.apply(null,xs),maxx=Math.max.apply(null,xs),miny=Math.min.apply(null,ys),maxy=Math.max.apply(null,ys);
  var W=1000,H=620,pad=60;var sx=(W-2*pad)/(maxx-minx),sy=(H-2*pad)/(maxy-miny);var s=Math.min(sx,sy);
  var ox=pad+((W-2*pad)-(maxx-minx)*s)/2,oy=pad+((H-2*pad)-(maxy-miny)*s)/2;
  race._proj=tr.map(function(p){return [ox+(p[2]*cx-minx)*s, oy+(-p[1]-miny)*s];});
  var d='M '+race._proj.map(function(q){return q[0].toFixed(1)+','+q[1].toFixed(1);}).join(' L ');
  var kmMarks='';
  for(var k=2;k<race.totalKm;k+=2){var i=nearestIdx(race,k);var q=race._proj[i];kmMarks+='<circle cx="'+q[0]+'" cy="'+q[1]+'" r="7" class="rt-km"/><text x="'+(q[0]+12)+'" y="'+(q[1]+5)+'" class="rt-kmlab">'+k+'</text>';}
  var st=race._proj[0];
  return '<svg class="route" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Trazado"><path d="'+d+'" class="rt-shadow"/><path d="'+d+'" class="rt-line"/>'+kmMarks+
    '<circle cx="'+st[0]+'" cy="'+st[1]+'" r="11" class="rt-start"/><text x="'+(st[0]+16)+'" y="'+(st[1]-10)+'" class="rt-lab">Salida / Meta</text>'+
    '<circle id="rt-dot-glow" cx="'+st[0]+'" cy="'+st[1]+'" r="22" class="rt-dotglow"/><circle id="rt-dot" cx="'+st[0]+'" cy="'+st[1]+'" r="11" class="rt-dot"/></svg>';
}
function nearestIdx(race,km){var tr=race.track;var lo=0,hi=tr.length-1;while(lo<hi){var mid=(lo+hi)>>1;if(tr[mid][0]<km)lo=mid+1;else hi=mid;}return lo;}

/* ---------- interactive scrubber ---------- */
function initScrubber(race){
  var wrapEl=document.getElementById('scrub');if(!wrapEl)return;
  var p=race.profile;var W=p.viewBox[2];
  var cursor=document.getElementById('sc-cursor'),dot=document.getElementById('sc-dot');
  var rdot=document.getElementById('rt-dot'),rglow=document.getElementById('rt-dot-glow');
  var out={km:document.getElementById('o-km'),ele:document.getElementById('o-ele'),grad:document.getElementById('o-grad'),gain:document.getElementById('o-gain'),zone:document.getElementById('o-zone'),pace:document.getElementById('o-pace'),rest:document.getElementById('o-rest')};
  function yOf(ele){return p.bot-(ele-p.minEle)/(p.maxEle-p.minEle)*(p.bot-p.top);}
  function update(km){
    km=Math.max(0,Math.min(race.totalKm,km));
    var i=nearestIdx(race,km),tr=race.track,pt=tr[i];
    var a=tr[Math.max(0,i-4)],b=tr[Math.min(tr.length-1,i+4)];
    var dist=(b[0]-a[0])*1000;var grad=dist>0?((b[3]-a[3])/dist*100):0;
    var x=km/race.totalKm*W,y=yOf(pt[3]);
    cursor.setAttribute('x1',x);cursor.setAttribute('x2',x);dot.setAttribute('cx',x);dot.setAttribute('cy',y);
    if(race._proj){var q=race._proj[i];rdot.setAttribute('cx',q[0]);rdot.setAttribute('cy',q[1]);rglow.setAttribute('cx',q[0]);rglow.setAttribute('cy',q[1]);}
    out.km.textContent=km.toFixed(1).replace('.',',');
    out.ele.textContent=pt[3].toLocaleString('es-ES');
    out.grad.textContent=(grad>0?'+':'')+grad.toFixed(0)+'%';
    out.grad.className='ov '+(grad>8?'up':grad<-8?'down':'flat');
    out.gain.textContent=pt[4];
    out.rest.textContent=(race.totalKm-km).toFixed(1).replace('.',',');
    var z=zoneAt(race,km);
    if(z){var c=MODE[z[4]];out.zone.textContent=c[1];out.zone.style.color=c[0];out.pace.textContent=z[2]+' /km';}else{out.zone.textContent='-';out.pace.textContent='';}
  }
  function fromEvent(ev){var r=wrapEl.getBoundingClientRect();var cx=(ev.touches?ev.touches[0].clientX:ev.clientX);var ratio=(cx-r.left)/r.width;update(ratio*race.totalKm);}
  var down=false;
  wrapEl.addEventListener('touchstart',function(e){fromEvent(e);},{passive:true});
  wrapEl.addEventListener('touchmove',function(e){fromEvent(e);if(e.cancelable)e.preventDefault();},{passive:false});
  wrapEl.addEventListener('mousedown',function(e){down=true;fromEvent(e);});
  window.addEventListener('mousemove',function(e){if(down)fromEvent(e);});
  window.addEventListener('mouseup',function(){down=false;});
  var jumps=document.querySelectorAll('[data-jump]');
  [].forEach.call(jumps,function(b){b.addEventListener('click',function(){update(parseFloat(b.dataset.jump));});});
  update(7.1);
}

/* ---------- HOME ---------- */
function homeNav(active){
  return '<nav class="bottomnav">'+
    '<button class="navitem'+(active==='inicio'?' active':'')+'" data-go="#/">'+ICON.home+'<span>Inicio</span></button>'+
    '<button class="navitem'+(active==='entrenos'?' active':'')+'" data-go="#/entrenos">'+ICON.log+'<span>Entrenos</span></button>'+
    '<button class="navitem'+(active==='ajustes'?' active':'')+'" data-go="#/ajustes">'+ICON.cog+'<span>Ajustes</span></button></nav>';
}
function featuredRace(){var races=window.RACES.slice().sort(function(a,b){return a.date<b.date?-1:1;});var up=races.filter(function(r){return daysLeft(r.date)>=0;});return up[0]||races[0];}

function renderHome(){
  var races=window.RACES.slice().sort(function(a,b){return a.date<b.date?-1:1;});
  var featured=featuredRace();var rest=races.filter(function(r){return r!==featured;});
  var P=window.PROFILE;
  var html='<div class="view"><header class="home-head"><div class="kicker">Mi app de carreras</div><h1>Mis <span class="devil">carreras</span></h1>'+
    '<div class="meta">'+(P?P.peso+' &middot; trail':'trail')+'</div></header><div class="wrap content">';
  if(featured){
    prep(featured);var past=daysLeft(featured.date)<0;var today=findToday(featured);
    if(today && !past){
      var log=getJ('log-'+featured.id)[today.iso]||{};
      html+='<div class="section-label">Hoy &middot; '+DIAS[new Date().getDay()]+' '+fmtShort(today.iso)+'</div>'+
        '<div class="today"><span class="bar b-'+today.type+'"></span><div class="td-body">'+
        '<div class="td-ent">'+(today.race?'<b>DIA DE CARRERA</b>':today.ent)+'</div>'+
        '<div class="td-sub"><span class="tag t-'+today.type+'">'+typeName[today.type]+'</span>'+(today.race?' Abre el plan de carrera':(today.mac?today.mac.split(' \u00b7 ')[0]:''))+(log.hecho?' &middot; <span class="ok">'+ICON.check+' hecho'+(log.km?' '+log.km+' km':'')+'</span>':'')+'</div>'+
        '<div class="td-actions">'+
          (today.race?'<button class="btn primary" data-go="#/race/'+featured.id+'/carrera">Plan de carrera '+ICON.arrow+'</button>':
           '<button class="btn primary" data-go="#/race/'+featured.id+'/dias/'+today.iso+'">Comidas de hoy '+ICON.arrow+'</button>'+
           (today.isTraining?'<button class="btn" data-go="#/race/'+featured.id+'/dias/'+today.iso+'/log">'+(log.hecho?'Ver entreno':'Registrar entreno')+'</button>':''))+
        '</div></div></div>';
    }
    html+='<div class="section-label">'+(past?'Ultima carrera':'Proxima carrera')+'</div>'+
      '<a class="hero-card" href="#/race/'+featured.id+'"><div class="hc-media">'+heroProfile(featured.profile,'')+'<div class="hc-fade"></div>'+
        '<span class="hc-tag">Trail &middot; '+featured.gain+'</span><span class="hc-cd'+(past?' past':'')+'">'+(past?'hecha':'faltan '+cd(featured.date))+'</span>'+
        '<div class="hc-body"><div class="hc-name">'+featured.name+'</div><div class="hc-sub">'+featured.subtitle+' &middot; '+fmtDate(featured.date)+', '+featured.time+'</div></div></div>'+
        '<div class="hc-stats"><div class="s"><div class="sv ember">'+featured.km+'</div><div class="sl">km</div></div><div class="s"><div class="sv ember">'+featured.dplus+'</div><div class="sl">metros +</div></div><div class="s"><div class="sv">'+featured.estimate+'</div><div class="sl">en pista</div></div></div></a>'+
      '<div class="quick"><button class="qbtn" data-go="#/race/'+featured.id+'/mapa">'+ICON.mapa+'<span>Mapa</span></button><button class="qbtn" data-go="#/race/'+featured.id+'/ritmos">'+ICON.ritmos+'<span>Ritmos</span></button><button class="qbtn" data-go="#/race/'+featured.id+'/carrera">'+ICON.carrera+'<span>Dia D</span></button><button class="qbtn" data-go="#/entrenos">'+ICON.log+'<span>Entrenos</span></button></div>';
  }
  if(rest.length){html+='<div class="section-label">Otras carreras</div>';rest.forEach(function(r){var past=daysLeft(r.date)<0;
    html+='<a class="minicard" href="#/race/'+r.id+'"><span class="mc-mini">'+miniProfile(r.profile)+'</span><span><span class="mc-n">'+r.name+'</span><span class="mc-d">'+fmtDate(r.date)+' &middot; '+r.dist+' &middot; '+r.gain+'</span></span><span class="mc-cd">'+(past?'hecha':'faltan '+cd(r.date))+'</span></a>';});}
  if(!races.length) html+='<p class="lead">Aun no hay carreras. Pasale a Claude un GPX y una fecha para anadir la primera.</p>';
  html+='</div>'+homeNav('inicio')+'</div>';
  app().innerHTML=html;window.scrollTo(0,0);
}

/* ---------- ENTRENOS ---------- */
function renderEntrenos(){
  var race=featuredRace();var html='<div class="view"><header class="home-head"><div class="kicker">Registro</div><h1>Mis <span class="devil">entrenos</span></h1>';
  if(!race){html+='</header><div class="wrap content"><p class="lead">Sin carreras aun.</p></div>'+homeNav('entrenos')+'</div>';app().innerHTML=html;return;}
  prep(race);var logs=getJ('log-'+race.id);
  var totalPlan=0,totalDone=0,nDone=0,nPlan=0;
  race.days.forEach(function(x){if(x.w||!x.isTraining)return;nPlan++;totalPlan+=x.planKm;var l=logs[x.iso];if(l&&l.hecho){nDone++;totalDone+=parseFloat(l.km)||0;}});
  html+='<div class="meta">'+race.name+' &middot; '+nDone+'/'+nPlan+' sesiones hechas</div></header><div class="wrap content">';
  html+='<div class="summary"><div class="sm"><div class="sv">'+totalDone.toFixed(1).replace('.',',')+'</div><div class="sl">km hechos</div></div><div class="sm"><div class="sv dim">'+totalPlan+'</div><div class="sl">km planificados</div></div><div class="sm"><div class="sv ember">'+(totalPlan?Math.round(totalDone/totalPlan*100):0)+'%</div><div class="sl">completado</div></div></div>';
  var week=null,wPlan=0,wDone=0,wHtml='';
  function flush(){if(!week)return;html+='<div class="section-label">'+week+' <span class="wk">'+wDone.toFixed(1).replace('.',',')+' / '+wPlan+' km</span></div><div class="wbar"><div style="width:'+(wPlan?Math.min(100,wDone/wPlan*100):0)+'%"></div></div>'+wHtml;}
  race.days.forEach(function(x){
    if(x.w){flush();week=x.w;wPlan=0;wDone=0;wHtml='';return;}
    if(!x.isTraining&&!x.race)return;
    var l=logs[x.iso]||{};var done=!!l.hecho;wPlan+=x.planKm;if(done)wDone+=parseFloat(l.km)||0;
    var isT=daysLeft(x.iso)===0;
    wHtml+='<button class="sess'+(done?' done':'')+(isT?' today':'')+'" data-go="#/race/'+race.id+'/dias/'+x.iso+(x.race?'':'/log')+'">'+
      '<span class="bar b-'+x.type+'"></span><span class="date"><span class="d">'+x.d+'</span><span class="m">'+x.m+'</span></span>'+
      '<span class="mid"><span class="ent">'+(x.race?'CARRERA &middot; '+race.name:x.ent)+'</span><span class="kc">'+(done?(l.km?l.km+' km':'')+(l.tiempo?' &middot; '+l.tiempo:'')+(l.km&&l.tiempo?' &middot; '+fmtPace(parseTime(l.tiempo),parseFloat(l.km)):''):(x.race?'Dia D':'Pendiente &middot; '+x.planKm+' km'))+'</span></span>'+
      '<span class="st">'+(done?'<span class="ok">'+ICON.check+'</span>':ICON.arrow)+'</span></button>';
  });
  flush();
  html+='</div>'+homeNav('entrenos')+'</div>';app().innerHTML=html;window.scrollTo(0,0);
}

/* ---------- AJUSTES ---------- */
function renderAjustes(){
  var P=window.PROFILE||{};var chips=function(a,c){return (a||[]).map(function(x){return '<span class="chip'+(c?' '+c:'')+'">'+x+'</span>';}).join('');};
  var html='<div class="view"><header class="home-head"><div class="kicker">Configuracion</div><h1>Mis <span class="devil">ajustes</span></h1><div class="meta">Version '+VERSION+'</div></header><div class="wrap content">'+
    '<div class="section-label">Mi perfil</div><div class="card"><div class="pf-row"><span>Peso</span><b>'+(P.peso||'-')+'</b></div>'+
    (P.comidas?'<div class="pf-blk"><div class="pf-h">HORARIOS DE COMIDAS</div>'+chips(P.comidas)+'</div>':'')+
    (P.noGusta?'<div class="pf-blk"><div class="pf-h">NO ME GUSTA</div>'+chips(P.noGusta,'no')+'</div>':'')+
    (P.reglas?'<div class="pf-blk"><div class="pf-h">REGLAS DE LA DIETA</div>'+chips(P.reglas)+'</div>':'')+
    '<p class="pf-note">Cada dieta nueva respeta esto automaticamente. Se edita en el archivo profile.js.</p></div>'+
    '<div class="section-label">Datos guardados en este movil</div><div class="card">'+
    '<button class="row-btn" data-reset="checks">Reiniciar checks del dia de carrera'+ICON.arrow+'</button>'+
    '<button class="row-btn" data-reset="meals">Reiniciar casillas de comidas'+ICON.arrow+'</button>'+
    '<button class="row-btn danger" data-reset="log">Borrar registro de entrenos'+ICON.arrow+'</button></div>'+
    '<div class="section-label">Anadir carrera</div><div class="card"><p class="pf-note" style="margin:0">Pasale a Claude el GPX y la fecha. Te devuelve un archivo <b>races/nombre.js</b>: lo subes al repo, anades su linea en index.html y subes la version del service worker. Aparece sola aqui.</p></div>'+
    '<p class="foot">Mis carreras &middot; PWA hecha para Ruben</p></div>'+homeNav('ajustes')+'</div>';
  app().innerHTML=html;window.scrollTo(0,0);
  [].forEach.call(document.querySelectorAll('[data-reset]'),function(b){b.addEventListener('click',function(){
    var what=b.dataset.reset;var msg={checks:'Reiniciar los checks del dia de carrera?',meals:'Reiniciar las casillas de comidas?',log:'Borrar TODO el registro de entrenos? No se puede deshacer.'}[what];
    if(!confirm(msg))return;window.RACES.forEach(function(r){try{store&&store.removeItem((what==='checks'?'cdd-checks-':what==='meals'?'meals-':'log-')+r.id);}catch(e){}});
    b.textContent='Hecho';setTimeout(function(){renderAjustes();},700);});});
}

/* ---------- RACE ---------- */
function renderRace(race,tab,focusIso,openLog){
  prep(race);tab=tab||'dias';var past=daysLeft(race.date)<0;
  var html='<div class="view"><button class="backfab" data-go="#/" aria-label="Volver">'+ICON.back+'</button>'+
    '<div class="cd-pill'+(past?' past':'')+'">'+(past?'hecha':'faltan '+cd(race.date))+'</div>'+
    '<div class="rhero">'+heroProfile(race.profile,'rhero-svg')+'<div class="rhero-fade"></div><div class="rhero-body"><div class="rhero-kick">Dieta de carrera</div><div class="rhero-title">'+(race.nameHTML||race.name)+'</div><div class="rhero-sub">'+race.subtitle+' &middot; <b>'+fmtDate(race.date)+', '+race.time+'</b></div></div></div>'+
    '<div class="stats"><div class="stat"><div class="n ember">'+race.km+'</div><div class="l">km</div></div><div class="stat"><div class="n ember">'+race.dplus+'</div><div class="l">metros +</div></div><div class="stat"><div class="n">'+race.estimate+'</div><div class="l">en pista</div></div></div>'+
    '<div class="content wrap">'+
    /* DIAS */
    '<section class="panel" id="dias"><div class="readout">'+race.readout+'</div>'+
      '<p class="lead">Toca un dia: veras sus comidas (con casillas para marcar) y, si hay entreno, el registro para apuntar tus tiempos.</p>'+
      '<div class="legend"><span><i class="dot hc"></i>Hidratos</span><span><i class="dot pr"></i>Proteina</span><span><i class="dot gr"></i>Grasa buena</span><span><i class="dot fi"></i>Fibra</span></div><div id="daylist"></div></section>'+
    /* MAPA */
    '<section class="panel" id="mapa"><p class="lead">Arrastra el dedo por el perfil: te dice la altura, la pendiente y en que zona de ritmo estas. El punto del trazado se mueve contigo.</p>'+
      '<div class="card route-card">'+routeSVG(race)+'</div>'+
      '<div class="scrub-card"><div id="scrub" class="scrub">'+scrubSVG(race)+'</div>'+
        '<div class="out"><div class="ob big"><span class="ok2">km</span><b id="o-km">0</b></div><div class="ob big"><b id="o-ele">0</b><span class="ok2">m</span></div><div class="ob"><span class="ok2">pendiente</span><b id="o-grad" class="ov">0%</b></div><div class="ob"><span class="ok2">D+ acumulado</span><b id="o-gain">0</b></div><div class="ob"><span class="ok2">quedan</span><b id="o-rest">16</b><span class="ok2">km</span></div><div class="ob"><span class="ok2">zona</span><b id="o-zone">-</b><span id="o-pace" class="ok2"></span></div></div>'+
        '<div class="jumps"><button class="jbtn" data-jump="0">Salida</button><button class="jbtn" data-jump="7.1">Techo km 7</button><button class="jbtn" data-jump="10">Bajada</button><button class="jbtn" data-jump="13">Muro km 13</button><button class="jbtn" data-jump="15.9">Meta</button></div></div>'+
      '<div class="lead" style="font-size:12.5px">La pendiente se calcula sobre ~250 m; el D+ acumulado es el desnivel positivo sumado hasta ese punto.</div></section>'+
    /* RITMOS */
    '<section class="panel" id="ritmos"><div class="profile-card">'+buildProfileSVG(race.profile)+'</div>'+
      '<div class="obj"><div class="t">OBJETIVO</div><div class="n"><b>'+race.objective+'</b></div><div class="s">'+race.objectiveNote+'</div></div>'+
      '<div id="strip" class="strip"></div><div class="striplab"><span>km 0</span><span>km 8</span><span>km 16</span></div><div id="zones"></div><div class="phase">A vigilar</div><div id="warns"></div>'+
      '<p class="lead" style="margin-top:12px">Tu terreno: mucha bajada (km 8-12 y 15-16), tu arma. Penaliza la subida sostenida y el muro &mdash; justo lo que entrenas.</p></section>'+
    /* CARRERA */
    '<section class="panel raceday" id="carrera"><p class="lead">Salida '+race.time+', '+race.estimate+' en pista. ~50-60 g de hidratos por hora. Marca cada paso.</p>'+
      '<div class="phase">Antes</div><div id="pre"></div><div class="tactic"><div class="th">Tactica ligada al perfil</div>'+race.raceDay.tactic+'</div>'+
      '<div class="phase">Durante ('+race.time+')</div><div id="dur"></div><div class="phase">Meta y recuperacion</div><div id="post"></div>'+
      '<p class="foot">Cantidades para '+(window.PROFILE?window.PROFILE.peso:'tu peso')+'. Ajusta al hambre real.</p></section>'+
    '</div>'+
    '<nav class="bottomnav"><button class="navitem" data-tab="dias">'+ICON.dias+'<span>Dias</span></button><button class="navitem" data-tab="mapa">'+ICON.mapa+'<span>Mapa</span></button><button class="navitem" data-tab="ritmos">'+ICON.ritmos+'<span>Ritmos</span></button><button class="navitem" data-tab="carrera">'+ICON.carrera+'<span>Carrera</span></button></nav></div>';
  app().innerHTML=html;window.scrollTo(0,0);

  /* days */
  var dl=document.getElementById('daylist');var meals=getJ('meals-'+race.id);var logs=getJ('log-'+race.id);var focusEl=null;
  race.days.forEach(function(x){
    if(x.w){var h=document.createElement('div');h.className='week';h.textContent=x.w;dl.appendChild(h);return;}
    var el=document.createElement('div');el.className='acc'+(x.race?' race':'');el.dataset.open="0";el.id='day-'+x.iso;
    var mChecks=meals[x.iso]||{};var nM=x.menu?x.menu.length:0;var nC=Object.keys(mChecks).filter(function(k){return mChecks[k];}).length;
    var lg=logs[x.iso]||{};var isT=daysLeft(x.iso)===0;
    var head='<button aria-expanded="false"><span class="bar b-'+x.type+'"></span><span class="date"><span class="d">'+x.d+'</span><span class="m">'+x.m+'</span></span>'+
      '<span class="mid"><span class="ent">'+x.ent+(isT?' <span class="today-chip">HOY</span>':'')+'</span><br><span class="kc">'+(x.race?'Plan de carrera aparte':x.mac.split(' \u00b7 ')[0])+(nC?' &middot; comidas '+nC+'/'+nM:'')+(lg.hecho?' &middot; <span class="ok">entreno hecho</span>':'')+'</span></span>'+
      '<span class="tag t-'+x.type+'">'+typeName[x.type]+'</span><span class="chev">\u203a</span></button>';
    if(x.race){el.innerHTML=head+'<div class="body"><div class="body-in"><p style="font-size:13px;color:#cdd4df;margin:6px 0">El dia de carrera tiene su plan en la pestana <b style="color:var(--ember-soft)">Carrera</b>.</p></div></div>';el.querySelector('button').addEventListener('click',function(){switchTab('carrera');});dl.appendChild(el);return;}
    var rows=x.menu.map(function(it,i){return '<label class="meal mchk"><input type="checkbox" data-mi="'+i+'"'+(mChecks[i]?' checked':'')+'><span class="mtxt"><span class="when">'+it[0]+'</span><span class="what">'+it[1]+'</span>'+(it[2].length?'<span class="dots">'+it[2].map(function(d){return '<i class="dot '+d+'"></i>';}).join('')+'</span>':'')+'</span></label>';}).join('');
    if(x.tip)rows+='<div class="tip">'+x.tip+'</div>';
    var mac=x.mac.split(' \u00b7 ').map(function(pp){return '<span><b>'+pp+'</b></span>';}).join('');
    var logHtml='';
    if(x.isTraining){logHtml='<div class="logbox" id="log-'+x.iso+'"><div class="lb-h">'+ICON.log+' Mi entreno &middot; previsto '+x.planKm+' km</div>'+
      '<div class="lb-grid"><label>Km<input type="number" inputmode="decimal" step="0.1" data-f="km" value="'+esc(lg.km||'')+'" placeholder="'+x.planKm+'"></label><label>Tiempo<input type="text" inputmode="numeric" data-f="tiempo" value="'+esc(lg.tiempo||'')+'" placeholder="mm:ss"></label><label class="wide">Notas<input type="text" data-f="notas" value="'+esc(lg.notas||'')+'" placeholder="Sensaciones, terreno..."></label></div>'+
      '<div class="lb-foot"><span class="lb-pace" id="pace-'+x.iso+'">'+(lg.km&&lg.tiempo?fmtPace(parseTime(lg.tiempo),parseFloat(lg.km)):'')+'</span><label class="lb-done"><input type="checkbox" data-f="hecho"'+(lg.hecho?' checked':'')+'><span>Hecho</span></label><button class="btn primary sm" data-save="'+x.iso+'">Guardar</button></div></div>';}
    el.innerHTML=head+'<div class="body"><div class="body-in"><div class="macrobar">'+mac+'</div>'+rows+logHtml+'</div></div>';
    var b=el.querySelector('button'),body=el.querySelector('.body');
    function setOpen(o){el.dataset.open=o?"1":"0";b.setAttribute('aria-expanded',String(o));body.style.maxHeight=o?body.scrollHeight+"px":null;}
    b.addEventListener('click',function(){setOpen(el.dataset.open!=="1");});
    el._setOpen=setOpen;
    [].forEach.call(el.querySelectorAll('input[data-mi]'),function(inp){inp.addEventListener('change',function(){var m=getJ('meals-'+race.id);m[x.iso]=m[x.iso]||{};m[x.iso][inp.dataset.mi]=inp.checked;setJ('meals-'+race.id,m);
      var n=Object.keys(m[x.iso]).filter(function(k){return m[x.iso][k];}).length;var kc=el.querySelector('.kc');kc.innerHTML=x.mac.split(' \u00b7 ')[0]+(n?' &middot; comidas '+n+'/'+nM:'')+((getJ('log-'+race.id)[x.iso]||{}).hecho?' &middot; <span class="ok">entreno hecho</span>':'');});});
    var sv=el.querySelector('[data-save]');
    if(sv){var box=el.querySelector('.logbox');
      function recalc(){var km=parseFloat(box.querySelector('[data-f=km]').value),t=parseTime(box.querySelector('[data-f=tiempo]').value);box.querySelector('.lb-pace').textContent=(km&&t)?fmtPace(t,km):'';body.style.maxHeight=body.scrollHeight+'px';}
      [].forEach.call(box.querySelectorAll('input[data-f=km],input[data-f=tiempo]'),function(i){i.addEventListener('input',recalc);});
      sv.addEventListener('click',function(){var L=getJ('log-'+race.id);L[x.iso]={km:box.querySelector('[data-f=km]').value,tiempo:box.querySelector('[data-f=tiempo]').value,notas:box.querySelector('[data-f=notas]').value,hecho:box.querySelector('[data-f=hecho]').checked};setJ('log-'+race.id,L);
        sv.textContent='Guardado';sv.classList.add('saved');setTimeout(function(){sv.textContent='Guardar';sv.classList.remove('saved');},1200);
        var kc=el.querySelector('.kc');var m=getJ('meals-'+race.id)[x.iso]||{};var n=Object.keys(m).filter(function(k){return m[k];}).length;kc.innerHTML=x.mac.split(' \u00b7 ')[0]+(n?' &middot; comidas '+n+'/'+nM:'')+(L[x.iso].hecho?' &middot; <span class="ok">entreno hecho</span>':'');});}
    dl.appendChild(el);
    if(focusIso&&x.iso===focusIso)focusEl=el;
  });

  /* ritmos */
  var zc=document.getElementById('zones');
  race.zones.forEach(function(z){var c=MODE[z[4]][0];var el=document.createElement('div');el.className='zone';el.innerHTML='<span class="zbar" style="background:'+c+'"></span><span class="zkm">'+z[0]+'<small style="color:'+c+'">'+MODE[z[4]][1]+'</small></span><span class="zmid"><span class="zter">'+z[1]+'</span><span class="zcue">'+z[3]+'</span></span><span class="zpace"><span class="p">'+z[2]+'</span> <span class="u">/km</span></span>';zc.appendChild(el);});
  var st=document.getElementById('strip');race.segs.forEach(function(sg){var d=document.createElement('div');d.style.width=(sg[0]/16*100)+'%';d.style.background=MODE[sg[1]][0];st.appendChild(d);});
  var wc=document.getElementById('warns');race.warns.forEach(function(w,i){var el=document.createElement('div');el.className='check';el.style.cursor='default';el.innerHTML='<span class="num">'+(i+1)+'</span><span class="txt"><span class="t-what">'+w+'</span></span>';wc.appendChild(el);});

  /* carrera checks */
  var KEY='cdd-checks-'+race.id,saved=getJ(KEY);
  function fill(id,arr,pfx){var c=document.getElementById(id);arr.forEach(function(it,i){var k=pfx+i;var l=document.createElement('label');l.className='check'+(it[2]?' fuel':'');l.innerHTML='<input type="checkbox"><span class="txt"><span class="t-when">'+it[0]+'</span><span class="t-what">'+it[1]+'</span></span>';var inp=l.querySelector('input');if(saved[k])inp.checked=true;inp.addEventListener('change',function(){saved[k]=inp.checked;setJ(KEY,saved);});c.appendChild(l);});}
  fill('pre',race.raceDay.pre,'a');fill('dur',race.raceDay.dur,'b');fill('post',race.raceDay.post,'c');

  /* tabs */
  var items=[].slice.call(document.querySelectorAll('.navitem[data-tab]'));
  var panels={dias:document.getElementById('dias'),mapa:document.getElementById('mapa'),ritmos:document.getElementById('ritmos'),carrera:document.getElementById('carrera')};
  var scrubInit=false;
  window.switchTab=function(name,noScroll){items.forEach(function(t){t.classList.toggle('active',t.dataset.tab===name);});Object.keys(panels).forEach(function(k){panels[k].classList.toggle('on',k===name);});
    if(name==='mapa'&&!scrubInit){scrubInit=true;initScrubber(race);}
    var h='#/race/'+race.id+(name==='dias'?'':'/'+name);if(location.hash!==h){history.replaceState(null,'',h);}
    if(!noScroll)window.scrollTo({top:0,behavior:'smooth'});};
  items.forEach(function(t){t.addEventListener('click',function(){switchTab(t.dataset.tab);});});
  switchTab(tab,true);
  if(focusEl){focusEl._setOpen&&focusEl._setOpen(true);setTimeout(function(){focusEl.scrollIntoView({behavior:'smooth',block:'start'});if(openLog){var inp=focusEl.querySelector('.logbox input');inp&&inp.focus();}},120);}

  if(!matchMedia('(prefers-reduced-motion:reduce)').matches){var hl=document.querySelector('.rhero-svg .hp-line');if(hl&&hl.getTotalLength){try{var len=hl.getTotalLength();hl.style.strokeDasharray=len;hl.style.strokeDashoffset=len;requestAnimationFrame(function(){hl.style.transition='stroke-dashoffset 1.4s ease';hl.style.strokeDashoffset=0;});}catch(e){}}}
}
function scrubSVG(race){var p=race.profile;
  return '<svg viewBox="0 0 '+p.viewBox[2]+' '+p.viewBox[3]+'" preserveAspectRatio="none"><defs><linearGradient id="sg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a2c" stop-opacity=".35"/><stop offset="1" stop-color="#ff5a2c" stop-opacity=".02"/></linearGradient></defs>'+
    '<path d="'+p.area+'" fill="url(#sg)"/><path d="'+p.line+'" class="sc-line"/>'+
    '<line id="sc-cursor" x1="0" y1="'+p.top+'" x2="0" y2="'+p.bot+'" class="sc-cursor"/><circle id="sc-dot" cx="0" cy="0" r="9" class="sc-dot"/></svg>';
}

/* ---------- ROUTER ---------- */
function router(){
  var h=location.hash||'#/';
  var m;
  if((m=h.match(/^#\/race\/([^\/]+)(?:\/([a-z]+))?(?:\/(\d{4}-\d{2}-\d{2}))?(?:\/(log))?$/))){
    var f=window.RACES.filter(function(x){return x.id===m[1];})[0];
    if(f){renderRace(f,m[2]||'dias',m[3]||null,!!m[4]);return;}
  }
  if(h==='#/entrenos'){renderEntrenos();return;}
  if(h==='#/ajustes'){renderAjustes();return;}
  renderHome();
}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-go]');if(b){e.preventDefault();var to=b.dataset.go;if(location.hash===to){router();}else{location.hash=to;}}});
window.addEventListener('hashchange',router);
window.addEventListener('DOMContentLoaded',router);
if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('service-worker.js').catch(function(){});});}
})();
