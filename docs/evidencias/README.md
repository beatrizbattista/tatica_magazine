# Evidências e resultados

Data: 12/11/2026.

## Estado inicial

- Repositório local na branch main, sem alterações registradas antes da implementação.
- TypeScript: aprovado.
- Build: aprovado.
- Aplicação de produção local: HTTP 200, título esperado presente.
- ESLint: reprovado por atualização síncrona de estado no efeito do sumário (`app/page.tsx`).

## Após as alterações

- TypeScript: aprovado.
- ESLint: aprovado, sem erros ou avisos.
- Build final: aprovado.
- Teste smoke da aplicação de produção: aprovado, página e nove recursos JavaScript/CSS respondendo corretamente.
- Dry-run do Wrangler: aprovado, pacote preparado sem publicar.
- Instalação limpa: aprovada com lockfile congelado; a primeira tentativa excedeu o tempo de download, e a segunda passou com quatro downloads simultâneos.
- TypeScript na instalação limpa: aprovado, sem depender do node_modules original ou do next-env.d.ts local.
- Sintaxe YAML, eventos para main e dependência/condição do CD: conferidos localmente. Git diff --check: aprovado.
- Revisão desktop: sumário abre, fecha com Escape, reabre e navega para a matéria; gráficos alternam entre linha e barras.
- Revisão mobile 390x844: aprovada após correção da coluna do resumo de permissões. Largura da página: 390 px para viewport de 390 px.
- Revisão desktop 1440x900 e mobile: sumário abre/fecha/reabre; Escape fecha; links navegam e fecham o sumário; gráficos alternam entre linha e barras; equipe tem seis integrantes.
- Erros JavaScript de página nas interações verificadas: nenhum.
- Teste HTTP repetido no build após o ajuste de CSS: aprovado, com nove recursos JS/CSS.
- Os testes foram executados localmente no Windows. A execução no runner Linux do GitHub continua pendente.
- Capturas locais e resultado estruturado: `desktop-capa.png`, `desktop-sumario.png`, `mobile-capa.png`, `mobile-sumario.png` e `browser-results.json`.
- Falhas transitórias de rede e de inicialização do runtime foram resolvidas nas repetições. As fontes externas também demoraram em algumas capturas.

## Evidências remotas pendentes

- Link da execução de CI em PR, sem deployment.
- Link da execução com CI reprovada e CD bloqueado.
- Link da execução em push na main com CI e CD aprovados.
- Commit publicado e URL da aplicação acessível.
- Capturas da aplicação publicada.

As credenciais ainda não foram configuradas. Este registro não comprova uma publicação na nuvem nem uma execução no GitHub Actions.
