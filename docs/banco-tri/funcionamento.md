# Experiência e dados da demonstração

## Entrada

A primeira tela apresenta o Banco TRI e um botão **Entrar na conta**. O botão abre a demonstração; não pede nem valida senha. Uma marcação temporária em `sessionStorage` mantém a navegação liberada na aba atual. **Sair da demonstração** remove essa marcação. Essa entrada não representa autenticação, autorização nem proteção de dados privados.

## Visão geral

O painel mostra o nome fictício da conta, saldo demonstrativo, agência, número da conta e movimentações de exemplo. É possível ocultar ou exibir o saldo na tela. Os cartões de entradas, saídas e quantidade resumem as transações do extrato carregado; **o saldo é um valor de exemplo independente e não é recalculado pelo extrato**.

No extrato, a busca filtra por descrição, sem exigir acentos, e o seletor mostra todas as movimentações, somente entradas ou somente saídas. Os filtros alteram a lista visível; os cartões de resumo continuam descrevendo o extrato completo carregado. Se nada corresponder, a interface mostra um estado vazio.

## Origem e persistência dos dados

- Usuário, conta e nove transações de exemplo vêm de `src/services/mock/database.json`.
- A camada `mockApi` simula um pequeno atraso ao carregar os dados, para que a interface apresente o estado de carregamento.
- Os filtros e a opção de ocultar saldo funcionam no navegador e não alteram os dados do arquivo.
- A sessão da demonstração dura apenas na aba atual. Ao fechar a aba, o acesso demonstrativo é encerrado.
- As transações do Banco TRI são somente para leitura no FinUp; lançamentos próprios feitos no FinUp usam armazenamento local separado.

Não cadastre dados reais nesta demonstração. Não existem cadastro de clientes, login bancário, pagamentos, Pix real ou integração operacional com instituição financeira.

## Roteiro de apresentação

1. Abra a aplicação e entre na conta demonstrativa.
2. Mostre o saldo, a agência e o número fictícios; oculte e exiba o saldo.
3. Compare os cartões de entradas e saídas com a lista completa.
4. Busque `farmacia` para localizar **Farmácia** e experimente o filtro **Entradas** para observar o estado vazio da combinação.
5. Abra o FinUp para mostrar que o extrato é aproveitado sem editar o Banco TRI; volte à Visão geral e saia da demonstração.
