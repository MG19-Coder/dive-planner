// Dive Planner V17 - Motor com tabelas US Navy cadastradas
// Ferramenta auxiliar. Conferir sempre com tabela oficial/POP/computador de mergulho.

const GROUP_ORDER = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','Z'];
const GROUP_DESC = ['Z','O','N','M','L','K','J','I','H','G','F','E','D','C','B','A'];

// Tabela 13 - Limite sem descompressão e designação do grupo repetitivo
// Cada valor é o tempo máximo que ainda enquadra o mergulho naquele grupo.
const T13 = [
  {m:3, lnd:Infinity, t:[57,101,158,245,426]},
  {m:4, lnd:Infinity, t:[36,60,88,121,163,217,297,449]},
  {m:6, lnd:Infinity, t:[26,43,61,82,106,133,165,205,256,330,461]},
  {m:7, lnd:1102, t:[20,33,47,62,78,97,117,140,166,198,236,285,354,469,992,1102]},
  {m:9, lnd:371, t:[17,27,38,50,62,76,91,107,125,145,167,193,223,260,307,371]},
  {m:10, lnd:232, t:[14,23,32,42,52,63,74,87,100,115,131,148,168,190,215,232]},
  {m:12, lnd:163, t:[12,20,27,36,44,53,63,73,84,95,108,121,135,151,163]},
  {m:13, lnd:125, t:[11,17,24,31,39,46,55,63,72,82,92,102,114,125]},
  {m:15, lnd:92, t:[9,15,21,28,34,41,48,56,63,71,80,89,92]},
  {m:16, lnd:74, t:[8,14,19,25,31,37,43,50,56,63,71,74]},
  {m:18, lnd:63, t:[7,12,17,22,28,33,39,45,51,57,63]},
  {m:21, lnd:48, t:[6,10,14,19,23,28,32,37,42,47,48]},
  {m:24, lnd:39, t:[5,9,12,16,20,24,28,32,36,39]},
  {m:27, lnd:33, t:[4,7,11,14,17,21,24,28,31,33]},
  {m:30, lnd:25, t:[4,6,9,12,15,18,21,25]},
  {m:33, lnd:20, t:[3,6,8,11,14,16,19,20]},
  {m:36, lnd:15, t:[3,5,7,10,12,15]},
  {m:39, lnd:12, t:[2,4,6,9,11,12]},
  {m:42, lnd:10, t:[2,4,6,8,10]}
];

// Tabela 14 - Tempo de Nitrogênio Residual (min)
// Colunas na ordem: Z, O, N, M, L, K, J, I, H, G, F, E, D, C, B, A.
const T14 = {
  3:[null,null,null,null,null,null,null,null,null,null,null,427,246,159,101,58],
  4:[null,null,null,null,null,null,null,450,298,218,164,122,89,61,37,null],
  6:[null,null,null,null,null,462,331,257,206,166,134,106,83,62,44,27],
  7:[null,null,470,354,286,237,198,167,141,118,98,79,63,48,34,21],
  9:[372,308,261,224,194,168,146,126,108,92,77,63,51,39,28,18],
  10:[245,216,191,169,149,132,116,101,88,75,64,53,43,33,24,15],
  12:[188,169,152,136,122,109,97,85,74,65,55,45,37,29,21,13],
  13:[154,140,127,115,104,93,83,73,64,56,48,40,32,25,18,12],
  15:[131,120,109,99,90,81,73,65,57,49,42,35,29,23,17,11],
  16:[114,105,96,88,80,72,65,58,51,44,38,32,26,20,15,10],
  18:[101,93,86,79,72,65,58,52,46,40,35,29,24,19,14,9],
  21:[83,77,70,65,59,54,49,44,39,34,29,25,20,16,10,8],
  24:[70,65,60,55,51,46,42,38,33,29,25,22,18,14,10,7],
  27:[61,57,52,48,44,41,37,34,30,26,23,20,17,14,11,6],
  30:[54,50,47,43,40,36,33,30,26,23,20,17,14,11,8,5],
  33:[48,45,42,39,35,33,30,27,24,21,18,15,12,10,7,5],
  36:[44,41,38,35,32,30,27,24,22,19,17,14,12,9,7,5],
  39:[40,37,35,32,30,27,25,22,20,18,15,13,11,9,6,4],
  42:[37,34,32,30,27,25,23,20,18,16,14,12,10,8,6,4]
};

// Tabela 15 - Intervalo de superfície. Cadastrada por faixas sucessivas observadas na tabela.
// Para um grupo inicial, a cada faixa o grupo reduz um nível: I->I, depois I->H, depois I->G etc.
const SI_BANDS = [
  [10,52], [53,104], [105,157], [158,209], [210,261], [262,314], [315,366], [367,418],
  [419,471], [472,523], [524,575], [576,627], [628,679], [680,733], [734,810], [811,950]
];

// Limites exatos da tabela de intervalo de superfície para o grupo E.
// O fallback acima permanece para grupos ainda não cadastrados nesta versão.
const SI_THRESHOLDS_BY_GROUP = {
  A: [10, 140],
  B: [10, 77, 216],
  C: [10, 56, 132, 271],
  D: [10, 53, 108, 184, 323],
  E: [10, 53, 105, 160, 236, 375],
  F: [10, 53, 105, 158, 212, 289, 428],
  G: [10, 53, 105, 158, 210, 264, 341, 480],
  H: [10, 53, 105, 158, 210, 262, 317, 393, 532],
  I: [10, 53, 105, 158, 210, 262, 314, 369, 445, 584],
  J: [10, 53, 105, 158, 210, 262, 314, 367, 421, 497, 636],
  K: [10, 53, 105, 158, 210, 262, 314, 367, 419, 472, 551, 689],
  L: [10, 53, 105, 158, 210, 262, 314, 367, 419, 471, 525, 601, 741],
  M: [10, 53, 105, 158, 210, 262, 314, 366, 418, 470, 522, 583, 653, 793],
  N: [10, 53, 105, 158, 210, 262, 314, 366, 418, 470, 522, 574, 630, 705, 845],
  O: [10, 53, 105, 158, 210, 262, 314, 366, 418, 470, 522, 574, 627, 681, 757, 898],
  Z: [10, 53, 105, 158, 210, 262, 314, 366, 418, 470, 522, 574, 627, 679, 733, 810, 950]
};

const VOLUME_PRINCIPAL_S80 = 11.2;
const RESERVA_PRINCIPAL_BAR = 50;
const VOLUME_BAILOUT_S30 = 4.3;
const RESERVA_BAILOUT_BAR = 0;

function $(id){ return document.getElementById(id); }
function num(id){ const el=$(id); return el ? (parseFloat(el.value)||0) : 0; }
function setText(id, value, cls){ const el=$(id); if(!el) return; el.textContent=value; if(cls !== undefined) el.className=cls; }
function fmt(n,d=0){ return Number.isFinite(n) ? Number(n).toFixed(d) : '—'; }
function formatTempo(min){
  if(!Number.isFinite(min)) return 'sem limite';
  const n = Math.max(0, Math.floor(Number(min)));
  if(n < 60) return `${n} min`;
  const h = Math.floor(n/60);
  const m = n % 60;
  if(m === 0) return `${h} h`;
  return `${h} h ${m} min`;
}
function fmtMin(n){ return formatTempo(n); }
function minToHHMM(min){ if(!Number.isFinite(min)) return '—'; const h=Math.floor(min/60); const m=min%60; return `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`; }
function ata(profReal){ return 1 + (profReal / 10); }
function floor0(n){ return Math.max(0, Math.floor(n)); }
function ceil0(n){ return Math.max(0, Math.ceil(n)); }

function fatorAltitude(alt){
  if(alt < 100) return 1.00;
  if(alt < 300) return 1.25;
  if(alt < 2000) return 1.33;
  return 1.50;
}
function profundidadeCorrigida(prof, alt){ return prof * fatorAltitude(alt); }
function linhaTabela(profCorrigida){ return T13.find(x => profCorrigida <= x.m) || null; }
function lndDaLinha(linha){ return linha && Number.isFinite(linha.lnd) ? linha.lnd : Infinity; }
function grupoPorTempo(linha, tempo){
  if(!linha) return 'FORA';
  if(tempo > lndDaLinha(linha)) return 'ACIMA LND';
  for(let i=0;i<linha.t.length;i++){
    if(tempo <= linha.t[i]) return GROUP_ORDER[i];
  }
  return GROUP_ORDER[Math.min(linha.t.length-1, GROUP_ORDER.length-1)];
}
function grupoAposIntervalo(grupoInicial, siMin){
  if(!grupoInicial || grupoInicial==='—' || grupoInicial==='FORA' || grupoInicial==='ACIMA LND') return null;
  const idxInicial = GROUP_ORDER.indexOf(grupoInicial);
  if(idxInicial < 0) return null;
  if(siMin < 10) return grupoInicial;
  const thresholds = SI_THRESHOLDS_BY_GROUP[grupoInicial];
  if(thresholds){
    let bandIdx = 0;
    for(let i=0; i<thresholds.length; i++){
      if(siMin >= thresholds[i]) bandIdx = i;
      else break;
    }
    return GROUP_ORDER[Math.max(0, idxInicial - bandIdx)];
  }
  for(let bandIdx=0; bandIdx<SI_BANDS.length; bandIdx++){
    const [ini,fim] = SI_BANDS[bandIdx];
    if(siMin >= ini && siMin <= fim){
      const idxFinal = Math.max(0, idxInicial - bandIdx);
      return GROUP_ORDER[idxFinal];
    }
  }
  return 'A';
}
function intervaloFaixaParaGrupo(grupoInicial, grupoFinal){
  const i0=GROUP_ORDER.indexOf(grupoInicial), i1=GROUP_ORDER.indexOf(grupoFinal);
  if(i0<0 || i1<0 || i1>i0) return null;
  const bandIdx = i0 - i1;
  return SI_BANDS[bandIdx] || [SI_BANDS[SI_BANDS.length-1][1]+1, Infinity];
}
function rntPorGrupoProf(grupo, linha){
  if(!grupo || !linha) return null;
  const row = T14[linha.m];
  if(!row) return null;
  const idx = GROUP_DESC.indexOf(grupo);
  if(idx < 0) return null;
  return row[idx];
}
function autonomiaPrincipal(tcs, profReal, pressao){
  const gasUtil = Math.max(0, VOLUME_PRINCIPAL_S80 * (pressao - RESERVA_PRINCIPAL_BAR));
  return floor0(gasUtil / (tcs * ata(profReal)));
}
function autonomiaBailout(tcs, profReal, pressao){
  const tcem = tcs * 1.5;
  const gasUtil = Math.max(0, VOLUME_BAILOUT_S30 * (pressao - RESERVA_BAILOUT_BAR));
  return floor0(gasUtil / (tcem * ata(profReal)));
}
function pressaoFinal(vol, pressao, tcs, profReal, tempo){
  const consumoLitros = tempo * tcs * ata(profReal);
  return Math.floor(pressao - (consumoLitros / vol));
}
function getUsarRep(){ const el=$('usarRep'); return !!(el && el.checked); }
function getUsarTerceiro(){ const el=$('usarTerceiro'); return getUsarRep() && !!(el && el.checked); }
function getUsarQuarto(){ const el=$('usarQuarto'); return getUsarTerceiro() && !!(el && el.checked); }


const MUNICIPIOS_PRIORITARIOS_DOMAR = [
  'João Pessoa','Cabedelo','Lucena','Conde','Pitimbu','Baía da Traição','Rio Tinto','Marcação','Mataraca',
  'Gurinhém','São Miguel de Taipu','Bom Jesus','Teixeira','Alhandra','Caaporã','Coremas','Boqueirão','Itatuba',
  'Sousa','Cajazeiras','Patos','Pombal','São Bento','Monteiro','Sumé','Taperoá','Prata','Camalaú','Congo',
  'Santa Luzia','Mãe d\'Água','Nazarezinho','Marizópolis','Cajazeirinhas','Condado'
];

const CORRECOES_MUNICIPIOS = {
  'Aragaçi':'Araçagi',
  'Gurihém':'Gurinhém',
  'Cural De Cima':'Curral de Cima',
  'Cural Velho':'Curral Velho',
  'Caraubas':'Caraúbas',
  'Algodão De Jandaira':'Algodão de Jandaíra',
  'Areia De Baraunas':'Areia de Baraúnas',
  'Barra De Santa Rosa':'Barra de Santa Rosa',
  'Barra De Santana':'Barra de Santana',
  'Barra De São Miguel':'Barra de São Miguel',
  'Baía Da Traição':'Baía da Traição',
  'Belém Do Brejo Do Cruz':'Belém do Brejo do Cruz',
  'Bonito De Santa Fé':'Bonito de Santa Fé',
  'Cacimba De Areia':'Cacimba de Areia',
  'Cacimba De Dentro':'Cacimba de Dentro',
  'Caldas De Brandão':'Caldas Brandão',
  'Joõa Pessoa':'João Pessoa',
  'Marizopoles':'Marizópolis',
  'Riachçao Do Bacamarte':'Riachão do Bacamarte',
  'Richo De Santo Antonio':'Riacho de Santo Antônio',
  'Destero':'Desterro',
  'Juarez Tavora':'Juarez Távora',
  'Picui':'Picuí',
  'Remigio':'Remígio',
  'Sape':'Sapé'
};

const ALTITUDES_COMPLEMENTARES = {};

function nomeCorrigido(nome){ return CORRECOES_MUNICIPIOS[nome] || nome; }
function municipioNormalizado(m){
  const cidade = nomeCorrigido(m.cidade || '');
  const altitude = Object.prototype.hasOwnProperty.call(m, 'altitude') && m.altitude !== null && m.altitude !== '' ? Number(m.altitude) : null;
  return {cidade, altitude};
}
function semAcento(txt){ return String(txt||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); }

