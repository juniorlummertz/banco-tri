import { useEffect, useState } from "react";
import { api } from "../services/api"

export function useAccount() {
    const[user, setUser]=useState(null)
    const[account, setAccount]=useState(null)
    const[transactions, setTransactions]=useState([])
    const[loading, setLoading]=useState(true)
    const[error, setError]=useState(null)
    
    useEffect(() => {
        async function loadData() {
            try{
                setLoading(true)
                const userData=await api.getUser()
                const accountData=await api.getAccount()
                const transactionData=await api.getTransactions()
                setUser(userData)
                setAccount(accountData)
                setTransactions(transactionData)
            } catch (err) {
                setError(err.message)
            } finally {
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