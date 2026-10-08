# Banco TRI + FinUp

Protótipo de portfólio em React. O **Banco TRI** apresenta uma conta e movimentações bancárias demonstrativas. O **FinUp** organiza essas movimentações como receitas e despesas e permite registrar lançamentos próprios para acompanhar o orçamento. O Banco TRI funciona como fonte simulada de transações para o FinUp.

![Prévia ilustrada do Banco TRI e FinUp](docs/social-preview.png)

Este repositório documenta a construção dos dois produtos para demonstração e portfólio. A imagem acima é uma peça de apresentação, não uma captura de uma conta real. Para avaliar o trabalho, comece pelo [estado atual](#estado-atual), siga o [roteiro de demonstração](#roteiro-curto-de-demonstração) e consulte a [esteira de qualidade](#esteira-de-qualidade). A execução local usa somente dados fictícios.

## Documentação dos produtos

- [Banco TRI: visão geral, funcionamento e arquitetura](docs/banco-tri/README.md).
- [FinUp: visão geral, uso e arquitetura](docs/finup/README.md).

## Estado atual

- Tela inicial de entrada demonstrativa e sessão temporária por aba, com opção de sair. **Não há autenticação real:** não informa senha, não verifica identidade e não protege dados privados.
- Identidades visuais distintas: Banco TRI em azul, branco e preto com geometria original; FinUp em verde profundo/turquesa. Páginas sob demanda, esqueleto de carregamento e animações discretas com suporte a movimento reduzido.
- Dashboard do Banco TRI com conta fictícia, resumo de entradas/saídas e extrato demonstrativo pesquisável por descrição e tipo.
- Visão financeira do FinUp com receitas, despesas, resultado e despesas por categoria.
- Cadastro, edição e exclusão com confirmação de receitas/despesas manuais, com categoria e data; listagem identifica a origem de cada lançamento. Transações do banco permanecem somente para leitura no FinUp.
- Lançamentos manuais salvos no `localStorage` do navegador. Não são enviados ao Banco TRI, não sincronizam entre dispositivos e podem sumir se os dados do navegador forem apagados.

O saldo do Banco TRI e o extrato fictício são dados de exemplo independentes. Os indicadores de entradas/saídas resumem somente o extrato exibido. O resultado do FinUp soma as transações demonstrativas e os registros locais considerados; **não corresponde ao saldo bancário**.

Conteúdos de educação financeira, indicação **preliminar** de possíveis benefícios sociais e persistência remota fazem parte do planejamento, mas ainda não foram implementados. O pacote `@supabase/supabase-js` está instalado; **não existe integração com Supabase funcionando** nesta etapa. O protótipo não determina direito a benefícios nem substitui análise oficial.

## Tecnologias

React, Vite, JavaScript, React Router, CSS e dados demonstrativos em JSON. Os testes das regras financeiras usam o executor de testes nativo do Node.js.

## Executar localmente

Requer Node.js compatível com a versão do Vite declarada em `package.json`.

```bash
git clone https://github.com/juniorlummertz/banco-tri.git
cd banco-tri
npm ci
npm run dev
```

Abra o endereço mostrado pelo Vite, clique em **Entrar na conta** para acessar a demonstração e navegue entre **Visão geral** e **FinUp**. A sessão existe apenas na aba atual; sair encerra o acesso demonstrativo. Ela não substitui login com backend, controle de acesso ou isolamento de usuários. Os dados demonstrativos são usados por padrão. A variável `VITE_USE_MOCK=false` está reservada para uma integração futura e, por enquanto, produz erro informando que o Supabase não foi configurado.

### Roteiro curto de demonstração

1. No **Banco TRI**, mostre o saldo fictício, as entradas/saídas do extrato e filtre uma movimentação por descrição ou tipo.
2. Abra o **FinUp** e mostre que as transações do banco aparecem identificadas como Banco TRI, sem opção de alteração.
3. Cadastre uma despesa fictícia (por exemplo, compra de mercado por R$ 19,90); observe o resultado e a categoria.
4. Edite o valor e recarregue a página para demonstrar a persistência local; depois exclua com confirmação. Volte ao Banco TRI e confira que o extrato não mudou.

Use somente dados fictícios na apresentação. O protótipo ainda não inclui conteúdos educativos (#8), indicação preliminar de benefícios (#9) nem persistência remota (#10).

Para verificar alterações:

```bash
npm run lint
npm test
npm run build
npm run perf:budget
npm audit --omit=dev --audit-level=high
npx playwright install chromium
npm run test:e2e
```

## Esteira de qualidade

O workflow `Quality / quality` roda em cada PR para `main` e após integração: instalação pelo lockfile, ESLint, testes de regras financeiras, build, orçamento de JS/CSS comprimidos, auditoria de dependências de produção (falha a partir de gravidade alta) e teste Playwright do fluxo Dashboard → FinUp → armazenamento local → Dashboard. O teste de navegador usa dados demonstrativos. O orçamento inicial é **150 KiB de JavaScript e 30 KiB de CSS, gzip**, somando todos os arquivos em `dist/assets`; mede tamanho de transferência aproximado, não métricas de execução. Alterações nesses limites devem trazer medidas e justificativa no PR.

Para que os checks impeçam integração, um administrador precisa configurar um ruleset da `main` com **Require a pull request before merging**, ao menos uma revisão, **Require status checks to pass** com o check `quality`, sem bypass para os participantes habituais. Confira o nome do check após a primeira execução e mantenha a proteção ativa. O workflow sozinho não bloqueia push direto nem merge. A definição de hospedagem, prévia, publicação e reversão continua na Issue #14.

### Escolhas proporcionais ao estágio atual

| Área | Agora | Quando reavaliar |
|---|---|---|
| Qualidade | ESLint existente, testes Node e Playwright | Biome só se substituir ESLint; Commitlint com convenção de commits; Knip quando o código crescer; `arch-contract` quando fronteiras reais exigirem verificação automática; Stryker quando houver suíte estável e valor em mutação |
| Testes | Unidade para regras e um fluxo integrado no navegador | Integração de API quando houver backend; Codecov se a equipe definir meta de cobertura; Endtest apenas se houver necessidade além do Playwright |
| Observabilidade | Erros vistos em desenvolvimento e no CI; sem telemetria de usuários | Issue #21: após hospedagem e avaliação de dados, escolher Sentry **ou** Datadog **ou** New Relic conforme operação; OpenTelemetry quando houver serviços distribuídos e traces úteis |
| Segurança | Auditoria de dependências em PR, revisão de dados/segredos no PR | Issue #22: API pública com rate limit no backend, autenticação/autorização e testes de abuso; revisão de segurança antes de produção |
| Jurídico | Sem publicação de termos ou política como aprovados | Issue #23: revisão e aprovação do jurídico antes da coleta de dados pessoais ou publicação de textos legais |

Mantenha páginas/componentes como interface, hooks como coordenação, serviços como regras e repositórios/API como acesso a dados. Reutilize componentes existentes; extraia uma abstração após repetição real e verifique desempenho com medidas antes de adicionar infraestrutura. Registre trabalhos novos em Issues classificadas e entregue por PR conforme `AGENTS.md`.

## Organização do código

| Caminho | Responsabilidade |
|---|---|
| `src/pages/dashboard/` e `src/hooks/useAccount.js` | Interface e carregamento da conta bancária demonstrativa |
| `src/pages/finup/` | Página que exibe as informações financeiras |
| `src/features/finup/finance/components/` | Formulário e componentes visuais do módulo financeiro |
| `src/features/finup/finance/hooks/` | Combinação das origens de lançamentos do FinUp |
| `src/features/finup/finance/services/` | Adaptação de transações e cálculos financeiros testáveis |
| `src/features/finup/finance/repositories/` | Armazenamento local dos lançamentos manuais |
| `src/services/api.js` e `src/services/mock/` | Acesso aos dados bancários demonstrativos |

Fluxo atual: página → hook → regras e repositório → dados locais ou API demonstrativa. Uma transação bancária é **adaptada** ao modelo de lançamento financeiro do FinUp; um lançamento manual usa esse mesmo modelo e permanece separado da conta bancária.

## Próximos passos

Documentar o FinUp separadamente (#35), evoluir os conteúdos de educação e benefícios planejados (#8 e #9) e definir persistência remota (#10) e validação com usuários (#16). As demonstrações devem usar dados fictícios, considerando que o armazenamento manual atual é local a cada navegador.
