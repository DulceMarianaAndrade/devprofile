import { useState, useEffect } from "react";
import { useCV } from "../context/CVContext";

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

  // Carga datos guardados al montar
  useEffect(() => {
    if (cv.personal) setForm(cv.personal);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  // Manejo de enlaces
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

  // Validaciones
  const validar = () => {
    const nuevosErrores = {};

    if (!form.nombre.trim())
      nuevosErrores.nombre = "El nombre es obligatorio.";
    else if (form.nombre.trim().length < 3)
      nuevosErrores.nombre = "El nombre debe tener al menos 3 caracteres.";

    if (!form.carrera.trim())
      nuevosErrores.carrera = "La carrera es obligatoria.";

    if (!form.ciudad.trim())
      nuevosErrores.ciudad = "La ciudad es obligatoria.";

    if (!form.email.trim())
      nuevosErrores.email = "El correo es obligatorio.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nuevosErrores.email = "El correo no es válido.";

    if (!form.descripcion.trim())
      nuevosErrores.descripcion = "La descripción es obligatoria.";
    else if (form.descripcion.trim().length < 20)
      nuevosErrores.descripcion = "La descripción debe tener al menos 20 caracteres.";
    else if (form.descripcion.trim().length > 500)
      nuevosErrores.descripcion = "La descripción no debe superar 500 caracteres.";

    if (form.foto.trim() && !/^https?:\/\/.+/.test(form.foto))
      nuevosErrores.foto = "La URL de la foto debe iniciar con http:// o https://";

    form.enlaces.forEach((enlace) => {
      if (enlace.url && !/^https?:\/\/.+/.test(enlace.url))
        nuevosErrores[`enlace-${enlace.id}`] = "La URL debe iniciar con http:// o https://";
    });

    return nuevosErrores;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validar();
    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores);
      return;
    }
    actualizarPersonal(form);
    alert("¡Datos personales guardados!");
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
            placeholder="Ej. Ana García López"
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
            placeholder="Ej. Aguascalientes, México"
            />
            {errores.ciudad && <span className="error">{errores.ciudad}</span>}
        </div>

        <div>
            <label>Correo electrónico *</label>
            <input
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Ej. ana@correo.com"
            />
            {errores.email && <span className="error">{errores.email}</span>}
        </div>

        <div>
            <label>Teléfono</label>
            <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Ej. 449 123 4567"
            />
        </div>

        <div>
            <label>Descripción / Perfil profesional *</label>
            <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Breve descripción de ti y tu perfil profesional..."
            rows={4}
            />
            <small>{form.descripcion.length}/500 caracteres</small>
            {errores.descripcion && <span className="error">{errores.descripcion}</span>}
        </div>

        <div>
            <label>Foto de perfil</label>
            {/* Opción 1: subir archivo */}
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

            {/* Opción 2: URL */}
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

            {/* Preview */}
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
            <div key={enlace.id} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                <select
                value={enlace.tipo}
                onChange={(e) => handleEnlaceChange(enlace.id, "tipo", e.target.value)}
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