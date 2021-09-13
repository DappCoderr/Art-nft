import './Header.css';
import Navbar from "../Navbar"
import Wallet from "../AccountDetails"

function Header(props) {
  return (
    <section className="Header">
      <div>
        <h2 className="subtitle">Art NFT</h2>
      </div>
      <div>
      <Navbar/>
      </div>
      <Wallet/>
    </section>
  );
}

export default Header;