function preencherMunicipios(filtro=''){
  const sel=$('municipio');
  const datalist=$('municipiosSugeridos');
  if((!sel && !datalist) || typeof MUNICIPIOS_PB === 'undefined') return;
  const termo = semAcento(filtro || (($('buscaMunicipio')||{}).value || ''));
  const mapa = new Map();
  MUNICIPIOS_PB.map(municipioNormalizado).forEach(m=>{
    if(m.cidade && (m.altitude === null || Number.isFinite(Number(m.altitude)))){
      mapa.set(m.cidade, {cidade:m.cidade, altitude:m.altitude === null ? null : Number(m.altitude)});
    }
  });
  Object.entries(ALTITUDES_COMPLEMENTARES).forEach(([cidade, altitude])=>{
    if(!mapa.has(cidade)) mapa.set(cidade, {cidade, altitude:Number(altitude)});
  });
  const todos = [...mapa.values()].filter(m => !termo || semAcento(m.cidade).includes(termo))
    .sort((a,b)=>a.cidade.localeCompare(b.cidade,'pt-BR'));
  const nomesPrioritarios = new Set(MUNICIPIOS_PRIORITARIOS_DOMAR);
  const prioritarios = MUNICIPIOS_PRIORITARIOS_DOMAR.map(nome => mapa.get(nome)).filter(Boolean)
    .filter(m => !termo || semAcento(m.cidade).includes(termo));
  const demais = todos.filter(m => !nomesPrioritarios.has(m.cidade));
  const opt = m => '<option value="' + (m.altitude === null ? '' : Number(m.altitude)) + '" data-cidade="' + m.cidade + '">' + m.cidade + (m.altitude === null ? ' (altitude não cadastrada)' : ' (' + Number(m.altitude) + ' m)') + '</option>';
  if(sel){
    sel.innerHTML = '<option value="">Selecionar município...</option>' +
      (prioritarios.length ? '<optgroup label="⭐ Municípios prioritários DOMAR">' + prioritarios.map(opt).join('') + '</optgroup>' : '') +
      '<optgroup label="Todos os Municípios da Paraíba">' + demais.map(opt).join('') + '</optgroup>';
    const jp = [...sel.options].find(o=>o.dataset && o.dataset.cidade==='João Pessoa');
    if(!termo && jp && !sel.value){ jp.selected=true; $('altitude').value=jp.value; }
  }
  if(datalist){
    datalist.innerHTML = todos.map(m => '<option value="' + m.cidade + '"></option>').join('');
  }
}
function selecionarMunicipioPorNome(nome){
  const sel=$('municipio');
  if(!sel) return false;
  const termo=semAcento(nome).trim();
  if(!termo) return false;
  const option=[...sel.options].find(o=>o.dataset && semAcento(o.dataset.cidade)===termo);
  if(!option) return false;
  sel.value=option.value;
  $('altitude').value=option.value;
  return true;
}
function atualizarAltitudePorMunicipio(){ const sel=$('municipio'); if(sel && sel.value !== '') $('altitude').value = sel.value; atualizarPreview(); }
function errosPlanejamentoPreview(){
  const erros=[];
  const tcs=num('tcs'), prof1=num('prof1'), alt=num('altitude'), tempo1=num('tempo1'), pressP=num('pressaoPrincipal'), pressB=num('pressaoBailout');
  const linha1=linhaTabela(profundidadeCorrigida(prof1, alt));
  const lnd1=linha1?lndDaLinha(linha1):null;
  const autP=autonomiaPrincipal(tcs, prof1, pressP);
  const autB=autonomiaBailout(tcs, prof1, pressB);
  const pFinal1=pressaoFinal(VOLUME_PRINCIPAL_S80, pressP, tcs, prof1, tempo1);
  if(tcs <= 0) erros.push('TCS deve ser maior que zero.');
  if(prof1 <= 0) erros.push('Profundidade do 1º mergulho deve ser maior que zero.');
  if(pressP <= RESERVA_PRINCIPAL_BAR) erros.push(`Pressão do cilindro principal deve ser maior que a reserva de ${RESERVA_PRINCIPAL_BAR} bar.`);
  if(!linha1) erros.push('Profundidade corrigida fora da tabela cadastrada.');
  if(linha1 && Number.isFinite(lnd1) && tempo1 > lnd1) erros.push(`Tempo superior ao LND do 1º mergulho (${lnd1} min).`);
  if(tempo1 > autP) erros.push(`Tempo superior à autonomia principal (${autP} min).`);
  if(!Number.isFinite(pFinal1) || pFinal1 < 0) erros.push('O perfil planejado excede a capacidade do cilindro principal.');
  return erros;
}

function atualizarQuadroOperacional(linha1, profCorr1, lnd1, grupo1, erros, bloqueios=erros){
  setText('previewLnd', linha1 ? fmtMin(lnd1) : 'fora');
  setText('previewGrupo', grupo1 || '—');
  const alt=num('altitude');
  // NR do 1º mergulho não pode depender do 2º mergulho
  const linhaRef=linha1;
  const lndRef=lnd1;
  const est1=estimarIntervaloAposPrimeiro(grupo1, linhaRef, lndRef, 0);
  setText('previewNr1', est1.rnt===null ? '—' : formatTempo(est1.rnt));
  const autP1 = autonomiaPrincipal(num('tcs'), num('prof1'), num('pressaoPrincipal'));
  const autRem1 = Math.max(0, autP1 - num('tempo1'));
  setText('previewAutRem1', formatTempo(autRem1));
  const box=$('situacaoOperacional'), alerts=$('previewAlertas');
  if(alerts){ alerts.innerHTML=erros.length?erros.map(e=>`<div>⚠️ ${e}</div>`).join(''):''; }
  if(box){ box.classList.toggle('erro', erros.length>0); box.classList.toggle('ok', erros.length===0); }
  const btn=$('btnCalcular');
  if(btn){
    btn.disabled = bloqueios.length > 0;
    btn.classList.toggle('disabled', bloqueios.length > 0);
    btn.title = bloqueios.length ? bloqueios.join(' ') : '';
  }
}

function limparPreviewSegundo(){
  ['previewLnd2','previewGrupo2','previewNrHerdado','previewNr2','previewTempoTotal2','previewSi2','previewAutP2','previewAutB2','previewAutRem2'].forEach(id=>setText(id,'—'));
  const status=$('previewStatus2'); if(status) status.innerHTML='<b>STATUS:</b> —';
  const alerts=$('previewAlertas2'); if(alerts) alerts.innerHTML='';
  const box=$('situacaoOperacional2');
  if(box){ box.classList.remove('erro'); box.classList.add('ok'); }
}

function limparPreviewTerceiro(){
  ['previewLnd3','previewGrupo3','previewNrHerdado3','previewNr3','previewTempoTotal3','previewSi3','previewAutP3','previewAutB3','previewAutRem3'].forEach(id=>setText(id,'—'));
  const status=$('previewStatus3'); if(status) status.innerHTML='<b>STATUS:</b> —';
  const alerts=$('previewAlertas3'); if(alerts) alerts.innerHTML='';
  const box=$('situacaoOperacional3');
  if(box){ box.classList.remove('erro'); box.classList.add('ok'); }
}

function limparPreviewQuarto(){
  ['previewLnd4','previewGrupo4','previewNrHerdado4','previewNr4','previewTempoTotal4','previewSi4','previewAutP4','previewAutB4','previewAutRem4'].forEach(id=>setText(id,'—'));
  const status=$('previewStatus4'); if(status) status.innerHTML='<b>STATUS:</b> —';
  const alerts=$('previewAlertas4'); if(alerts) alerts.innerHTML='';
  const box=$('situacaoOperacional4');
  if(box){ box.classList.remove('erro'); box.classList.add('ok'); }
}

function estimarRepetitivoComIntervalo(grupo1, linha2, lnd2, tempo2, modoSi='minimo', siManual=0, linhaRnt=linha2){
  let siUsado = modoSi==='manual' ? siManual : null;
  let grupoAposSi=null, rnt=null, tempoMax2=null;

  if(modoSi==='minimo'){
    for(let min=10; min<=950; min++){
      const g=grupoAposIntervalo(grupo1, min);
      const rn=rntPorGrupoProf(g, linhaRnt);
      if(rn !== null && rn + tempo2 <= lnd2){
        siUsado=min; grupoAposSi=g; rnt=rn; tempoMax2=lnd2-rn;
        break;
      }
    }
  } else {
    grupoAposSi=grupoAposIntervalo(grupo1, siUsado);
    rnt=rntPorGrupoProf(grupoAposSi, linhaRnt);
    tempoMax2=(rnt===null || !Number.isFinite(lnd2)) ? null : lnd2-rnt;
  }

  return {siUsado, grupoAposSi, rnt, tempoMax2};
}

function estimarRepetitivo(grupo1, linha2, lnd2, tempo2, linhaRnt=linha2){
  return estimarRepetitivoComIntervalo(grupo1, linha2, lnd2, tempo2, $('modoSi')?.value || 'minimo', num('siManual'), linhaRnt);
}

function estimarIntervaloAposPrimeiro(grupo1, linhaRef, lndRef, tempoRef=0){
  if(!linhaRef || !grupo1 || ['FORA','ACIMA LND'].includes(grupo1)) return {siUsado:null, grupoAposSi:null, rnt:null, tempoMax2:null};
  return estimarRepetitivo(grupo1, linhaRef, lndRef, tempoRef);
}

function atualizarQuadroOperacional2(grupo1, linha1, linha2, profCorr2, lnd2, tempo2){
  if(!getUsarRep()){ limparPreviewSegundo(); return []; }

  const erros=[];
  setText('previewLnd2', linha2 ? fmtMin(lnd2) : 'fora');

  if(!linha2) erros.push('Profundidade corrigida do 2º mergulho fora da tabela cadastrada.');
  if(!grupo1 || ['FORA','ACIMA LND'].includes(grupo1)) erros.push('Verifique o grupo do 1º mergulho antes do repetitivo.');
  if(num('prof2') <= 0) erros.push('Profundidade do 2º mergulho deve ser maior que zero.');
  if(($('modoSi')?.value || 'minimo')==='manual' && num('siManual') < 0) erros.push('Intervalo de superfície manual não pode ser negativo.');

  let est={siUsado:null, grupoAposSi:null, rnt:null, tempoMax2:null};
  if(!erros.length) est=estimarRepetitivo(grupo1, linha2, lnd2, tempo2, linha1);

  const tat = est.rnt===null ? null : est.rnt + tempo2;
  setText('previewGrupo2', est.grupoAposSi || '—');
  setText('previewNrHerdado', est.rnt===null ? '—' : formatTempo(est.rnt));
  setText('previewNr2', est.rnt===null ? '—' : formatTempo(est.rnt));
  setText('previewTempoTotal2', tat===null ? '—' : formatTempo(tat));
  setText('previewSi2', est.siUsado===null ? '—' : formatTempo(est.siUsado));

  const tcsPrev=num('tcs'), prof1Prev=num('prof1'), tempo1Prev=num('tempo1'), pressPPrev=num('pressaoPrincipal');
  const cilindroNovoPrev = $('cilindroNovo') && $('cilindroNovo').checked;
  const pressaoFinal1Prev = pressaoFinal(VOLUME_PRINCIPAL_S80, pressPPrev, tcsPrev, prof1Prev, tempo1Prev);
  const pressaoInicial2Prev = cilindroNovoPrev ? pressPPrev : Math.max(0, pressaoFinal1Prev);
  const autP2 = autonomiaPrincipal(tcsPrev, num('prof2'), pressaoInicial2Prev);
  const autB2 = autonomiaBailout(tcsPrev, num('prof2'), num('pressaoBailout'));
  const autRem2 = Math.max(0, autP2 - tempo2);
  setText('previewAutP2', formatTempo(autP2));
  setText('previewAutB2', formatTempo(autB2));
  setText('previewAutRem2', formatTempo(autRem2));

  if(est.siUsado===null || est.rnt===null) erros.push('Não foi encontrado IS viável para esse perfil.');
  if(tat!==null && Number.isFinite(lnd2) && tat > lnd2) erros.push(`NR + TF2 ultrapassa o LND (${lnd2} min).`);
  if(tempo2 > autP2) erros.push(`Autonomia principal insuficiente (${formatTempo(autP2)}).`);

  const alerts=$('previewAlertas2');
  if(alerts) alerts.innerHTML = erros.map(e=>`<div>⚠️ ${e}</div>`).join('');
  const status=$('previewStatus2');
  if(status) status.innerHTML = `<b>STATUS:</b> ${erros.length ? 'Revisar planejamento' : 'Planejamento OK'}`;
  const box=$('situacaoOperacional2');
  if(box){ box.classList.toggle('erro', erros.length>0); box.classList.toggle('ok', erros.length===0); }
  return erros;
}

function resumoSegundoParaTerceiro(grupo1, linha1, linha2, lnd2, tempo2){
  if(!getUsarRep() || !linha2 || !grupo1 || ['FORA','ACIMA LND'].includes(grupo1)) return null;
  const est=estimarRepetitivo(grupo1, linha2, lnd2, tempo2, linha1);
  if(est.siUsado===null || est.rnt===null || est.tempoMax2===null) return null;
  const tat=tempo2 + est.rnt;
  const grupo2=grupoPorTempo(linha2, tat);
  const tcs=num('tcs'), prof1=num('prof1'), tempo1=num('tempo1'), pressP=num('pressaoPrincipal');
  const cilindroNovo = $('cilindroNovo') && $('cilindroNovo').checked;
  const pressaoFinal1Est = pressaoFinal(VOLUME_PRINCIPAL_S80, pressP, tcs, prof1, tempo1);
  const pressaoInicial2 = cilindroNovo ? pressP : Math.max(0, pressaoFinal1Est);
  const autP2 = autonomiaPrincipal(tcs, num('prof2'), pressaoInicial2);
  const pressaoFinal2 = Math.max(0, pressaoFinal(VOLUME_PRINCIPAL_S80, pressaoInicial2, tcs, num('prof2'), tempo2));
  const ok = tat <= lnd2 && tempo2 <= autP2 && !['FORA','ACIMA LND'].includes(grupo2);
  return {ok, grupo2, pressaoFinal2, linha2};
}

