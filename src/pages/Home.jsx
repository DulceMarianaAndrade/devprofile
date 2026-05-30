import { Link } from "react-router-dom";
import {
  ClipboardList,
  Eye,
  FileDown,
  BarChart2,
  Moon,
  Database,
} from "lucide-react";
import "../styles/Home.css";

function Home() {
  return (
    <div className="home">

      {/* Hero */}
      <section className="home__hero">
        <div className="home__hero-content">
          <span className="home__badge">DevProfile: Generador Dinámico de CV en PDF</span>
          <h1 className="home__title">
            Crea tu CV <br />
            <span className="home__title-accent">en minutos</span>
          </h1>
          <p className="home__subtitle">
            DevProfile te permite construir, personalizar y exportar
            tu currículum profesional en PDF de forma rápida y elegante.
          </p>
          <div className="home__actions">
            <Link to="/editor" className="home__btn-primary">
              Comenzar ahora 
            </Link>
            <Link to="/preview" className="home__btn-secondary">
              Ver ejemplo
            </Link>
          </div>
        </div>
        <div className="home__hero-visual">
          <img src="/logoCV.png" alt="DevProfile" className="home__hero-logo" />
        </div>
      </section>

      {/* beneficios */}
      <section className="home__features">
        <h2 className="home__section-title">Todo lo que necesitas</h2>
        <div className="home__features-grid">
          {features.map((f) => (
            <div key={f.title} className="home__feature-card">
              <div className="home__feature-icon">
                <f.icon size={28} strokeWidth={1.5} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* pasos */}
      <section className="home__steps">
        <h2 className="home__section-title">¿Cómo funciona?</h2>
        <div className="home__steps-grid">
          {steps.map((s, i) => (
            <div key={s.title} className="home__step">
              <div className="home__step-number">{i + 1}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home__cta">
        <h2>¿Listo para destacar?</h2>
        <p>Crea tu CV profesional ahora mismo, sin costo y sin registro.</p>
        <Link to="/editor" className="home__btn-primary">
          Crear mi CV
        </Link>
      </section>
    </div>
  );
}

const features = [
  {
    icon: ClipboardList,
    title: "Formularios intuitivos",
    desc: "Ingresa tu información fácilmente desde formularios organizados por sección.",
  },
  {
    icon: Eye,
    title: "Previsualización en tiempo real",
    desc: "Revisa cómo quedará tu CV antes de exportarlo.",
  },
  {
    icon: FileDown,
    title: "Exportación a PDF",
    desc: "Descarga tu CV en formato PDF con diseño profesional listo para enviar.",
  },
  {
    icon: BarChart2,
    title: "Gráfica de habilidades",
    desc: "Visualiza tus habilidades con una gráfica dinámica e interactiva.",
  },
  {
    icon: Moon,
    title: "Modo oscuro",
    desc: "Cambia entre modo claro y oscuro según tu preferencia.",
  },
  {
    icon: Database,
    title: "Datos persistentes",
    desc: "Tu información se guarda automáticamente en el navegador.",
  },
];

const steps = [
  {
    title: "Llena tu información",
    desc: "Completa los formularios con tus datos personales, habilidades, proyectos y más.",
  },
  {
    title: "Previsualiza tu CV",
    desc: "Revisa cómo luce tu currículum antes de generar el documento final.",
  },
  {
    title: "Exporta en PDF",
    desc: "Descarga tu CV profesional listo para compartir con reclutadores.",
  },
];

export default Home;