import React from 'react'
import useCurrentUser from '../hooks/useCurrentUser.hook'
import {Redirect} from "react-router-dom"
import "./StyleSheet.css"


const HomePage = () => {

  const [user, loggedIn, tools] = useCurrentUser()

  if (loggedIn) return <Redirect to={"/art"} />

  return (
    <div className="Header">
      <div className="Logo">Art NFT</div>
      <button className="Header-Buttons" type="button" onClick={() => tools?.logIn()}>Connect Wallet</button>
    </div>
  )
}

export default HomePage
