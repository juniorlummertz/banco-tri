/*
  Utilitário responsável pela formatação monetária.

  Centralizar essa regra evita repetir Intl.NumberFormat
  em vários componentes da aplicação.
*/
export function formatCurrency(value){
    return new Intl.NumberFormat(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    ).format(value)
}