function atualizarQuadroOperacional3(resumo2, linha3, profCorr3, lnd3, tempo3){
  if(!getUsarTerceiro()){ limparPreviewTerceiro(); return []; }

  const erros=[];
  setText('previewLnd3', linha3 ? fmtMin(lnd3) : 'fora');
  if(!resumo2 || !resumo2.ok) erros.push('Verifique o 2º mergulho antes do 3º.');
  if(!linha3) erros.push('Profundidade corrigida do 3º mergulho fora da tabela cadastrada.');
  if(num('prof3') <= 0) erros.push('Profundidade do 3º mergulho deve ser maior que zero.');
  if(($('modoSi3')?.value || 'minimo')==='manual' && num('siManual3') < 0) erros.push('Intervalo de superfície manual após o 2º não pode ser negativo.');

  let est={siUsado:null, grupoAposSi:null, rnt:null, tempoMax2:null};
  if(!erros.length) est=estimarRepetitivoComIntervalo(resumo2.grupo2, linha3, lnd3, tempo3, $('modoSi3')?.value || 'minimo', num('siManual3'), resumo2.linha2);

  const tat = est.rnt===null ? null : est.rnt + tempo3;
  setText('previewGrupo3', est.grupoAposSi || '—');
  setText('previewNrHerdado3', est.rnt===null ? '—' : formatTempo(est.rnt));
  setText('previewNr3', est.rnt===null ? '—' : formatTempo(est.rnt));
  setText('previewTempoTotal3', tat===null ? '—' : formatTempo(tat));
  setText('previewSi3', est.siUsado===null ? '—' : formatTempo(est.siUsado));

  const tcs=num('tcs'), pressP=num('pressaoPrincipal');
  const cilindroNovo3 = $('cilindroNovo3') && $('cilindroNovo3').checked;
  const pressaoInicial3 = cilindroNovo3 ? pressP : Math.max(0, resumo2 ? resumo2.pressaoFinal2 : 0);
  const autP3 = autonomiaPrincipal(tcs, num('prof3'), pressaoInicial3);
  const autB3 = autonomiaBailout(tcs, num('prof3'), num('pressaoBailout'));
  const autRem3 = Math.max(0, autP3 - tempo3);
  setText('previewAutP3', formatTempo(autP3));
  setText('previewAutB3', formatTempo(autB3));
  setText('previewAutRem3', formatTempo(autRem3));

  if(est.siUsado===null || est.rnt===null) erros.push('Não foi encontrado IS viável para esse perfil.');
  if(tat!==null && Number.isFinite(lnd3) && tat > lnd3) erros.push(`NR + TF3 ultrapassa o LND (${lnd3} min).`);
  if(tempo3 > autP3) erros.push(`Autonomia principal insuficiente (${formatTempo(autP3)}).`);

  const alerts=$('previewAlertas3');
  if(alerts) alerts.innerHTML = erros.map(e=>`<div>⚠️ ${e}</div>`).join('');
  const status=$('previewStatus3');
  if(status) status.innerHTML = `<b>STATUS:</b> ${erros.length ? 'Revisar planejamento' : 'Planejamento OK'}`;
  const box=$('situacaoOperacional3');
  if(box){ box.classList.toggle('erro', erros.length>0); box.classList.toggle('ok', erros.length===0); }
  return erros;
}

function resumoTerceiroParaQuarto(rep2Resumo, linha3, lnd3, tempo3){
  if(!getUsarTerceiro() || !rep2Resumo || !rep2Resumo.ok || !linha3 || !rep2Resumo.grupo2 || ['FORA','ACIMA LND'].includes(rep2Resumo.grupo2)) return null;
  const est=estimarRepetitivoComIntervalo(rep2Resumo.grupo2, linha3, lnd3, tempo3, $('modoSi3')?.value || 'minimo', num('siManual3'), rep2Resumo.linha2);
  if(est.siUsado===null || est.rnt===null || est.tempoMax2===null) return null;
  const tat=tempo3 + est.rnt;
  const grupo3=grupoPorTempo(linha3, tat);
  const tcs=num('tcs'), pressP=num('pressaoPrincipal');
  const cilindroNovo3 = $('cilindroNovo3') && $('cilindroNovo3').checked;
  const pressaoInicial3 = cilindroNovo3 ? pressP : Math.max(0, rep2Resumo.pressaoFinal2);
  const autP3 = autonomiaPrincipal(tcs, num('prof3'), pressaoInicial3);
  const pressaoFinal3 = Math.max(0, pressaoFinal(VOLUME_PRINCIPAL_S80, pressaoInicial3, tcs, num('prof3'), tempo3));
  const ok = tat <= lnd3 && tempo3 <= autP3 && !['FORA','ACIMA LND'].includes(grupo3);
  return {ok, grupo3, pressaoFinal3, linha3};
}

function atualizarQuadroOperacional4(resumo3, linha4, profCorr4, lnd4, tempo4){
  if(!getUsarQuarto()){ limparPreviewQuarto(); return []; }

  const erros=[];
  setText('previewLnd4', linha4 ? fmtMin(lnd4) : 'fora');
  if(!resumo3 || !resumo3.ok) erros.push('Verifique o 3º mergulho antes do 4º.');
  if(!linha4) erros.push('Profundidade corrigida do 4º mergulho fora da tabela cadastrada.');
  if(num('prof4') <= 0) erros.push('Profundidade do 4º mergulho deve ser maior que zero.');

  let est={siUsado:null, grupoAposSi:null, rnt:null, tempoMax2:null};
  if(!erros.length) est=estimarRepetitivoComIntervalo(resumo3.grupo3, linha4, lnd4, tempo4, $('modoSi4')?.value || 'minimo', num('siManual4'), resumo3.linha3);

  const tat = est.rnt===null ? null : est.rnt + tempo4;
  setText('previewGrupo4', est.grupoAposSi || '—');
  setText('previewNrHerdado4', est.rnt===null ? '—' : formatTempo(est.rnt));
  setText('previewNr4', est.rnt===null ? '—' : formatTempo(est.rnt));
  setText('previewTempoTotal4', tat===null ? '—' : formatTempo(tat));
  setText('previewSi4', est.siUsado===null ? '—' : formatTempo(est.siUsado));

  const tcs=num('tcs'), pressP=num('pressaoPrincipal');
  const cilindroNovo4 = $('cilindroNovo4') && $('cilindroNovo4').checked;
  const pressaoInicial4 = cilindroNovo4 ? pressP : Math.max(0, resumo3 ? resumo3.pressaoFinal3 : 0);
  const autP4 = autonomiaPrincipal(tcs, num('prof4'), pressaoInicial4);
  const autB4 = autonomiaBailout(tcs, num('prof4'), num('pressaoBailout'));
  const autRem4 = Math.max(0, autP4 - tempo4);
  setText('previewAutP4', formatTempo(autP4));
  setText('previewAutB4', formatTempo(autB4));
  setText('previewAutRem4', formatTempo(autRem4));

  if(est.siUsado===null || est.rnt===null) erros.push('Não foi encontrado IS viável para esse perfil.');
  if(tat!==null && Number.isFinite(lnd4) && tat > lnd4) erros.push(`NR + TF4 ultrapassa o LND (${lnd4} min).`);
  if(tempo4 > autP4) erros.push(`Autonomia principal insuficiente (${formatTempo(autP4)}).`);

  const alerts=$('previewAlertas4');
  if(alerts) alerts.innerHTML = erros.map(e=>`<div>⚠️ ${e}</div>`).join('');
  const status=$('previewStatus4');
  if(status) status.innerHTML = `<b>STATUS:</b> ${erros.length ? 'Revisar planejamento' : 'Planejamento OK'}`;
  const box=$('situacaoOperacional4');
  if(box){ box.classList.toggle('erro', erros.length>0); box.classList.toggle('ok', erros.length===0); }
  return erros;
}

function atualizarPreview(){
  const prof1 = num('prof1'), alt=num('altitude'), tempo1=num('tempo1');
  const profCorr1 = profundidadeCorrigida(prof1, alt);
  const linha1=linhaTabela(profCorr1);
  const lnd1=linha1?lndDaLinha(linha1):null;
  const grupo1=grupoPorTempo(linha1, tempo1);
  const info=$('infoLnd');
  if(info){
    info.textContent = linha1 ? `Profundidade de tabela: ${linha1.m} m | LND: ${Number.isFinite(lnd1)?lnd1+' min':'sem limite'} | Grupo previsto: ${grupo1}` : 'Profundidade corrigida fora da tabela cadastrada.';
  }
  const repCard=$('repCampos'); if(repCard) repCard.style.display = getUsarRep() ? 'block' : 'none';
  const secTerceiro=$('secTerceiro'); if(secTerceiro) secTerceiro.style.display = getUsarRep() ? 'block' : 'none';
  const terCard=$('terCampos'); if(terCard) terCard.style.display = getUsarTerceiro() ? 'block' : 'none';
  const secQuarto=$('secQuarto'); if(secQuarto) secQuarto.style.display = getUsarTerceiro() ? 'block' : 'none';
  const quaCard=$('quaCampos'); if(quaCard) quaCard.style.display = getUsarQuarto() ? 'block' : 'none';
  const secRepRes=$('secRepResultado'); if(secRepRes) secRepRes.style.display = getUsarRep() ? 'block' : 'none';
  const secRep3Res=$('secRep3Resultado'); if(secRep3Res) secRep3Res.style.display = getUsarTerceiro() ? 'block' : 'none';
  const secRep4Res=$('secRep4Resultado'); if(secRep4Res) secRep4Res.style.display = getUsarQuarto() ? 'block' : 'none';

  const prof2=num('prof2'), tempo2=num('tempo2');
  const linha2=linhaTabela(profundidadeCorrigida(prof2, alt));
  const prof3=num('prof3'), tempo3=num('tempo3');
  const linha3=linhaTabela(profundidadeCorrigida(prof3, alt));
  const prof4=num('prof4'), tempo4=num('tempo4');
  const linha4=linhaTabela(profundidadeCorrigida(prof4, alt));
  atualizarSiManual();
  atualizarSiManual3();
  atualizarSiManual4();
  const errosPrimeiro = errosPlanejamentoPreview();
  const errosRepetitivo = atualizarQuadroOperacional2(grupo1, linha1, linha2, profundidadeCorrigida(prof2, alt), linha2?lndDaLinha(linha2):null, tempo2);
  const resumo2 = resumoSegundoParaTerceiro(grupo1, linha1, linha2, linha2?lndDaLinha(linha2):null, tempo2);
  const errosTerceiro = atualizarQuadroOperacional3(resumo2, linha3, profundidadeCorrigida(prof3, alt), linha3?lndDaLinha(linha3):null, tempo3);
  const resumo3 = resumoTerceiroParaQuarto(resumo2, linha3, linha3?lndDaLinha(linha3):null, tempo3);
  const errosQuarto = atualizarQuadroOperacional4(resumo3, linha4, profundidadeCorrigida(prof4, alt), linha4?lndDaLinha(linha4):null, tempo4);
  atualizarQuadroOperacional(linha1, profCorr1, lnd1, grupo1, errosPrimeiro, errosPrimeiro.concat(errosRepetitivo, errosTerceiro, errosQuarto));
}
function calcular(){
  const tcs=num('tcs'), prof1=num('prof1'), alt=num('altitude'), tempo1=num('tempo1');
  const pressP=num('pressaoPrincipal'), pressB=num('pressaoBailout');
  const fator=fatorAltitude(alt);
  const profCorr1=ceil0(profundidadeCorrigida(prof1, alt));
  const linha1=linhaTabela(profCorr1);
  const lnd1=linha1 ? lndDaLinha(linha1) : 0;
  const grupo1=grupoPorTempo(linha1, tempo1);
  const autP=autonomiaPrincipal(tcs, prof1, pressP);
  const autB=autonomiaBailout(tcs, prof1, pressB);
  const pFinal1=pressaoFinal(VOLUME_PRINCIPAL_S80, pressP, tcs, prof1, tempo1);

  setText('profCorr1', profCorr1);
  setText('profTabela1', linha1 ? linha1.m : 'fora');
  setText('lnd1', linha1 ? (Number.isFinite(lnd1)?lnd1:'sem limite') : 'fora');
  setText('grupo1', grupo1);
  setText('autPrincipal', formatTempo(autP));
  setText('autBailout', formatTempo(autB));
  setText('pressaoFinal1', pFinal1, pFinal1 < RESERVA_PRINCIPAL_BAR ? 'bad' : 'good');

  // IS e NR após o 1º mergulho (usado para planejar o mergulho seguinte)
  const profRefNr = prof1;
  const tempoRefNr = 0;
  const linhaRefNr = linhaTabela(profundidadeCorrigida(profRefNr, alt));
  const lndRefNr = linhaRefNr ? lndDaLinha(linhaRefNr) : null;
  const nrPrimeiroCalc = estimarIntervaloAposPrimeiro(grupo1, linhaRefNr, lndRefNr, tempoRefNr);
  setText('siUsado1', nrPrimeiroCalc.siUsado===null ? '—' : formatTempo(nrPrimeiroCalc.siUsado));
  setText('nrPrimeiro', nrPrimeiroCalc.rnt===null ? '—' : formatTempo(nrPrimeiroCalc.rnt));

  let status1='OK', cls='good';
  let obs1=`Altitude ${fmt(alt,0)} m | Fator ${fmt(fator,2)}. Autonomia calculada pela profundidade real; LND e grupo pela profundidade corrigida/arredondada para cima.`;
  if(!linha1){ status1='FORA'; cls='bad'; obs1='Profundidade corrigida fora da tabela cadastrada.'; }
  else if(Number.isFinite(lnd1) && tempo1 > lnd1){ status1='ACIMA DO LND'; cls='bad'; obs1+=` Tempo informado (${tempo1} min) ultrapassa o LND (${lnd1} min).`; }
  else if(tempo1 > autP){ status1='SEM AUTONOMIA'; cls='bad'; obs1+=` Tempo informado ultrapassa a autonomia principal (${autP} min).`; }
  else if(!Number.isFinite(pFinal1) || pFinal1 < 0){ status1='RECARREGAR CILINDRO'; cls='bad'; obs1+=' O perfil planejado excede a capacidade do cilindro principal.'; }
  setText('status1', status1, cls);
  if($('obs1')) $('obs1').textContent=obs1;

  let rep=null, rep3=null, rep4=null;
  if(getUsarRep()) rep=calcularRepetitivo(grupo1, alt);
  if(getUsarTerceiro()) rep3=calcularTerceiro(rep, alt);
  if(getUsarQuarto()) rep4=calcularQuarto(rep3, alt);
  montarRelatorio({tcs, prof1, alt, fator, profCorr1, linha1, lnd1, autP, autB, pressP, pressB, tempo1, pFinal1, grupo1, status1, rep, rep3, rep4});
  return true;
}

