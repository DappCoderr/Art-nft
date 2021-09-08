import React from "react"
import Header from "./component/Header"
// import {Wallet} from "./component/wallet"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Router>
      <Header/>
      {/* <Wallet /> */}
      </Router>
    </div>
  )
}