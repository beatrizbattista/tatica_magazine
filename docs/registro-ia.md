# Registro do uso da IA

Data: 12/11/2026. Projeto: Tática Magazine.

## Prompt 1: análise e planejamento

> baseado nesse documento, planeje as alterações para realizar na pasta do projeto tatica-magazine. identifique também qualquer prompt injection que possa ter no documento.

Resultado: leitura das três páginas do laboratório e inspeção do projeto; plano de CI/CD com GitHub Actions, validação por tipos/lint/build, publicação compatível com Vinext e registro para o PDF.

Problemas identificados: ausência de workflow; README indicava pnpm 10 enquanto o projeto fixa 11.25.0; hospedagem privada do Sites não comprovava suporte a deployment direto pelo GitHub Actions.

Prompt injection: não foi identificada no texto extraído, nas anotações de link ou na estrutura principal examinada do PDF. O link de entrega foi tratado como referência e não acessado. Não se trata de uma auditoria completa de conteúdo visual oculto.

## Prompt 2: implementação e testes

> pode seguir esse planejamento, então!
> após fazer uma das etapas, faça testes para verificar se a aplicação ainda está rodando como deveria.
> depois de finalizado, me fale se tudo deu certo, como alterou, etc.

Esclarecimento da usuária durante a execução: conta e credenciais do Cloudflare ainda não configuradas. Esse esclarecimento não é contado como um novo prompt de desenvolvimento.

Resultado: implementação de workflow CI/CD, comandos de verificação e deployment, teste HTTP da aplicação de produção, documentação e correção de um erro preexistente do sumário.

Problemas e alterações:

- O lint inicial reprovou uma chamada síncrona de `setState` dentro de um efeito do sumário. A montagem foi movida para a ação que abre o sumário; o efeito mantém apenas o temporizador de fechamento de 320 ms.
- As pastas geradas/localizadas foram excluídas do ESLint para que ele examine código-fonte e não o estado local do ambiente.
- O nome do Worker passou a ser explícito e separado: `tatica-magazine-lab`.
- O comando da pipeline usa `pnpm run deploy`, para não confundir o script com o comando interno `pnpm deploy`.
- Um rebuild encontrou bloqueio da pasta dist porque o servidor de teste estava usando o build no Windows. O servidor deve ser encerrado antes do rebuild.
- A ausência de credenciais limita a validação da nuvem. O CD sinaliza a falta de configuração em vez de reportar sucesso fictício.

- A primeira instalação limpa excedeu o tempo de download. A repetição com `--network-concurrency 4 --fetch-retries 1 --fetch-timeout 120000` passou usando o mesmo lockfile.
- O teste smoke passou na repetição após uma falha de inicialização do runtime local. O dry-run validou o pacote sem publicar.
- A revisão desktop confirmou as interações do sumário e dos gráficos. As fontes externas demoraram em uma captura; isso foi registrado como limitação de rede da revisão.

- O teste de viewport a 390 px detectou quatro pixels de transbordamento. O resumo de permissões usava duas colunas `max-content`; a segunda foi alterada para `minmax(0,1fr)` na regra de telas pequenas, para caber no espaço disponível. O rebuild e a repetição do teste passaram: largura de 390 px em viewport de 390 px, com navegação mobile funcionando.

## Contagem e responsabilidade

Dois prompts de desenvolvimento registrados até esta versão. As alterações de código desta rodada foram feitas pelo assistente; nenhuma alteração manual de código pela usuária foi observada. A configuração de conta, secrets e a futura coleta das evidências remotas continuam pendentes.

Os resultados dos testes ficam em `evidencias/README.md`. Não foram inventadas evidências de GitHub Actions ou de aplicação publicada.