function calcularRepetitivo(grupo1, alt){
  const prof2=num('prof2'), tempo2=num('tempo2'), modoSi=$('modoSi') ? $('modoSi').value : 'minimo';
  const profCorr2=ceil0(profundidadeCorrigida(prof2, alt));
  const linha2=linhaTabela(profCorr2);
  const lnd2=linha2 ? lndDaLinha(linha2) : 0;
  const linha1=linhaTabela(profundidadeCorrigida(num('prof1'), alt));
  const tcs1=num('tcs');
  const prof1Real=num('prof1');
  const tempo1Real=num('tempo1');
  const pressP1=num('pressaoPrincipal');
  const pressB=num('pressaoBailout');
  const cilindroNovo = $('cilindroNovo') && $('cilindroNovo').checked;

  if($('cilindroStatus')) setText('cilindroStatus', cilindroNovo ? 'Novo' : 'Mesmo do 1º mergulho');

  if(!linha2 || !grupo1 || grupo1==='FORA' || grupo1==='ACIMA LND'){
    setText('siUsado','—'); setText('grupoAposSi','—'); setText('rnt','—'); setText('statusSi','FORA','bad');
    setText('profCorr2', profCorr2); setText('profTabela2', linha2?linha2.m:'fora'); setText('lnd2', linha2?(Number.isFinite(lnd2)?formatTempo(lnd2):'sem limite'):'fora');
    setText('tat2','—'); setText('tempoMax2','—'); setText('grupo2','—'); setText('rntFinal2','—'); setText('status2','FORA','bad');
    setText('autPrincipal2','—'); setText('autBailout2','—'); setText('autRemanescente','—'); setText('pressaoFinal2','—');
    if($('obsSi')) $('obsSi').textContent='Não foi possível calcular o repetitivo. Verifique o 1º mergulho e a profundidade do 2º mergulho.';
    if($('obs2')) $('obs2').textContent='';
    return {ok:false};
  }

  const estimativa = estimarRepetitivo(grupo1, linha2, lnd2, tempo2, linha1);
  const {siUsado, grupoAposSi, rnt, tempoMax2} = estimativa;

  if(siUsado===null || rnt===null || tempoMax2===null){
    setText('siUsado','não viável'); setText('grupoAposSi','—'); setText('rnt','—'); setText('statusSi','AVISO','bad');
    setText('tempoMax2','—'); setText('rntFinal2','—'); setText('status2','⚠ REVISAR PLANEJAMENTO','bad');
    setText('autPrincipal2','—'); setText('autBailout2','—'); setText('autRemanescente','—'); setText('pressaoFinal2','—');
    if($('obsSi')) $('obsSi').textContent='Não foi encontrado intervalo de superfície viável na tabela cadastrada para esse perfil.';
    if($('obs2')) $('obs2').textContent='';
    return {ok:false, prof2, tempo2, linha2, profCorr2};
  }

  const tat = tempo2 + rnt;
  const okLnd2 = (tat <= lnd2);
  const grupo2 = grupoPorTempo(linha2, tat);
  const faixa = intervaloFaixaParaGrupo(grupo1, grupoAposSi);

  const autP1 = autonomiaPrincipal(tcs1, prof1Real, pressP1);
  const pressaoFinal1Est = pressaoFinal(VOLUME_PRINCIPAL_S80, pressP1, tcs1, prof1Real, tempo1Real);
  const pressaoInicial2 = cilindroNovo ? pressP1 : Math.max(0, pressaoFinal1Est);
  const autP2Cheio = autonomiaPrincipal(tcs1, prof2, pressP1);
  const autP2 = autonomiaPrincipal(tcs1, prof2, pressaoInicial2);
  const autB2 = autonomiaBailout(tcs1, prof2, pressB);
  const autRem2 = Math.max(0, autP2 - tempo2);
  const pressaoFinal2 = Math.max(0, pressaoFinal(VOLUME_PRINCIPAL_S80, pressaoInicial2, tcs1, prof2, tempo2));
  const okAut2 = tempo2 <= autP2;

  setText('siUsado', formatTempo(siUsado));
  setText('grupoAposSi', grupoAposSi);
  setText('rnt', formatTempo(rnt));
  const nr2Calc=rntPorGrupoProf(grupo2, linha2); if($('nrSegundo')) setText('nrSegundo', formatTempo(nr2Calc ?? rnt));
  setText('statusSi', 'OK', 'good');
  setText('profCorr2', profCorr2);
  setText('profTabela2', linha2.m);
  setText('lnd2', Number.isFinite(lnd2)?formatTempo(lnd2):'sem limite');
  setText('tat2', formatTempo(tat), okLnd2?'good':'bad');
  setText('comparacaoLnd', `${formatTempo(rnt)} + ${formatTempo(tempo2)} ${okLnd2?'≤':'>'} ${fmtMin(lnd2)}`, okLnd2?'good':'bad');
  setText('tempoMax2', Number.isFinite(tempoMax2) ? `até ${formatTempo(Math.max(0, tempoMax2))}` : 'sem limite', tempoMax2>=0?'good':'bad');
  setText('autPrincipal2', formatTempo(autP2));
  setText('autBailout2', formatTempo(autB2));
  setText('autRemanescente', formatTempo(autRem2), okAut2?'good':'bad');
  setText('grupo2', grupo2);
  setText('pressaoFinal2', pressaoFinal2, pressaoFinal2 < RESERVA_PRINCIPAL_BAR ? 'bad' : 'good');
  setText('cilindroStatus', cilindroNovo ? 'Novo' : 'Mesmo do 1º mergulho');
  setText('status2', (okLnd2 && okAut2)?'✓ PLANEJAMENTO OK':'⚠ REVISAR PLANEJAMENTO', (okLnd2 && okAut2)?'good':'bad');

  let textoSi = modoSi==='minimo' ? `Menor intervalo encontrado para manter o 2º mergulho não descompressivo: ${formatTempo(siUsado)}.` : `Intervalo informado: ${formatTempo(siUsado)}.`;
  if(faixa) textoSi += ` Pela Tabela 15, o grupo ${grupo1} passa para ${grupoAposSi}.`;
  textoSi += ` Pela Tabela 14, grupo ${grupoAposSi} em ${linha2.m} m gera NR ${formatTempo(rnt)}.`;
  if($('obsSi')) $('obsSi').textContent=textoSi;

  const rntFinal = rntPorGrupoProf(grupo2, linha2);
  setText('rntFinal2', rntFinal==null ? '—' : formatTempo(rntFinal));

  let obs = `Tempo total (NR + TF2): ${formatTempo(tat)}. Nitrogênio residual após o 2º mergulho: ${rntFinal==null ? '—' : formatTempo(rntFinal)}. `;
  obs += `Cilindro: ${cilindroNovo?'Novo':'Mesmo do 1º mergulho'}. Autonomia principal considerada: ${formatTempo(autP2)}. Autonomia remanescente: ${formatTempo(autRem2)}. Pressão final estimada: ${pressaoFinal2} bar. `;
  obs += okLnd2 ? 'DENTRO DO LND.' : 'ULTRAPASSA O LND.';
  if(!okAut2) obs += ' Atenção: autonomia principal insuficiente para o tempo informado.';
  if($('obs2')) $('obs2').textContent=obs;

  return {ok:okLnd2 && okAut2, okAut2, autRem:autRem2, autP2, autB2, pressaoFinal2, cilindroNovo, prof2, tempo2, profCorr2, linha2, lnd2, siUsado, grupoAposSi, rnt, tat, tempoMax2, grupo2, rntFinal};
}

function calcularTerceiro(rep2, alt){
  const prof3=num('prof3'), tempo3=num('tempo3'), modoSi=$('modoSi3') ? $('modoSi3').value : 'minimo';
  const profCorr3=ceil0(profundidadeCorrigida(prof3, alt));
  const linha3=linhaTabela(profCorr3);
  const lnd3=linha3 ? lndDaLinha(linha3) : 0;
  const tcs1=num('tcs');
  const pressP1=num('pressaoPrincipal');
  const pressB=num('pressaoBailout');
  const cilindroNovo3 = $('cilindroNovo3') && $('cilindroNovo3').checked;

  if($('cilindroStatus3')) setText('cilindroStatus3', cilindroNovo3 ? 'Novo' : 'Mesmo do 2º mergulho');

  if(!rep2 || !rep2.ok || !linha3 || !rep2.grupo2 || rep2.grupo2==='FORA' || rep2.grupo2==='ACIMA LND'){
    setText('siUsado3','—'); setText('grupoAposSi3','—'); setText('rnt3','—'); setText('statusSi3','FORA','bad');
    setText('profCorr3', profCorr3); setText('profTabela3', linha3?linha3.m:'fora'); setText('lnd3', linha3?(Number.isFinite(lnd3)?formatTempo(lnd3):'sem limite'):'fora');
    setText('tat3','—'); setText('tempoMax3','—'); setText('grupo3','—'); setText('rntFinal3','—'); setText('status3','FORA','bad');
    setText('autPrincipal3','—'); setText('autBailout3','—'); setText('autRemanescente3','—'); setText('pressaoFinal3','—');
    if($('obsSi3')) $('obsSi3').textContent='Não foi possível calcular o 3º mergulho. Verifique o 2º mergulho e a profundidade do 3º.';
    if($('obs3')) $('obs3').textContent='';
    return {ok:false};
  }

  const estimativa = estimarRepetitivoComIntervalo(rep2.grupo2, linha3, lnd3, tempo3, modoSi, num('siManual3'), rep2.linha2);
  const {siUsado, grupoAposSi, rnt, tempoMax2} = estimativa;

  if(siUsado===null || rnt===null || tempoMax2===null){
    setText('siUsado3','não viável'); setText('grupoAposSi3','—'); setText('rnt3','—'); setText('statusSi3','AVISO','bad');
    setText('tempoMax3','—'); setText('rntFinal3','—'); setText('status3','⚠ REVISAR PLANEJAMENTO','bad');
    setText('autPrincipal3','—'); setText('autBailout3','—'); setText('autRemanescente3','—'); setText('pressaoFinal3','—');
    if($('obsSi3')) $('obsSi3').textContent='Não foi encontrado intervalo de superfície viável na tabela cadastrada para esse perfil.';
    if($('obs3')) $('obs3').textContent='';
    return {ok:false, prof3, tempo3, linha3, profCorr3};
  }

  const tat = tempo3 + rnt;
  const okLnd3 = (tat <= lnd3);
  const grupo3 = grupoPorTempo(linha3, tat);
  const faixa = intervaloFaixaParaGrupo(rep2.grupo2, grupoAposSi);
  const pressaoInicial3 = cilindroNovo3 ? pressP1 : Math.max(0, rep2.pressaoFinal2);
  const autP3 = autonomiaPrincipal(tcs1, prof3, pressaoInicial3);
  const autB3 = autonomiaBailout(tcs1, prof3, pressB);
  const autRem3 = Math.max(0, autP3 - tempo3);
  const pressaoFinal3 = Math.max(0, pressaoFinal(VOLUME_PRINCIPAL_S80, pressaoInicial3, tcs1, prof3, tempo3));
  const okAut3 = tempo3 <= autP3;

  setText('siUsado3', formatTempo(siUsado));
  setText('grupoAposSi3', grupoAposSi);
  setText('rnt3', formatTempo(rnt));
  const nr3Calc=rntPorGrupoProf(grupo3, linha3); if($('nrTerceiro')) setText('nrTerceiro', formatTempo(nr3Calc ?? rnt));
  setText('statusSi3', 'OK', 'good');
  setText('profCorr3', profCorr3);
  setText('profTabela3', linha3.m);
  setText('lnd3', Number.isFinite(lnd3)?formatTempo(lnd3):'sem limite');
  setText('tat3', formatTempo(tat), okLnd3?'good':'bad');
  setText('comparacaoLnd3', `${formatTempo(rnt)} + ${formatTempo(tempo3)} ${okLnd3?'≤':'>'} ${fmtMin(lnd3)}`, okLnd3?'good':'bad');
  setText('tempoMax3', Number.isFinite(tempoMax2) ? `até ${formatTempo(Math.max(0, tempoMax2))}` : 'sem limite', tempoMax2>=0?'good':'bad');
  setText('autPrincipal3', formatTempo(autP3));
  setText('autBailout3', formatTempo(autB3));
  setText('autRemanescente3', formatTempo(autRem3), okAut3?'good':'bad');
  setText('grupo3', grupo3);
  setText('pressaoFinal3', pressaoFinal3, pressaoFinal3 < RESERVA_PRINCIPAL_BAR ? 'bad' : 'good');
  setText('cilindroStatus3', cilindroNovo3 ? 'Novo' : 'Mesmo do 2º mergulho');
  setText('status3', (okLnd3 && okAut3)?'✓ PLANEJAMENTO OK':'⚠ REVISAR PLANEJAMENTO', (okLnd3 && okAut3)?'good':'bad');

  let textoSi = modoSi==='minimo' ? `Menor intervalo encontrado para manter o 3º mergulho não descompressivo: ${formatTempo(siUsado)}.` : `Intervalo informado: ${formatTempo(siUsado)}.`;
  if(faixa) textoSi += ` Pela Tabela 15, o grupo ${rep2.grupo2} passa para ${grupoAposSi}.`;
  textoSi += ` Pela Tabela 14, grupo ${grupoAposSi} em ${linha3.m} m gera NR ${formatTempo(rnt)}.`;
  if($('obsSi3')) $('obsSi3').textContent=textoSi;

  const rntFinal = rntPorGrupoProf(grupo3, linha3);
  setText('rntFinal3', rntFinal==null ? '—' : formatTempo(rntFinal));

  let obs = `Tempo total (NR + TF3): ${formatTempo(tat)}. Nitrogênio residual após o 3º mergulho: ${rntFinal==null ? '—' : formatTempo(rntFinal)}. `;
  obs += `Cilindro: ${cilindroNovo3?'Novo':'Mesmo do 2º mergulho'}. Autonomia principal considerada: ${formatTempo(autP3)}. Autonomia remanescente: ${formatTempo(autRem3)}. Pressão final estimada: ${pressaoFinal3} bar. `;
  obs += okLnd3 ? 'DENTRO DO LND.' : 'ULTRAPASSA O LND.';
  if(!okAut3) obs += ' Atenção: autonomia principal insuficiente para o tempo informado.';
  if($('obs3')) $('obs3').textContent=obs;

  return {ok:okLnd3 && okAut3, okAut3, autRem:autRem3, autP3, autB3, pressaoFinal3, cilindroNovo:cilindroNovo3, prof3, tempo3, profCorr3, linha3, lnd3, siUsado, grupoAposSi, rnt, tat, tempoMax3:tempoMax2, grupo3, rntFinal};
}

