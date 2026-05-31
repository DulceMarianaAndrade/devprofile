import { useState } from "react";
import { useCV } from "../context/CVContext";

const categorias = [
  "Programación",
  "Bases de datos",
  "Diseño web",
  "Idiomas",
  "Herramientas de desarrollo",
  "Habilidades blandas",
];

const niveles = ["Básico", "Intermedio", "Avanzado"];

function SkillForm() {
  const { cv, agregarHabilidad, editarHabilidad, eliminarHabilidad } = useCV();

  const [form, setForm] = useState({
    nombre: "",
    categoria: "",
    nivel: "",
    descripcion: "",
  });

  const [errores, setErrores] = useState({});
  const [editandoId, setEditandoId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  const validar = () => {
    const nuevosErrores = {};

    if (!form.nombre.trim())
      nuevosErrores.nombre = "El nombre es obligatorio.";
    else if (form.nombre.trim().length < 2)
      nuevosErrores.nombre = "El nombre debe tener al menos 2 caracteres.";

    if (!form.categoria)
      nuevosErrores.categoria = "Selecciona una categoría.";

    if (!form.nivel)
      nuevosErrores.nivel = "Selecciona un nivel.";

    if (!form.descripcion.trim())
      nuevosErrores.descripcion = "La descripción es obligatoria.";
    else if (form.descripcion.trim().length > 200)
      nuevosErrores.descripcion = "Máximo 200 caracteres.";

    // Validar duplicados
    const duplicado = cv.habilidades.some(
      (h) =>
        h.nombre.toLowerCase() === form.nombre.toLowerCase() &&
        h.id !== editandoId
    );
    if (duplicado)
      nuevosErrores.nombre = "Ya existe una habilidad con ese nombre.";

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validar();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    if (editandoId) {
      editarHabilidad(editandoId, form);
      setEditandoId(null);
    } else {
      agregarHabilidad(form);
    }

    setForm({ nombre: "", categoria: "", nivel: "", descripcion: "" });
    setErrores({});
  };

  const handleEditar = (habilidad) => {
    setForm({
      nombre: habilidad.nombre,
      categoria: habilidad.categoria,
      nivel: habilidad.nivel,
      descripcion: habilidad.descripcion,
    });
    setEditandoId(habilidad.id);
  };

  const handleCancelar = () => {
    setForm({ nombre: "", categoria: "", nivel: "", descripcion: "" });
    setErrores({});
    setEditandoId(null);
  };

  return (
    <div>
      <h2>Habilidades</h2>

      <form onSubmit={handleSubmit}>
        <h3>{editandoId ? "Editar habilidad" : "Agregar habilidad"}</h3>

        <div>
          <label>Nombre *</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej. Programar en JavaScript"
          />
          {errores.nombre && <span className="error">{errores.nombre}</span>}
        </div>

        <div>
          <label>Categoría *</label>
          <select name="categoria" value={form.categoria} onChange={handleChange}>
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errores.categoria && <span className="error">{errores.categoria}</span>}
        </div>

        <div>
          <label>Nivel *</label>
          <select name="nivel" value={form.nivel} onChange={handleChange}>
            <option value="">Selecciona un nivel</option>
            {niveles.map((niv) => (
              <option key={niv} value={niv}>{niv}</option>
            ))}
          </select>
          {errores.nivel && <span className="error">{errores.nivel}</span>}
        </div>

        <div>
          <label>Descripción *</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Ej. Tengo experiencia en programación con JavaScript y React..."
            rows={3}
          />
          <small>{form.descripcion.length}/200 caracteres</small>
          {errores.descripcion && <span className="error">{errores.descripcion}</span>}
        </div>

        <button type="submit">
          {editandoId ? "Guardar cambios" : "Agregar habilidad"}
        </button>
        {editandoId && (
          <button type="button" onClick={handleCancelar}>
            Cancelar
          </button>
        )}
      </form>

      {/* Lista de habilidades agregadas */}
      <div>
        <h3>Habilidades agregadas ({cv.habilidades.length})</h3>
        {cv.habilidades.length === 0 ? (
          <p>Aún no hay habilidades registradas.</p>
        ) : (
          cv.habilidades.map((h) => (
            <div key={h.id} style={{ border: "1px solid #ccc", padding: 8, marginBottom: 8 }}>
              <strong>{h.nombre}</strong> — {h.categoria} — {h.nivel}
              <p>{h.descripcion}</p>
              <button onClick={() => handleEditar(h)}>Editar</button>
              <button onClick={() => eliminarHabilidad(h.id)}>Eliminar</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default SkillForm;