/*
  Serviço responsável pelas regras de cálculo financeiro do FinUp.
  A lógica fica fora dos componentes React para separar:
  - apresentação da interface;
  - regra de negócio financeira.

  Isso facilita manutenção, testes e futuras evoluções.
*/
export function calculateFinancialSummary(transactions) {
      /*
    Seleciona apenas transações de entrada (credit)
    e soma seus valores.

    filter() escolhe as transações desejadas.
    reduce() transforma a lista em um único total.
  */
    const totalIncome = transactions
    .filter((transaction) => transaction.direction ==="credit")
    .reduce((total, transaction) => total + transaction.amount, 0)
    const totalExpenses = transactions
    .filter((transaction) => transaction.direction ==="debit")
    .reduce((total, transaction) => total + transaction.amount, 0)
    // Resultado financeiro do conjunto de transações analisado.
    const balance = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, balance }
}
/*agrupa as despesas de acordo com sua categoria.
Essa função recebe todas as transações da conta,
seleciona somente as despesas e soma os valores
pertencentes à mesma categoria.
*/
export function calculateExpensesByCategory(transactions) {
/*Primeiro filtramos somente as transaçõesque representam saída de dinheiro.*/
    const expenses = transactions.filter((transaction) =>transaction.direction ==="debit")
    /*reduce() transforma várias despesas em um único objeto.
    O acumulador "categories" começa como:{} e vai sendo preenchido conforme
    ercorremos as transações.*/
    return expenses.reduce((categories, transaction) => {
    /*Se uma transação não possuir categoria,utilizamos "other" como categoria padrão.*/
        const category = transaction.category || "other"
        /*Se a categoria ainda não existir, consideramos o valor atual como zero.
        depois somamos o valor da transação atual.*/
        categories[category] = (categories[category] || 0) + transaction.amount
        /*reduce devolve o acumulador para continuar o processo na próxima transação.*/
        return categories
        },
        {}
    )
}