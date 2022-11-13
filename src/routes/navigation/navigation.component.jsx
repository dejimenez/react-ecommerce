import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";

import { UserContext } from "../../context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import "./navigation.styles.scss";

export default function Navigation() {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const signOutHandler = async () => {
    await signOutUser();
    setCurrentUser(null)
  }

  return (
    <div>
      <header className="navigation">
        <Link to="/" className="logo-container">
          <Logo className="logo" />
        </Link>
        <nav className="nav-links-container">
          <Link to="shop" className="nav-link">
            SHOP
          </Link>
          {currentUser ? (
            <span className="sign-out" onClick={signOutHandler}>SIGNOUT</span>
          ) : (
            <Link to="auth" className="nav-link">
              SIGN IN
            </Link>
          )}
        </nav>
      </header>
      <Outlet />
    </div>
  );
}
