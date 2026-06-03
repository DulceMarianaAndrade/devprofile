import { useState, useEffect } from "react";
import { useCV } from "../context/CVContext";
import { validarPersonal } from "../utils/validations";

const enlacesIniciales = [{ id: Date.now(), tipo: "GitHub", url: "" }];

function PersonalForm() {
  const { cv, actualizarPersonal } = useCV();

  const [form, setForm] = useState({
    nombre: "",
    carrera: "",
    ciudad: "",
    email: "",
    telefono: "",
    descripcion: "",
    foto: "",
    enlaces: enlacesIniciales,
  });

  const [errores, setErrores] = useState({});

  //Carga datos guardados
  useEffect(() => {
    if (cv.personal) setForm(cv.personal);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  //enlaces
  const handleEnlaceChange = (id, campo, valor) => {
    setForm((prev) => ({
      ...prev,
      enlaces: prev.enlaces.map((e) =>
        e.id === id ? { ...e, [campo]: valor } : e
      ),
    }));
  };

  const agregarEnlace = () => {
    setForm((prev) => ({
      ...prev,
      enlaces: [...prev.enlaces, { id: Date.now(), tipo: "", url: "" }],
    }));
  };

  const eliminarEnlace = (id) => {
    setForm((prev) => ({
      ...prev,
      enlaces: prev.enlaces.filter((e) => e.id !== id),
    }));
  };

  //Validaciones
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validarPersonal(form);
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    actualizarPersonal(form);
    alert("Datos guardados!");
  };

  return (
    <form onSubmit={handleSubmit}>
        <h2>Datos Personales</h2>

        <div>
            <label>Nombre completo *</label>
            <input
            name="nombre"
            value={form.nombre}
            onChange={handleChange}
            placeholder="Ej. Georgina Calzada Gónzalez"
            />
            {errores.nombre && <span className="error">{errores.nombre}</span>}
        </div>

        <div>
            <label>Carrera o profesión *</label>
            <input
            name="carrera"
            value={form.carrera}
            onChange={handleChange}
            placeholder="Ej. Ingeniería en Sistemas"
            />
            {errores.carrera && <span className="error">{errores.carrera}</span>}
        </div>

        <div>
            <label>Ciudad *</label>
            <input
            name="ciudad"
            value={form.ciudad}
            onChange={handleChange}
            placeholder="Ej. Oaxaca, México"
            />
            {errores.ciudad && <span className="error">{errores.ciudad}</span>}
        </div>

        <div>
            <label>Correo electrónico *</label>
            <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Ej. valedul@gmail.com"
            />
            {errores.email && <span className="error">{errores.email}</span>}
        </div>

        <div>
            <label>Teléfono</label>
            <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Ej. 449 123 45 67"
            />
            {errores.telefono && <span className="error">{errores.telefono}</span>}
        </div>

        <div>
            <label>Descripción / Perfil profesional *</label>
            <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripción de ti y tu perfil profesional..."
            rows={4}
            />
            <small>{form.descripcion.length}/500 caracteres</small>
            {errores.descripcion && <span className="error">{errores.descripcion}</span>}
        </div>

        <div>
            <label>Foto de perfil</label>
            {/*Opción 1:subir archivo desde la compu*/}
            <div>
                <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const archivo = e.target.files[0];
                    if (!archivo) return;
                    const reader = new FileReader();
                    reader.onloadend = () => {
                    setForm((prev) => ({ ...prev, foto: reader.result }));
                    setErrores((prev) => ({ ...prev, foto: "" }));
                    };
                    reader.readAsDataURL(archivo);
                }}
                />
            </div>

            {/*Opción 2:URL*/}
            <div style={{ marginTop: 8 }}>
                <small>O ingresa una URL:</small>
                <input
                name="foto"
                value={form.foto.startsWith("data:") ? "" : form.foto}
                onChange={handleChange}
                placeholder="https://mi-foto.com/foto.jpg"
                />
            </div>

            {errores.foto && <span className="error">{errores.foto}</span>}

            {/*Preview*/}
            {form.foto && (
                <div style={{ marginTop: 8 }}>
                <img
                    src={form.foto}
                    alt="Preview"
                    style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover" }}
                    onError={(e) => (e.target.style.display = "none")}
                />
                <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, foto: "" }))}
                    style={{ display: "block", marginTop: 4 }}
                >
                    Quitar foto
                </button>
                </div>
            )}
        </div>

      <div>
        <label>Enlaces profesionales</label>
        {form.enlaces.map((enlace) => (
          <div key={enlace.id} style={{ marginBottom: 12 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <select
                value={enlace.tipo}
                onChange={(e) => handleEnlaceChange(enlace.id, "tipo", e.target.value)}
                style={{ width: 140 }}
              >
                <option value="">Tipo</option>
                <option value="GitHub">GitHub</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Portafolio">Portafolio</option>
                <option value="Otro">Otro</option>
              </select>
              <input
                value={enlace.url}
                onChange={(e) => handleEnlaceChange(enlace.id, "url", e.target.value)}
                placeholder="https://..."
                style={{ flex: 1 }}
              />
              <button type="button" onClick={() => eliminarEnlace(enlace.id)}>✕</button>
            </div>
            {errores[`enlace-${enlace.id}`] && (
              <span className="error">{errores[`enlace-${enlace.id}`]}</span>
            )}
          </div>
        ))}
        <button type="button" onClick={agregarEnlace}>+ Agregar enlace</button>
      </div>

        <button type="submit">Guardar datos personales</button>
    </form>
  );
}

export default PersonalForm;