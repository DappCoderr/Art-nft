import React from "react"
import HomePage from "./page/HomePage";
import Collection from "./page/Collection";
import MarketPlace from "./page/MarketPlace";
import Art from "./page/Art";
import {Switch,Route} from 'react-router-dom';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path="/collection" component={Collection}/>
        <Route exact path="/marketplace" component={MarketPlace}/>
        <Route exact path="/art" component={Art}/>
      </Switch>
    </div>
  )
}