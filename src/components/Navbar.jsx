import { Link, useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import useTheme from "../hooks/useTheme";
import "../styles/Navbar.css";

function Navbar() {
  const location = useLocation();
  const { modoOscuro, alternarTema } = useTheme();

  const links = [
    { to: "/", label: "Inicio" },
    { to: "/editor", label: "Editor" },
    { to: "/preview", label: "Preview" },
    { to: "/dashboard", label: "Dashboard" },
    { to: "/about", label: "Acerca de" },
  ];

  return (
    <header className="navbar">
      <div className="navbar__inner">

        {/*logo*/}
        <Link to="/" className="navbar__brand">
          <img src="/logoCV.png" alt="DevProfile" className="navbar__logo" />
          <span className="navbar__brand-name">DevProfile</span>
        </Link>

        {/*links*/}
        <nav className="navbar__links">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar__link ${location.pathname === link.to ? "navbar__link--active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="navbar__actions">
          <ThemeToggle modoOscuro={modoOscuro} alternarTema={alternarTema} />
          <Link to="/editor" className="navbar__cta">
            Crear CV 
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Navbar;