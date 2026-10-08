# Banco TRI

O Banco TRI é a experiência bancária demonstrativa deste repositório. Ela permite explorar uma conta fictícia, entender um recorte de movimentações e acompanhar entradas e saídas com uma interface pensada para leitura rápida.

Esta documentação descreve **o que o protótipo faz hoje**. Valores, titular, agência e conta são exemplos. Nenhuma operação movimenta dinheiro.

## Por onde começar

1. [Experiência e dados da demonstração](funcionamento.md) — entrada, painel, filtros e limites.
2. [Arquitetura atual](arquitetura.md) — como a interface lê os dados e onde estão as regras.
3. [Executar e validar](../../README.md#executar-localmente) — comandos e roteiro no README principal.

## Banco TRI e FinUp

O Banco TRI fornece movimentações fictícias para a demonstração. O FinUp usa esses registros como uma das fontes de sua visão financeira e mantém os lançamentos manuais separados da conta bancária. [Consulte a documentação própria do FinUp](../finup/README.md).

## Estado e próximos passos

O foco atual é demonstrar interface, organização de dados e comportamento do extrato. Autenticação real, backend bancário, transferência de valores e sincronização de contas **não estão implementados**. A definição de hospedagem e publicação está registrada na [Issue #14](https://github.com/juniorlummertz/banco-tri/issues/14).
