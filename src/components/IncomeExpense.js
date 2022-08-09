import React, {useContext} from 'react'
import TransactionContext from '../context/TransactionContext'

const IncomeExpense = () => {
  let income = 0, expense=0;
  const context = useContext(TransactionContext)
  const {transactions} = context;
  transactions.forEach(item => {
    item.amount > 0 ?  income+=item.amount : expense += Math.abs(item.amount) ;
  });
  let balance = income-expense;
  return (
    <>
    <div className="row p-2">
      <div className="col p-1">
          <div className="card bg-dark popup">
            <h5 className="card-header">INCOME</h5>
            <div className="card-body">
              <h5 className="card-title income">${income}</h5>
            </div>
          </div>
      </div>
      <div className="col p-1">
          <div className="card bg-dark popup">
            <h5 className="card-header">EXPENSE</h5>
            <div className="card-body">
            <h5 className="card-title expense">${expense}</h5>
            </div>
          </div>
      </div>
    </div>
    <div className="row p2">
      <div className="col">
      <div className="card bg-dark popup">
            <h5 className="card-header">BALANCE</h5>
            <div className="card-body">
            <h5 className={`card-title ${balance > 0? "income" : "expense"}`}>${Math.abs(balance)}</h5>
            </div>
          </div>
      </div>
    </div>
    </>
  )
}

export default IncomeExpense