function calcularQuarto(rep3, alt){
  const prof4=num('prof4'), tempo4=num('tempo4'), modoSi=$('modoSi4') ? $('modoSi4').value : 'minimo';
  const profCorr4=ceil0(profundidadeCorrigida(prof4, alt));
  const linha4=linhaTabela(profCorr4);
  const lnd4=linha4 ? lndDaLinha(linha4) : 0;
  const tcs1=num('tcs');
  const pressP1=num('pressaoPrincipal');
  const pressB=num('pressaoBailout');
  const cilindroNovo4 = $('cilindroNovo4') && $('cilindroNovo4').checked;

  if($('cilindroStatus4')) setText('cilindroStatus4', cilindroNovo4 ? 'Novo' : 'Mesmo do 3º mergulho');

  if(!rep3 || !rep3.ok || !linha4 || !rep3.grupo3 || rep3.grupo3==='FORA' || rep3.grupo3==='ACIMA LND'){
    setText('siUsado4','—'); setText('grupoAposSi4','—'); setText('rnt4','—'); setText('statusSi4','FORA','bad');
    setText('profCorr4', profCorr4); setText('profTabela4', linha4?linha4.m:'fora'); setText('lnd4', linha4?(Number.isFinite(lnd4)?formatTempo(lnd4):'sem limite'):'fora');
    setText('tat4','—'); setText('tempoMax4','—'); setText('grupo4','—'); setText('rntFinal4','—'); setText('status4','FORA','bad');
    setText('autPrincipal4','—'); setText('autBailout4','—'); setText('autRemanescente4','—'); setText('pressaoFinal4','—');
    if($('obsSi4')) $('obsSi4').textContent='Não foi possível calcular o 4º mergulho. Verifique o 3º mergulho e a profundidade do 4º.';
    if($('obs4')) $('obs4').textContent='';
    return {ok:false};
  }

  const estimativa = estimarRepetitivoComIntervalo(rep3.grupo3, linha4, lnd4, tempo4, modoSi, num('siManual4'), rep3.linha3);
  const {siUsado, grupoAposSi, rnt, tempoMax2} = estimativa;

  if(siUsado===null || rnt===null || tempoMax2===null){
    setText('siUsado4','não viável'); setText('grupoAposSi4','—'); setText('rnt4','—'); setText('statusSi4','AVISO','bad');
    setText('tempoMax4','—'); setText('rntFinal4','—'); setText('status4','⚠ REVISAR PLANEJAMENTO','bad');
    setText('autPrincipal4','—'); setText('autBailout4','—'); setText('autRemanescente4','—'); setText('pressaoFinal4','—');
    if($('obsSi4')) $('obsSi4').textContent='Não foi encontrado intervalo de superfície viável na tabela cadastrada para esse perfil.';
    if($('obs4')) $('obs4').textContent='';
    return {ok:false, prof4, tempo4, linha4, profCorr4};
  }

  const tat = tempo4 + rnt;
  const okLnd4 = (tat <= lnd4);
  const grupo4 = grupoPorTempo(linha4, tat);
  const faixa = intervaloFaixaParaGrupo(rep3.grupo3, grupoAposSi);
  const pressaoInicial4 = cilindroNovo4 ? pressP1 : Math.max(0, rep3.pressaoFinal3);
  const autP4 = autonomiaPrincipal(tcs1, prof4, pressaoInicial4);
  const autB4 = autonomiaBailout(tcs1, prof4, pressB);
  const autRem4 = Math.max(0, autP4 - tempo4);
  const pressaoFinal4 = Math.max(0, pressaoFinal(VOLUME_PRINCIPAL_S80, pressaoInicial4, tcs1, prof4, tempo4));
  const okAut4 = tempo4 <= autP4;

  setText('siUsado4', formatTempo(siUsado));
  setText('grupoAposSi4', grupoAposSi);
  setText('rnt4', formatTempo(rnt));
  const nr4Calc=rntPorGrupoProf(grupo4, linha4); if($('nrQuarto')) setText('nrQuarto', formatTempo(nr4Calc ?? rnt));
  setText('statusSi4', 'OK', 'good');
  setText('profCorr4', profCorr4);
  setText('profTabela4', linha4.m);
  setText('lnd4', Number.isFinite(lnd4)?formatTempo(lnd4):'sem limite');
  setText('tat4', formatTempo(tat), okLnd4?'good':'bad');
  setText('comparacaoLnd4', `${formatTempo(rnt)} + ${formatTempo(tempo4)} ${okLnd4?'≤':'>'} ${fmtMin(lnd4)}`, okLnd4?'good':'bad');
  setText('tempoMax4', Number.isFinite(tempoMax2) ? `até ${formatTempo(Math.max(0, tempoMax2))}` : 'sem limite', tempoMax2>=0?'good':'bad');
  setText('autPrincipal4', formatTempo(autP4));
  setText('autBailout4', formatTempo(autB4));
  setText('autRemanescente4', formatTempo(autRem4), okAut4?'good':'bad');
  setText('grupo4', grupo4);
  setText('pressaoFinal4', pressaoFinal4, pressaoFinal4 < RESERVA_PRINCIPAL_BAR ? 'bad' : 'good');
  setText('cilindroStatus4', cilindroNovo4 ? 'Novo' : 'Mesmo do 3º mergulho');
  setText('status4', (okLnd4 && okAut4)?'✓ PLANEJAMENTO OK':'⚠ REVISAR PLANEJAMENTO', (okLnd4 && okAut4)?'good':'bad');

  let textoSi = modoSi==='minimo' ? `Menor intervalo encontrado para manter o 4º mergulho não descompressivo: ${formatTempo(siUsado)}.` : `Intervalo informado: ${formatTempo(siUsado)}.`;
  if(faixa) textoSi += ` Pela Tabela 15, o grupo ${rep3.grupo3} passa para ${grupoAposSi}.`;
  textoSi += ` Pela Tabela 14, grupo ${grupoAposSi} em ${linha4.m} m gera NR ${formatTempo(rnt)}.`;
  if($('obsSi4')) $('obsSi4').textContent=textoSi;

  const rntFinal = rntPorGrupoProf(grupo4, linha4);
  setText('rntFinal4', rntFinal==null ? '—' : formatTempo(rntFinal));

  let obs = `Tempo total (NR + TF4): ${formatTempo(tat)}. Nitrogênio residual após o 4º mergulho: ${rntFinal==null ? '—' : formatTempo(rntFinal)}. `;
  obs += `Cilindro: ${cilindroNovo4?'Novo':'Mesmo do 3º mergulho'}. Autonomia principal considerada: ${formatTempo(autP4)}. Autonomia remanescente: ${formatTempo(autRem4)}. Pressão final estimada: ${pressaoFinal4} bar. `;
  obs += okLnd4 ? 'DENTRO DO LND.' : 'ULTRAPASSA O LND.';
  if(!okAut4) obs += ' Atenção: autonomia principal insuficiente para o tempo informado.';
  if($('obs4')) $('obs4').textContent=obs;

  return {ok:okLnd4 && okAut4, okAut4, autRem:autRem4, autP4, autB4, pressaoFinal4, cilindroNovo:cilindroNovo4, prof4, tempo4, profCorr4, linha4, lnd4, siUsado, grupoAposSi, rnt, tat, tempoMax4:tempoMax2, grupo4, rntFinal};
}
function montarRelatorio(r){
  const rep=r.rep;
  const si1 = $('siUsado1') ? $('siUsado1').textContent : '—';
  const nr1 = $('nrPrimeiro') ? $('nrPrimeiro').textContent : '—';
  let texto=`DIVE PLANNER\n\n1º MERGULHO\nAutonomia Principal: ${formatTempo(r.autP)}\nAutonomia Bail Out: ${formatTempo(r.autB)}\nGrupo repetitivo: ${r.grupo1}\nIntervalo de superfície: ${si1}\nNitrogênio residual: ${nr1}\nPressão final estimada: ${r.pFinal1} bar`;
  if(getUsarRep() && rep){
    texto += `\n\n2º MERGULHO\nTempo total de fundo: ${rep.tat!==undefined?formatTempo(rep.tat):'—'}\nAutonomia principal: ${rep.autP2!==undefined?formatTempo(rep.autP2):'—'}\nAutonomia Bail Out: ${rep.autB2!==undefined?formatTempo(rep.autB2):'—'}\nAutonomia remanescente: ${rep.autRem!==undefined?formatTempo(rep.autRem):'—'}\nNovo grupo repetitivo: ${rep.grupo2||'—'}\nNitrogênio residual: ${rep.rntFinal!==undefined && rep.rntFinal!==null?formatTempo(rep.rntFinal):'—'}\nPressão final: ${rep.pressaoFinal2!==undefined?rep.pressaoFinal2+' bar':'—'}\nCilindro: ${rep.cilindroNovo?'Novo':'Mesmo do 1º mergulho'}\nStatus Operacional: ${rep.ok?'PLANEJAMENTO OK':'REVISAR PLANEJAMENTO'}`;
  }
  if(getUsarTerceiro() && r.rep3){
    const rep3=r.rep3;
    texto += `\n\n3º MERGULHO\nTempo total de fundo: ${rep3.tat!==undefined?formatTempo(rep3.tat):'—'}\nAutonomia principal: ${rep3.autP3!==undefined?formatTempo(rep3.autP3):'—'}\nAutonomia Bail Out: ${rep3.autB3!==undefined?formatTempo(rep3.autB3):'—'}\nAutonomia remanescente: ${rep3.autRem!==undefined?formatTempo(rep3.autRem):'—'}\nNovo grupo repetitivo: ${rep3.grupo3||'—'}\nNitrogênio residual: ${rep3.rntFinal!==undefined && rep3.rntFinal!==null?formatTempo(rep3.rntFinal):'—'}\nPressão final: ${rep3.pressaoFinal3!==undefined?rep3.pressaoFinal3+' bar':'—'}\nCilindro: ${rep3.cilindroNovo?'Novo':'Mesmo do 2º mergulho'}\nStatus Operacional: ${rep3.ok?'PLANEJAMENTO OK':'REVISAR PLANEJAMENTO'}`;
  }
  if(getUsarQuarto() && r.rep4){
    const rep4=r.rep4;
    texto += `\n\n4º MERGULHO\nTempo total de fundo: ${rep4.tat!==undefined?formatTempo(rep4.tat):'—'}\nAutonomia principal: ${rep4.autP4!==undefined?formatTempo(rep4.autP4):'—'}\nAutonomia Bail Out: ${rep4.autB4!==undefined?formatTempo(rep4.autB4):'—'}\nAutonomia remanescente: ${rep4.autRem!==undefined?formatTempo(rep4.autRem):'—'}\nNovo grupo repetitivo: ${rep4.grupo4||'—'}\nNitrogênio residual: ${rep4.rntFinal!==undefined && rep4.rntFinal!==null?formatTempo(rep4.rntFinal):'—'}\nPressão final: ${rep4.pressaoFinal4!==undefined?rep4.pressaoFinal4+' bar':'—'}\nCilindro: ${rep4.cilindroNovo?'Novo':'Mesmo do 3º mergulho'}\nStatus Operacional: ${rep4.ok?'PLANEJAMENTO OK':'REVISAR PLANEJAMENTO'}`;
  }
  texto += `\n\nOBS: ferramenta auxiliar. Conferir tabela oficial US Navy/DOMAR, POP e computador de mergulho antes da operação.`;
  if($('relatorio')) $('relatorio').textContent=texto;
}

function atualizarSiManual(){
  const el=$('siManual'); if(!el) return;
  const manual=$('modoSi') && $('modoSi').value==='manual';
  const lab=el.closest('label'); if(lab) lab.style.display=manual?'block':'none';
}

function atualizarSiManual3(){
  const el=$('siManual3'); if(!el) return;
  const manual=$('modoSi3') && $('modoSi3').value==='manual';
  const lab=el.closest('label'); if(lab) lab.style.display=manual?'block':'none';
}

function atualizarSiManual4(){
  const el=$('siManual4'); if(!el) return;
  const manual=$('modoSi4') && $('modoSi4').value==='manual';
  const lab=el.closest('label'); if(lab) lab.style.display=manual?'block':'none';
}

function copiarDadosMergulho(profOrigem, tempoOrigem, profDestino, tempoDestino){
  const prof = $('prof' + profOrigem);
  const tempo = $('tempo' + tempoOrigem);
  const profAlvo = $('prof' + profDestino);
  const tempoAlvo = $('tempo' + tempoDestino);
  if(prof && profAlvo) profAlvo.value = prof.value;
  if(tempo && tempoAlvo) tempoAlvo.value = tempo.value;
}

function prepararMergulhoSeguinte(numero){
  if(numero === 2 && $('usarRep') && $('usarRep').checked){
    copiarDadosMergulho(1, 1, 2, 2);
  }
  if(numero === 3 && $('usarTerceiro') && $('usarTerceiro').checked){
    copiarDadosMergulho(2, 2, 3, 3);
  }
  if(numero === 4 && $('usarQuarto') && $('usarQuarto').checked){
    copiarDadosMergulho(3, 3, 4, 4);
  }
}
function setup(){
  preencherMunicipios();
  if($('municipio')) $('municipio').addEventListener('change', atualizarAltitudePorMunicipio);
  document.querySelectorAll('input,select').forEach(el=>el.addEventListener('input', atualizarPreview));
  document.querySelectorAll('input,select').forEach(el=>el.addEventListener('change', atualizarPreview));
  if($('usarRep')) $('usarRep').addEventListener('change', atualizarPreview);
  if($('buscaMunicipio')) $('buscaMunicipio').addEventListener('input', ()=>{ preencherMunicipios($('buscaMunicipio').value); atualizarPreview(); });
  if($('btnCalcular')) $('btnCalcular').addEventListener('click', ()=>{
    atualizarPreview();
    if($('btnCalcular').disabled) return;
    calcular();
    $('paginaEntrada').classList.remove('active'); $('paginaResultado').classList.add('active'); window.scrollTo(0,0);
  });
  if($('btnVoltar')) $('btnVoltar').addEventListener('click', ()=>{ $('paginaResultado').classList.remove('active'); $('paginaEntrada').classList.add('active'); window.scrollTo(0,0); });
  if($('copiar')) $('copiar').addEventListener('click', ()=>navigator.clipboard.writeText($('relatorio').textContent));
  atualizarPreview(); calcular();
}

document.addEventListener('DOMContentLoaded', setup);

// Motor operacional em cadeia legado, preservado por compatibilidade.
// Mantem tabelas US Navy, altitude e formulas de autonomia acima; corrige a origem de GR/NGR/NR/TTF.
var planejamentoAtualLegado = null;

function diveConfig(n){
  return {
    n,
    profId: `prof${n}`,
    tempoId: `tempo${n}`,
    cilindroId: n === 1 ? null : (n === 2 ? 'cilindroNovo' : `cilindroNovo${n}`),
    enabled: n === 1 || (n === 2 && getUsarRep()) || (n === 3 && getUsarTerceiro()) || (n === 4 && getUsarQuarto())
  };
}

function intervalConfig(n){
  if(n === 1) return { modoId:'modoSi', siId:'siManual' };
  if(n === 2) return { modoId:'modoSi3', siId:'siManual3' };
  if(n === 3) return { modoId:'modoSi4', siId:'siManual4' };
  return null;
}

