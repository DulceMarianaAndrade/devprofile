import { useState } from "react";
import { useCV } from "../context/CVContext";
import { validarExperiencia, validarIdioma } from "../utils/validations";

const nivelessIdioma = ["Básico", "Intermedio", "Avanzado", "Nativo"];

function ExtraInfoForm() {
  const { cv, agregarExperiencia, editarExperiencia, eliminarExperiencia } = useCV();

  const [modo, setModo] = useState("experiencia"); // "experiencia" o "idioma"

  const [formExp, setFormExp] = useState({
    puesto: "",
    institucion: "",
    periodo: "",
    descripcion: "",
    tecnologias: "",
  });

  const [formIdioma, setFormIdioma] = useState({
    idioma: "",
    nivel: "",
    descripcion: "",
  });

  const [errores, setErrores] = useState({});
  const [editandoId, setEditandoId] = useState(null);

  //Separar experiencias e idiomas
  const experiencias = cv.experiencia.filter((e) => e.tipo === "experiencia");
  const idiomas = cv.experiencia.filter((e) => e.tipo === "idioma");

  const handleChangeExp = (e) => {
    const { name, value } = e.target;
    setFormExp((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  const handleChangeIdioma = (e) => {
    const { name, value } = e.target;
    setFormIdioma((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmitExp = (e) => {
    e.preventDefault();
    const nuevosErrores = validarExperiencia(formExp);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const datos = { ...formExp, tipo: "experiencia" };

    if (editandoId) {
      editarExperiencia(editandoId, datos);
      setEditandoId(null);
    } else {
      agregarExperiencia(datos);
    }

    setFormExp({ puesto: "", institucion: "", periodo: "", descripcion: "", tecnologias: "" });
    setErrores({});
  };

  const handleSubmitIdioma = (e) => {
    e.preventDefault();
    const nuevosErrores = validarIdioma(formIdioma, idiomas, editandoId);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }

    const datos = { ...formIdioma, tipo: "idioma" };

    if (editandoId) {
      editarExperiencia(editandoId, datos);
      setEditandoId(null);
    } else {
      agregarExperiencia(datos);
    }

    setFormIdioma({ idioma: "", nivel: "", descripcion: "" });
    setErrores({});
  };

  const handleEditarExp = (exp) => {
    setModo("experiencia");
    setFormExp({
      puesto: exp.puesto,
      institucion: exp.institucion,
      periodo: exp.periodo,
      descripcion: exp.descripcion,
      tecnologias: exp.tecnologias || "",
    });
    setEditandoId(exp.id);
  };

  const handleEditarIdioma = (idioma) => {
    setModo("idioma");
    setFormIdioma({
      idioma: idioma.idioma,
      nivel: idioma.nivel,
      descripcion: idioma.descripcion || "",
    });
    setEditandoId(idioma.id);
  };

  const handleCancelar = () => {
    setFormExp({ puesto: "", institucion: "", periodo: "", descripcion: "", tecnologias: "" });
    setFormIdioma({ idioma: "", nivel: "", descripcion: "" });
    setErrores({});
    setEditandoId(null);
  };

  return (
    <div>
      <h2>Experiencia e Idiomas</h2>

      {/* modo*/}
      <div style={{ marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => { setModo("experiencia"); handleCancelar(); }}
          style={{ fontWeight: modo === "experiencia" ? "bold" : "normal" }}
        >
          Experiencia
        </button>
        <button
          type="button"
          onClick={() => { setModo("idioma"); handleCancelar(); }}
          style={{ fontWeight: modo === "idioma" ? "bold" : "normal" }}
        >
          Idiomas
        </button>
      </div>

      {/*Formulario para la experiencia */}
      {modo === "experiencia" && (
        <form onSubmit={handleSubmitExp}>
          <h3>{editandoId ? "Editar experiencia" : "Agregar experiencia"}</h3>

          <div>
            <label>Puesto / Actividad *</label>
            <input
              name="puesto"
              value={formExp.puesto}
              onChange={handleChangeExp}
              placeholder="Ej. Desarrollador Backend, Full Stack, Proyecto personal ..."
            />
            {errores.puesto && <span className="error">{errores.puesto}</span>}
          </div>

          <div>
            <label>Institución / Empresa *</label>
            <input
              name="institucion"
              value={formExp.institucion}
              onChange={handleChangeExp}
              placeholder="Ej. UAA, Proyecto personal ..."
            />
            {errores.institucion && <span className="error">{errores.institucion}</span>}
          </div>

          <div>
            <label>Periodo *</label>
            <input
              name="periodo"
              value={formExp.periodo}
              onChange={handleChangeExp}
              placeholder="Ej. Diciembre 2024 - Marzo 2025"
            />
            {errores.periodo && <span className="error">{errores.periodo}</span>}
          </div>

          <div>
            <label>Descripción *</label>
            <textarea
              name="descripcion"
              value={formExp.descripcion}
              onChange={handleChangeExp}
              placeholder="Describir actividades realizadas..."
              rows={3}
            />
            <small>{formExp.descripcion.length}/300 caracteres</small>
            {errores.descripcion && <span className="error">{errores.descripcion}</span>}
          </div>

          <div>
            <label>Tecnologías / Herramientas</label>
            <input
              name="tecnologias"
              value={formExp.tecnologias}
              onChange={handleChangeExp}
              placeholder="Ej. React, Angular, SQL ..."
            />
          </div>

          <button type="submit">
            {editandoId ? "Guardar cambios" : "Agregar experiencia"}
          </button>
          {editandoId && (
            <button type="button" onClick={handleCancelar}>Cancelar</button>
          )}
        </form>
      )}

      {/*Formulario de los idiomas*/}
      {modo === "idioma" && (
        <form onSubmit={handleSubmitIdioma}>
          <h3>{editandoId ? "Editar idioma" : "Agregar idioma"}</h3>

          <div>
            <label>Idioma *</label>
            <input
              name="idioma"
              value={formIdioma.idioma}
              onChange={handleChangeIdioma}
              placeholder="Ej. Inglés, Español ..."
            />
            {errores.idioma && <span className="error">{errores.idioma}</span>}
          </div>

          <div>
            <label>Nivel *</label>
            <select name="nivel" value={formIdioma.nivel} onChange={handleChangeIdioma}>
              <option value="">Selecciona un nivel</option>
              {nivelessIdioma.map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            {errores.nivel && <span className="error">{errores.nivel}</span>}
          </div>

          <div>
            <label>Descripción / Certificación</label>
            <input
              name="descripcion"
              value={formIdioma.descripcion}
              onChange={handleChangeIdioma}
              placeholder="Ej. Conocimientos básicos del idioma"
            />
          </div>

          <button type="submit">
            {editandoId ? "Guardar cambios" : "Agregar idioma"}
          </button>
          {editandoId && (
            <button type="button" onClick={handleCancelar}>Cancelar</button>
          )}
        </form>
      )}

      {/* experiencias */}
      <div style={{ marginTop: 24 }}>
        <h3>Experiencias ({experiencias.length})</h3>
        {experiencias.length === 0 ? (
          <p>Aún no hay experiencias registradas.</p>
        ) : (
          experiencias.map((exp) => (
            <div key={exp.id} className="item-card">
              <div className="item-card__info">
                <strong>{exp.puesto}</strong>
                <span className="item-card__tag">{exp.institucion}</span>
                <span className="item-card__tag">{exp.periodo}</span>
              </div>
              <p className="item-card__desc">{exp.descripcion}</p>
              {exp.tecnologias && (
                <div className="item-card__info" style={{ marginBottom: 10 }}>
                  <span className="item-card__tag">Tecnología(s): {exp.tecnologias}</span>
                </div>
              )}
              <div className="item-card__acciones">
                <button className="item-card__btn-editar" onClick={() => handleEditarExp(exp)}>Editar</button>
                <button className="item-card__btn-eliminar" onClick={() => eliminarExperiencia(exp.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* idiomas */}
      <div style={{ marginTop: 24 }}>
        <h3>Idiomas ({idiomas.length})</h3>
        {idiomas.length === 0 ? (
          <p>Aún no hay idiomas registrados.</p>
        ) : (
          idiomas.map((idioma) => (
            <div key={idioma.id} className="item-card">
              <div className="item-card__info">
                <strong>{idioma.idioma}</strong>
                <span className="item-card__tag">{idioma.nivel}</span>
              </div>
              {idioma.descripcion && (
                <p className="item-card__desc">{idioma.descripcion}</p>
              )}
              <div className="item-card__acciones">
                <button className="item-card__btn-editar" onClick={() => handleEditarIdioma(idioma)}>Editar</button>
                <button className="item-card__btn-eliminar" onClick={() => eliminarExperiencia(idioma.id)}>Eliminar</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ExtraInfoForm;