import { useState } from "react";
import { useCV } from "../context/CVContext";

function EducationForm() {
  const { cv, agregarEducacion, editarEducacion, eliminarEducacion } = useCV();

  const [form, setForm] = useState({
    institucion: "",
    programa: "",
    periodo: "",
    descripcion: "",
    enlace: "",
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

    if (!form.institucion.trim())
      nuevosErrores.institucion = "La institución es obligatoria.";
    else if (form.institucion.trim().length < 3)
      nuevosErrores.institucion = "Debe tener al menos 3 caracteres.";

    if (!form.programa.trim())
      nuevosErrores.programa = "El nombre del programa es obligatorio.";
    else if (form.programa.trim().length < 3)
      nuevosErrores.programa = "Debe tener al menos 3 caracteres.";

    if (!form.periodo.trim())
      nuevosErrores.periodo = "El periodo es obligatorio.";

    if (form.descripcion.trim().length > 300)
      nuevosErrores.descripcion = "Máximo 300 caracteres.";

    if (form.enlace && !/^https?:\/\/.+/.test(form.enlace))
      nuevosErrores.enlace = "La URL debe iniciar con http:// o https://";

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
      editarEducacion(editandoId, form);
      setEditandoId(null);
    } else {
      agregarEducacion(form);
    }

    setForm({
      institucion: "",
      programa: "",
      periodo: "",
      descripcion: "",
      enlace: "",
    });
    setErrores({});
  };

  const handleEditar = (edu) => {
    setForm({
      institucion: edu.institucion,
      programa: edu.programa,
      periodo: edu.periodo,
      descripcion: edu.descripcion || "",
      enlace: edu.enlace || "",
    });
    setEditandoId(edu.id);
  };

  const handleCancelar = () => {
    setForm({
      institucion: "",
      programa: "",
      periodo: "",
      descripcion: "",
      enlace: "",
    });
    setErrores({});
    setEditandoId(null);
  };

  return (
    <div>
      <h2>Educación / Cursos / Certificaciones</h2>

      <form onSubmit={handleSubmit}>
        <h3>{editandoId ? "Editar registro" : "Agregar registro"}</h3>

        <div>
          <label>Institución *</label>
          <input
            name="institucion"
            value={form.institucion}
            onChange={handleChange}
            placeholder="Ej. UAA, UNAM ..."
          />
          {errores.institucion && <span className="error">{errores.institucion}</span>}
        </div>

        <div>
          <label>Programa / Curso / Certificación *</label>
          <input
            name="programa"
            value={form.programa}
            onChange={handleChange}
            placeholder="Ej. Ingeniería en Sistemas, Curso de React, Curso de Mendix"
          />
          {errores.programa && <span className="error">{errores.programa}</span>}
        </div>

        <div>
          <label>Periodo *</label>
          <input
            name="periodo"
            value={form.periodo}
            onChange={handleChange}
            placeholder="Ej. Enero 2024"
          />
          {errores.periodo && <span className="error">{errores.periodo}</span>}
        </div>

        <div>
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Introduzca una corta descripción (opcional)..."
            rows={3}
          />
          <small>{form.descripcion.length}/300 caracteres</small>
          {errores.descripcion && <span className="error">{errores.descripcion}</span>}
        </div>

        <div>
          <label>Enlace de evidencia</label>
          <input
            name="enlace"
            value={form.enlace}
            onChange={handleChange}
            placeholder="https://nombrecertificado.com/mendix"
          />
          {errores.enlace && <span className="error">{errores.enlace}</span>}
        </div>

        <button type="submit">
          {editandoId ? "Guardar cambios" : "Agregar registro"}
        </button>
        {editandoId && (
          <button type="button" onClick={handleCancelar}>
            Cancelar
          </button>
        )}
      </form>

      {/*Lista de educacion*/}
      <div>
        <h3>Registros agregados ({cv.educacion.length})</h3>
        {cv.educacion.length === 0 ? (
          <p>Aún no hay registros de educación.</p>
        ) : (
          cv.educacion.map((edu) => (
            <div key={edu.id} style={{ border: "1px solid #ccc", padding: 8, marginBottom: 8 }}>
              <strong>{edu.programa}</strong>
              <p>{edu.institucion} · {edu.periodo}</p>
              {edu.descripcion && <p>{edu.descripcion}</p>}
              {edu.enlace && (
                <a href={edu.enlace} target="_blank">Ver certificado</a>
              )}
              <div style={{ marginTop: 8 }}>
                <button onClick={() => handleEditar(edu)}>Editar</button>
                <button onClick={() => eliminarEducacion(edu.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default EducationForm;