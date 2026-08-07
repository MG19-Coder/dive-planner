const fs = require('fs');
const path = require('path');
const vm = require('vm');
const assert = require('assert');

const root = path.resolve(__dirname, '..');
const municipios = fs.readFileSync(path.join(root, 'municipios_pb.js'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

function createElement(props = {}) {
  return {
    value: '',
    checked: false,
    textContent: '',
    innerHTML: '',
    className: '',
    style: {},
    classList: { toggle(){}, remove(){}, add(){} },
    closest(){ return { style: {} }; },
    addEventListener(){},
    ...props
  };
}

function createContext(overrides = {}) {
  const elements = new Map();
  const defaults = {
    tcs: { value: '30' },
    prof1: { value: '10' },
    pressaoPrincipal: { value: '200' },
    pressaoBailout: { value: '200' },
    altitude: { value: '0' },
    tempo1: { value: '20' },
    usarRep: { checked: false },
    modoSi: { value: 'minimo' },
    siManual: { value: '0' },
    prof2: { value: '10' },
    tempo2: { value: '10' },
    cilindroNovo: { checked: true },
    usarTerceiro: { checked: false },
    modoSi3: { value: 'minimo' },
    siManual3: { value: '0' },
    prof3: { value: '10' },
    tempo3: { value: '10' },
    cilindroNovo3: { checked: true },
    usarQuarto: { checked: false },
    modoSi4: { value: 'minimo' },
    siManual4: { value: '0' },
    prof4: { value: '10' },
    tempo4: { value: '10' },
    cilindroNovo4: { checked: true },
    paginaEntrada: {},
    paginaResultado: {},
    btnCalcular: {}
  };

  for (const [id, props] of Object.entries({ ...defaults, ...overrides })) {
    elements.set(id, createElement(props));
  }

  const document = {
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, createElement());
      return elements.get(id);
    },
    querySelectorAll() { return []; },
    addEventListener() {}
  };

  const context = {
    console,
    document,
    window: { scrollTo() {} },
    navigator: { clipboard: { writeText() {} } },
    Number,
    Math,
    Infinity,
    Map,
    Set,
    Object,
    String,
    parseFloat,
    setTimeout,
    clearTimeout
  };

  vm.createContext(context);
  vm.runInContext(municipios, context, { filename: 'municipios_pb.js' });
  vm.runInContext(app, context, { filename: 'app.js' });
  return { context, elements };
}

function testNextDiveStartsWithPreviousProfile() {
  const { context, elements } = createContext({
    prof1: { value: '40' },
    tempo1: { value: '10' },
    prof2: { value: '5' },
    tempo2: { value: '25' },
    usarRep: { checked: true }
  });
  context.prepararMergulhoSeguinte(2);
  assert.strictEqual(elements.get('prof2').value, '40');
  assert.strictEqual(elements.get('tempo2').value, '10');
}
function testCanonicalMunicipalityDataset() {
  const { context } = createContext();
  const dadosMunicipios = vm.runInContext('MUNICIPIOS_PB', context);
  assert.strictEqual(dadosMunicipios.length, 223, 'a base deve conter os 223 municípios atuais da Paraíba');
  const altitude = nome => {
    const item = dadosMunicipios.find(m => m.cidade === nome);
    assert(item, 'município ausente: ' + nome);
    return item.altitude;
  };
  assert.strictEqual(altitude('Araçagi'), 57);
  assert.strictEqual(altitude('Gurjão'), 491);
  assert.strictEqual(altitude('Mãe d\'Água'), 414);
  assert.strictEqual(altitude('São Miguel de Taipu'), 45);
  assert.strictEqual(altitude('Joca Claudino'), 345);
  assert.strictEqual(altitude('São Vicente do Seridó'), null);
  assert(!dadosMunicipios.some(m => m.cidade === 'São Bento de Pombal'), 'nome que não é município atual não deve permanecer');
}
function testRefutuacaoCalculation() {
  const { context, elements } = createContext({
    refPeso: { value: '3000' },
    refProfundidade: { value: '10' },
    refPressao: { value: '200' },
    refVolume: { value: '11.2' }
  });
  context.calcularRefutuacao();
  assert.strictEqual(elements.get('refLitrosNecessarios').textContent, '4500');
  assert.strictEqual(elements.get('refLitrosCilindro').textContent, '2240');
  assert.strictEqual(elements.get('refQuantidadeCilindros').textContent, '3');
  assert.strictEqual(elements.get('refPressaoTotal').textContent, '402');
  assert.strictEqual(elements.get('refAta').textContent, '2.00');
}
function testCoreCalculations() {
  const { context } = createContext();
  const linha = context.linhaTabela(context.profundidadeCorrigida(10, 0));
  assert.strictEqual(linha.m, 10);
  assert.strictEqual(context.lndDaLinha(linha), 232);
  assert.strictEqual(context.grupoPorTempo(linha, 14), 'A');
  assert.strictEqual(context.autonomiaPrincipal(30, 10, 200), 28);
  assert.strictEqual(context.pressaoFinal(11.2, 200, 30, 10, 10), 146);
  assert.strictEqual(context.formatTempo(61), '1 h 1 min');
  assert.strictEqual(context.formatTempo(125), '2 h 5 min');
}

