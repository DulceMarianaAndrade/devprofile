import { useState } from "react";
import PersonalForm from "../components/PersonalForm";
import SkillForm from "../components/SkillForm";
import ProjectForm from "../components/ProjectForm";
import EducationForm from "../components/EducationForm";
import ExtraInfoForm from "../components/ExtraInfoForm";
import { User, Zap, FolderOpen, GraduationCap, Globe } from "lucide-react";
import "../styles/Editor.css";

const secciones = [
  { id: "personal", label: "Datos personales", icono: User },
  { id: "habilidades", label: "Habilidades", icono: Zap },
  { id: "proyectos", label: "Proyectos", icono: FolderOpen },
  { id: "educacion", label: "Educación", icono: GraduationCap },
  { id: "extra", label: "Experiencia e Idiomas", icono: Globe },
];

function Editor() {
  const [seccionActiva, setSeccionActiva] = useState("personal");

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

      {/*Sidebar*/}
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
      </aside>

      {/* Contenido */}
      <main className="editor__contenido">
        <div className="editor__contenido-inner">
          {renderFormulario()}
        </div>
      </main>
    </div>
  );
}

export default Editor;