function statusText(level){
  if(level === 'ok' || level === true) return '<b>STATUS:</b> PLANEJAMENTO OK';
  if(level === 'attention') return '<b>STATUS:</b> ATENÇÃO';
  return '<b>STATUS:</b> REVISAR PLANEJAMENTO';
}

function diveStatusLevel(dive){
  if(!dive) return 'review';
  if(dive.errors && dive.errors.length) return 'review';
  if(dive.warnings && dive.warnings.some(msg => /excede a capacidade/i.test(msg))) return 'review';
  if(dive.warnings && dive.warnings.length) return 'attention';
  return 'ok';
}

function setVisible(id, visible){
  const el = $(id);
  if(el) el.style.display = visible ? '' : 'none';
}

function setSituacao(id, ok){
  const el = $(id);
  if(!el) return;
  el.classList.toggle('bad', !ok);
  el.classList.toggle('ok', ok);
}

function renderAlerts(id, alerts){
  const el = $(id);
  if(!el) return;
  const mensagens = (alerts || []).filter(msg => String(msg || '').trim());
  el.innerHTML = mensagens.map(msg => `<div>${msg}</div>`).join('');
  el.style.display = mensagens.length ? 'grid' : 'none';
}

function pressureOperationalWarnings(pressureFinal){
  if(!Number.isFinite(pressureFinal)) return ['Pressão final estimada indisponível.'];
  if(pressureFinal < 0){
    return [
      'O perfil planejado excede a capacidade do cilindro principal.',
      `Pressão final estimada: ${fmt(pressureFinal, 0)} bar.`,
      'Será necessária a troca ou recarga do cilindro para viabilizar este mergulho.'
    ];
  }
  if(pressureFinal < RESERVA_PRINCIPAL_BAR){
    return [
      'O perfil planejado consumirá além da autonomia disponível.',
      `Pressão final estimada: ${fmt(pressureFinal, 0)} bar.`,
      'O cilindro entrará na reserva operacional de 50 bar.',
      'Recomenda-se reduzir o tempo de fundo ou trocar/recarregar o cilindro principal.'
    ];
  }
  return [];
}

function resetPreview(n){
  if(n === 1){
    ['previewLnd','previewGrupo','previewAutP1','previewAutB1','previewAutRem1','previewSi1','previewNgr1'].forEach(id => setText(id, '—'));
    renderAlerts('previewAlertas', []);
    setSituacao('situacaoOperacional', true);
    return;
  }
  const suffix = n === 2 ? '' : String(n);
  [`previewLnd${n}`, `previewNrHerdado${suffix}`, `previewTtf${n}`, `previewGrupo${n}`].forEach(id => setText(id, '—'));
  if(n < 4){
    setText(`previewSi${n}`, '—');
    setText(`previewNgr${n}`, '—');
  }
  const status = $(`previewStatus${n}`);
  if(status) status.innerHTML = '<b>STATUS:</b> —';
  renderAlerts(`previewAlertas${n}`, []);
  setSituacao(`situacaoOperacional${n}`, true);
}

function enabledDiveNumbers(){
  const nums = [1];
  if(getUsarRep()) nums.push(2);
  if(getUsarTerceiro()) nums.push(3);
  if(getUsarQuarto()) nums.push(4);
  return nums;
}

function findMinimumSurfaceInterval(currentDive, nextDiveInput){
  if(!currentDive || !nextDiveInput || !currentDive.line || !currentDive.gr || currentDive.errors.length) return null;
  if(!nextDiveInput.line) return null;
  const nextLnd = lndDaLinha(nextDiveInput.line);
  for(let si = 10; si <= 950; si++){
    const ngr = grupoAposIntervalo(currentDive.gr, si);
    const nr = rntPorGrupoProf(ngr, currentDive.line);
    if(nr === null) continue;
    if(nr + nextDiveInput.tempo <= nextLnd){
      return { si, ngr, nr, source:'auto' };
    }
  }
  return null;
}

function manualSurfaceInterval(currentDive, si){
  const ngr = grupoAposIntervalo(currentDive.gr, si);
  const nr = rntPorGrupoProf(ngr, currentDive.line);
  return { si, ngr, nr, source:'manual' };
}

function buildDiveInput(n, alt){
  const cfg = diveConfig(n);
  const prof = num(cfg.profId);
  const tempo = num(cfg.tempoId);
  const profCorr = profundidadeCorrigida(prof, alt);
  const line = linhaTabela(profCorr);
  return { n, prof, tempo, profCorr, line, lnd: lndDaLinha(line) };
}

function computeChain(){
  const tcs = num('tcs');
  const alt = num('altitude');
  const pressaoCheia = num('pressaoPrincipal');
  const pressaoBo = num('pressaoBailout');
  const dives = [];
  const nums = enabledDiveNumbers();
  const inputs = new Map(nums.map(n => [n, buildDiveInput(n, alt)]));

  nums.forEach((n, idx) => {
    const input = inputs.get(n);
    const prev = dives[idx - 1] || null;
    const cfg = diveConfig(n);
    const errors = [];
    const warnings = [];

    if(prev && prev.intervalErrorForNext) errors.push(prev.intervalErrorForNext);
    if(tcs <= 0) errors.push('TCS deve ser maior que zero.');
    if(input.prof <= 0) errors.push(`${n}º mergulho: profundidade deve ser maior que zero.`);
    if(input.tempo <= 0) errors.push(`${n}º mergulho: tempo de fundo deve ser maior que zero.`);
    if(!input.line) errors.push(`${n}º mergulho: profundidade corrigida fora das tabelas US Navy cadastradas.`);

    const prevNr = n === 1 ? 0 : (prev && prev.nrAfterInterval !== null ? prev.nrAfterInterval : null);
    if(n > 1 && prevNr === null) errors.push(`${n}º mergulho: ajuste o IS do mergulho anterior para gerar NR válido.`);
    const ttf = prevNr === null ? null : prevNr + input.tempo;
    const gr = input.line && ttf !== null ? grupoPorTempo(input.line, ttf) : '—';
    const lnd = input.lnd;

    if(input.line && ttf !== null && ttf > lnd) errors.push(`${n}º mergulho: TTF acima do LND.`);
    if(gr === 'ACIMA LND') errors.push(`${n}º mergulho: grupo repetitivo acima do limite sem descompressão.`);

    const startPressure = n === 1
      ? pressaoCheia
      : ($(cfg.cilindroId) && $(cfg.cilindroId).checked ? pressaoCheia : (prev ? prev.pressureFinal : pressaoCheia));
    const autP = autonomiaPrincipal(tcs, input.prof, startPressure);
    const autB = autonomiaBailout(tcs, input.prof, pressaoBo);
    const pressureFinal = pressaoFinal(VOLUME_PRINCIPAL_S80, startPressure, tcs, input.prof, input.tempo);
    const autRem = Math.max(0, autP - input.tempo);

    warnings.push(...pressureOperationalWarnings(pressureFinal));

    const dive = {
      n,
      prof: input.prof,
      tempo: input.tempo,
      profCorr: input.profCorr,
      line: input.line,
      lineDepth: input.line ? input.line.m : null,
      lnd,
      prevNr,
      ttf,
      gr,
      startPressure,
      pressureFinal,
      autP,
      autB,
      autRem,
      errors,
      warnings,
      intervalAfter: null,
      ngrAfterInterval: null,
      nrAfterInterval: null
    };

    dives.push(dive);

    const hasNext = nums.includes(n + 1);
    if(hasNext){
      const intCfg = intervalConfig(n);
      const mode = ($(intCfg.modoId) || {}).value || 'minimo';
      const manualSi = num(intCfg.siId);
      const nextInput = inputs.get(n + 1);
      let interval = null;
      if(mode === 'manual'){
        interval = manualSurfaceInterval(dive, manualSi);
        if(interval.nr === null) dive.intervalErrorForNext = `IS após o ${n}º mergulho não gerou NR válido.`;
      }else{
        interval = findMinimumSurfaceInterval(dive, nextInput);
        if(!interval) dive.intervalErrorForNext = `Não foi encontrado IS viável após o ${n}º mergulho.`;
      }
      if(interval){
        dive.intervalAfter = interval.si;
        dive.ngrAfterInterval = interval.ngr;
        dive.nrAfterInterval = interval.nr;
      }
    }
  });

  return { dives, ok: dives.every(d => d.errors.length === 0) };
}

function errosPlanejamentoPreview(){
  const chain = computeChain();
  const first = chain.dives[0];
  return first ? [...first.errors] : [];
}

function atualizarSiManual(){
  const manual = (($('modoSi') || {}).value === 'manual');
  const el = $('siManual');
  if(el && el.closest('label')) el.closest('label').style.display = manual ? '' : 'none';
}

function atualizarSiManual3(){
  const manual = (($('modoSi3') || {}).value === 'manual');
  const el = $('siManual3');
  if(el && el.closest('label')) el.closest('label').style.display = manual ? '' : 'none';
}

function atualizarSiManual4(){
  const manual = (($('modoSi4') || {}).value === 'manual');
  const el = $('siManual4');
  if(el && el.closest('label')) el.closest('label').style.display = manual ? '' : 'none';
}

function renderFirstPreview(dive, hasSecond){
  if(!dive){ resetPreview(1); return; }
  const alerts = [...dive.errors, ...dive.warnings];
  setText('previewLnd', formatTempo(dive.lnd));
  setText('previewGrupo', dive.gr || '—');
  setText('previewAutP1', formatTempo(dive.autP));
  setText('previewAutB1', formatTempo(dive.autB));
  setText('previewAutRem1', formatTempo(dive.autRem));
  setText('previewSi1', hasSecond && dive.intervalAfter !== null ? formatTempo(dive.intervalAfter) : '—');
  setText('previewNgr1', hasSecond && dive.ngrAfterInterval ? dive.ngrAfterInterval : '—');
  renderAlerts('previewAlertas', alerts);
  setSituacao('situacaoOperacional', alerts.length === 0);
}

function renderRepetitivePreview(dive, hasNext){
  if(!dive){ resetPreview(2); return; }
  const n = dive.n;
  const suffix = n === 2 ? '' : String(n);
  setText(`previewLnd${n}`, formatTempo(dive.lnd));
  setText(`previewNrHerdado${suffix}`, dive.prevNr === null ? '—' : formatTempo(dive.prevNr));
  setText(`previewTtf${n}`, dive.ttf === null ? '—' : formatTempo(dive.ttf));
  setText(`previewGrupo${n}`, dive.gr || '—');
  if(n < 4){
    setText(`previewSi${n}`, hasNext && dive.intervalAfter !== null ? formatTempo(dive.intervalAfter) : '—');
    setText(`previewNgr${n}`, hasNext && dive.ngrAfterInterval ? dive.ngrAfterInterval : '—');
  }
  const status = $(`previewStatus${n}`);
  const alerts = [...dive.errors, ...dive.warnings];
  if(status) status.innerHTML = statusText(diveStatusLevel(dive));
  renderAlerts(`previewAlertas${n}`, alerts);
  setSituacao(`situacaoOperacional${n}`, alerts.length === 0);
}

function atualizarPreview(){
  atualizarSiManual();
  atualizarSiManual3();
  atualizarSiManual4();

  setVisible('repCampos', getUsarRep());
  setVisible('terCampos', getUsarTerceiro());
  setVisible('quaCampos', getUsarQuarto());

  const chain = computeChain();
  planejamentoAtualLegado = chain;
  const byN = new Map(chain.dives.map(d => [d.n, d]));

  renderFirstPreview(byN.get(1), getUsarRep());
  [2,3,4].forEach(n => {
    if(byN.has(n)) renderRepetitivePreview(byN.get(n), byN.has(n + 1));
    else resetPreview(n);
  });

  const btn = $('btnCalcular');
  if(btn) btn.disabled = !chain.ok;
}

function resultIntervalText(dive){
  return dive && dive.intervalAfter !== null ? formatTempo(dive.intervalAfter) : '—';
}

function resultNgrText(dive){
  return dive && dive.ngrAfterInterval ? dive.ngrAfterInterval : '—';
}

function resultNrText(dive){
  return dive && dive.nrAfterInterval !== null ? formatTempo(dive.nrAfterInterval) : '—';
}

function resultPressureText(dive){
  return dive && Number.isFinite(dive.pressureFinal) ? `${fmt(dive.pressureFinal, 0)} bar` : '—';
}

function renderResults(chain){
  const byN = new Map(chain.dives.map(d => [d.n, d]));
  const d1 = byN.get(1);
  setText('profCorr1', d1 ? fmt(ceil0(d1.profCorr), 0) : '—');
  setText('tempoFundo1', d1 ? formatTempo(d1.tempo) : '—');
  setText('siUsado1', resultIntervalText(d1));
  setText('grupoAposSi1', resultNgrText(d1));
  setText('nrPrimeiro', resultNrText(d1));
  setText('pressaoFinal1', resultPressureText(d1));
  setText('obs1', d1 ? ([...d1.errors, ...d1.warnings].join(' ') || 'Pressão residual estimada pelo consumo planejado do cilindro principal.') : '');

  [
    { n:2, sec:'secRepResultado', prof:'profCorr2', tat:'tat2', si:'siUsado', ngr:'grupoAposSi', nr:'rnt', press:'pressaoFinal2', obs:'obs2' },
    { n:3, sec:'secRep3Resultado', prof:'profCorr3', tat:'tat3', si:'siUsado3', ngr:'grupoAposSi3', nr:'rnt3', press:'pressaoFinal3', obs:'obs3' },
    { n:4, sec:'secRep4Resultado', prof:'profCorr4', tat:'tat4', si:'siUsado4', ngr:'grupoAposSi4', nr:'rnt4', press:'pressaoFinal4', obs:'obs4' }
  ].forEach(cfg => {
    const d = byN.get(cfg.n);
    setVisible(cfg.sec, !!d);
    if(!d) return;
    setText(cfg.prof, fmt(ceil0(d.profCorr), 0));
    setText(cfg.tat, d.ttf === null ? '—' : formatTempo(d.ttf));
    setText(cfg.si, resultIntervalText(d));
    setText(cfg.ngr, resultNgrText(d));
    setText(cfg.nr, resultNrText(d));
    setText(cfg.press, resultPressureText(d));
    setText(cfg.obs, [...d.errors, ...d.warnings].join(' ') || `TTF: ${formatTempo(d.ttf)}.`);
  });
}