function testFirstPreviewErrorsAreIndependent() {
  const { context } = createContext({
    usarRep: { checked: true },
    tempo1: { value: '10' },
    prof2: { value: '42' },
    tempo2: { value: '999' }
  });
  const errors = context.errosPlanejamentoPreview();
  assert(!errors.some(msg => /2Âº|segundo|proximo|prÃ³ximo|repetitivo/i.test(msg)), 'preview do 1Âº nÃ£o deve receber alertas do 2Âº');
}

function testNitrogenComesFromSameDiveDepth() {
  const { context } = createContext({
    usarRep: { checked: true },
    tempo1: { value: '5' },
    prof1: { value: '10' },
    prof2: { value: '30' },
    tempo2: { value: '5' }
  });
  const chain = context.computeChain();
  const d1 = chain.dives[0];
  const d2 = chain.dives[1];
  assert.strictEqual(d1.nrAfterInterval, context.rntPorGrupoProf(d1.ngrAfterInterval, d1.line), 'NR1 deve usar NGR + profundidade do 1Âº mergulho');
  assert.strictEqual(d2.prevNr, d1.nrAfterInterval, '2Âº mergulho deve receber NR1');
}

function testRepetitiveGroupUsesTotalBottomTime() {
  const { context } = createContext({
    usarRep: { checked: true },
    tempo1: { value: '5' },
    prof1: { value: '10' },
    prof2: { value: '18' },
    tempo2: { value: '15' }
  });
  const chain = context.computeChain();
  const d2 = chain.dives[1];
  assert.strictEqual(d2.ttf, d2.prevNr + d2.tempo, 'TTF2 deve ser NR anterior + TF atual');
  assert.strictEqual(d2.gr, context.grupoPorTempo(d2.line, d2.ttf), 'GR repetitivo deve usar profundidade corrigida + TTF');
}

function testBailoutDoesNotBlockPlanning() {
  const { context } = createContext({
    pressaoBailout: { value: '1' },
    tempo1: { value: '20' },
    prof1: { value: '10' },
    usarRep: { checked: true },
    tempo2: { value: '10' }
  });
  const chain = context.computeChain();
  assert(chain.ok, 'Bail Out baixo nÃ£o deve bloquear planejamento vÃ¡lido pelo cilindro principal');
  assert(!chain.dives.some(d => d.errors.some(msg => /bail|out/i.test(msg))), 'Bail Out nÃ£o deve gerar alerta ou erro');
}

function testResidualPressureDoesNotDuplicateReserveValidation() {
  const { context } = createContext({
    pressaoPrincipal: { value: '100' },
    tempo1: { value: '9' },
    prof1: { value: '10' }
  });
  const chain = context.computeChain();
  assert(chain.ok, 'tempo dentro da autonomia principal nÃ£o deve ser bloqueado por validaÃ§Ã£o duplicada de reserva');
  assert(!chain.dives[0].errors.some(msg => /reserva operacional|50 bar/i.test(msg)), 'nÃ£o deve existir alerta duplicado de reserva operacional');
}

function testTtfAppearsInRepetitivePreview() {
  const { context, elements } = createContext({
    usarRep: { checked: true },
    tempo1: { value: '5' },
    tempo2: { value: '10' }
  });
  context.atualizarPreview();
  const text = elements.get('previewTtf2').textContent;
  assert(/min|h/.test(text), 'preview do 2Âº deve exibir o valor final do TTF');
  assert(!/NR anterior|=|\+/.test(text), 'preview do 2Âº nÃ£o deve exibir a formula detalhada do TTF');
}

function testResidualPressureResultIncludesBar() {
  const { context, elements } = createContext({ tempo1: { value: '5' } });
  const chain = context.computeChain();
  context.renderResults(chain);
  assert(/\d+ bar/.test(elements.get('pressaoFinal1').textContent), 'pressÃ£o residual deve aparecer como valor Ãºnico com bar');
}

function testReservePressureCreatesOperationalWarningOnly() {
  const { context, elements } = createContext({
    pressaoPrincipal: { value: '100' },
    tempo1: { value: '10' },
    prof1: { value: '10' }
  });
  const chain = context.computeChain();
  assert(chain.ok, 'entrada na reserva deve permitir simulacao e resultado');
  assert.strictEqual(chain.dives[0].errors.length, 0);
  assert(chain.dives[0].warnings.some(msg => /reserva operacional de 50 bar|autonomia dispon/i.test(msg)), 'deve informar consequencia operacional da reserva');
  context.atualizarPreview();
  assert.strictEqual(elements.get('btnCalcular').disabled, false, 'alerta operacional de pressao nao deve bloquear DIVE');
  assert(!elements.get('previewAlertas').innerHTML.includes('Verifique press'), 'nao deve exibir mensagem generica de preenchimento');
}

