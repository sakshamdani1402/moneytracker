import React, { useState } from "react";
import TransactionContext from "./TransactionContext";

function TransactionState(props) {
    //const TransactionContext = createContext();
    const host = "http://localhost:5000";
    const initTransactions = []
    const [transactions, setTransactions] = useState(initTransactions);

    //GET ALL TRANSACTIONS
    const getAll = async () => {
        const response = await fetch(`${host}/transactions/getall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        // console.log(json);
        setTransactions(json);
    }

    //ADD A TRANSACTION
    const addTransaction = async (name, amount) => {
        //api call
        const response = await fetch(`${host}/transactions/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('token')
            },
            body: JSON.stringify({ name, amount })
        });

        //logic to add a note
        const newTransaction = await response.json();
        setTransactions(transactions.concat(newTransaction));
    }

    //DELETE A TRANSACTION
    const deleteTransaction = async (id) => {
        await fetch(`${host}/transactions/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('token')
            }
        });
        //const json = response.json();
        const newTransaction = transactions.filter((item) => { return item._id !== id });
        setTransactions(newTransaction);
    }

    //CLEAR TRANSACTIONS
    const clear = async () =>{
        await fetch(`${host}/transactions/clear`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('token')
            }
        });
        setTransactions([]);
    }

    return (
        <TransactionContext.Provider value={{ transactions, getAll,clear, addTransaction, deleteTransaction }}>
            {props.children}
        </TransactionContext.Provider>
    )

}
export default TransactionState;
// export  {TransactionState,TransactionContext };
