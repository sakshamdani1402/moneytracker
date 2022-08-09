import React,{useContext} from 'react'
import TransactionContext from '../context/TransactionContext';

const SingleTransaction = (props) => {
    const {deleteTransaction} = useContext(TransactionContext);
    const { item } = props;
    const { name, amount , _id} = item;

    const handleClick = () =>{
        deleteTransaction(_id);
    }
    return (
        <>
            <div className="card dark-grey-bg m-1">
                <div className="card-body d-flex">
                    <div className="card-name me-auto">{name}</div>
                    <div className={`card-amount ${amount < 0 ? "expense" : "income"} ms-auto`}>
                        ${Math.abs(amount)}
                    </div>
                    <div className="trash ms-4" onClick={handleClick} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg></div>
                </div>
            </div>
        </>
    )
}

export default SingleTransaction