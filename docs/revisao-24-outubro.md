# Revisão de 24 de outubro de 2026

## Retificação após auditoria independente

O registro abaixo descreve a primeira implementação. A rechecagem posterior corrigiu sua avaliação do editorial: 66%, 31% e “mais de 97%” foram localizados nas fontes primárias. As notas explicam os recortes do Cetic.br e do FMTI e a comparação agregada do FBSP; não classificam esses dados como sem comprovação. Por solicitação final do usuário, essas notas foram transferidas para um bloco expansível em Fontes e notas de apuração. O editorial exibe apenas seus quatro parágrafos originais, mantidos integralmente.

Também foram corrigidas a centralização geométrica dos títulos/blocos, a largura interna dos parágrafos, a centralização de créditos e a área útil dos cartões no celular. Os seis títulos foram medidos com desvio zero em 1440 pixels; o cartão problemático foi reinspecionado em 360 pixels. As quatro definições de operações têm alternativa própria para impressão, sem repetição na tela. Tipos, build final e cinco testes passaram após essas alterações.

A impressão A4, o zoom nativo de 200% e a paginação atual **não estão aprovados**: o acesso à janela de impressão aguardou autorização e expirou. Depois, o navegador integrado ficou indisponível para a última rodada do subagente. A revisão final independente de layout foi estática; a revisão de fontes e licenças foi concluída. Isso substitui qualquer leitura de aprovação visual integral baseada no registro inicial.

## Registro da primeira implementação

Escopo: pedidos enviados em 24/10 na conversa exportada, incluindo os prints WA0013 a WA0024 e o vídeo WA0019. Mensagens antigas não foram usadas como novas tarefas. O editorial de 19/10 foi recuperado como referência após o usuário fornecer e confirmar integralmente o texto nesta conversa.

## Alterações

- Editorial original restaurado sem reescrita. A primeira nota classificava três números como não confirmados; essa avaliação foi corrigida na retificação acima. Permanecem a explicação dos universos e a distinção entre propostas de ressarcimento e regras vigentes demonstradas pela revista.
- Texto de inclusão digital e apresentação do DBIR encurtados, mantendo a distinção entre o conjunto internacional de violações e os registros policiais brasileiros.
- Propostas reduzidas a uma introdução, três medidas e um fechamento, preservando piloto, recursos, responsáveis, indicadores, possibilidade de contestação e controle de acesso.
- Largura dos textos antes limitados a 68 caracteres aumentada para até 92 caracteres tipográficos, sem ultrapassar a largura disponível. Alinhamento à esquerda mantido.
- Ligação entre os casos preservada, conforme posição expressa pelo usuário na conversa exportada.
- Bloco de transição anterior a informações entregues à IA removido por repetição.
- Fotografia ao lado desse texto reduzida; adaptação para uma coluna no celular preservada.
- Abas de processamento, armazenamento, compartilhamento e treinamento preservadas. Parágrafo que repetia as quatro definições removido; ressalva sobre uso indevido e vazamento condensada.
- FMTI introduzido em título próprio, com espaçamento, indicador e explicação a seguir. Unidade exibida ao lado de 40,69.
- Quadro verde com a lista de responsáveis removido da coluna da infraestrutura; fotografia mantida com o texto explicativo e título.
- Blocos de transição destacados com azul claro e borda para diferenciá-los do fundo verde.
- Espaçamentos antes/depois dos cartões da ANPD ampliados; cursor de interação acrescentado ao resumo expansível.
- Uma fotografia real adicional de dispositivo de autenticação incluída no guia. Autor Dennis, licença CC0, página original https://commons.wikimedia.org/wiki/File:Yubikey_with_RFID_in_black.jpg. A foto de 2011 é identificada como contexto, não recomendação de marca. A licença e dimensões constam em lib/photo-assets.json; a permissão foi consultada em 24/10/2026.

## Verificação

Tipos e build de produção aprovados. Cinco testes existentes de dados, CSV, referências e procedência das fotografias aprovados. Inspeção no navegador em 360, 768 e 1440 pixels; sem rolagem horizontal da página nas larguras verificadas, sem imagens quebradas ou erros no console. Troca de abas de uso de dados verificada com clique e setas do teclado. Editorial comparado integralmente à versão fornecida. Prévia Next local na porta 5173.

O build precisou de execução fora do isolamento para atualizar a pasta temporária dist/.openai. A prévia usa o runtime local já existente, sem novo backend ou coleta de dados. Nenhuma publicação remota foi realizada nesta revisão.
