# Arquitetura e modelo de dados do FinUp

O FinUp usa React no navegador. Não há backend próprio ou integração ativa com Supabase. A implementação separa a apresentação, a coordenação dos dados, os cálculos e o armazenamento local.

| Parte | Responsabilidade |
|---|---|
| `src/pages/finup/finup.jsx` | Página, indicadores, lista, feedback e confirmação de exclusão. |
| `src/features/finup/finance/components/` | Formulário de lançamentos e resumo por categoria. |
| `src/features/finup/finance/hooks/useFinancialEntries.js` | Carrega as duas origens, reúne a lista e coordena inclusão, edição e exclusão. |
| `src/features/finup/finance/services/financialEntry.js` | Converte transações do banco, valida e cria/revisa lançamentos manuais. |
| `src/features/finup/finance/services/financialService.js` | Calcula totais e agrupa despesas por categoria. |
| `src/features/finup/finance/repositories/manualEntryRepository.js` | Salva apenas lançamentos manuais no `localStorage`. |
| `src/services/api.js` | Fornece o extrato fictício a partir da camada de dados demonstrativos. |

## Modelo do lançamento

Cada item exibido no FinUp tem `id`, `description`, `amount`, `type`, `category`, `date` e `source`. `type` diferencia receita (`income`) de despesa (`expense`). `source` diferencia a origem bancária simulada (`bank`) da origem manual (`manual`). Os identificadores usam prefixos `bank:` e `manual:`; as ações de alteração aceitam apenas registros manuais.

As transações do extrato são convertidas para esse formato em memória. Os lançamentos manuais usam o mesmo formato, mas são persistidos somente na chave local do FinUp. **Editar um lançamento manual não altera o JSON demonstrativo nem o saldo do Banco TRI.**

As regras calculam valores em centavos antes de somar, para evitar diferenças comuns de ponto flutuante. O resultado é `receitas - despesas`, considerando as duas origens. As despesas por categoria usam apenas itens do tipo despesa.

## Validação e evolução

`src/features/finup/finance/services/financialService.test.js` testa as regras financeiras. O fluxo de navegador em `tests/e2e/financial-flow.spec.js` cobre inclusão, persistência após recarregar, edição, exclusão e a separação do extrato do Banco TRI. A esteira de Pull Request também executa lint, build, orçamento de arquivos e auditoria de dependências.

Persistência remota e contas individuais exigem decisões de autenticação, isolamento de usuários e tratamento de dados antes de implementação ([Issues #10](https://github.com/juniorlummertz/banco-tri/issues/10), [#22](https://github.com/juniorlummertz/banco-tri/issues/22) e [#23](https://github.com/juniorlummertz/banco-tri/issues/23)). Recursos planejados só serão descritos como disponíveis após entrega e validação.
