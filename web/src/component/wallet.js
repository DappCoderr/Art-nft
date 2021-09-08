import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"
import './wallet.css'

export function Wallet() {
  const [user, setUser] = useState({loggedIn: null})
  useEffect(() => fcl.currentUser().subscribe(setUser), [])

  if (user.loggedIn) {
    return (
      <div className='Wallet1'>
        <h3>{"You: " + user?.addr ?? "No Address"}</h3>
        <button  className="btn" onClick={fcl.unauthenticate}>Log Out</button>
      </div>
    )
  } else {
    return (
      <div className='Wallet'>
        <button  className="btn" onClick={fcl.logIn}>Log In</button>
      </div>
    )
  }
}