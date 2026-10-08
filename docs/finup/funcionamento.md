# Como usar o FinUp

## Abrir a demonstração

Execute o projeto conforme o [README principal](../../README.md#executar-localmente), clique em **Entrar na conta** e escolha **FinUp** na navegação. Essa entrada é demonstrativa e não verifica identidade. A página do FinUp carrega quando você a visita e apresenta um estado de carregamento enquanto lê os dados.

## Entender os indicadores

O FinUp considera dois grupos de lançamentos: o extrato fictício do Banco TRI e os registros criados no próprio FinUp. A soma das receitas menos a soma das despesas produz o **resultado do recorte**. Ele não corresponde ao saldo bancário, que é outro valor fictício e independente.

O painel de despesas por categoria considera apenas as despesas, incluindo as do extrato demonstrativo. Uma despesa sem categoria reconhecida é agrupada em **Outros**.

## Registrar, corrigir ou remover

1. Selecione **Receita** ou **Despesa**, informe descrição, valor positivo e data. Para despesas, escolha a categoria.
2. Clique em **Adicionar lançamento**. Ele aparece na lista com a origem **FinUp**, e os indicadores são atualizados.
3. Para corrigir um lançamento próprio, use **Editar**, altere os campos e clique em **Salvar alterações**.
4. Para remover um lançamento próprio, use **Excluir** e confirme. A ação também pode ser cancelada.

Os valores aceitam vírgula ou ponto e até duas casas decimais. A data precisa existir no calendário. Entradas do Banco TRI aparecem com a origem **Banco TRI** e não têm botões de edição ou exclusão nessa área.

## Onde os registros ficam

Os lançamentos criados no FinUp são gravados em `localStorage` na chave `finup:manual-entries:v1`. Eles sobrevivem a um recarregamento no mesmo navegador, mas não são enviados ao Banco TRI nem sincronizados com outro dispositivo. Limpar os dados do navegador pode apagá-los. A demonstração não oferece backup ou exportação.

## Roteiro rápido

1. Observe as receitas, despesas e categorias geradas pelo extrato de exemplo.
2. Adicione uma despesa fictícia de **R$ 19,90** em **Alimentação** e veja os totais mudarem.
3. Edite o valor, recarregue a página e confirme que o registro permanece.
4. Exclua o registro com confirmação e volte à **Visão geral** do Banco TRI: o extrato bancário permanece igual.
