import {Redirect} from "react-router-dom"
import User from "./User";

import './Header.css';

function Header(props) {
  return (
    <section className="Header">
      <div>
        <h2 className="subtitle">Art NFT</h2>
      </div>
      <div>
        <User/>
      </div>
    </section>
  );
}

export default Header;