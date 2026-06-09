import { useState } from "react";
import PersonalForm from "../components/PersonalForm";
import SkillForm from "../components/SkillForm";
import ProjectForm from "../components/ProjectForm";
import EducationForm from "../components/EducationForm";
import ExtraInfoForm from "../components/ExtraInfoForm";
import { User, Zap, FolderOpen, GraduationCap, Globe, Trash2 } from "lucide-react";
import { useCV } from "../context/CVContext";
import "../styles/Editor.css";
import Swal from "sweetalert2";

const secciones = [
  { id: "personal", label: "Datos personales", icono: User },
  { id: "habilidades", label: "Habilidades", icono: Zap },
  { id: "proyectos", label: "Proyectos", icono: FolderOpen },
  { id: "educacion", label: "Educación", icono: GraduationCap },
  { id: "extra", label: "Experiencia e Idiomas", icono: Globe },
];

// Mantenido por consistencia estructural
const STORAGE_KEYS = [
  "personal",
  "habilidades",
  "proyectos",
  "educacion",
  "extra",
];

function Editor() {
  const [seccionActiva, setSeccionActiva] = useState("personal");

  const handleLimpiar = () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se borrará toda la información ingresada y comenzarás desde cero.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e74c3c",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Sí, borrar todo",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Elimina todo el localStorage para limpiar completamente la app
        localStorage.clear();

        Swal.fire({
          title: "¡Eliminado!",
          text: "Tu información ha sido borrada. Puedes comenzar desde cero.",
          icon: "success",
          confirmButtonColor: "#2ecc71",
          confirmButtonText: "Entendido",
        }).then(() => {
          setSeccionActiva("");
          setTimeout(() => setSeccionActiva("personal"), 0);
          window.location.reload(); // Recarga la app para limpiar el estado en memoria
        });
      }
    });
  };

  const renderFormulario = () => {
    switch (seccionActiva) {
      case "personal":    return <PersonalForm />;
      case "habilidades": return <SkillForm />;
      case "proyectos":   return <ProjectForm />;
      case "educacion":   return <EducationForm />;
      case "extra":       return <ExtraInfoForm />;
      default:            return <PersonalForm />;
    }
  };

  return (
    <div className="editor">
      <aside className="editor__sidebar">
        <div className="editor__sidebar-header">
          <h2>Mi CV</h2>
          <p>Completa cada sección</p>
        </div>
        <nav className="editor__nav">
          {secciones.map((s) => (
            <button
              key={s.id}
              className={`editor__nav-item ${seccionActiva === s.id ? "editor__nav-item--active" : ""}`}
              onClick={() => setSeccionActiva(s.id)}
            >
              <span className="editor__nav-icono">
                <s.icono size={18} strokeWidth={1.5} />
              </span>
              <span className="editor__nav-label">{s.label}</span>
              {seccionActiva === s.id && (
                <span className="editor__nav-punto">*</span>
              )}
            </button>
          ))}
        </nav>

        <div className="editor__sidebar-footer">
          <button className="editor__btn-limpiar" onClick={handleLimpiar}>
            <Trash2 size={16} strokeWidth={1.5} />
            <span>Comenzar de nuevo</span>
          </button>
        </div>
      </aside>

      <main className="editor__contenido">
        <div className="editor__contenido-inner">
          {renderFormulario()}
        </div>
      </main>
    </div>
  );
}

export default Editor;