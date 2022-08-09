import React, {useContext, useEffect} from 'react'
import { useLocation } from 'wouter';
import TransactionContext from '../context/TransactionContext'
import SingleTransaction from './SingleTransaction';
const Transactions = () => {

  const context = useContext(TransactionContext);
  const [location, setLocation] = useLocation();

  const {getAll,transactions, deleteTransaction} = context;
  // const [transaction, setTrans] = useState({name:"", amount:""});

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
    <div className='container transactions'>
      <h2 className='strong'>Your Transactions</h2>
      <div className="row justify-content-center">
        { transactions.length ==0 ? "No transactions" :
          transactions.map((item) =>{
            return < SingleTransaction key={item._id} item={item} />
          })
        }
      </div>
    </div>
  )
}

export default Transactions