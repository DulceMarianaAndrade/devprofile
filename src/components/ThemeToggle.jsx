import "../styles/ThemeToggle.css";

function ThemeToggle({ modoOscuro, alternarTema }) {
  return (
    <button
      className={`toggle ${modoOscuro ? "toggle--oscuro" : ""}`}
      onClick={alternarTema}
      title={modoOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      <span className="toggle__icono">{modoOscuro ? "☀" : "☾"}</span>
      <span className="toggle__texto">{modoOscuro ? "Claro" : "Oscuro"}</span>
    </button>
  );
}

export default ThemeToggle;