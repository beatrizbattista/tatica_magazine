# Tática — Quem Está Olhando?

Primeira versão da revista digital **Tática**, edição **Quem Está Olhando?**, sobre segurança pública e uso de dados na era digital.

Interface em React e TypeScript, com Vinext e Vite. O design combina papel claro, preto, verde ácido, códigos e olhos que acompanham o cursor.

## Rodar localmente

Pré-requisitos: Node.js 24.16.0 (versão usada na CI) e pnpm 11.25.0.

```bash
git clone https://github.com/beatrizbattista/tatica_magazine.git
cd tatica_magazine
pnpm install
pnpm dev
```

Abra no navegador o endereço indicado pelo terminal. Para verificar os tipos e gerar a versão de produção:

```bash
pnpm typecheck
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

O projeto conserva a configuração da versão privada hospedada pelo Sites em `.openai/hosting.json`. A hospedagem privada do Sites é independente do Worker de laboratório. A pipeline deste repositório publica no Worker `tatica-magazine-lab` após a CI em pushes na `main`, quando as credenciais do Cloudflare estiverem configuradas. Não coloque tokens, senhas ou arquivos `.env` no Git.

## Validação

A pipeline executa instalação pelo lockfile, TypeScript, ESLint, build, teste HTTP da versão de produção e simulação do deployment. Execute localmente:

```bash
pnpm typecheck
pnpm lint
pnpm build
pnpm test:smoke
pnpm deploy:check
```

Encerre servidores locais antes de refazer o build: no Windows eles podem bloquear a pasta `dist`.

Consulte [o guia de CI/CD](docs/ci-cd.md), [o registro do uso da IA](docs/registro-ia.md) e [as evidências](docs/evidencias/README.md). A publicação real e as evidências do GitHub Actions permanecem pendentes enquanto a conta e as credenciais não forem configuradas.
