import { mockApi } from "./mock/mockApi"

const useMock =
  import.meta.env.VITE_USE_MOCK === "true"

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