function montarRelatorio(chain){
  const linhas = ['DIVE PLANNER DOMAR/CBMPB - PLANEJAMENTO OPERACIONAL'];
  chain.dives.forEach(d => {
    linhas.push('');
    linhas.push(`${d.n}º MERGULHO`);
    linhas.push(`Profundidade corrigida: ${fmt(ceil0(d.profCorr), 0)} m`);
    if(d.n === 1){
      linhas.push(`Tempo de fundo: ${formatTempo(d.tempo)}`);
    }else{
      linhas.push(`Tempo total de fundo: ${formatTempo(d.ttf)}`);
    }
    linhas.push(`Grupo repetitivo: ${d.gr}`);
    linhas.push(`Intervalo de superficie: ${resultIntervalText(d)}`);
    linhas.push(`Novo grupo repetitivo: ${resultNgrText(d)}`);
    linhas.push(`Nitrogenio residual: ${resultNrText(d)}`);
    linhas.push(`Pressao residual do cilindro: ${fmt(d.pressureFinal, 0)} bar`);
    if(d.errors.length || d.warnings.length) linhas.push(`Alertas: ${[...d.errors, ...d.warnings].join(' | ')}`);
  });
  linhas.push('');
  linhas.push('Conferir POP, tabelas US Navy, computador de mergulho e decisao do MG responsavel.');
  return linhas.join('\n');
}

function calcular(){
  const chain = computeChain();
  planejamentoAtualLegado = chain;
  atualizarPreview();
  if(!chain.ok) return;
  renderResults(chain);
  setText('relatorio', montarRelatorio(chain));
  setVisible('paginaEntrada', false);
  setVisible('paginaResultado', true);
  const entrada = $('paginaEntrada');
  const resultado = $('paginaResultado');
  if(entrada) entrada.classList.remove('active');
  if(resultado) resultado.classList.add('active');
  window.scrollTo && window.scrollTo({ top:0, behavior:'smooth' });
}

function voltar(){
  const entrada = $('paginaEntrada');
  const resultado = $('paginaResultado');
  if(resultado) resultado.classList.remove('active');
  if(entrada) entrada.classList.add('active');
  setVisible('paginaEntrada', true);
  setVisible('paginaResultado', false);
  atualizarPreview();
}

// V19 - camada ativa generica para multiplos mergulhos.
// As tabelas US Navy, altitude, GR, NGR, NR e formulas de autonomia permanecem nas funcoes base acima.
var planejamentoAtualV19 = null;

const MERGULHO_DOM_CONFIG = [
  { numero:1, profId:'prof1', tfId:'tempo1', trocaId:null, secCampos:null },
  { numero:2, profId:'prof2', tfId:'tempo2', trocaId:'cilindroNovo', secCampos:'repCampos' },
  { numero:3, profId:'prof3', tfId:'tempo3', trocaId:'cilindroNovo3', secCampos:'terCampos' },
  { numero:4, profId:'prof4', tfId:'tempo4', trocaId:'cilindroNovo4', secCampos:'quaCampos' }
];

const INTERVALO_DOM_CONFIG = [
  { after:1, modoId:'modoSi', siId:'siManual' },
  { after:2, modoId:'modoSi3', siId:'siManual3' },
  { after:3, modoId:'modoSi4', siId:'siManual4' }
];

function mergulhosHabilitados(){
  return MERGULHO_DOM_CONFIG.filter(cfg =>
    cfg.numero === 1 ||
    (cfg.numero === 2 && getUsarRep()) ||
    (cfg.numero === 3 && getUsarTerceiro()) ||
    (cfg.numero === 4 && getUsarQuarto())
  );
}

function intervaloConfigPorMergulho(numero){
  return INTERVALO_DOM_CONFIG.find(cfg => cfg.after === numero) || null;
}

function entradaMergulho(config, altitude){
  const profundidade = num(config.profId);
  const tf = num(config.tfId);
  const profundidadeCorrigidaTabela = profundidadeCorrigida(profundidade, altitude);
  const linha = linhaTabela(profundidadeCorrigidaTabela);
  return {
    numero: config.numero,
    profundidade,
    tf,
    profundidadeCorrigida: profundidadeCorrigidaTabela,
    linha,
    lnd: lndDaLinha(linha)
  };
}

function avisosPressaoOperacional(pressaoFinalEstimativa){
  if(!Number.isFinite(pressaoFinalEstimativa)){
    return ['Pressao final estimada indisponivel.'];
  }
  if(pressaoFinalEstimativa < 0){
    return [
      'O perfil planejado excede a capacidade do cilindro principal.',
      `Pressao final estimada: ${fmt(pressaoFinalEstimativa, 0)} bar.`,
      'Sera necessaria a troca ou recarga do cilindro para viabilizar este mergulho.'
    ];
  }
  if(pressaoFinalEstimativa < RESERVA_PRINCIPAL_BAR){
    return [
      'O perfil planejado consumira alem da autonomia disponivel.',
      `Pressao final estimada: ${fmt(pressaoFinalEstimativa, 0)} bar.`,
      'O cilindro entrara na reserva operacional de 50 bar.',
      'Recomenda-se reduzir o tempo de fundo ou trocar/recarregar o cilindro principal.'
    ];
  }
  return [];
}

function buscarMenorIntervaloSuperficie(mergulhoAtual, proximaEntrada){
  if(!mergulhoAtual || !proximaEntrada || !mergulhoAtual.linha || !proximaEntrada.linha) return null;
  if(mergulhoAtual.erros.length || !mergulhoAtual.gr || mergulhoAtual.gr === 'FORA' || mergulhoAtual.gr === 'ACIMA LND') return null;
  for(let isMin = 10; isMin <= 950; isMin++){
    const ngr = grupoAposIntervalo(mergulhoAtual.gr, isMin);
    const nr = rntPorGrupoProf(ngr, mergulhoAtual.linha);
    if(nr === null) continue;
    if(nr + proximaEntrada.tf <= proximaEntrada.lnd){
      return { is:isMin, ngr, nr, automatico:true };
    }
  }
  return null;
}

function intervaloManual(mergulhoAtual, isMin){
  const ngr = grupoAposIntervalo(mergulhoAtual.gr, isMin);
  const nr = rntPorGrupoProf(ngr, mergulhoAtual.linha);
  return { is:isMin, ngr, nr, automatico:false };
}

function computeChain(){
  const tcs = num('tcs');
  const altitude = num('altitude');
  const pressaoPrincipal = num('pressaoPrincipal');
  const pressaoBailout = num('pressaoBailout');
  const configs = mergulhosHabilitados();
  const entradas = new Map(configs.map(cfg => [cfg.numero, entradaMergulho(cfg, altitude)]));
  const mergulhos = [];

  configs.forEach((config, indice) => {
    const entrada = entradas.get(config.numero);
    const anterior = mergulhos[indice - 1] || null;
    const erros = [];

    if(anterior && anterior.erroIntervaloParaProximo) erros.push(anterior.erroIntervaloParaProximo);
    if(tcs <= 0) erros.push('TCS deve ser maior que zero.');
    if(entrada.profundidade <= 0) erros.push(`${config.numero}º mergulho: profundidade deve ser maior que zero.`);
    if(entrada.tf <= 0) erros.push(`${config.numero}º mergulho: tempo de fundo deve ser maior que zero.`);
    if(!entrada.linha) erros.push(`${config.numero}º mergulho: profundidade corrigida fora das tabelas US Navy cadastradas.`);

    const nrAnterior = config.numero === 1 ? 0 : (anterior && anterior.nr !== null ? anterior.nr : null);
    if(config.numero > 1 && nrAnterior === null) erros.push(`${config.numero}º mergulho: ajuste o IS anterior para gerar NR valido.`);

    const ttf = nrAnterior === null ? null : nrAnterior + entrada.tf;
    const gr = entrada.linha && ttf !== null ? grupoPorTempo(entrada.linha, ttf) : '—';
    if(entrada.linha && ttf !== null && ttf > entrada.lnd) erros.push(`${config.numero}º mergulho: TTF acima do LND.`);
    if(gr === 'ACIMA LND') erros.push(`${config.numero}º mergulho: grupo repetitivo acima do limite sem descompressao.`);

    const cilindroTrocado = config.numero > 1 && $(config.trocaId) && $(config.trocaId).checked;
    const pressaoInicial = config.numero === 1 || cilindroTrocado ? pressaoPrincipal : (anterior ? anterior.pressaoFinal : pressaoPrincipal);
    const autonomiaPrincipalCalculada = autonomiaPrincipal(tcs, entrada.profundidade, pressaoInicial);
    const autonomiaBailoutCalculada = autonomiaBailout(tcs, entrada.profundidade, pressaoBailout);
    const pressaoFinalEstimativa = pressaoFinal(VOLUME_PRINCIPAL_S80, pressaoInicial, tcs, entrada.profundidade, entrada.tf);
    const avisos = avisosPressaoOperacional(pressaoFinalEstimativa);

    const mergulho = {
      numero: config.numero,
      profundidade: entrada.profundidade,
      profundidadeCorrigida: entrada.profundidadeCorrigida,
      linha: entrada.linha,
      line: entrada.linha,
      profundidadeTabela: entrada.linha ? entrada.linha.m : null,
      lineDepth: entrada.linha ? entrada.linha.m : null,
      lnd: entrada.lnd,
      tf: entrada.tf,
      tempo: entrada.tf,
      nrAnterior,
      prevNr: nrAnterior,
      ttf,
      gr,
      is: null,
      intervalAfter: null,
      ngr: null,
      ngrAfterInterval: null,
      nr: null,
      nrAfterInterval: null,
      pressaoInicial,
      startPressure: pressaoInicial,
      pressaoFinal: pressaoFinalEstimativa,
      pressureFinal: pressaoFinalEstimativa,
      autonomiaPrincipal: autonomiaPrincipalCalculada,
      autP: autonomiaPrincipalCalculada,
      autonomiaBailout: autonomiaBailoutCalculada,
      autB: autonomiaBailoutCalculada,
      autonomiaRemanescente: Math.max(0, autonomiaPrincipalCalculada - entrada.tf),
      autRem: Math.max(0, autonomiaPrincipalCalculada - entrada.tf),
      erros,
      errors: erros,
      avisos,
      warnings: avisos
    };

    mergulhos.push(mergulho);

    const proximoExiste = configs.some(cfg => cfg.numero === config.numero + 1);
    if(proximoExiste){
      const intervaloCfg = intervaloConfigPorMergulho(config.numero);
      const modo = ($(intervaloCfg.modoId) || {}).value || 'minimo';
      const proximaEntrada = entradas.get(config.numero + 1);
      let intervalo = null;
      if(modo === 'manual'){
        intervalo = intervaloManual(mergulho, num(intervaloCfg.siId));
        if(intervalo.nr === null) mergulho.erroIntervaloParaProximo = `IS apos o ${config.numero}º mergulho nao gerou NR valido.`;
        if(intervalo.nr !== null && proximaEntrada && intervalo.nr + proximaEntrada.tf > proximaEntrada.lnd){
          mergulho.erroIntervaloParaProximo = `IS apos o ${config.numero}º mergulho nao permite o proximo mergulho dentro do LND.`;
        }
      }else{
        intervalo = buscarMenorIntervaloSuperficie(mergulho, proximaEntrada);
        if(!intervalo) mergulho.erroIntervaloParaProximo = `Nao foi encontrado IS viavel apos o ${config.numero}º mergulho.`;
      }
      if(intervalo){
        mergulho.is = intervalo.is;
        mergulho.intervalAfter = intervalo.is;
        mergulho.ngr = intervalo.ngr;
        mergulho.ngrAfterInterval = intervalo.ngr;
        mergulho.nr = intervalo.nr;
        mergulho.nrAfterInterval = intervalo.nr;
      }
    }
  });

  return { mergulhos, dives:mergulhos, ok: mergulhos.every(m => m.erros.length === 0) };
}

function nivelOperacional(mergulho){
  if(!mergulho || mergulho.erros.length) return 'review';
  if(mergulho.avisos.some(msg => /excede a capacidade/i.test(msg))) return 'review';
  if(mergulho.avisos.length) return 'attention';
  return 'ok';
}

function statusText(level){
  if(level === 'ok' || level === true) return '<b>STATUS:</b> PLANEJAMENTO OK';
  if(level === 'attention') return '<b>STATUS:</b> ATENÇÃO';
  return '<b>STATUS:</b> REVISAR PLANEJAMENTO';
}

function statusResumo(chain){
  const mergulhos = chain.mergulhos || chain.dives || [];
  if(mergulhos.some(m => nivelOperacional(m) === 'review')) return 'review';
  if(mergulhos.some(m => nivelOperacional(m) === 'attention')) return 'attention';
  return 'ok';
}

function renderAlerts(id, alerts){
  const el = $(id);
  if(!el) return;
  const mensagens = (alerts || []).filter(msg => String(msg || '').trim());
  el.innerHTML = mensagens.map(msg => `<div>${msg}</div>`).join('');
  el.style.display = mensagens.length ? 'grid' : 'none';
}

function renderFirstPreview(mergulho, hasSecond){
  if(!mergulho){ resetPreview(1); return; }
  const alerts = [...mergulho.erros, ...mergulho.avisos];
  setText('previewLnd', formatTempo(mergulho.lnd));
  setText('previewGrupo', mergulho.gr || '—');
  setText('previewAutP1', formatTempo(mergulho.autonomiaPrincipal));
  setText('previewAutB1', formatTempo(mergulho.autonomiaBailout));
  setText('previewAutRem1', formatTempo(mergulho.autonomiaRemanescente));
  setText('previewSi1', hasSecond && mergulho.is !== null ? formatTempo(mergulho.is) : '—');
  setText('previewNgr1', hasSecond && mergulho.ngr ? mergulho.ngr : '—');
  renderAlerts('previewAlertas', alerts);
  setSituacao('situacaoOperacional', alerts.length === 0);
}

function renderRepetitivePreview(mergulho, hasNext){
  if(!mergulho){ resetPreview(2); return; }
  const n = mergulho.numero;
  const suffix = n === 2 ? '' : String(n);
  const alerts = [...mergulho.erros, ...mergulho.avisos];
  setText(`previewLnd${n}`, formatTempo(mergulho.lnd));
  setText(`previewNrHerdado${suffix}`, mergulho.nrAnterior === null ? '—' : formatTempo(mergulho.nrAnterior));
  setText(`previewTtf${n}`, mergulho.ttf === null ? '—' : formatTempo(mergulho.ttf));
  setText(`previewGrupo${n}`, mergulho.gr || '—');
  if(n < 4){
    setText(`previewSi${n}`, hasNext && mergulho.is !== null ? formatTempo(mergulho.is) : '—');
    setText(`previewNgr${n}`, hasNext && mergulho.ngr ? mergulho.ngr : '—');
  }
  const status = $(`previewStatus${n}`);
  if(status) status.innerHTML = statusText(nivelOperacional(mergulho));
  renderAlerts(`previewAlertas${n}`, alerts);
  setSituacao(`situacaoOperacional${n}`, alerts.length === 0);
}

