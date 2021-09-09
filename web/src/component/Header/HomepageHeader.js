import React from 'react'
import './Header.css'
import {Wallet} from "../wallet"

const HeaderpageHeader = () => {
    return (
        <section className="Header">
          <div id="Hero">
            <h1 className="title">
              Art NFT
            </h1>
          </div>
          <Wallet/>
        </section>
      );
}

export default HeaderpageHeader
