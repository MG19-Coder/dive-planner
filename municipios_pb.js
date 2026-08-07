// Nomes e cobertura: IBGE, lista atual de municípios da Paraíba. Altitudes: tabela institucional Embrapa/PB; valores sem publicação na fonte ficam null.
// null indica altitude da sede não cadastrada, não altitude zero.
const MUNICIPIOS_PB = [
  {
    "cidade": "Água Branca",
    "altitude": 735.0
  },
  {
    "cidade": "Aguiar",
    "altitude": 262.0
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
    "altitude": 133.0
  },
  {
    "cidade": "Alcantil",
    "altitude": 500.0
  },
  {
    "cidade": "Algodão de Jandaíra",
    "altitude": 470.0
  },
  {
    "cidade": "Alhandra",
    "altitude": 49.0
  },
  {
    "cidade": "Amparo",
    "altitude": 635.0
  },
  {
    "cidade": "Aparecida",
    "altitude": 214.0
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
    "altitude": 2.0
  },
  {
    "cidade": "Bananeiras",
    "altitude": 520.0
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
    "altitude": 486.0
  },
  {
    "cidade": "Bayeux",
    "altitude": 11.0
  },
  {
    "cidade": "Belém",
    "altitude": 149.0
  },
  {
    "cidade": "Belém do Brejo do Cruz",
    "altitude": 176.0
  },
  {
    "cidade": "Bernardino Batista",
    "altitude": 700.0
  },
  {
    "cidade": "Boa Ventura",
    "altitude": 303.0
  },
  {
    "cidade": "Boa Vista",
    "altitude": 493.0
  },
  {
    "cidade": "Bom Jesus",
    "altitude": 318.0
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
    "altitude": 355.0
  },
  {
    "cidade": "Borborema",
    "altitude": 368.0
  },
  {
    "cidade": "Brejo do Cruz",
    "altitude": 199.0
  },
  {
    "cidade": "Brejo dos Santos",
    "altitude": 328.0
  },
  {
    "cidade": "Caaporã",
    "altitude": 29.0
  },
  {
    "cidade": "Cabaceiras",
    "altitude": 388.0
  },
  {
    "cidade": "Cabedelo",
    "altitude": 3.0
  },
  {
    "cidade": "Cachoeira dos Índios",
    "altitude": 319.0
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
    "altitude": 298.0
  },
  {
    "cidade": "Cajazeirinhas",
    "altitude": 261.0
  },
  {
    "cidade": "Caldas Brandão",
    "altitude": 75.0
  },
  {
    "cidade": "Camalaú",
    "altitude": 521.0
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
    "altitude": 451.0
  },
  {
    "cidade": "Carrapateira",
    "altitude": 372.0
  },
  {
    "cidade": "Casserengue",
    "altitude": 0.0
  },
  {
    "cidade": "Catingueira",
    "altitude": 287.0
  },
  {
    "cidade": "Catolé do Rocha",
    "altitude": 272.0
  },
  {
    "cidade": "Caturité",
    "altitude": 405.0
  },
  {
    "cidade": "Conceição",
    "altitude": 376.0
  },
  {
    "cidade": "Condado",
    "altitude": 253.0
  },
  {
    "cidade": "Conde",
    "altitude": 112.0
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
    "altitude": 555.0
  },
  {
    "cidade": "Cuité",
    "altitude": 649.0
  },
  {
    "cidade": "Cuité de Mamanguape",
    "altitude": 75.0
  },
  {
    "cidade": "Cuitegi",
    "altitude": 90.0
  },
  {
    "cidade": "Curral de Cima",
    "altitude": 75.0
  },
  {
    "cidade": "Curral Velho",
    "altitude": 338.0
  },
  {
    "cidade": "Damião",
    "altitude": 0.0
  },
  {
    "cidade": "Desterro",
    "altitude": 591.0
  },
  {
    "cidade": "Diamante",
    "altitude": 315.0
  },
  {
    "cidade": "Dona Inês",
    "altitude": 421.0
  },
  {
    "cidade": "Duas Estradas",
    "altitude": 144.0
  },
  {
    "cidade": "Emas",
    "altitude": 268.0
  },
  {
    "cidade": "Esperança",
    "altitude": 631.0
  },
  {
    "cidade": "Fagundes",
    "altitude": 505.0
  },
  {
    "cidade": "Frei Martinho",
    "altitude": 369.0
  },
  {
    "cidade": "Gado Bravo",
    "altitude": 400.0
  },
  {
    "cidade": "Guarabira",
    "altitude": 97.0
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
    "altitude": 341.0
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
    "altitude": 0.0
  },
  {
    "cidade": "Itabaiana",
    "altitude": 45.0
  },
  {
    "cidade": "Itaporanga",
    "altitude": 291.0
  },
  {
    "cidade": "Itapororoca",
    "altitude": 81.0
  },
  {
    "cidade": "Itatuba",
    "altitude": 117.0
  },
  {
    "cidade": "Jacaraú",
    "altitude": 170.0
  },
  {
    "cidade": "Jericó",
    "altitude": 233.0
  },
  {
    "cidade": "João Pessoa",
    "altitude": 47.0
  },
  {
    "cidade": "Joca Claudino",
    "altitude": 345
  },
  {
    "cidade": "Juarez Távora",
    "altitude": 145.0
  },
  {
    "cidade": "Juazeirinho",
    "altitude": 553.0
  },
  {
    "cidade": "Junco do Seridó",
    "altitude": 590.0
  },
  {
    "cidade": "Juripiranga",
    "altitude": 119.0
  },
  {
    "cidade": "Juru",
    "altitude": 580.0
  },
  {
    "cidade": "Lagoa",
    "altitude": 273.0
  },
  {
    "cidade": "Lagoa de Dentro",
    "altitude": 154.0
  },
  {
    "cidade": "Lagoa Seca",
    "altitude": 634.0
  },
  {
    "cidade": "Lastro",
    "altitude": 336.0
  },
  {
    "cidade": "Livramento",
    "altitude": 584.0
  },
  {
    "cidade": "Logradouro",
    "altitude": 140.0
  },
  {
    "cidade": "Lucena",
    "altitude": 3.0
  },
  {
    "cidade": "Mãe d'Água",
    "altitude": 414.0
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
    "altitude": 89.0
  },
  {
    "cidade": "Mari",
    "altitude": 143.0
  },
  {
    "cidade": "Marizópolis",
    "altitude": 300.0
  },
  {
    "cidade": "Massaranduba",
    "altitude": 541.0
  },
  {
    "cidade": "Mataraca",
    "altitude": 14.0
  },
  {
    "cidade": "Matinhas",
    "altitude": 300.0
  },
  {
    "cidade": "Mato Grosso",
    "altitude": 225.0
  },
  {
    "cidade": "Maturéia",
    "altitude": 815.0
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
    "altitude": 599.0
  },
  {
    "cidade": "Mulungu",
    "altitude": 99.0
  },
  {
    "cidade": "Natuba",
    "altitude": 331.0
  },
  {
    "cidade": "Nazarezinho",
    "altitude": 272.0
  },
  {
    "cidade": "Nova Floresta",
    "altitude": 666.0
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
    "altitude": 267.0
  },
  {
    "cidade": "Olivedos",
    "altitude": 559.0
  },
  {
    "cidade": "Ouro Velho",
    "altitude": 591.0
  },
  {
    "cidade": "Parari",
    "altitude": 495.0
  },
  {
    "cidade": "Passagem",
    "altitude": 305.0
  },
  {
    "cidade": "Patos",
    "altitude": 242.0
  },
  {
    "cidade": "Paulista",
    "altitude": 160.0
  },
  {
    "cidade": "Pedra Branca",
    "altitude": 299.0
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
    "altitude": 80.0
  },
  {
    "cidade": "Piancó",
    "altitude": 269.0
  },
  {
    "cidade": "Picuí",
    "altitude": 439.0
  },
  {
    "cidade": "Pilar",
    "altitude": 35.0
  },
  {
    "cidade": "Pilões",
    "altitude": 334.0
  },
  {
    "cidade": "Pilõezinhos",
    "altitude": 133.0
  },
  {
    "cidade": "Pirpirituba",
    "altitude": 99.0
  },
  {
    "cidade": "Pitimbu",
    "altitude": 3.0
  },
  {
    "cidade": "Pocinhos",
    "altitude": 646.0
  },
  {
    "cidade": "Poço Dantas",
    "altitude": 470.0
  },
  {
    "cidade": "Poço de José de Moura",
    "altitude": 280.0
  },
  {
    "cidade": "Pombal",
    "altitude": 184.0
  },
  {
    "cidade": "Prata",
    "altitude": 577.0
  },
  {
    "cidade": "Princesa Isabel",
    "altitude": 683.0
  },
  {
    "cidade": "Puxinanã",
    "altitude": 657.0
  },
  {
    "cidade": "Queimadas",
    "altitude": 450.0
  },
  {
    "cidade": "Quixaba",
    "altitude": 293.0
  },
  {
    "cidade": "Remígio",
    "altitude": 593.0
  },
  {
    "cidade": "Riachão",
    "altitude": 0.0
  },
  {
    "cidade": "Riachão do Bacamarte",
    "altitude": 0.0
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
    "altitude": 198.0
  },
  {
    "cidade": "Rio Tinto",
    "altitude": 11.0
  },
  {
    "cidade": "Salgadinho",
    "altitude": 420.0
  },
  {
    "cidade": "Salgado de São Félix",
    "altitude": 58.0
  },
  {
    "cidade": "Santa Cecília",
    "altitude": 0.0
  },
  {
    "cidade": "Santa Cruz",
    "altitude": 314.0
  },
  {
    "cidade": "Santa Helena",
    "altitude": 287.0
  },
  {
    "cidade": "Santa Inês",
    "altitude": 0.0
  },
  {
    "cidade": "Santa Luzia",
    "altitude": 299.0
  },
  {
    "cidade": "Santa Rita",
    "altitude": 16.0
  },
  {
    "cidade": "Santa Teresinha",
    "altitude": 306.0
  },
  {
    "cidade": "Santana de Mangueira",
    "altitude": 350.0
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
    "altitude": 251
  },
  {
    "cidade": "São Bento",
    "altitude": 141.0
  },
  {
    "cidade": "São Domingos",
    "altitude": 190.0
  },
  {
    "cidade": "São Domingos do Cariri",
    "altitude": 400.0
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
    "altitude": 257.0
  },
  {
    "cidade": "São José de Caiana",
    "altitude": 610.0
  },
  {
    "cidade": "São José de Espinharas",
    "altitude": 208.0
  },
  {
    "cidade": "São José de Piranhas",
    "altitude": 342.0
  },
  {
    "cidade": "São José de Princesa",
    "altitude": 720.0
  },
  {
    "cidade": "São José do Bonfim",
    "altitude": 278.0
  },
  {
    "cidade": "São José do Brejo do Cruz",
    "altitude": 147.0
  },
  {
    "cidade": "São José do Sabugi",
    "altitude": 333.0
  },
  {
    "cidade": "São José dos Cordeiros",
    "altitude": 527.0
  },
  {
    "cidade": "São José dos Ramos",
    "altitude": 140.0
  },
  {
    "cidade": "São Mamede",
    "altitude": 263.0
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
    "altitude": 594.0
  },
  {
    "cidade": "São Vicente do Seridó",
    "altitude": null
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
    "altitude": 593.0
  },
  {
    "cidade": "Serra Redonda",
    "altitude": 391.0
  },
  {
    "cidade": "Serraria",
    "altitude": 533.0
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
    "altitude": 521.0
  },
  {
    "cidade": "Sossêgo",
    "altitude": 580.0
  },
  {
    "cidade": "Sousa",
    "altitude": 220.0
  },
  {
    "cidade": "Sumé",
    "altitude": 532.0
  },
  {
    "cidade": "Tacima",
    "altitude": 168
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
    "altitude": 768.0
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
    "altitude": 541.0
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
    "altitude": 240.0
  },
  {
    "cidade": "Zabelê",
    "altitude": 632.0
  }
];


