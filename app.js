(function(){
"use strict";
window.RACES = window.RACES || [];
window.registerRace = function(r){ window.RACES.push(r); };

var typeName={suave:"Suave",medio:"Rodaje",fuerte:"Fuerte",carga:"Carga",carrera:"Carrera"};
var MODE={hold:["#ecb63f","CONTEN"],steady:["#6f8fae","RITMO"],hike:["#ff4a30","ANDAR"],send:["#4fa76e","SUELTA"]};
var MESES=["ene","feb","mar","abr","may","jun","jul","ago","sept","oct","nov","dic"];
var ICON={
  dias:'<svg viewBox="0 0 24 24"><rect x="3" y="4.5" width="18" height="17" rx="2.5"/><path d="M3 9.5h18"/><path d="M8 2.5v4M16 2.5v4"/></svg>',
  ritmos:'<svg viewBox="0 0 24 24"><path d="M2 12h4l2.5 7L13 4l2.5 8H22"/></svg>',
  carrera:'<svg viewBox="0 0 24 24"><path d="M5 21V4"/><path d="M5 4c3-1.6 6 1.6 9 0s5 0 5 0v8s-2 1.6-5 0-6-1.6-9 0"/></svg>',
  back:'<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>'
};
function app(){return document.getElementById('app');}
function fmtDate(iso){var p=iso.split('-');return parseInt(p[2],10)+' '+MESES[parseInt(p[1],10)-1]+' '+p[0];}
function daysLeft(iso){var t=new Date();t.setHours(0,0,0,0);var d=new Date(iso+'T00:00:00');return Math.round((d-t)/86400000);}
function cd(iso){var n=daysLeft(iso);if(n>1)return n+' dias';if(n===1)return 'manana';if(n===0)return 'HOY';return 'hecha';}

function heroProfile(p,cls){
  return '<svg class="'+cls+'" viewBox="0 0 '+p.viewBox[2]+' '+p.viewBox[3]+'" preserveAspectRatio="none" aria-hidden="true">'+
    '<defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a2c" stop-opacity=".32"/><stop offset="1" stop-color="#ff5a2c" stop-opacity="0"/></linearGradient></defs>'+
    '<path d="'+p.area+'" fill="url(#hg)"/>'+
    '<path class="hp-line" d="'+p.line+'" fill="none" stroke="#ff5a2c" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/></svg>';
}
function miniProfile(p){
  return '<svg viewBox="0 0 '+p.viewBox[2]+' '+p.viewBox[3]+'" preserveAspectRatio="none" aria-hidden="true">'+
    '<path d="'+p.area+'" fill="rgba(255,90,44,.16)"/>'+
    '<path d="'+p.line+'" fill="none" stroke="#ff5a2c" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/></svg>';
}

/* ---------------- HOME ---------------- */
function renderHome(){
  var races=window.RACES.slice().sort(function(a,b){return a.date<b.date?-1:1;});
  var upcoming=races.filter(function(r){return daysLeft(r.date)>=0;});
  var featured=upcoming[0]||races[0];
  var rest=races.filter(function(r){return r!==featured;});
  var html='<div class="view"><header class="home-head"><div class="kicker">Mi app de carreras</div>'+
    '<h1>Mis <span class="devil">carreras</span></h1>'+
    '<div class="meta">'+(window.PROFILE?window.PROFILE.peso+' &middot; trail':'trail')+'</div></header><div class="wrap">';
  if(featured){
    var past=daysLeft(featured.date)<0;
    html+='<div class="section-label">'+(past?'Ultima carrera':'Proxima carrera')+'</div>'+
      '<a class="hero-card" href="#/race/'+featured.id+'">'+
        '<div class="hc-media">'+heroProfile(featured.profile,'')+'<div class="hc-fade"></div>'+
          '<span class="hc-tag">Trail &middot; '+featured.gain+'</span>'+
          '<span class="hc-cd'+(past?' past':'')+'">'+(past?'hecha':'faltan '+cd(featured.date))+'</span>'+
          '<div class="hc-body"><div class="hc-name">'+featured.name+'</div><div class="hc-sub">'+featured.subtitle+' &middot; '+fmtDate(featured.date)+', '+featured.time+'</div></div>'+
        '</div>'+
        '<div class="hc-stats"><div class="s"><div class="sv ember">'+featured.km+'</div><div class="sl">km</div></div>'+
          '<div class="s"><div class="sv ember">'+featured.dplus+'</div><div class="sl">metros +</div></div>'+
          '<div class="s"><div class="sv">'+featured.estimate+'</div><div class="sl">en pista</div></div></div>'+
      '</a>';
  }
  if(rest.length){
    html+='<div class="section-label">Otras carreras</div>';
    rest.forEach(function(r){var past=daysLeft(r.date)<0;
      html+='<a class="minicard" href="#/race/'+r.id+'"><span class="mc-mini">'+miniProfile(r.profile)+'</span>'+
        '<span><span class="mc-n">'+r.name+'</span><span class="mc-d">'+fmtDate(r.date)+' &middot; '+r.dist+' &middot; '+r.gain+'</span></span>'+
        '<span class="mc-cd">'+(past?'hecha':'faltan '+cd(r.date))+'</span></a>';
    });
  }
  if(!races.length) html+='<p class="lead">Aun no hay carreras. Pasale a Claude un GPX y una fecha para anadir la primera.</p>';
  var P=window.PROFILE;
  if(P){
    var chips=function(a,c){return a.map(function(x){return '<span class="chip'+(c?' '+c:'')+'">'+x+'</span>';}).join('');};
    html+='<div class="section-label">Ajustes</div><details class="prefs"><summary><span class="ic">'+ICON.dias+'</span>Mis preferencias</summary><div class="prefs-in">'+
      '<div class="pf-row"><span>Peso</span><b>'+P.peso+'</b></div>'+
      (P.comidas?'<div class="pf-blk"><div class="pf-h">HORARIOS</div>'+chips(P.comidas)+'</div>':'')+
      (P.noGusta?'<div class="pf-blk"><div class="pf-h">NO ME GUSTA</div>'+chips(P.noGusta,'no')+'</div>':'')+
      (P.reglas?'<div class="pf-blk"><div class="pf-h">REGLAS</div>'+chips(P.reglas)+'</div>':'')+
      '<p class="pf-note">Cada dieta nueva respeta esto automaticamente.</p></div></details>';
  }
  html+='</div></div>';
  app().innerHTML=html;
  window.scrollTo(0,0);
}

/* ---------------- FULL PROFILE (ritmos) ---------------- */
function buildProfileSVG(p){
  var t=p.techo,m=p.muro,g1=p.gel1,g2=p.gel2,bj=p.bajada;
  var ticks=(p.ticks||[]).map(function(tk){var a=tk[1]==='0'?'start':(tk[1]==='16'?'end':'middle');
    return '<text class="axis" x="'+tk[0]+'" y="'+(p.bot+18)+'" text-anchor="'+a+'">'+tk[1]+'</text>';}).join('');
  return '<svg viewBox="0 0 '+p.viewBox[2]+' '+p.viewBox[3]+'" role="img" aria-label="Perfil">'+
    '<line class="gridline" x1="0" y1="'+p.bot+'" x2="'+p.viewBox[2]+'" y2="'+p.bot+'"/>'+
    '<path d="'+p.area+'" fill="url(#eg)"/>'+
    '<defs><linearGradient id="eg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ff5a2c" stop-opacity=".28"/><stop offset="1" stop-color="#ff5a2c" stop-opacity="0"/></linearGradient></defs>'+
    '<rect x="'+bj.x1+'" y="'+p.top+'" width="'+(bj.x2-bj.x1)+'" height="'+(p.bot-p.top)+'" fill="#5b86c9" opacity="0.10"/>'+
    '<text class="zone-label" x="'+((bj.x1+bj.x2)/2)+'" y="'+(p.bot-6)+'" text-anchor="middle">'+(bj.label||'')+'</text>'+
    '<path class="pline" id="pline" d="'+p.line+'"/>'+
    '<circle cx="'+t.x+'" cy="'+t.y+'" r="4.5" fill="#ff7a52"/>'+
    '<text class="peak-label" x="'+t.x+'" y="'+(t.y-10)+'" text-anchor="middle">'+(t.label||'')+'</text>'+
    '<text class="peak-label" x="'+m.x+'" y="'+(m.y-14)+'" text-anchor="middle" fill="#ff4a30">'+(m.label||'')+'</text>'+
    '<g class="marker"><circle class="glow" cx="'+g1.x+'" cy="'+g1.y+'" r="13"/><circle cx="'+g1.x+'" cy="'+g1.y+'" r="6"/><text class="mk-label" x="'+g1.x+'" y="'+(g1.y+26)+'" text-anchor="middle">'+(g1.label||'')+'</text></g>'+
    '<g class="marker"><circle class="glow" cx="'+g2.x+'" cy="'+g2.y+'" r="13"/><circle cx="'+g2.x+'" cy="'+g2.y+'" r="6"/><text class="mk-label" x="'+g2.x+'" y="'+(g2.y+26)+'" text-anchor="middle">'+(g2.label||'')+'</text></g>'+
    ticks+'</svg>';
}

/* ---------------- RACE ---------------- */
function renderRace(race){
  var past=daysLeft(race.date)<0;
  var html='<div class="view">'+
    '<button class="backfab" data-home aria-label="Volver">'+ICON.back+'</button>'+
    '<div class="cd-pill'+(past?' past':'')+'">'+(past?'hecha':'faltan '+cd(race.date))+'</div>'+
    '<div class="rhero">'+heroProfile(race.profile,'rhero-svg')+'<div class="rhero-fade"></div>'+
      '<div class="rhero-body"><div class="rhero-kick">Dieta de carrera</div>'+
        '<div class="rhero-title">'+(race.nameHTML||race.name)+'</div>'+
        '<div class="rhero-sub">'+race.subtitle+' &middot; <b>'+fmtDate(race.date)+', '+race.time+'</b></div></div></div>'+
    '<div class="stats">'+
      '<div class="stat"><div class="n ember">'+race.km+'</div><div class="l">km</div></div>'+
      '<div class="stat"><div class="n ember">'+race.dplus+'</div><div class="l">metros +</div></div>'+
      '<div class="stat"><div class="n">'+race.estimate+'</div><div class="l">en pista</div></div></div>'+
    '<div class="content wrap">'+
      '<section class="panel on" id="dias">'+
        '<div class="readout">'+race.readout+'</div>'+
        '<p class="lead">Cada dia lleva comidas distintas &mdash; no repites plato. Lo que se mantiene por tipo de dia son las kcal y los macros. Toca un dia para ver su comida.</p>'+
        '<div class="legend"><span><i class="dot hc"></i>Hidratos</span><span><i class="dot pr"></i>Proteina</span><span><i class="dot gr"></i>Grasa buena</span><span><i class="dot fi"></i>Fibra</span></div>'+
        '<div id="daylist"></div></section>'+
      '<section class="panel" id="ritmos">'+
        '<div class="profile-card">'+buildProfileSVG(race.profile)+'</div>'+
        '<div class="obj"><div class="t">OBJETIVO</div><div class="n"><b>'+race.objective+'</b></div><div class="s">'+race.objectiveNote+'</div></div>'+
        '<div id="strip" class="strip"></div><div class="striplab"><span>km 0</span><span>km 8</span><span>km 16</span></div>'+
        '<div id="zones"></div><div class="phase">A vigilar</div><div id="warns"></div>'+
        '<p class="lead" style="margin-top:12px">Tu terreno: mucha bajada (km 8-12 y 15-16), tu arma. Penaliza la subida sostenida y el muro &mdash; justo lo que entrenas.</p></section>'+
      '<section class="panel raceday" id="carrera">'+
        '<p class="lead">Salida '+race.time+', '+race.estimate+' en pista. ~50-60 g de hidratos por hora. Marca cada paso.</p>'+
        '<div class="phase">Antes</div><div id="pre"></div>'+
        '<div class="tactic"><div class="th">Tactica ligada al perfil</div>'+race.raceDay.tactic+'</div>'+
        '<div class="phase">Durante ('+race.time+')</div><div id="dur"></div>'+
        '<div class="phase">Meta y recuperacion</div><div id="post"></div>'+
        '<p class="foot">Cantidades para '+(window.PROFILE?window.PROFILE.peso:'tu peso')+'. Ajusta al hambre real.</p></section>'+
    '</div>'+
    '<nav class="bottomnav">'+
      '<button class="navitem active" data-tab="dias">'+ICON.dias+'<span>Dias</span></button>'+
      '<button class="navitem" data-tab="ritmos">'+ICON.ritmos+'<span>Ritmos</span></button>'+
      '<button class="navitem" data-tab="carrera">'+ICON.carrera+'<span>Carrera</span></button>'+
    '</nav></div>';
  app().innerHTML=html;
  window.scrollTo(0,0);

  // days
  var dl=document.getElementById('daylist');
  race.days.forEach(function(x){
    if(x.w){var h=document.createElement('div');h.className='week';h.textContent=x.w;dl.appendChild(h);return;}
    var el=document.createElement('div');el.className='acc'+(x.race?' race':'');el.dataset.open="0";
    var head='<button aria-expanded="false"><span class="bar b-'+x.type+'"></span>'+
      '<span class="date"><span class="d">'+x.d+'</span><span class="m">'+x.m+'</span></span>'+
      '<span class="mid"><span class="ent">'+x.ent+'</span><br><span class="kc">'+(x.race?'Plan de carrera aparte':x.mac.split(' \u00b7 ')[0]+' kcal')+'</span></span>'+
      '<span class="tag t-'+x.type+'">'+typeName[x.type]+'</span><span class="chev">\u203a</span></button>';
    if(x.race){el.innerHTML=head+'<div class="body"><div class="body-in"><p style="font-size:13px;color:#cdd4df;margin:6px 0">El dia de carrera tiene su plan en la pestana <b style="color:var(--ember-soft)">Carrera</b>.</p></div></div>';
      el.querySelector('button').addEventListener('click',function(){switchTab('carrera');});dl.appendChild(el);return;}
    var rows=x.menu.map(function(it){return '<div class="meal"><div class="when">'+it[0]+'</div><div class="what">'+it[1]+'</div>'+
      (it[2].length?'<div class="dots">'+it[2].map(function(d){return '<i class="dot '+d+'"></i>';}).join('')+'</div>':'')+'</div>';}).join('');
    if(x.tip) rows+='<div class="tip">'+x.tip+'</div>';
    var mac=x.mac.split(' \u00b7 ').map(function(pp){return '<span><b>'+pp+'</b></span>';}).join('');
    el.innerHTML=head+'<div class="body"><div class="body-in"><div class="macrobar">'+mac+'</div>'+rows+'</div></div>';
    var b=el.querySelector('button'),body=el.querySelector('.body');
    b.addEventListener('click',function(){var o=el.dataset.open==="1";el.dataset.open=o?"0":"1";b.setAttribute('aria-expanded',String(!o));body.style.maxHeight=o?null:body.scrollHeight+"px";});
    dl.appendChild(el);
  });

  // zones/strip/warns
  var zc=document.getElementById('zones');
  race.zones.forEach(function(z){var c=MODE[z[4]][0];var el=document.createElement('div');el.className='zone';
    el.innerHTML='<span class="zbar" style="background:'+c+'"></span><span class="zkm">'+z[0]+'<small style="color:'+c+'">'+MODE[z[4]][1]+'</small></span>'+
      '<span class="zmid"><span class="zter">'+z[1]+'</span><span class="zcue">'+z[3]+'</span></span>'+
      '<span class="zpace"><span class="p">'+z[2]+'</span> <span class="u">/km</span></span>';zc.appendChild(el);});
  var st=document.getElementById('strip');
  race.segs.forEach(function(sg){var d=document.createElement('div');d.style.width=(sg[0]/16*100)+'%';d.style.background=MODE[sg[1]][0];st.appendChild(d);});
  var wc=document.getElementById('warns');
  race.warns.forEach(function(w,i){var el=document.createElement('div');el.className='check';el.style.cursor='default';
    el.innerHTML='<span style="width:22px;height:22px;border-radius:50%;background:var(--g750);color:var(--ember-soft);font-weight:800;font-size:12px;display:flex;align-items:center;justify-content:center;flex:none">'+(i+1)+'</span><span class="txt"><span class="t-what">'+w+'</span></span>';wc.appendChild(el);});

  // checks + persistence
  var store;try{store=window.localStorage;}catch(e){store=null;}
  var KEY='cdd-checks-'+race.id,saved={};
  try{saved=JSON.parse((store&&store.getItem(KEY))||'{}')||{};}catch(e){saved={};}
  function fill(id,arr,pfx){var c=document.getElementById(id);arr.forEach(function(it,i){var k=pfx+i;
    var l=document.createElement('label');l.className='check'+(it[2]?' fuel':'');
    l.innerHTML='<input type="checkbox"><span class="txt"><span class="t-when">'+it[0]+'</span><span class="t-what">'+it[1]+'</span></span>';
    var inp=l.querySelector('input');if(saved[k])inp.checked=true;
    inp.addEventListener('change',function(){saved[k]=inp.checked;try{store&&store.setItem(KEY,JSON.stringify(saved));}catch(e){}});
    c.appendChild(l);});}
  fill('pre',race.raceDay.pre,'a');fill('dur',race.raceDay.dur,'b');fill('post',race.raceDay.post,'c');

  // bottom nav tabs
  var items=[].slice.call(document.querySelectorAll('.navitem'));
  var panels={dias:document.getElementById('dias'),ritmos:document.getElementById('ritmos'),carrera:document.getElementById('carrera')};
  window.switchTab=function(name){items.forEach(function(t){t.classList.toggle('active',t.dataset.tab===name);});
    Object.keys(panels).forEach(function(k){panels[k].classList.toggle('on',k===name);});window.scrollTo({top:0,behavior:'smooth'});};
  items.forEach(function(t){t.addEventListener('click',function(){switchTab(t.dataset.tab);});});

  // hero line draw-in
  if(!matchMedia('(prefers-reduced-motion:reduce)').matches){
    var hl=document.querySelector('.rhero-svg .hp-line');
    if(hl && hl.getTotalLength){try{var len=hl.getTotalLength();hl.style.strokeDasharray=len;hl.style.strokeDashoffset=len;
      requestAnimationFrame(function(){hl.style.transition='stroke-dashoffset 1.4s ease';hl.style.strokeDashoffset=0;});}catch(e){}}
  }
}

/* ---------------- ROUTER ---------------- */
function router(){
  var h=location.hash||'';var mm=h.match(/^#\/race\/(.+)$/);
  if(mm){var f=window.RACES.filter(function(x){return x.id===mm[1];})[0];if(f){renderRace(f);return;}}
  renderHome();
}
document.addEventListener('click',function(e){var b=e.target.closest&&e.target.closest('[data-home]');if(b){e.preventDefault();location.hash='';}});
window.addEventListener('hashchange',router);
window.addEventListener('DOMContentLoaded',router);
if('serviceWorker' in navigator){window.addEventListener('load',function(){navigator.serviceWorker.register('service-worker.js').catch(function(){});});}
})();
