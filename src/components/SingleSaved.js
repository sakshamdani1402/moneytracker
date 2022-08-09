import React ,{useContext} from 'react'
import SaveContext from '../context/SaveContext';

const SingleSaved = (props) => {
    const { item } = props;
    const { name, income, expense, _id, timestamp} = item;
    const {deleteSavedTransaction} = useContext(SaveContext);
    const onClick = () =>{
        deleteSavedTransaction(_id);
    }
    const date = timestamp.slice(0,10);
    return (
        <div className='col-12 col-md-5 mt-4 p-3 popup mx-auto'>
            <div className={`p-2 saved-tag `}>
                <div className="row d-flex">
                    <div className='col-4'><span className={`badge ${income - expense > 0 ? "income-bg" : "expense-bg"}`} >
                        {income - expense > 0 ? "profit" : 'loss'}</span></div>
                    <div className='col-4'>{name}</div>
                    <div className='col-4 trash' onClick={onClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                    </div>

                </div>
            </div>
            <div className="row p-3">
                <div className="col-6 d-flex justify-content-center">
                    <div className="div mx-1">Income : </div>
                    <div className="div mx-1 income"> {income}</div>
                </div>
                <div className="col-6 d-flex justify-content-center">
                    <div className="div mx-1">Expense : </div>
                    <div className="div mx-1 expense">{expense} </div>
                </div>
            </div>
            <div className="row p-3">
                <div className={`col-12 text-center ${income-expense<0?"expense":"income"} `}>Balance : {Math.abs(income-expense)}</div>
            </div>
                <div className="col-12 text-muted ms-auto date pt-2 ">
                    Created on : {date}
                </div>
        </div>
    )
}

export default SingleSaved