import { Link } from "react-router-dom";
import {
  Code2,
  Layers,
  FileDown,
  BarChart2,
  Moon,
  ShieldCheck,
} from "lucide-react";
import "../styles/About.css";

function About() {
  return (
    <div className="about">

      {/*Hero*/}
      <section className="about__hero">
        <div className="about__hero-content">
          <span className="about__badge">Acerca del proyecto</span>
          <h1 className="about__title">
            Conoce <span className="about__title-accent">DevProfile</span>
          </h1>
          <p className="about__subtitle">
            Una aplicación web desarrollada con React que permite capturar,
            previsualizar y exportar un CV profesional en PDF de forma dinámica.
          </p>
        </div>
        <div className="about__hero-visual">
          <img src="/logoCV.png" alt="DevProfile" className="about__logo" />
        </div>
      </section>

      {/*sobre nuestro proyecto*/}
      <section className="about__section about__section--light">
        <div className="about__container">
          <h2>¿Qué es DevProfile?</h2>
          <p>
            DevProfile es el proyecto final de la materia <strong>Tecnologías Web</strong>,
            desarrollado bajo la guía del <strong>Ing. Irving Cardona</strong>. Su propósito
            es demostrar el dominio de React mediante una aplicación funcional, dinámica
            y con diseño profesional.
          </p>
          <p>
            La aplicación permite a cualquier usuario registrar su información profesional
            desde formularios intuitivos, visualizarla en tiempo real y exportarla como
            un CV en formato PDF listo para compartir.
          </p>
        </div>
      </section>

      {/*tecnologías usadas*/}
      <section className="about__section">
        <div className="about__container">
          <h2>Tecnologías utilizadas</h2>
          <div className="about__tech-grid">
            {tecnologias.map((t) => (
              <div key={t.nombre} className="about__tech-card">
                <div className="about__tech-icon">
                  <t.icon size={24} strokeWidth={1.5} />
                </div>
                <div>
                  <h3>{t.nombre}</h3>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/*Funciones*/}
      <section className="about__section about__section--light">
        <div className="about__container">
          <h2>Funcionalidades principales</h2>
          <div className="about__features-list">
            {funcionalidades.map((f) => (
              <div key={f} className="about__feature-item">
                <span className="about__check">*</span>
                <p>{f}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="about__section">
        <div className="about__container">
          <h2>Equipo de desarrollo</h2>
          <div className="about__team-grid">
            {equipo.map((m) => (
              <div key={m.nombre} className="about__team-card">
                <div className="about__team-avatar">
                  {m.nombre.charAt(0)}
                </div>
                <h3>{m.nombre}</h3>
                <span className="about__team-role">{m.rol}</span>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about__cta">
        <h2>¿Quieres ver la app en acción?</h2>
        <p>Prueba el editor y genera tu CV profesional ahora mismo.</p>
        <div className="about__cta-actions">
          <Link to="/editor" className="about__btn-primary">Ir al Editor</Link>
          <Link to="/" className="about__btn-secondary">Volver al inicio</Link>
        </div>
      </section>
    </div>
  );
}

const tecnologias = [
  {
    icon: Code2,
    nombre: "React + Vite",
    desc: "Biblioteca principal para construir la interfaz de usuario con componentes reutilizables.",
  },
  {
    icon: Layers,
    nombre: "React Router DOM",
    desc: "Manejo de rutas y navegación entre las distintas vistas de la aplicación.",
  },
  {
    icon: FileDown,
    nombre: "jsPDF / react-pdf",
    desc: "Generación y exportación del CV en formato PDF profesional.",
  },
  {
    icon: BarChart2,
    nombre: "Recharts",
    desc: "Gráfica dinámica para visualizar habilidades por nivel y categoría.",
  },
  {
    icon: Moon,
    nombre: "CSS Variables",
    desc: "Sistema de diseño con variables CSS para modo oscuro y tema beige consistente.",
  },
  {
    icon: ShieldCheck,
    nombre: "LocalStorage",
    desc: "Persistencia de datos en el navegador sin necesidad de base de datos.",
  },
];

const funcionalidades = [
  "Registro y edición de datos personales con imagen de perfil.",
  "Gestión completa de habilidades con nivel y categoría.",
  "Administración de proyectos con enlaces a repositorio y deploy.",
  "Registro de educación, cursos y certificaciones.",
  "Sección de experiencia e idiomas.",
  "Previsualización web dinámica del CV en tiempo real.",
  "Exportación del CV a PDF con diseño profesional.",
  "Gráfica interactiva de habilidades con Recharts.",
  "Modo oscuro funcional y persistente.",
  "Validaciones completas en todos los formularios.",
  "Persistencia de datos con LocalStorage.",
  "Diseño responsivo y experiencia de usuario cuidada.",
];

const equipo = [
  {
    nombre: "Dulce Mariana Andrade Olvera",
    rol: "Formularios y estado global",
    desc: "Configuración del proyecto, formularios controlados, validaciones, CVContext y persistencia con LocalStorage.",
  },
  {
    nombre: "Elia Guadalupe Arteaga Delgado",
    rol: "Previsualización y exportación PDF",
    desc: "Componente CVPreview, visualización dinámica del CV y generación del documento PDF con diseño profesional.",
  },
  {
    nombre: "Georgina Guadalupe Calzada González",
    rol: "Dashboard y gráfica de habilidades",
    desc: "Página Dashboard, gráfica interactiva de habilidades con Recharts y visualización de datos del usuario.",
  },
  {
    nombre: "Valeria Ramos López",
    rol: "Diseño, modo oscuro y deploy",
    desc: "Diseño visual de la interfaz, implementación del modo oscuro, diseño responsivo y deploy.",
  },
];

export default About;