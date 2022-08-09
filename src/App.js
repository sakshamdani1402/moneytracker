import React from 'react'
import './App.css';
import { Route, Switch } from "wouter";
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import TransactionState from './context/TransactionState.js';
import SavedState from './context/SavedState'
import Saved from './components/Saved';

function App() {
  return (
    <div className="App">
      <SavedState>
      <TransactionState>
       <Navbar/>
       <Switch>
        <Route path="/" component={Home}/>
        <Route path="/saved" component={Saved}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Signup}/>
       </Switch>
      </TransactionState>
      </SavedState>
    </div>
  );
}

export default App;
