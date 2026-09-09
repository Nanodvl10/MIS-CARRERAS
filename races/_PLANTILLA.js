// PLANTILLA de carrera. Copia este archivo como races/nombre-carrera.js, rellena los datos
// y anade "nombre-carrera.js" a races/registry.js. Los datos de perfil/track los genera Claude
// a partir del GPX (no hace falta escribirlos a mano).
(function(){
window.registerRace({
 id:"san-silvestre-salmantina",          // sin espacios ni acentos
 name:"San Silvestre Salmantina",
 nameHTML:'San Silvestre <span class="devil">Salmantina</span>',
 kind:"Asfalto",                          // "Trail" | "Asfalto" | "Cross"
 subtitle:"Salamanca",
 date:"2026-12-31", time:"17:00",
 planStart:"2026-12-01",                  // primer dia del calendario de comidas (dias consecutivos)
 km:"10", dplus:"+40", dist:"10 km", gain:"+40 m", estimate:"~40 min", totalKm:10,
 readout:"<b>La clave:</b> ...",
 objective:"~38&ndash;41 min", objectiveNote:"...",
 terrainNote:"...",
 profile:{ /* lo genera Claude desde el GPX */ },
 track:[ /* [km, lat, lon, altitud, D+ acumulado] ... lo genera Claude */ ],
 jumps:[["Salida",0],["Mitad",5],["Meta",9.9]],
 days:[ {w:"SEMANA 1 · 1-7 dic"}, {d:1,m:"mar",ent:"Rodaje facil 8 km",type:"medio",mac:"~2.250 kcal · HC 300 g · Prot 120 g · Grasa 68 g",menu:[["04:50 Cafe","...",["hc","pr"]]]} ],
 zones:[["1-2","Salida rapida","3:50-4:00","...","send"]],
 segs:[[2,'send'],[6,'steady'],[2,'send']],
 warns:["..."],
 gear:["Dorsal","Zapatillas voladoras","..."],
 raceDay:{ pre:[["~14:00 · 3 h antes","...",0]], dur:[["km 5","Agua",1]], post:[["Meta","...",0]], tactic:"..." }
});
})();
