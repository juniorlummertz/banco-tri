export function calculateFinancialsummary(transactions) {
    const totalIncome = transactions
    .filter((transaction) => transaction.direction ==="credit")
    .reduce((total, transaction) => total + transaction.amount, 0)
    const totalExpenses = transactions
    .filter((transaction) => transaction.direction ==="debit")
    .reduce((total, transaction) => total + transaction.amount, 0)
    const balance = totalIncome - totalExpenses;
    return { totalIncome, totalExpenses, balance }
}