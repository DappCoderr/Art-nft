import React, {useState, useEffect} from "react"
import * as fcl from "@onflow/fcl"

export function Wallet() {
  const [user, setUser] = useState({loggedIn: null})
  useEffect(() => fcl.currentUser().subscribe(setUser), [])

  if (user.loggedIn) {
    return (
      <div>
        <span>{user?.addr ?? "No Address"}</span>
        <button onClick={fcl.unauthenticate}>Log Out</button>
      </div>
    )
  } else {
    return (
      <div>
        <button onClick={fcl.logIn}>Log In</button>
      </div>
    )
  }
}