function testNegativePressureCreatesRechargeWarningOnly() {
  const { context } = createContext({
    pressaoPrincipal: { value: '60' },
    tempo1: { value: '20' },
    prof1: { value: '10' }
  });
  const chain = context.computeChain();
  assert(chain.ok, 'pressao final negativa deve permitir simulacao operacional');
  assert.strictEqual(chain.dives[0].errors.length, 0);
  assert(chain.dives[0].warnings.some(msg => /excede a capacidade do cilindro principal|troca ou recarga/i.test(msg)), 'deve recomendar troca ou recarga');
  assert(chain.dives[0].warnings.some(msg => /-\d+ bar/.test(msg)), 'deve mostrar pressao final estimada negativa');
}

function testManualIntervalValidationUsesNextDiveLimit() {
  const { context } = createContext({
    usarRep: { checked: true },
    modoSi: { value: 'manual' },
    siManual: { value: '0' },
    tempo1: { value: '5' },
    prof1: { value: '10' },
    prof2: { value: '42' },
    tempo2: { value: '10' }
  });
  const chain = context.computeChain();
  assert(chain.dives[1].errors.some(msg => /TTF acima do LND|ACIMA LND|ajuste o IS/i.test(msg)), 'IS manual deve considerar o LND do prÃ³ximo mergulho');
}

function testFourDiveChain() {
  const { context } = createContext({
    usarRep: { checked: true },
    usarTerceiro: { checked: true },
    usarQuarto: { checked: true },
    tempo1: { value: '5' },
    tempo2: { value: '10' },
    tempo3: { value: '10' },
    tempo4: { value: '10' }
  });
  const chain = context.computeChain();
  assert(Array.isArray(chain.mergulhos), 'V19 deve expor estrutura generica mergulhos[]');
  assert.strictEqual(chain.dives.length, 4);
  assert.strictEqual(chain.dives[2].ttf, chain.dives[1].nrAfterInterval + chain.dives[2].tempo);
  assert.strictEqual(chain.dives[3].ttf, chain.dives[2].nrAfterInterval + chain.dives[3].tempo);
}

function testDecisionPanelRendersMotives() {
  const { context, elements } = createContext({ tempo1: { value: '5' } });
  const chain = context.computeChain();
  context.renderResults(chain);
  assert(/PLANEJAMENTO OK|ATEN/i.test(elements.get('statusOperacionalFinal').textContent), 'painel de decisao deve exibir status operacional');
  assert(elements.get('motivosOperacionais').innerHTML.length > 0, 'painel de decisao deve exibir motivos');
}

function testEmptyAlertCardsAreHidden() {
  const { context, elements } = createContext({ tempo1: { value: '5' } });
  context.atualizarPreview();
  assert.strictEqual(elements.get('previewAlertas').style.display, 'none', 'card de avisos vazio deve ficar oculto');
}

function testAlertCardsShowWhenMessagesExist() {
  const { context, elements } = createContext({
    pressaoPrincipal: { value: '100' },
    tempo1: { value: '10' },
    prof1: { value: '10' }
  });
  context.atualizarPreview();
  assert.strictEqual(elements.get('previewAlertas').style.display, 'grid', 'card de avisos deve aparecer quando houver mensagens');
  assert(elements.get('previewAlertas').innerHTML.length > 0, 'card de avisos deve conter mensagens');
}

function testExactSurfaceIntervalForFortyMeterRepetitiveDive() {
  const { context } = createContext({
    prof1: { value: '40' },
    tempo1: { value: '10' },
    usarRep: { checked: true },
    prof2: { value: '40' },
    tempo2: { value: '6' }
  });
  const chain = context.computeChain();
  assert.strictEqual(chain.dives[0].is, 236, '40 m/10 min seguido de 40 m/6 min deve exigir 236 min de IS');
}

function testCompleteSurfaceIntervalCorrelation() {
  const { context } = createContext();
  assert.strictEqual(context.grupoAposIntervalo('B', 77), 'A');
  assert.strictEqual(context.grupoAposIntervalo('C', 132), 'A');
  assert.strictEqual(context.grupoAposIntervalo('E', 235), 'B');
  assert.strictEqual(context.grupoAposIntervalo('E', 236), 'A');
  assert.strictEqual(context.grupoAposIntervalo('Z', 950), 'A');
}
testNextDiveStartsWithPreviousProfile();
testCanonicalMunicipalityDataset();
testRefutuacaoCalculation();
testCoreCalculations();
testFirstPreviewErrorsAreIndependent();
testNitrogenComesFromSameDiveDepth();
testRepetitiveGroupUsesTotalBottomTime();
testBailoutDoesNotBlockPlanning();
testResidualPressureDoesNotDuplicateReserveValidation();
testTtfAppearsInRepetitivePreview();
testResidualPressureResultIncludesBar();
testReservePressureCreatesOperationalWarningOnly();
testNegativePressureCreatesRechargeWarningOnly();


testManualIntervalValidationUsesNextDiveLimit();
testExactSurfaceIntervalForFortyMeterRepetitiveDive();
testCompleteSurfaceIntervalCorrelation();
testFourDiveChain();
testDecisionPanelRendersMotives();
testEmptyAlertCardsAreHidden();
testAlertCardsShowWhenMessagesExist();

console.log('OK: testes do Dive Planner V19 concluÃ­dos.');






