# Arquitetura atual do Banco TRI

O projeto usa React e Vite no navegador. O Banco TRI não tem backend ou autenticação bancária. Seus dados padrão são importados de um arquivo JSON, por meio de uma camada de acesso simulada.

| Parte | Responsabilidade |
|---|---|
| `src/routes/Router.jsx` | Entrada demonstrativa, navegação e carregamento das páginas sob demanda. |
| `src/pages/login/Login.jsx` | Apresentação e botão de entrada sem verificação de credenciais. |
| `src/pages/dashboard/dashboard.jsx` | Composição do painel, indicadores e filtros do extrato. |
| `src/hooks/useAccount.js` | Carregamento de usuário, conta e transações; estado de espera e erro. |
| `src/services/api.js` | Ponto de acesso aos dados; usa a API simulada por padrão. |
| `src/services/mock/` | API com atraso simulado e JSON com conta e transações fictícias. |
| `src/services/transactionService.js` | Cálculo dos indicadores e filtragem das movimentações. |
| `src/components/` | Cartão de saldo, extrato, navegação e elementos visuais reutilizados. |

O fluxo é **página → hook → serviço de acesso → dados demonstrativos**. Os cálculos do extrato ficam no serviço de transações, separados da apresentação. A página do FinUp consome as mesmas transações bancárias para compor sua própria visão; seus lançamentos manuais seguem outro repositório e não alteram o JSON da conta.

`VITE_USE_MOCK` usa os dados simulados por padrão. Definir `VITE_USE_MOCK=false` atualmente resulta em um erro informando que o Supabase não está configurado; a presença do pacote nas dependências não significa que haja integração ativa.

## Validação existente

Há testes automatizados para os cálculos e filtros em `src/services/transactionService.test.js`. O teste de navegador em `tests/e2e/financial-flow.spec.js` percorre entrada, painel, filtros, FinUp e saída, verificando que um lançamento manual no FinUp não modifica o extrato demonstrativo do Banco TRI. O workflow de qualidade executa lint, testes, build, orçamento de arquivos, auditoria de dependências e Playwright em Pull Requests para `main`.
