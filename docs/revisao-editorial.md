# Revisão editorial e visual

Corte das fontes: **21/10/2026**. Conferência final da implementação: **22/10/2026**. Escopo: revista digital; pesquisa-base e roteiros preservados.

## Dados publicados

| Bloco | Fonte e localização | Decisão editorial |
| --- | --- | --- |
| Informações enviadas à IA | Cetic.br, Painel TIC 2025, PR19 | Sete categorias; internautas brasileiros de 16 anos ou mais que usaram IA. Respostas sobrepostas. Envio não comprova treinamento ou vazamento. |
| Receita de publicidade | Form 10-K 2025 de Meta e Alphabet | Anos completos de 2024 e 2025; valores originais em milhões de dólares convertidos para bilhões. Receita difere de lucro e não equivale a venda direta de dados pessoais. |
| Transparência | Stanford CRFM, FMTI dezembro de 2025, figura 7, p. 19 | 13 empresas; escala de 0 a 100; média calculada 40,69. Não mede segurança ou legalidade; não comparar edições sem considerar mudança de amostra/método. |
| Estelionato eletrônico | FBSP, Anuário 2026, tabela 17, p. 120 | Recorte comparável de 23 UFs: 285.578 registros em 2024 e 317.627 em 2025, +11,2%. CE, RJ e SP sem discriminação da modalidade; PE excluído por mudança na classificação. Registros não medem todos os crimes ou vítimas. |
| Participação de terceiros | Verizon DBIR 2025, pp. 11 e 15 | Edições 2024 (aproximadamente 15%) e 2025 (30%). Edição não equivale ao ano de ocorrência. Terceiros envolvidos não são necessariamente autores do crime. |
| Dados comprometidos | Verizon DBIR 2025, figura 37, p. 34 | 12.063 violações com classificação dos dados; categorias sobrepostas. Sensitive Personal traduzido como identificadores pessoais, sem equiparação automática a dados sensíveis da LGPD. |
| Atividades da ANPD | Relatório de Gestão 2025, pp. 81–82 | 362 comunicações, 81 processos instaurados e 12.701 requerimentos em cartões distintos. Ressalva sobre variação terminológica entre relatório e comunicação oficial; não representam sucesso ou reparação. |

Endereços completos, valores, períodos e ressalvas estão em `lib/evidence.json` e nas referências da própria revista. Cada linha do CSV tem um identificador estável. Os testes conferem as fórmulas do recorte territorial, a média FMTI e a correspondência integral do CSV com a base.

Percentuais sem universo definido, gráficos de referência sem método comprovado e o percentual de 97% do editorial anterior não foram mantidos como fatos. Os arquivos de Downloads serviram à conferência; os gráficos publicados foram reconstruídos a partir das fontes originais.

## Fotografias

As seis fotografias novas estão em `public/images/editorial`, com registros em `lib/photo-assets.json`. As páginas de origem no Wikimedia Commons documentam CC0, CC BY 4.0 ou CC BY-SA 4.0. Legendas e créditos informam autoria, licença, uso ilustrativo e adaptação de enquadramento. A imagem do terminal japonês não é apresentada como Pix ou boleto brasileiro. A infraestrutura NERSC é identificada como fotografia de 2011.

Imagens anteriores provenientes do G1 e o retrato de Shoshana Zuboff deixaram de ser exibidos porque não havia permissão específica de reprodução documentada. Retratos da equipe e de Diogo mantêm a identificação de acervo fornecido pelo grupo e não recebem licença aberta.

## Fatos, relatos e propostas

Os casos de Lourdes e Diogo são independentes. A revista não atribui uso de IA, origem de vazamento ou responsabilidade criminal a uma empresa sem evidência. Conceitos sociológicos são apresentados como interpretação. Propostas do grupo são identificadas e ficam nos aprofundamentos.

O guia distingue Pix de boleto, explica o prazo do MED sem garantir devolução e separa as competências de banco, polícia, ANPD, Procon e assistência jurídica. Os canais estaduais de São Paulo são identificados como exemplos locais. Acesso a dados públicos não elimina finalidade, necessidade e direitos do titular.

## Experiência e impressão

Conteúdo essencial, dados, conclusões, períodos e fontes ficam na leitura principal. Metodologia complementar, propostas e glossário são expansíveis. Os gráficos oferecem tabela por botão, com valores visíveis. O sumário permite percorrer as opções por teclado, fechar com Escape e devolver o foco ao botão de abertura. Foco visível e preferência por movimento reduzido são respeitados.

A impressão abre os aprofundamentos, mostra as três entradas do guia e preserva gráficos e créditos. Referência da paginação: Chrome, A4, escala 100%, margens da folha de estilo e cabeçalhos nativos desativados. A edição revista tem 30 páginas. Alterações de conteúdo ou de fonte podem exigir novo cálculo.

Conferidos: 360, 768 e 1440 pixels; ausência de transbordamento nos novos blocos; seis fotografias carregadas; destinos internos existentes; troca gráfico/tabela; guia e sumário por teclado. O espaço de leitura equivalente a 200% foi testado a 720 pixels; a automação não permitiu confirmar zoom nativo. A inspeção não constitui certificação formal de acessibilidade.


## Ajustes visuais de 23/10/2026

As imagens enviadas identificaram os blocos revisados: custos da fraude em toda a largura; informações fornecidas à IA com texto à esquerda e foto à direita; números destacados com descrição lateral; FMTI com unidade em pontos; espaço maior em torno das dúvidas; foto do terminal substituída; boleto com explicações no papel branco; foto junto ao mapa institucional; introdução ao DBIR centralizada; paginação digital retirada; destaque do MED em azul claro. As sete fotografias em exibição têm registros atualizados em `lib/photo-assets.json`. Os valores dos gráficos e o CSV foram preservados.

O mapa de 30 páginas documenta a prova da versão anterior. A interface deixou de exibir esses fólios fixos. A impressão usa os contadores automáticos do navegador. A revisão visual final dessa nova composição ainda requer acesso ao navegador: a ferramenta bloqueou a aquisição da prévia local nesta sessão.
