import { useEffect, useState } from "react";
import { api } from "../services/api"
/*
  Hook customizado responsável por carregar e disponibilizar
  os dados bancários usados pelas páginas.

  Centralizar esse comportamento evita repetir lógica
  de carregamento no Dashboard, FinUp e futuras páginas.
*/
export function useAccount() {
    const[user, setUser]=useState(null)
    const[account, setAccount]=useState(null)
    const[transactions, setTransactions]=useState([])
// Estados responsáveis pelo ciclo da requisição.
    const[loading, setLoading]=useState(true)
    const[error, setError]=useState(null)
    const[refreshKey, setRefreshKey]=useState(0)
    
    useEffect(() => {
         let active = true
         /*
      Funções assíncronas permitem aguardar dados externos
      sem bloquear a aplicação.
    */
        async function loadData() {
            try{
                setLoading(true)
                setError(null)
                 /*
          O hook não acessa diretamente o JSON.
          Ele depende da camada "api", que abstrai
          a origem dos dados.
        */
                const userData=await api.getUser()
                const accountData=await api.getAccount()
                const transactionData=await api.getTransactions()
                if (active) {
                    setUser(userData)
                    setAccount(accountData)
                    setTransactions(transactionData)
                }
            } catch (err) {
                if (active) setError(err.message)
            } finally {
                 /*
          finally executa independentemente de sucesso
          ou erro, garantindo o encerramento do loading.
        */
                if (active) setLoading(false)
            }
        }
        loadData()
        return () => { active = false }
    }, [refreshKey])
    return {
        user,
        account,
        transactions,
        loading,
        error,
        retry: () => setRefreshKey((current) => current + 1)
    }
}
