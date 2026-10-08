# FinUp

O FinUp é a área de organização financeira deste repositório. Sua proposta é reunir receitas e despesas em uma visão fácil de acompanhar: quanto entrou, quanto saiu, qual foi o resultado do recorte e em quais categorias ocorreram os gastos.

No protótipo atual, o FinUp combina movimentações fictícias do Banco TRI com lançamentos criados na própria interface. As duas origens são identificadas na lista e continuam separadas. **O resultado mostrado no FinUp não é o saldo da conta do Banco TRI.**

## Explore a documentação

- [Como usar o FinUp](funcionamento.md): registros, categorias, totais e persistência.
- [Arquitetura e modelo de dados](arquitetura.md): origem dos lançamentos, regras e testes.
- [Roteiro para executar o protótipo](../../README.md#executar-localmente): instalação e demonstração local.

## O que já funciona

- Resumo de receitas, despesas e resultado calculado com o extrato fictício e os lançamentos locais.
- Distribuição das despesas por categoria.
- Cadastro, edição e exclusão com confirmação de lançamentos próprios de receita ou despesa.
- Lista com data, valor e identificação da origem de cada lançamento.
- Armazenamento dos registros próprios neste navegador, inclusive após recarregar a página.

## Limites da versão atual

Não há conta individual autenticada, sincronização entre dispositivos ou armazenamento remoto. Os dados do Banco TRI são fictícios. Os registros criados no FinUp ficam no `localStorage` do navegador e podem ser apagados junto com os dados do site; por isso, **não use informações financeiras reais ou importantes nesta demonstração**.

Conteúdos de educação financeira ([Issue #8](https://github.com/juniorlummertz/banco-tri/issues/8)), indicação preliminar de possíveis benefícios ([Issue #9](https://github.com/juniorlummertz/banco-tri/issues/9)) e persistência remota ([Issue #10](https://github.com/juniorlummertz/banco-tri/issues/10)) estão no planejamento. O FinUp não analisa elegibilidade oficial nem garante acesso a benefício.
