// Nomes e cobertura: IBGE, lista atual de municípios da Paraíba. Altitudes: tabela institucional Embrapa/PB; valores sem publicação na fonte ficam null.
// null indica altitude da sede não cadastrada, não altitude zero.
const MUNICIPIOS_PB = [
  {
    "cidade": "Água Branca",
    "altitude": 747.0
  },
  {
    "cidade": "Aguiar",
    "altitude": 272.0
  },
  {
    "cidade": "Alagoa Grande",
    "altitude": 143.0
  },
  {
    "cidade": "Alagoa Nova",
    "altitude": 530.0
  },
  {
    "cidade": "Alagoinha",
    "altitude": 142.0
  },
  {
    "cidade": "Alcantil",
    "altitude": 519.0
  },
  {
    "cidade": "Algodão de Jandaíra",
    "altitude": 470.0
  },
  {
    "cidade": "Alhandra",
    "altitude": 57.0
  },
  {
    "cidade": "Amparo",
    "altitude": 635.0
  },
  {
    "cidade": "Aparecida",
    "altitude": 215.0
  },
  {
    "cidade": "Araçagi",
    "altitude": 57.0
  },
  {
    "cidade": "Arara",
    "altitude": 467.0
  },
  {
    "cidade": "Araruna",
    "altitude": 570.0
  },
  {
    "cidade": "Areia",
    "altitude": 618.0
  },
  {
    "cidade": "Areia de Baraúnas",
    "altitude": 371.0
  },
  {
    "cidade": "Areial",
    "altitude": 695.0
  },
  {
    "cidade": "Aroeiras",
    "altitude": 363.0
  },
  {
    "cidade": "Assunção",
    "altitude": 573.0
  },
  {
    "cidade": "Baía da Traição",
    "altitude": 8.0
  },
  {
    "cidade": "Bananeiras",
    "altitude": 540.0
  },
  {
    "cidade": "Baraúna",
    "altitude": 626.0
  },
  {
    "cidade": "Barra de Santa Rosa",
    "altitude": 457.0
  },
  {
    "cidade": "Barra de Santana",
    "altitude": 350.0
  },
  {
    "cidade": "Barra de São Miguel",
    "altitude": 489.0
  },
  {
    "cidade": "Bayeux",
    "altitude": 11.0
  },
  {
    "cidade": "Belém",
    "altitude": 152.0
  },
  {
    "cidade": "Belém do Brejo do Cruz",
    "altitude": 180.0
  },
  {
    "cidade": "Bernardino Batista",
    "altitude": 700.0
  },
  {
    "cidade": "Boa Ventura",
    "altitude": 311.0
  },
  {
    "cidade": "Boa Vista",
    "altitude": 493.0
  },
  {
    "cidade": "Bom Jesus",
    "altitude": 321.0
  },
  {
    "cidade": "Bom Sucesso",
    "altitude": 312.0
  },
  {
    "cidade": "Bonito de Santa Fé",
    "altitude": 593.0
  },
  {
    "cidade": "Boqueirão",
    "altitude": 361.0
  },
  {
    "cidade": "Borborema",
    "altitude": 368.0
  },
  {
    "cidade": "Brejo do Cruz",
    "altitude": 200.0
  },
  {
    "cidade": "Brejo dos Santos",
    "altitude": 329.0
  },
  {
    "cidade": "Caaporã",
    "altitude": 69.0
  },
  {
    "cidade": "Cabaceiras",
    "altitude": 389.0
  },
  {
    "cidade": "Cabedelo",
    "altitude": 5.0
  },
  {
    "cidade": "Cachoeira dos Índios",
    "altitude": 330.0
  },
  {
    "cidade": "Cacimba de Areia",
    "altitude": 272.0
  },
  {
    "cidade": "Cacimba de Dentro",
    "altitude": 536.0
  },
  {
    "cidade": "Cacimbas",
    "altitude": 645.0
  },
  {
    "cidade": "Caiçara",
    "altitude": 150.0
  },
  {
    "cidade": "Cajazeiras",
    "altitude": 306.0
  },
  {
    "cidade": "Cajazeirinhas",
    "altitude": 261.0
  },
  {
    "cidade": "Caldas Brandão",
    "altitude": 83.0
  },
  {
    "cidade": "Camalaú",
    "altitude": 554.0
  },
  {
    "cidade": "Campina Grande",
    "altitude": 551.0
  },
  {
    "cidade": "Capim",
    "altitude": 101.0
  },
  {
    "cidade": "Caraúbas",
    "altitude": 452.0
  },
  {
    "cidade": "Carrapateira",
    "altitude": 372.0
  },
  {
    "cidade": "Casserengue",
    "altitude": 506.0
  },
  {
    "cidade": "Catingueira",
    "altitude": 287.0
  },
  {
    "cidade": "Catolé do Rocha",
    "altitude": 302.0
  },
  {
    "cidade": "Caturité",
    "altitude": 413.0
  },
  {
    "cidade": "Conceição",
    "altitude": 383.0
  },
  {
    "cidade": "Condado",
    "altitude": 253.0
  },
  {
    "cidade": "Conde",
    "altitude": 122.0
  },
  {
    "cidade": "Congo",
    "altitude": 480.0
  },
  {
    "cidade": "Coremas",
    "altitude": 218.0
  },
  {
    "cidade": "Coxixola",
    "altitude": 475.0
  },
  {
    "cidade": "Cruz do Espírito Santo",
    "altitude": 19.0
  },
  {
    "cidade": "Cubati",
    "altitude": 558.0
  },
  {
    "cidade": "Cuité",
    "altitude": 665.0
  },
  {
    "cidade": "Cuité de Mamanguape",
    "altitude": 76.0
  },
  {
    "cidade": "Cuitegi",
    "altitude": 94.0
  },
  {
    "cidade": "Curral de Cima",
    "altitude": 75.0
  },
  {
    "cidade": "Curral Velho",
    "altitude": 349.0
  },
  {
    "cidade": "Damião",
    "altitude": 602.0
  },
  {
    "cidade": "Desterro",
    "altitude": 606.0
  },
  {
    "cidade": "Diamante",
    "altitude": 315.0
  },
  {
    "cidade": "Dona Inês",
    "altitude": 440.0
  },
  {
    "cidade": "Duas Estradas",
    "altitude": 145.0
  },
  {
    "cidade": "Emas",
    "altitude": 271.0
  },
  {
    "cidade": "Esperança",
    "altitude": 633.0
  },
  {
    "cidade": "Fagundes",
    "altitude": 505.0
  },
  {
    "cidade": "Frei Martinho",
    "altitude": 376.0
  },
  {
    "cidade": "Gado Bravo",
    "altitude": 400.0
  },
  {
    "cidade": "Guarabira",
    "altitude": 98.0
  },
  {
    "cidade": "Gurinhém",
    "altitude": 104.0
  },
  {
    "cidade": "Gurjão",
    "altitude": 491.0
  },
  {
    "cidade": "Ibiara",
    "altitude": 345.0
  },
  {
    "cidade": "Igaracy",
    "altitude": 313.0
  },
  {
    "cidade": "Imaculada",
    "altitude": 763.0
  },
  {
    "cidade": "Ingá",
    "altitude": 143.0
  },
  {
    "cidade": "Itabaiana",
    "altitude": 46.0
  },
  {
    "cidade": "Itaporanga",
    "altitude": 297.0
  },
  {
    "cidade": "Itapororoca",
    "altitude": 83.0
  },
  {
    "cidade": "Itatuba",
    "altitude": 117.0
  },
  {
    "cidade": "Jacaraú",
    "altitude": 172.0
  },
  {
    "cidade": "Jericó",
    "altitude": 233.0
  },
  {
    "cidade": "João Pessoa",
    "altitude": 48.0
  },
  {
    "cidade": "Joca Claudino",
    "altitude": 345
  },
  {
    "cidade": "Juarez Távora",
    "altitude": 150.0
  },
  {
    "cidade": "Juazeirinho",
    "altitude": 554.0
  },
  {
    "cidade": "Junco do Seridó",
    "altitude": 590.0
  },
  {
    "cidade": "Juripiranga",
    "altitude": 122.0
  },
  {
    "cidade": "Juru",
    "altitude": 588.0
  },
  {
    "cidade": "Lagoa",
    "altitude": 281.0
  },
  {
    "cidade": "Lagoa de Dentro",
    "altitude": 154.0
  },
  {
    "cidade": "Lagoa Seca",
    "altitude": 635.0
  },
  {
    "cidade": "Lastro",
    "altitude": 337.0
  },
  {
    "cidade": "Livramento",
    "altitude": 589.0
  },
  {
    "cidade": "Logradouro",
    "altitude": 140.0
  },
  {
    "cidade": "Lucena",
    "altitude": 5.0
  },
  {
    "cidade": "Mãe d'Água",
    "altitude": 418.0
  },
  {
    "cidade": "Malta",
    "altitude": 257.0
  },
  {
    "cidade": "Mamanguape",
    "altitude": 35.0
  },
  {
    "cidade": "Manaíra",
    "altitude": 757.0
  },
  {
    "cidade": "Marcação",
    "altitude": 93.0
  },
  {
    "cidade": "Mari",
    "altitude": 148.0
  },
  {
    "cidade": "Marizópolis",
    "altitude": 306.0
  },
  {
    "cidade": "Massaranduba",
    "altitude": 541.0
  },
  {
    "cidade": "Mataraca",
    "altitude": 30.0
  },
  {
    "cidade": "Matinhas",
    "altitude": 483.0
  },
  {
    "cidade": "Mato Grosso",
    "altitude": 225.0
  },
  {
    "cidade": "Maturéia",
    "altitude": 816.0
  },
  {
    "cidade": "Mogeiro",
    "altitude": 117.0
  },
  {
    "cidade": "Montadas",
    "altitude": 713.0
  },
  {
    "cidade": "Monte Horebe",
    "altitude": 718.0
  },
  {
    "cidade": "Monteiro",
    "altitude": 605.0
  },
  {
    "cidade": "Mulungu",
    "altitude": 99.0
  },
  {
    "cidade": "Natuba",
    "altitude": 340.0
  },
  {
    "cidade": "Nazarezinho",
    "altitude": 288.0
  },
  {
    "cidade": "Nova Floresta",
    "altitude": 670.0
  },
  {
    "cidade": "Nova Olinda",
    "altitude": 319.0
  },
  {
    "cidade": "Nova Palmeira",
    "altitude": 560.0
  },
  {
    "cidade": "Olho d'Água",
    "altitude": 268.0
  },
  {
    "cidade": "Olivedos",
    "altitude": 559.0
  },
  {
    "cidade": "Ouro Velho",
    "altitude": 599.0
  },
  {
    "cidade": "Parari",
    "altitude": 495.0
  },
  {
    "cidade": "Passagem",
    "altitude": 308.0
  },
  {
    "cidade": "Patos",
    "altitude": 244.0
  },
  {
    "cidade": "Paulista",
    "altitude": 160.0
  },
  {
    "cidade": "Pedra Branca",
    "altitude": 302.0
  },
  {
    "cidade": "Pedra Lavrada",
    "altitude": 516.0
  },
  {
    "cidade": "Pedras de Fogo",
    "altitude": 177.0
  },
  {
    "cidade": "Pedro Régis",
    "altitude": 162.0
  },
  {
    "cidade": "Piancó",
    "altitude": 269.0
  },
  {
    "cidade": "Picuí",
    "altitude": 443.0
  },
  {
    "cidade": "Pilar",
    "altitude": 59.0
  },
  {
    "cidade": "Pilões",
    "altitude": 334.0
  },
  {
    "cidade": "Pilõezinhos",
    "altitude": 144.0
  },
  {
    "cidade": "Pirpirituba",
    "altitude": 104.0
  },
  {
    "cidade": "Pitimbu",
    "altitude": 9.0
  },
  {
    "cidade": "Pocinhos",
    "altitude": 657.0
  },
  {
    "cidade": "Poço Dantas",
    "altitude": 470.0
  },
  {
    "cidade": "Poço de José de Moura",
    "altitude": 287.0
  },
  {
    "cidade": "Pombal",
    "altitude": 192.0
  },
  {
    "cidade": "Prata",
    "altitude": 588.0
  },
  {
    "cidade": "Princesa Isabel",
    "altitude": 685.0
  },
  {
    "cidade": "Puxinanã",
    "altitude": 657.0
  },
  {
    "cidade": "Queimadas",
    "altitude": 464.0
  },
  {
    "cidade": "Quixaba",
    "altitude": 296.0
  },
  {
    "cidade": "Remígio",
    "altitude": 593.0
  },
  {
    "cidade": "Riachão",
    "altitude": 386.0
  },
  {
    "cidade": "Riachão do Bacamarte",
    "altitude": 199.0
  },
  {
    "cidade": "Riachão do Poço",
    "altitude": 82.0
  },
  {
    "cidade": "Riacho de Santo Antônio",
    "altitude": 440.0
  },
  {
    "cidade": "Riacho dos Cavalos",
    "altitude": 203.0
  },
  {
    "cidade": "Rio Tinto",
    "altitude": 12.0
  },
  {
    "cidade": "Salgadinho",
    "altitude": 427.0
  },
  {
    "cidade": "Salgado de São Félix",
    "altitude": 58.0
  },
  {
    "cidade": "Santa Cecília",
    "altitude": 508.0
  },
  {
    "cidade": "Santa Cruz",
    "altitude": 323.0
  },
  {
    "cidade": "Santa Helena",
    "altitude": 292.0
  },
  {
    "cidade": "Santa Inês",
    "altitude": 420.0
  },
  {
    "cidade": "Santa Luzia",
    "altitude": 308.0
  },
  {
    "cidade": "Santa Rita",
    "altitude": 68.0
  },
  {
    "cidade": "Santa Teresinha",
    "altitude": 306.0
  },
  {
    "cidade": "Santana de Mangueira",
    "altitude": 381.0
  },
  {
    "cidade": "Santana dos Garrotes",
    "altitude": 322.0
  },
  {
    "cidade": "Santo André",
    "altitude": 523.0
  },
  {
    "cidade": "São Bentinho",
    "altitude": 259.0
  },
  {
    "cidade": "São Bento",
    "altitude": 151.0
  },
  {
    "cidade": "São Domingos",
    "altitude": 194.0
  },
  {
    "cidade": "São Domingos do Cariri",
    "altitude": 409.0
  },
  {
    "cidade": "São Francisco",
    "altitude": 285.0
  },
  {
    "cidade": "São João do Cariri",
    "altitude": 458.0
  },
  {
    "cidade": "São João do Rio do Peixe",
    "altitude": 245.0
  },
  {
    "cidade": "São João do Tigre",
    "altitude": 577.0
  },
  {
    "cidade": "São José da Lagoa Tapada",
    "altitude": 266.0
  },
  {
    "cidade": "São José de Caiana",
    "altitude": 610.0
  },
  {
    "cidade": "São José de Espinharas",
    "altitude": 210.0
  },
  {
    "cidade": "São José de Piranhas",
    "altitude": 342.0
  },
  {
    "cidade": "São José de Princesa",
    "altitude": 726.0
  },
  {
    "cidade": "São José do Bonfim",
    "altitude": 282.0
  },
  {
    "cidade": "São José do Brejo do Cruz",
    "altitude": 155.0
  },
  {
    "cidade": "São José do Sabugi",
    "altitude": 342.0
  },
  {
    "cidade": "São José dos Cordeiros",
    "altitude": 528.0
  },
  {
    "cidade": "São José dos Ramos",
    "altitude": 140.0
  },
  {
    "cidade": "São Mamede",
    "altitude": 275.0
  },
  {
    "cidade": "São Miguel de Taipu",
    "altitude": 45.0
  },
  {
    "cidade": "São Sebastião de Lagoa de Roça",
    "altitude": 641.0
  },
  {
    "cidade": "São Sebastião do Umbuzeiro",
    "altitude": 597.0
  },
  {
    "cidade": "São Vicente do Seridó",
    "altitude": 631.0
  },
  {
    "cidade": "Sapé",
    "altitude": 123.0
  },
  {
    "cidade": "Serra Branca",
    "altitude": 493.0
  },
  {
    "cidade": "Serra da Raiz",
    "altitude": 331.0
  },
  {
    "cidade": "Serra Grande",
    "altitude": 614.0
  },
  {
    "cidade": "Serra Redonda",
    "altitude": 391.0
  },
  {
    "cidade": "Serraria",
    "altitude": 538.0
  },
  {
    "cidade": "Sertãozinho",
    "altitude": 135.0
  },
  {
    "cidade": "Sobrado",
    "altitude": 82.0
  },
  {
    "cidade": "Solânea",
    "altitude": 626.0
  },
  {
    "cidade": "Soledade",
    "altitude": 524.0
  },
  {
    "cidade": "Sossêgo",
    "altitude": 587.0
  },
  {
    "cidade": "Sousa",
    "altitude": 227.0
  },
  {
    "cidade": "Sumé",
    "altitude": 532.0
  },
  {
    "cidade": "Tacima",
    "altitude": 174.0
  },
  {
    "cidade": "Taperoá",
    "altitude": 532.0
  },
  {
    "cidade": "Tavares",
    "altitude": 724.0
  },
  {
    "cidade": "Teixeira",
    "altitude": 787.0
  },
  {
    "cidade": "Tenório",
    "altitude": 610.0
  },
  {
    "cidade": "Triunfo",
    "altitude": 310.0
  },
  {
    "cidade": "Uiraúna",
    "altitude": 301.0
  },
  {
    "cidade": "Umbuzeiro",
    "altitude": 545.0
  },
  {
    "cidade": "Várzea",
    "altitude": 265.0
  },
  {
    "cidade": "Vieirópolis",
    "altitude": 414.0
  },
  {
    "cidade": "Vista Serrana",
    "altitude": 250.0
  },
  {
    "cidade": "Zabelê",
    "altitude": 646.0
  }
];


