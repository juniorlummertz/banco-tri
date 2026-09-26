const categoryLabels = {
  income: "Receita",
  food: "Alimentação",
  housing: "Moradia",
  transport: "Transporte",
  health: "Saúde",
  education: "Educação",
  leisure: "Lazer",
  subscriptions: "Assinaturas",
  other: "Outros"
}

export function getCategoryLabel(category) {
  return categoryLabels[category] || "Outros"
}   //adicionado para exibir o saldo formatado