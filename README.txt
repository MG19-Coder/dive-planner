Dive Planner DOMAR/CBMPB - V19 Operacional

Versao V19 com foco em arquitetura generica, dashboard operacional e preparacao para multiplos mergulhos.

Principais entregas:
- Motor ativo estruturado em mergulhos[] para suportar 1o, 2o, 3o e 4o mergulho em cadeia.
- NR calculado por NGR + profundidade corrigida do mesmo mergulho que gerou o intervalo.
- TTF dos repetitivos calculado por NR anterior + tempo de fundo atual.
- GR dos repetitivos calculado por profundidade corrigida + TTF.
- Menor IS automatico considerando o LND e o tempo de fundo do proximo mergulho.
- Bail Out tratado exclusivamente como informacao de emergencia, sem alertas, bloqueios ou influencia no status.
- Pressao residual tratada como consequencia operacional, com alerta de reserva ou troca/recarga sem mensagem generica.
- Previews reorganizados como dashboard KPI.
- Resultados limpos, exibindo apenas profundidade corrigida, TF/TTF, IS, NGR, NR e pressao residual.
- Painel final de decisao com status operacional e motivos.
- Formatacao de tempo padronizada, incluindo 61 min = 1 h 1 min e 125 min = 2 h 5 min.
- Cards de avisos ficam ocultos quando nao ha mensagens, sem reservar espaco vazio.
- TTF exibido somente como valor final nos cards e resultados.
- Banner superior com imagem do tubarao e fundo principal com mergulhadores/logo DOMAR.
- Valores padrao: TCS 40, profundidade 5 m e tempo de fundo 25 min para todos os mergulhos.

Mantido:
- Tabelas US Navy cadastradas.
- Calculo de altitude.
- Logica de grupos repetitivos.
- Logica de nitrogenio residual.
- Formulas de autonomia principal e Bail Out.
- Identidade visual, fundo e tema DOMAR/CBMPB.

Validacao:
- Testes automatizados em tests/test-engine.js.
- Sintaxe JavaScript validada com Node.js.

Observacao:
Ferramenta auxiliar. Conferir sempre POP, Manual de Mergulho DOMAR, tabelas oficiais, computador de mergulho e decisao do MG responsavel.
