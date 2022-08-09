import React from 'react'
import AddTransaction from './AddTransaction'
import Transactions from './Transactions'

const Home = () => {
  return (
    <>
    <div className="container vh-100 vw-100 ">
      <div className="row mt-3 h-100 w-100">
      <div className="col-md-6 p-4">
            <AddTransaction/>
        </div>
        <div className="col-md-6 p-4">
           <Transactions/>
        </div>
      </div>

    </div>
    </>
  )
}

export default Home