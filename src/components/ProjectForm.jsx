import { useState } from "react";
import { useCV } from "../context/CVContext";
import { validarProyecto } from "../utils/validations";

function ProjectForm() {
  const { cv, agregarProyecto, editarProyecto, eliminarProyecto } = useCV();

  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    tecnologias: "",
    repositorio: "",
    deploy: "",
  });

  const [errores, setErrores] = useState({});
  const [editandoId, setEditandoId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validarProyecto(form, cv.proyectos, editandoId);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    if (editandoId) {
      editarProyecto(editandoId, form);
      setEditandoId(null);
    } else {
      agregarProyecto(form);
    }

    setForm({
      nombre: "",
      descripcion: "",
      tecnologias: "",
      repositorio: "",
      deploy: "",
    });
    setErrores({});
  };

  const handleEditar = (proyecto) => {
    setForm({
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      tecnologias: proyecto.tecnologias,
      repositorio: proyecto.repositorio || "",
      deploy: proyecto.deploy || "",
    });
    setEditandoId(proyecto.id);
  };

  const handleCancelar = () => {
    setForm({
      nombre: "",
      descripcion: "",
      tecnologias: "",
      repositorio: "",
      deploy: "",
    });
    setErrores({});
    setEditandoId(null);
  };

  return (
    <div>
      <h2>Proyectos</h2>

      <form onSubmit={handleSubmit}>
        <h3>{editandoId ? "Editar proyecto" : "Agregar proyecto"}</h3>

        <div>
          <label>Nombre del proyecto *</label>
          <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej. SPACESOUND"
          />
          {errores.nombre && <span className="error">{errores.nombre}</span>}
        </div>

        <div>
          <label>Descripción *</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Escribe de que trata el proyecto"
            rows={3}
          />
          <small>{form.descripcion.length}/300 caracteres</small>
          {errores.descripcion && <span className="error">{errores.descripcion}</span>}
        </div>

        <div>
          <label>Tecnologías utilizadas *</label>
          <input
            name="tecnologias"
            value={form.tecnologias}
            onChange={handleChange}
            placeholder="Ej. Node.js, MySQL"
          />
          {errores.tecnologias && <span className="error">{errores.tecnologias}</span>}
        </div>

        <div>
          <label>Repositorio</label>
          <input
            name="repositorio"
            value={form.repositorio}
            onChange={handleChange}
            placeholder="https://github.com/usuario/repo"
          />
          {errores.repositorio && <span className="error">{errores.repositorio}</span>}
        </div>

        <div>
          <label>Deploy</label>
          <input
            name="deploy"
            value={form.deploy}
            onChange={handleChange}
            placeholder="https://link.gitpages.ejemplo"
          />
          {errores.deploy && <span className="error">{errores.deploy}</span>}
        </div>

        <button type="submit">
          {editandoId ? "Guardar cambios" : "Agregar proyecto"}
        </button>
        {editandoId && (
          <button type="button" onClick={handleCancelar}>
            Cancelar
          </button>
        )}
      </form>

      {/* Lista de proyectos */}
      <div>
        <h3>Proyectos agregados ({cv.proyectos.length})</h3>
        {cv.proyectos.length === 0 ? (
          <p>Aún no hay proyectos registrados.</p>
        ) : (
          cv.proyectos.map((p) => (
            <div key={p.id} className="item-card">
              <div className="item-card__info">
                <strong>{p.nombre}</strong>
              </div>
              <p className="item-card__desc">{p.descripcion}</p>
              <div className="item-card__info" style={{ marginBottom: 10 }}>
                <span className="item-card__tag">{p.tecnologias}</span>
                {p.repositorio && (
                  <a href={p.repositorio} target="_blank" className="item-card__tag">
                    GitHub
                  </a>
                )}
                {p.deploy && (
                  <a href={p.deploy} target="_blank" className="item-card__tag">
                    Deploy
                  </a>
                )}
              </div>
              <div className="item-card__acciones">
                <button className="item-card__btn-editar" onClick={() => handleEditar(p)}>Editar</button>
                <button className="item-card__btn-eliminar" onClick={() => eliminarProyecto(p.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ProjectForm;