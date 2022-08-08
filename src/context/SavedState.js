import React, { useState } from "react";
import SaveContext from "./SaveContext";


function SaveState(props) {
    const host = "http://localhost:5000";
    const [saved, setSaved] = useState([]);

    //GET ALL SAVED TRANSACTIONS
    const getAll = async () => {
        const response = await fetch(`${host}/saved/getall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        //console.log(json);
        setSaved(json);
    }

    //SAVE A TRANSACTION
    const saveTransaction = async (name, income, expense, time) => {
        
        const response = await fetch(`${host}/saved/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ name, income, expense, time})
        });

        
        const newSave = await response.json();
        setSaved(saved.concat(newSave));
    }

    //DELETE A  SAVED TRANSACTION
    const deleteSavedTransaction = async (id) => {
        const response = await fetch(`${host}/saved/delete/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        //const json = response.json();
        const afterDeletion = saved.filter((item) => { return item._id !== id });
        setSaved(afterDeletion);
    }

    return (
        <SaveContext.Provider value={{ saved, getAll, saveTransaction, deleteSavedTransaction }}>
            {props.children}
        </SaveContext.Provider>
    )

}

export default SaveState;