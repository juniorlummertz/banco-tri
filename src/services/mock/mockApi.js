import database from "./database.json";

const delay = (ms =300) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
    async getUser() {
        await delay()
        return database.user;
    },

    async getAccount(){
        await delay()
        return database.account;
    },
    async getTransactions() {
    await delay()
    return database.transactions
  }
};