# Tática — Quem Está Olhando?

Primeira versão da revista digital **Tática**, edição **Quem Está Olhando?**, sobre segurança pública e uso de dados na era digital.

Interface em React e TypeScript, com Vinext e Vite. O design combina papel claro, preto, verde ácido, códigos e olhos que acompanham o cursor.

## Rodar localmente

Pré-requisitos: Node.js 22.13 ou superior e pnpm 10.

```bash
git clone https://github.com/beatrizbattista/tatica_magazine.git
cd tatica_magazine
pnpm install
pnpm dev
```

Abra no navegador o endereço indicado pelo terminal. Para verificar os tipos e gerar a versão de produção:

```bash
pnpm exec tsc --noEmit
pnpm build
```

## Arquivos principais

- `app/page.tsx`: capa, sumário, matérias, espaços para imagens e gráficos demonstrativos.
- `app/globals.css`: identidade visual, layout responsivo e dimensionamento da capa pela altura da tela.
- `app/layout.tsx`: idioma e metadados.
- `public/`: imagens e outros arquivos estáticos.

## Conteúdo da edição

1. Privacidade e dados.
2. Golpes e vazamentos.
3. Inteligência artificial.
4. Rastreamento e algoritmos.
5. Consentimento e transparência.
6. Segurança e cidadania.

Os textos são provisórios. Os espaços para imagens incluem legendas e créditos. Os gráficos usam valores fictícios explicitamente identificados e devem ser substituídos pelos dados da reportagem.

O movimento dos olhos é um efeito visual local: a revista não implementa coleta de histórico nem rastreamento do leitor.

## Publicação

O projeto conserva a configuração da versão privada hospedada pelo Sites em `.openai/hosting.json`. Enviar código a este repositório não altera o acesso da revista nem publica automaticamente suas alterações. Não coloque tokens, senhas ou arquivos `.env` no Git.

## Validação

TypeScript e build de produção passaram na versão inicial. A revisão visual no navegador ainda está pendente.
