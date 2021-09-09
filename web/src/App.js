import React from "react"
import HomePage from "./page/HomePage";
import {Switch,Route,Redirect} from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage}/>
      </Switch>
    </div>
  )
}