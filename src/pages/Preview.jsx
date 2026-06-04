import { useState } from "react";
import { useCV } from "../context/CVContext";
import "../styles/Preview.css";
import {
  UserRoundPen, Briefcase, FolderOpen, Brain,
  GraduationCap, Languages, MapPin, Mail, Phone,
  Wrench, LayoutList, Columns2
} from "lucide-react";
import ExportPDFButton from "../components/ExportPDFButton";

function Preview() {
  const { cv } = useCV();
  const [vertical, setVertical] = useState(false);
  const { personal, habilidades, proyectos, educacion, experiencia } = cv;

  const expItems = experiencia?.filter((e) => e.tipo === "experiencia") || [];
  const idiomaItems = experiencia?.filter((e) => e.tipo === "idioma") || [];

  const tieneContenido =
    personal?.nombre ||
    habilidades?.length > 0 ||
    proyectos?.length > 0 ||
    educacion?.length > 0 ||
    expItems.length > 0 ||
    idiomaItems.length > 0;

  if (!tieneContenido) {
    return (
      <div className="cvpreview__empty">
        <div className="cvpreview__empty-icon">📄</div>
        <p>Completa el formulario con tu información para ver la previsualización</p>
      </div>
    );
  }

  return (
     <div className="cvpreview__wrapper">
    <>
      {/* Botón fuera del área exportable */}
      <div className="cvpreview__export-bar">
        <ExportPDFButton />
        <button className="export-pdf-btn" onClick={() => setVertical((v) => !v)}>
          {vertical
            ? <><LayoutList size={16} className="export-pdf-btn__icon" /> Dos columnas</>
            : <><LayoutList size={16} className="export-pdf-btn__icon" /> Una columna</>
          }
        </button>
      </div>

      {/* Todo lo de adentro se exporta al PDF */}
      <div className={`cvpreview${vertical ? " cvpreview--vertical" : ""}`} id="cv-preview-export">

        {/* Cabecera / Datos personales */}
        {personal?.nombre && (
          <header className="cvpreview__header">
            <div className="cvpreview__header-left">
              {personal.foto && (
                <img
                  src={personal.foto}
                  alt="Foto de perfil"
                  className="cvpreview__foto"
                  onError={(e) => (e.target.style.display = "none")}
                />
              )}
              <div className="cvpreview__header-info">
                <h1 className="cvpreview__nombre">{personal.nombre}</h1>
                {personal.carrera && (
                  <p className="cvpreview__carrera">{personal.carrera}</p>
                )}
                <div className="cvpreview__contacto">
                  {personal.ciudad && (
                    <span>
                      <MapPin size={14} /> {personal.ciudad}
                    </span>
                  )}
                  {personal.email && (
                    <span>
                      <Mail size={14} /> {personal.email}
                    </span>
                  )}
                  {personal.telefono && (
                    <span>
                      <Phone size={14} /> {personal.telefono}
                    </span>
                  )}
                </div>
                {personal.enlaces?.filter((e) => e.url).length > 0 && (
                  <div className="cvpreview__enlaces">
                    {personal.enlaces
                      .filter((e) => e.url)
                      .map((enlace) => (
                        <a
                          key={enlace.id}
                          href={enlace.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cvpreview__enlace-tag"
                        >
                          {enlace.tipo || "Enlace"} ↗
                        </a>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </header>
        )}

        <div className="cvpreview__body">
          {/* Columna izquierda */}
          <div className="cvpreview__col-left">

            {/* Perfil profesional */}
            {personal?.descripcion && (
              <section className="cvpreview__section">
                <h2 className="cvpreview__section-title">
                  <UserRoundPen size={20} className="cvpreview__section-icon" />
                  Perfil profesional
                </h2>
                <p className="cvpreview__descripcion">{personal.descripcion}</p>
              </section>
            )}

            {/* Experiencia */}
            {expItems.length > 0 && (
              <section className="cvpreview__section">
                <h2 className="cvpreview__section-title">
                  <Briefcase size={20} className="cvpreview__section-icon" />
                  Experiencia
                </h2>
                <div className="cvpreview__timeline">
                  {expItems.map((exp) => (
                    <div key={exp.id} className="cvpreview__timeline-item">
                      <div className="cvpreview__timeline-dot" />
                      <div className="cvpreview__timeline-content">
                        <div className="cvpreview__exp-header">
                          <strong>{exp.puesto}</strong>
                          <span className="cvpreview__periodo">{exp.periodo}</span>
                        </div>
                        <p className="cvpreview__institucion">{exp.institucion}</p>
                        <p className="cvpreview__exp-desc">{exp.descripcion}</p>
                        {exp.tecnologias && (
                          <p className="cvpreview__techs">
                            <Wrench size={14} /> {exp.tecnologias}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Proyectos */}
            {proyectos?.length > 0 && (
              <section className="cvpreview__section">
                <h2 className="cvpreview__section-title">
                  <FolderOpen size={20} className="cvpreview__section-icon" />
                  Proyectos
                </h2>
                {proyectos.map((p) => (
                  <div key={p.id} className="cvpreview__proyecto">
                    <div className="cvpreview__proyecto-header">
                      <strong>{p.nombre}</strong>
                      <div className="cvpreview__proyecto-links">
                        {p.repositorio && (
                          <a href={p.repositorio} target="_blank" rel="noopener noreferrer">
                            GitHub ↗
                          </a>
                        )}
                        {p.deploy && (
                          <a href={p.deploy} target="_blank" rel="noopener noreferrer">
                            Demo ↗
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="cvpreview__proyecto-desc">{p.descripcion}</p>
                    {p.tecnologias && (
                      <div className="cvpreview__tech-chips">
                        {p.tecnologias.split(",").map((t, i) => (
                          <span key={i} className="cvpreview__chip">{t.trim()}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Columna derecha */}
          <div className="cvpreview__col-right">

            {/* Habilidades */}
            {habilidades?.length > 0 && (
              <section className="cvpreview__section">
                <h2 className="cvpreview__section-title">
                  <Brain size={20} className="cvpreview__section-icon" />
                  Habilidades
                </h2>
                {Object.entries(
                  habilidades.reduce((acc, h) => {
                    const cat = h.categoria || "Otras";
                    if (!acc[cat]) acc[cat] = [];
                    acc[cat].push(h);
                    return acc;
                  }, {})
                ).map(([cat, items]) => (
                  <div key={cat} className="cvpreview__skill-group">
                    <p className="cvpreview__skill-cat">{cat}</p>
                    {items.map((h) => (
                      <div key={h.id} className="cvpreview__skill-item">
                        <div className="cvpreview__skill-row">
                          <span>{h.nombre}</span>
                          <span className="cvpreview__skill-nivel">{h.nivel}</span>
                        </div>
                        <div className="cvpreview__skill-bar">
                          <div
                            className="cvpreview__skill-bar-fill"
                            style={{
                              width:
                                h.nivel === "Básico"
                                  ? "33%"
                                  : h.nivel === "Intermedio"
                                  ? "66%"
                                  : "100%",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </section>
            )}

            {/* Educación */}
            {educacion?.length > 0 && (
              <section className="cvpreview__section">
                <h2 className="cvpreview__section-title">
                  <GraduationCap size={20} className="cvpreview__section-icon" />
                  Educación
                </h2>
                {educacion.map((edu) => (
                  <div key={edu.id} className="cvpreview__edu-item">
                    <strong>{edu.programa}</strong>
                    <p className="cvpreview__edu-inst">
                      {edu.institucion} · {edu.periodo}
                    </p>
                    {edu.descripcion && (
                      <p className="cvpreview__edu-desc">{edu.descripcion}</p>
                    )}
                    {edu.enlace && (
                      <a
                        href={edu.enlace}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cvpreview__edu-link"
                      >
                        Ver certificado ↗
                      </a>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Idiomas */}
            {idiomaItems.length > 0 && (
              <section className="cvpreview__section">
                <h2 className="cvpreview__section-title">
                  <Languages size={20} className="cvpreview__section-icon" />
                  Idiomas
                </h2>
                {idiomaItems.map((idioma) => (
                  <div key={idioma.id} className="cvpreview__idioma-item">
                    <div className="cvpreview__skill-row">
                      <span>{idioma.idioma}</span>
                      <span className="cvpreview__skill-nivel">{idioma.nivel}</span>
                    </div>
                    {idioma.descripcion && (
                      <p className="cvpreview__idioma-cert">{idioma.descripcion}</p>
                    )}
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </>
    </div>
  );
}

export default Preview;
