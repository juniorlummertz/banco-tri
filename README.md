# Banco TRI + FinUp

Protótipo acadêmico em React. O **Banco TRI** apresenta uma conta e movimentações bancárias demonstrativas. O **FinUp** organiza essas movimentações como receitas e despesas e permite registrar lançamentos próprios para acompanhar o orçamento. O FinUp é o projeto de educação financeira da equipe; o Banco TRI funciona como fonte simulada de transações.

## Estado atual

- Dashboard do Banco TRI com dados de conta, saldo e extrato demonstrativos.
- Visão financeira do FinUp com receitas, despesas, resultado e despesas por categoria.
- Cadastro manual de receita ou despesa, com categoria e data; listagem identifica a origem de cada lançamento.
- Lançamentos manuais salvos no `localStorage` do navegador. Não são enviados ao Banco TRI, não sincronizam entre dispositivos e podem sumir se os dados do navegador forem apagados.

Conteúdos de educação financeira, indicação **preliminar** de possíveis benefícios sociais e persistência remota estão previstos no projeto acadêmico, mas ainda não foram implementados. O pacote `@supabase/supabase-js` está instalado; **não existe integração com Supabase funcionando** nesta etapa. O protótipo não determina direito a benefícios nem substitui análise oficial.

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

Abra o endereço mostrado pelo Vite e navegue entre **Dashboard** e **FinUp**. Os dados demonstrativos são usados por padrão. A variável `VITE_USE_MOCK=false` está reservada para uma integração futura e, por enquanto, produz erro informando que o Supabase não foi configurado.

Para verificar alterações:

```bash
npm run lint
npm test
npm run build
```

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

Evoluir o módulo financeiro com edição e exclusão de lançamentos, acrescentar os módulos de educação e benefícios conforme o escopo acadêmico e, depois, definir persistência remota e validação com usuários. A oficina de orçamento pode usar lançamentos fictícios, considerando que o armazenamento atual é local a cada navegador.
