import React, {useContext, useEffect, useState} from 'react'
import SaveContext from '../context/SaveContext'
import SingleSaved from './SingleSaved'
import { useLocation } from 'wouter'
const Saved = () => {
    const [location, setLocation] = useLocation();
    const {saved, getAll} = useContext(SaveContext);
    useEffect(() => {
        //if we have auth token then show notes else redirect to login page
        if (localStorage.getItem('token')) {
            getAll();
        }
        else {
            setLocation("/login");
        }
      }, []);
  return (
    <div className='container my-5 text-center'>
        <h1>Saved Transactions</h1>
        <div className="row">
            {
                saved.length == 0 ? "No Saved Transactions" :
                saved.map((item) =>{
                    return < SingleSaved key={item._id} item={item} />
                  })
            }
        </div>
    </div>
  )
}

export default Saved