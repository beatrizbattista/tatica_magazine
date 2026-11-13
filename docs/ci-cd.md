# CI/CD da Tática Magazine

## Objetivo e estratégia

O laboratório exige CI em push e pull request para main e CD após push na main, condicionado ao sucesso da CI. A aplicação usa React, TypeScript e Vinext/Vite com o plugin Cloudflare. Por isso, a estratégia preparada é Cloudflare Workers, usando o Wrangler já fixado no projeto. Não foi feita migração de framework nem mudança editorial.

O Worker do laboratório tem o nome `tatica-magazine-lab`. A configuração privada `.openai/hosting.json` foi preservada. O projeto não usa D1 ou R2 atualmente (`d1` e `r2` são nulos); não há criação nem migração de banco na pipeline. Se futuramente forem usados conectores ou autenticação do Sites, será necessário integrar esses recursos ao destino externo antes de depender deles.

## Fluxo

1. Um push na main ou um pull request destinado à main executa o job `ci`.
2. O checkout prepara Node 24.16.0 e pnpm 11.25.0.
3. `pnpm install --frozen-lockfile` instala as versões do lockfile sem atualizá-lo.
4. TypeScript e ESLint verificam o código; o build gera `dist/`.
5. O teste smoke inicia o Worker local de produção e verifica a página e os recursos JavaScript/CSS. Não substitui revisão visual ou testes completos de interação.
6. `pnpm deploy:check` faz um dry-run do Wrangler sem publicar.
7. A CI guarda `dist/` como artefato por sete dias, incluindo os arquivos ocultos do build.
8. O job `deploy` usa `needs: ci` e só roda em push na main. Ele baixa o mesmo artefato aprovado, instala as ferramentas e executa `pnpm run deploy`.
9. Se a variável `PUBLIC_SITE_URL` estiver configurada, verifica também a URL publicada.

Pull requests não recebem credenciais nem publicam. Uma falha de CI impede o CD. As publicações são serializadas pelo grupo `tatica-production`. As permissões do workflow são `contents: read`.

## Configuração que falta fazer

Em 12/11/2026, a usuária informou que ainda não tem a conta/credenciais configuradas. Nenhuma publicação na nuvem foi realizada.

1. Criar ou acessar uma conta Cloudflare e habilitar o endereço workers.dev. Conferir que a publicação da revista nesse destino é desejada: o Worker terá uma URL acessível na internet e não herdará o acesso privado do Sites.
2. No Cloudflare, obter o Account ID e criar um API token limitado à conta com as permissões necessárias para editar Workers (modelo Edit Cloudflare Workers).
3. No GitHub do repositório, acessar Settings > Environments e criar `production`.
4. Em `production`, cadastrar os secrets `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID`. Não colocar os valores no código, nos prompts, nas capturas ou no relatório.
5. Para publicação automática sem intervenção em todo push, não adicionar uma aprovação manual obrigatória nesse ambiente. Se houver uma política de revisão, a publicação aguardará a aprovação.
6. Enviar as alterações ao repositório e observar a aba Actions. O Wrangler criará/atualizará o Worker `tatica-magazine-lab`; não é necessário criá-lo manualmente primeiro.
7. Copiar a URL informada pelo deployment para a variável de ambiente GitHub `PUBLIC_SITE_URL`. Com isso, pushes futuros verificam a versão publicada automaticamente.

Sem os secrets, a CI continua testando normalmente e o CD falha com uma mensagem explícita de configuração pendente. Esse caso não conta como publicação bem-sucedida para a atividade.

## Verificação da atividade

- Abrir um PR para main: esperar CI aprovada e deployment ignorado.
- Em uma branch de teste, introduzir temporariamente um erro de tipo: confirmar CI reprovada sem publicação; corrigir antes do merge. Registrar a execução real, sem manter o erro no código final.
- Fazer push válido na main: confirmar CI e deployment aprovados, abrir a URL e comparar a alteração publicada com o commit da execução.
- Registrar URLs das execuções, SHA do commit, capturas e resultado da navegação em desktop e celular.

## Entrega

O relatório em PDF deve reunir o link do repositório, o YAML completo da pipeline, os prompts reais, as alterações, os problemas, os ajustes manuais e as evidências. O registro atual tem dois prompts da usuária. Novas interações devem ser acrescentadas, sem inventar execuções ou resultados.

## Referências

- https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax
- https://developers.cloudflare.com/workers/ci-cd/external-cicd/github-actions/
