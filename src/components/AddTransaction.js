import React, { useContext, useState, useRef } from 'react'
import TransactionContext from '../context/TransactionContext';
import IncomeExpense from './IncomeExpense'
import SaveContext from '../context/SaveContext'

const AddTransaction = () => {
  const context = useContext(TransactionContext);
  const {transactions, addTransaction, clear } = context;
  const [item, setItem] = useState({ name: "", amount: 0 });
  
  const handleClick = (e) => {
    e.preventDefault();
    addTransaction(item.name, item.amount);
    setItem({ name: "", amount: 0 });
    // props.showAlert("Added Successfully","success");
  }
  const onChange = (e) => {
    setItem({ ...item, [e.target.name]: e.target.value })
  }
  
  let income = 0, expense=0;
  transactions.forEach(item => {
    item.amount > 0 ?  income+=item.amount : expense += Math.abs(item.amount) ;
  });
 
  const [save, setSave] = useState({name:''})
  const { saveTransaction } = useContext(SaveContext);
  const ref = useRef(null), refClear = useRef(null);
  const refClose = useRef(null), refCloseClear = useRef(null);

  const onChange2 = (e) => {
    setSave({ ...save, [e.target.name]: e.target.value })
  }
  const handleSave = () => {
      saveTransaction(save.name, income, expense);
      setSave({name:'', income : {income}, expense : {expense}});
      ref.current.click()
  }
  const handleClear = () =>{
    clear();
    refClear.current.click();
  }
  return (
    <>
      <IncomeExpense />
      <div className="container my-3 p-4 add-form">
        <form onSubmit={handleClick}>
          <div className="mb-4 text-start">
            <label className="form-label"> <h4>Transaction </h4></label>
            <input type="text" className="form-control input" id="name" name="name" onChange={onChange} value={item.name} />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label"><h4>Amount</h4></label>
            <input type="number" className="form-control input" id="amount" name="amount" value={item.amount} onChange={onChange} />
          </div>
          <button type="submit" className="btn blue w-75 mt-3" >Add</button>
        </form>
        <div className="row add-form-btns mt-3 d-flex justify-content-center">
          <button ref ={refClear} type="submit" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#clearModal">Clear</button>
          <button ref={ref} type="submit" className="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#exampleModal" >Save</button>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content dark-bg">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Save Transactions</h5>
              <button type="button" className="btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-4 text-start">
                  <label className="form-label"> <h5>Save As </h5></label>
                  <input type="text" className="form-control input" id="name" name="name" onChange={onChange2} value={save.name} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn blue" onClick={handleSave} >Save changes</button>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="clearModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content dark-bg">
            <div className="modal-header">
              <h5 className="modal-title" id="clearModal">Clear All Transactions?</h5>
              <button type="button" className="btn-close btn-danger" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure?
            </div>
            <div className="modal-footer">
              <button ref={refCloseClear} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-danger" onClick={handleClear} >Confirm</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddTransaction