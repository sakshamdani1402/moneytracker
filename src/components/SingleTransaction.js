import React from 'react'

const SingleTransaction = (props) => {
    const {item} = props;
    const {name, amount} = item;
    return (
        <>
            <div className="card">
                <div className="card-body d-flex">
                    <div className="card-name me-auto">{name}</div>
                    <div className={`card-amount ${amount <0 ? "loss" : "profit"} ms-auto`}>
                        ${amount}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SingleTransaction