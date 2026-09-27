import { mockApi } from "./mock/mockApi"
/*
  Define qual fonte de dados será utilizada.

  Durante o desenvolvimento utilizamos dados mockados.
  Posteriormente essa mesma camada poderá direcionar
  as operações para o Supabase.
*/

const useMock =
  import.meta.env.VITE_USE_MOCK === "true"
/*
  A camada API serve como ponto de acesso aos dados.

  Os componentes e hooks não precisam saber se os dados
  vêm de JSON, Supabase ou outra tecnologia.
  Isso reduz o acoplamento entre interface e persistência.
*/
export const api = {
  async getUser() {
    if (useMock) {
      return mockApi.getUser()
    }

    throw new Error(
      "Supabase ainda não foi configurado"
    )
  },

  async getAccount() {
    if (useMock) {
      return mockApi.getAccount()
    }

    throw new Error(
      "Supabase ainda não foi configurado"
    )
  },

  async getTransactions() {
    if (useMock) {
      return mockApi.getTransactions()
    }

    throw new Error(
      "Supabase ainda não foi configurado"
    )
  }
}