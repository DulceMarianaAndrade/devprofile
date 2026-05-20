import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Inicio</Link>
      <Link to="/editor">Editor</Link>
      <Link to="/preview">Preview</Link>
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/about">About</Link>
    </nav>
  );
}
export default Navbar;