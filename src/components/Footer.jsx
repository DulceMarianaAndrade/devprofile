import { Link } from "react-router-dom";
import "../styles/Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">

        <div className="footer__brand">
          <span className="home__footer-logo">DevProfile</span>
          <p>Generador dinámico de CV profesional.<br />Desarrollado con React + Vite.</p>
        </div>

        <div className="footer__links">
          <h4>Navegación</h4>
          <Link to="/">Inicio</Link>
          <Link to="/editor">Editor</Link>
          <Link to="/preview">Preview</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/about">Acerca de</Link>
        </div>

        <div className="footer__links">
          <h4>Proyecto</h4>
          <span>Tecnologías Web</span>
          <span>React + Vite</span>
          <span>react-router-dom</span>
          <span>Charts.js</span>
        </div>

      </div>
      <div className="footer__bottom">
        <p>© 2026 DevProfile — Proyecto Final Tecnologías Web</p>
      </div>
    </footer>
  );
}

export default Footer;