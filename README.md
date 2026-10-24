# Tática — Quem Está Olhando?

Revista digital **Tática**, edição **Quem Está Olhando?**, sobre segurança pública e uso de dados na era digital. Revisão de fontes com corte em 21/10/2026.

Interface em React e TypeScript, com Vinext e Vite. O design combina papel claro, preto, verde ácido, códigos e olhos que acompanham o cursor.

## Rodar localmente

Pré-requisitos: Node.js 22.13 ou superior e pnpm 10.

```bash
git clone https://github.com/beatrizbattista/tatica_magazine.git
cd tatica_magazine
pnpm install
pnpm dev:local
```

Abra `http://127.0.0.1:5173/`. A prévia local usa o Next instalado; o build conserva a configuração Vinext/Vite. Para conferir dados, tipos e produção:

```bash
pnpm data:export
pnpm test:evidence
pnpm exec tsc --noEmit --incremental false
pnpm build
```

## Arquivos principais

- `app/page.tsx`: capa, sumário, editorial e quiz.
- `lib/evidence.json`: fonte única dos seis gráficos e indicadores, com períodos, populações, unidades e ressalvas.
- `lib/photo-assets.json`: origem, autoria, licença, legenda e texto alternativo das sete fotografias de contexto.
- `components/evidence.tsx`: gráficos com alternativa em tabela, indicadores, fotografias e créditos.
- `components/protection-guide.tsx`: glossário, dúvidas e guia para prevenir, agir após fraude e exercer direitos.
- `lib/reportage.json`: blocos editoriais com identificadores permanentes.
- `app/visual-evidence.css`: composição visual e adaptação aos tamanhos de tela.
- `app/print.css`: impressão A4 com contagem automática de páginas. A leitura digital segue o sumário e o progresso, sem paginação fixa. O mapa anterior em `lib/print-pages.json` foi preservado como referência histórica e não controla mais a interface.
- `docs/revisao-editorial.md`: decisões de checagem e limites de interpretação.
- `app/globals.css`: identidade visual, layout responsivo e dimensionamento da capa pela altura da tela.
- `app/layout.tsx`: idioma e metadados.
- `public/`: imagens e outros arquivos estáticos.

## Conteúdo da edição

1. Casos reais.
2. Valor dos dados.
3. Inteligência artificial.
4. Prevenção e infraestrutura.
5. Investigação e direitos.
6. Proteção e cidadania.

Os gráficos usam dados das fontes indicadas. O CSV é gerado da mesma base; regenere-o após alterar valores. Fotografias de contexto têm licença documentada e não representam os golpes narrados. O Word disponível é a pesquisa-base; pesquisa e roteiros de apresentação foram preservados.

O movimento dos olhos é um efeito visual local: a revista não implementa coleta de histórico nem rastreamento do leitor.

## Publicação

O projeto conserva a configuração da versão privada hospedada pelo Sites em `.openai/hosting.json`. Enviar código a este repositório não altera o acesso da revista nem publica automaticamente suas alterações. Não coloque tokens, senhas ou arquivos `.env` no Git.

## Validação

Na revisão anterior, layouts conferidos a 360, 768 e 1440 pixels; gráficos/tabelas, guia, sumário e foco por teclado verificados. A redistribuição também foi conferida em 720 pixels, equivalente ao espaço disponível de uma janela de 1440 pixels ampliada a 200%; o zoom nativo não pôde ser acionado pela ferramenta de inspeção. A paginação foi conferida em prova A4 local e pode variar entre navegadores e configurações. Os testes verificam proveniência, escalas, cálculos, CSV e arquivos de imagem.


## Ajustes das imagens de 23/10/2026

Números destacados passaram a usar composição horizontal, com unidade e fonte próximas. O FMTI é exibido em pontos na escala de 0 a 100. Todas as barras usam azul escuro; o destaque do MED passou a azul claro. A paginação fixa foi removida, e os textos e margens indicados nas imagens foram reorganizados.

A simulação do boleto mantém as explicações dentro do documento branco, com estados por mouse, toque e teclado. A foto do terminal japonês foi substituída por uma cena de uso de serviços digitais. Foram acrescentadas uma fotografia junto ao texto sobre informações enviadas à IA e uma junto ao mapa institucional, ambas com créditos e licença registrados no manifesto.

Tipos, testes de dados e build foram verificados nesta revisão. A inspeção visual final no navegador ficou pendente porque a ferramenta bloqueou o acesso à prévia local; não se deve tratar as verificações visuais anteriores como validação dessas novas composições.
