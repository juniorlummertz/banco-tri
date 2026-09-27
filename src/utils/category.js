/*
  Mapeia os códigos internos das categorias
  para nomes amigáveis exibidos na interface.

  Exemplo:
  "food" é armazenado nos dados,
  enquanto "Alimentação" é apresentado ao usuário.

  Dessa forma, a representação interna dos dados
  não fica acoplada ao texto da interface.
*/
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
}