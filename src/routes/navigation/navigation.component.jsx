import { Link, Outlet } from "react-router-dom";

import "./navigation.styles.scss"
import {ReactComponent as Logo} from "../../assets/crown.svg"

export default function Navigation() {
  return (
    <div>
      <header className="navigation">
        <Link to="/" className="logo-container">
          <Logo className="logo" />
        </Link>
        <nav className="nav-links-container">
          <Link to="test" className="nav-link">SHOP</Link>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