function atualizarPreview(){
  atualizarSiManual();
  atualizarSiManual3();
  atualizarSiManual4();
  setVisible('repCampos', getUsarRep());
  setVisible('terCampos', getUsarTerceiro());
  setVisible('quaCampos', getUsarQuarto());

  const chain = computeChain();
  planejamentoAtualV19 = chain;
  const mapa = new Map(chain.mergulhos.map(m => [m.numero, m]));
  renderFirstPreview(mapa.get(1), getUsarRep());
  [2,3,4].forEach(n => {
    if(mapa.has(n)) renderRepetitivePreview(mapa.get(n), mapa.has(n + 1));
    else resetPreview(n);
  });
  const btn = $('btnCalcular');
  if(btn) btn.disabled = !chain.ok;
}

function resultIntervalText(mergulho){
  return mergulho && mergulho.is !== null ? formatTempo(mergulho.is) : '—';
}

function resultNgrText(mergulho){
  return mergulho && mergulho.ngr ? mergulho.ngr : '—';
}

function resultNrText(mergulho){
  return mergulho && mergulho.nr !== null ? formatTempo(mergulho.nr) : '—';
}

function resultPressureText(mergulho){
  return mergulho && Number.isFinite(mergulho.pressaoFinal) ? `${fmt(mergulho.pressaoFinal, 0)} bar` : '—';
}

function motivosOperacionais(chain){
  const mergulhos = chain.mergulhos || [];
  const motivos = [];
  const problemas = mergulhos.flatMap(m => [...m.erros.map(txt => ({tipo:'review', txt})), ...m.avisos.map(txt => ({tipo:nivelOperacional(m), txt}))]);
  if(problemas.length) return problemas;
  motivos.push({tipo:'ok', txt:'Dentro do LND'});
  motivos.push({tipo:'ok', txt:'Autonomia principal suficiente'});
  motivos.push({tipo:'ok', txt:'Reserva operacional preservada'});
  motivos.push({tipo:'ok', txt:'GR, NGR e NR calculados em cadeia'});
  return motivos;
}

function renderPainelDecisao(chain){
  const status = statusResumo(chain);
  const statusEl = $('statusOperacionalFinal');
  if(statusEl){
    statusEl.textContent = status === 'ok' ? 'PLANEJAMENTO OK' : (status === 'attention' ? 'ATENÇÃO OPERACIONAL' : 'REVISAR PLANEJAMENTO');
    statusEl.className = status === 'ok' ? 'good' : (status === 'attention' ? 'warn' : 'bad');
  }
  const lista = $('motivosOperacionais');
  if(lista){
    lista.innerHTML = motivosOperacionais(chain).map(item => `<div class="${item.tipo}">${item.tipo === 'ok' ? '✓' : '⚠'} ${item.txt}</div>`).join('');
  }
}

function renderResults(chain){
  const mapa = new Map(chain.mergulhos.map(m => [m.numero, m]));
  const d1 = mapa.get(1);
  setText('profCorr1', d1 ? fmt(ceil0(d1.profundidadeCorrigida), 0) : '—');
  setText('tempoFundo1', d1 ? formatTempo(d1.tf) : '—');
  setText('siUsado1', resultIntervalText(d1));
  setText('grupoAposSi1', resultNgrText(d1));
  setText('nrPrimeiro', resultNrText(d1));
  setText('pressaoFinal1', resultPressureText(d1));
  setText('obs1', d1 ? ([...d1.erros, ...d1.avisos].join(' ') || 'Pressao residual estimada pelo consumo planejado do cilindro principal.') : '');

  [
    { n:2, sec:'secRepResultado', prof:'profCorr2', tat:'tat2', si:'siUsado', ngr:'grupoAposSi', nr:'rnt', press:'pressaoFinal2', obs:'obs2' },
    { n:3, sec:'secRep3Resultado', prof:'profCorr3', tat:'tat3', si:'siUsado3', ngr:'grupoAposSi3', nr:'rnt3', press:'pressaoFinal3', obs:'obs3' },
    { n:4, sec:'secRep4Resultado', prof:'profCorr4', tat:'tat4', si:'siUsado4', ngr:'grupoAposSi4', nr:'rnt4', press:'pressaoFinal4', obs:'obs4' }
  ].forEach(cfg => {
    const d = mapa.get(cfg.n);
    setVisible(cfg.sec, !!d);
    if(!d) return;
    setText(cfg.prof, fmt(ceil0(d.profundidadeCorrigida), 0));
    setText(cfg.tat, d.ttf === null ? '—' : formatTempo(d.ttf));
    setText(cfg.si, resultIntervalText(d));
    setText(cfg.ngr, resultNgrText(d));
    setText(cfg.nr, resultNrText(d));
    setText(cfg.press, resultPressureText(d));
    setText(cfg.obs, [...d.erros, ...d.avisos].join(' ') || `TTF: ${formatTempo(d.ttf)}.`);
  });
  renderPainelDecisao(chain);
}

function montarRelatorio(chain){
  const linhas = ['DIVE PLANNER DOMAR/CBMPB - V19'];
  chain.mergulhos.forEach(m => {
    linhas.push('');
    linhas.push(`${m.numero}º MERGULHO`);
    linhas.push(`Profundidade corrigida: ${fmt(ceil0(m.profundidadeCorrigida), 0)} m`);
    linhas.push(m.numero === 1 ? `Tempo de fundo: ${formatTempo(m.tf)}` : `TTF: ${formatTempo(m.ttf)}`);
    linhas.push(`GR: ${m.gr}`);
    linhas.push(`IS: ${resultIntervalText(m)}`);
    linhas.push(`NGR: ${resultNgrText(m)}`);
    linhas.push(`NR: ${resultNrText(m)}`);
    linhas.push(`Pressao residual: ${resultPressureText(m)}`);
    if(m.erros.length || m.avisos.length) linhas.push(`Motivos: ${[...m.erros, ...m.avisos].join(' | ')}`);
  });
  linhas.push('');
  linhas.push(`STATUS OPERACIONAL: ${statusResumo(chain) === 'ok' ? 'PLANEJAMENTO OK' : (statusResumo(chain) === 'attention' ? 'ATENCAO OPERACIONAL' : 'REVISAR PLANEJAMENTO')}`);
  return linhas.join('\n');
}

function calcular(){
  const chain = computeChain();
  planejamentoAtualV19 = chain;
  atualizarPreview();
  if(!chain.ok) return;
  renderResults(chain);
  setText('relatorio', montarRelatorio(chain));
  setVisible('paginaEntrada', false);
  setVisible('paginaResultado', true);
  const entrada = $('paginaEntrada');
  const resultado = $('paginaResultado');
  if(entrada) entrada.classList.remove('active');
  if(resultado) resultado.classList.add('active');
  window.scrollTo && window.scrollTo({ top:0, behavior:'smooth' });
}

function copiarDadosMergulho(profOrigem, tempoOrigem, profDestino, tempoDestino){
  const prof = $('prof' + profOrigem);
  const tempo = $('tempo' + tempoOrigem);
  const profAlvo = $('prof' + profDestino);
  const tempoAlvo = $('tempo' + tempoDestino);
  if(prof && profAlvo) profAlvo.value = prof.value;
  if(tempo && tempoAlvo) tempoAlvo.value = tempo.value;
}

function prepararMergulhoSeguinte(numero){
  if(numero === 2 && $('usarRep') && $('usarRep').checked){
    copiarDadosMergulho(1, 1, 2, 2);
  }
  if(numero === 3 && $('usarTerceiro') && $('usarTerceiro').checked){
    copiarDadosMergulho(2, 2, 3, 3);
  }
  if(numero === 4 && $('usarQuarto') && $('usarQuarto').checked){
    copiarDadosMergulho(3, 3, 4, 4);
  }
}
function setup(){
  preencherMunicipios();
  atualizarSiManual();
  atualizarSiManual3();
  atualizarSiManual4();
  const ids = [
    'tcs','prof1','pressaoPrincipal','pressaoBailout','altitude','tempo1',
    'usarRep','modoSi','siManual','prof2','tempo2','cilindroNovo',
    'usarTerceiro','modoSi3','siManual3','prof3','tempo3','cilindroNovo3',
    'usarQuarto','modoSi4','siManual4','prof4','tempo4','cilindroNovo4'
  ];
  ids.forEach(id => {
    const el = $(id);
    if(!el) return;
    el.addEventListener('input', atualizarPreview);
    el.addEventListener('change', atualizarPreview);
  });
  if($('municipio')) $('municipio').addEventListener('change', atualizarAltitudePorMunicipio);
  if($('buscaMunicipio')) $('buscaMunicipio').addEventListener('input', e => { preencherMunicipios(e.target.value); if(!selecionarMunicipioPorNome(e.target.value)) atualizarPreview(); atualizarAltitudePorMunicipio(); });
  if($('btnCalcular')) $('btnCalcular').addEventListener('click', calcular);
  if($('btnVoltar')) $('btnVoltar').addEventListener('click', voltar);
  if($('copiar')) $('copiar').addEventListener('click', copiarRelatorio);
  setVisible('paginaResultado', false);
  atualizarPreview();
}

function copiarRelatorio(){
  const texto = ($('relatorio') || {}).textContent || '';
  if(navigator.clipboard && texto) navigator.clipboard.writeText(texto);
}

function copiarDadosMergulho(profOrigem, tempoOrigem, profDestino, tempoDestino){
  const prof = $('prof' + profOrigem);
  const tempo = $('tempo' + tempoOrigem);
  const profAlvo = $('prof' + profDestino);
  const tempoAlvo = $('tempo' + tempoDestino);
  if(prof && profAlvo) profAlvo.value = prof.value;
  if(tempo && tempoAlvo) tempoAlvo.value = tempo.value;
}

function prepararMergulhoSeguinte(numero){
  if(numero === 2 && $('usarRep') && $('usarRep').checked){
    copiarDadosMergulho(1, 1, 2, 2);
  }
  if(numero === 3 && $('usarTerceiro') && $('usarTerceiro').checked){
    copiarDadosMergulho(2, 2, 3, 3);
  }
  if(numero === 4 && $('usarQuarto') && $('usarQuarto').checked){
    copiarDadosMergulho(3, 3, 4, 4);
  }
}
function calcularRefutuacao(){
  const peso = num('refPeso');
  const profundidade = num('refProfundidade');
  const pressao = num('refPressao');
  const volume = num('refVolume');
  if(peso < 0 || profundidade < 0 || pressao <= 0 || volume <= 0){
    ['refLitrosNecessarios','refLitrosCilindro','refQuantidadeCilindros','refPressaoTotal','refAta'].forEach(id=>setText(id,'—'));
    return;
  }
  const ataAbsoluta = 1 + (profundidade / 10);
  const litrosNecessarios = peso * 0.75 * ataAbsoluta;
  const litrosPorCilindro = volume * pressao;
  const quantidadeCilindros = litrosNecessarios > 0 ? Math.ceil(litrosNecessarios / litrosPorCilindro) : 0;
  const pressaoTotal = litrosNecessarios / volume;
  setText('refLitrosNecessarios', fmt(litrosNecessarios, 0));
  setText('refLitrosCilindro', fmt(litrosPorCilindro, 0));
  setText('refQuantidadeCilindros', fmt(quantidadeCilindros, 0));
  setText('refPressaoTotal', fmt(pressaoTotal, 0));
  setText('refAta', fmt(ataAbsoluta, 2));
}

function abrirRefutuacao(){
  const entrada = $('paginaEntrada');
  const resultado = $('paginaResultado');
  const pagina = $('paginaRefutuacao');
  if(entrada){ entrada.classList.remove('active'); entrada.style.display='none'; }
  if(resultado){ resultado.classList.remove('active'); resultado.style.display='none'; }
  if(pagina){ pagina.classList.add('active'); pagina.style.display='block'; }
  calcularRefutuacao();
  window.scrollTo && window.scrollTo({top:0, behavior:'smooth'});
}

function voltarRefutuacao(){
  const pagina = $('paginaRefutuacao');
  const entrada = $('paginaEntrada');
  if(pagina){ pagina.classList.remove('active'); pagina.style.display='none'; }
  if(entrada){ entrada.classList.add('active'); entrada.style.display='block'; }
  window.scrollTo && window.scrollTo({top:0, behavior:'smooth'});
}
function setup(){
  if($('btnAbrirRefutuacao')) $('btnAbrirRefutuacao').addEventListener('click', abrirRefutuacao);
  if($('btnVoltarRefutuacao')) $('btnVoltarRefutuacao').addEventListener('click', voltarRefutuacao);
  ['refPeso','refProfundidade','refPressao','refVolume'].forEach(id=>{ if($(id)) $(id).addEventListener('input', calcularRefutuacao); });
  preencherMunicipios();
  atualizarSiManual();
  atualizarSiManual3();
  atualizarSiManual4();

  const ids = [
    'tcs','prof1','pressaoPrincipal','pressaoBailout','altitude','tempo1',
    'usarRep','modoSi','siManual','prof2','tempo2','cilindroNovo',
    'usarTerceiro','modoSi3','siManual3','prof3','tempo3','cilindroNovo3',
    'usarQuarto','modoSi4','siManual4','prof4','tempo4','cilindroNovo4'
  ];
  ids.forEach(id => {
    const el = $(id);
    if(!el) return;
    el.addEventListener('input', atualizarPreview);
    el.addEventListener('change', atualizarPreview);
  });
  if($('municipio')) $('municipio').addEventListener('change', atualizarAltitudePorMunicipio);
  if($('buscaMunicipio')) $('buscaMunicipio').addEventListener('input', e => { preencherMunicipios(e.target.value); if(!selecionarMunicipioPorNome(e.target.value)) atualizarPreview(); atualizarAltitudePorMunicipio(); });
  if($('btnCalcular')) $('btnCalcular').addEventListener('click', calcular);
  if($('btnVoltar')) $('btnVoltar').addEventListener('click', voltar);
  if($('copiar')) $('copiar').addEventListener('click', copiarRelatorio);
  if($('usarRep')) $('usarRep').addEventListener('change', () => { prepararMergulhoSeguinte(2); atualizarPreview(); });
  if($('usarTerceiro')) $('usarTerceiro').addEventListener('change', () => { prepararMergulhoSeguinte(3); atualizarPreview(); });
  if($('usarQuarto')) $('usarQuarto').addEventListener('change', () => { prepararMergulhoSeguinte(4); atualizarPreview(); });

  setVisible('paginaResultado', false);
  atualizarPreview();
}




