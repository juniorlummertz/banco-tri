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
    
    useEffect(() => {
         /*
      Funções assíncronas permitem aguardar dados externos
      sem bloquear a aplicação.
    */
        async function loadData() {
            try{
                setLoading(true)
                 /*
          O hook não acessa diretamente o JSON.
          Ele depende da camada "api", que abstrai
          a origem dos dados.
        */
                const userData=await api.getUser()
                const accountData=await api.getAccount()
                const transactionData=await api.getTransactions()
                setUser(userData)
                setAccount(accountData)
                setTransactions(transactionData)
            } catch (err) {
                setError(err.message)
            } finally {
                 /*
          finally executa independentemente de sucesso
          ou erro, garantindo o encerramento do loading.
        */
                setLoading(false)
            }
        }
        loadData()
    }, [])
    return {
        user,
        account,
        transactions,
        loading,
        error
    }
}