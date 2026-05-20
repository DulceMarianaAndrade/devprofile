import { createContext, useContext, useState, useEffect } from "react";
const CVContext = createContext();
export const useCV = () => useContext(CVContext);

const initialState = {
  personal: {
    nombre: "",
    carrera: "",
    ciudad: "",
    email: "",
    telefono: "",
    descripcion: "",
    foto: "",
    enlaces: [],
  },
  habilidades: [],
  proyectos: [],
  educacion: [],
  experiencia: [],
};

export const CVProvider = ({ children }) => {
  const [cv, setCV] = useState(() => {
    const guardado = localStorage.getItem("devprofile-cv");
    return guardado ? JSON.parse(guardado) : initialState;
  });

  //se guarda en automatico cuando cambia de estado
  useEffect(() => {
    localStorage.setItem("devprofile-cv", JSON.stringify(cv));
  }, [cv]);

  const actualizarPersonal = (datos) =>
    setCV((prev) => ({ ...prev, personal: datos }));

  const agregarHabilidad = (habilidad) =>
    setCV((prev) => ({
      ...prev,
      habilidades: [...prev.habilidades, { ...habilidad, id: Date.now() }],
    }));

  const editarHabilidad = (id, datos) =>
    setCV((prev) => ({
      ...prev,
      habilidades: prev.habilidades.map((h) => (h.id === id ? { ...h, ...datos } : h)),
    }));

  const eliminarHabilidad = (id) =>
    setCV((prev) => ({
      ...prev,
      habilidades: prev.habilidades.filter((h) => h.id !== id),
    }));

  const agregarProyecto = (proyecto) =>
    setCV((prev) => ({
      ...prev,
      proyectos: [...prev.proyectos, { ...proyecto, id: Date.now() }],
    }));

  const editarProyecto = (id, datos) =>
    setCV((prev) => ({
      ...prev,
      proyectos: prev.proyectos.map((p) => (p.id === id ? { ...p, ...datos } : p)),
    }));

  const eliminarProyecto = (id) =>
    setCV((prev) => ({
      ...prev,
      proyectos: prev.proyectos.filter((p) => p.id !== id),
    }));

  const agregarEducacion = (edu) =>
    setCV((prev) => ({
      ...prev,
      educacion: [...prev.educacion, { ...edu, id: Date.now() }],
    }));

  const editarEducacion = (id, datos) =>
    setCV((prev) => ({
      ...prev,
      educacion: prev.educacion.map((e) => (e.id === id ? { ...e, ...datos } : e)),
    }));

  const eliminarEducacion = (id) =>
    setCV((prev) => ({
      ...prev,
      educacion: prev.educacion.filter((e) => e.id !== id),
    }));

  const agregarExperiencia = (exp) =>
    setCV((prev) => ({
      ...prev,
      experiencia: [...prev.experiencia, { ...exp, id: Date.now() }],
    }));

  const editarExperiencia = (id, datos) =>
    setCV((prev) => ({
      ...prev,
      experiencia: prev.experiencia.map((e) => (e.id === id ? { ...e, ...datos } : e)),
    }));

  const eliminarExperiencia = (id) =>
    setCV((prev) => ({
      ...prev,
      experiencia: prev.experiencia.filter((e) => e.id !== id),
    }));

  return (
    <CVContext.Provider
      value={{
        cv,
        actualizarPersonal,
        agregarHabilidad,
        editarHabilidad,
        eliminarHabilidad,
        agregarProyecto,
        editarProyecto,
        eliminarProyecto,
        agregarEducacion,
        editarEducacion,
        eliminarEducacion,
        agregarExperiencia,
        editarExperiencia,
        eliminarExperiencia,
      }}
    >
      {children}
    </CVContext.Provider>
  );
};