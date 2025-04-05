import { Link, useLocation } from "react-router-dom";
import "../styles/NavBar.css"; // Custom styles

const NavBar = () => {
  const location = useLocation();

  return (
    <nav className="navbar custom-navbar">
      <div className="navbar-start">
        <Link to="/" className="brand-name text-2xl font-bold text-primary">
          MyShop
        </Link>
      </div>

      <div className="navbar-end">
        <ul className="menu menu-horizontal custom-menu">
          <li>
            <Link
              to="/"
              className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={`nav-link ${location.pathname.startsWith("/products") ? "active" : ""}`}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`nav-link ${location.pathname === "/about" ? "active" : ""}`}
            >
              About
            </Link>
          </li>
        </ul>

        <div className="hamburger-menu">
          <div className="hamburger-icon" onClick={() => document.body.classList.toggle("mobile-menu-open")}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
