import { useCV } from "../context/CVContext";
import { useEffect, useRef } from "react";
import { Chart, ArcElement, PieController, Legend, Tooltip } from "chart.js";
import "../styles/Dashboard.css";

Chart.register(ArcElement, PieController, Legend, Tooltip);

const NIVEL_VALOR = { Básico: 33, Intermedio: 66, Avanzado: 100, Nativo: 100 };

function promediosPorCategoria(habilidades) {
  const map = {};
  habilidades.forEach((h) => {
    if (!map[h.categoria]) map[h.categoria] = [];
    map[h.categoria].push(NIVEL_VALOR[h.nivel] || 0);
  });
  const labels = Object.keys(map);
  const data = labels.map((cat) =>
    Math.round(map[cat].reduce((a, b) => a + b, 0) / map[cat].length)
  );
  return { labels, data };
}

function generarResumen(cv) {
  const p = cv.personal || {};
  const nombre = p.nombre || "el usuario";
  const carrera = p.carrera || "su área profesional";
  const ciudad = p.ciudad || "";

  const experiencias = (cv.experiencia || []).filter(
    (e) => e.tipo === "experiencia"
  );
  const idiomas = (cv.experiencia || []).filter(
    (e) => e.tipo === "idioma"
  );
  const edus = cv.educacion || [];
  const habs = cv.habilidades || [];
  const proyectos = cv.proyectos || [];

  const eduPrincipal =
    edus.find((e) => e.institucion && e.programa) || null;

  const eduTexto = eduPrincipal
    ? `${nombre} estudió ${eduPrincipal.programa} en la ${eduPrincipal.institucion} desde ${eduPrincipal.periodo}.`
    : `${nombre} cuenta con formación en ${carrera}.`;

  let expTexto = "";

  if (experiencias.length === 1) {
    const e = experiencias[0];
    expTexto = `Se desempeñó como ${e.puesto} en ${e.institucion} desde ${e.periodo}.`;
  } else if (experiencias.length > 1) {
    const reciente = experiencias[0];
    expTexto = `Su experiencia más reciente es como ${reciente.puesto} en ${reciente.institucion} (${reciente.periodo}), acumulando un total de ${experiencias.length} posiciones a lo largo de su trayectoria.`;
  }

  const avanzadas = habs
    .filter((h) => h.nivel === "Avanzado")
    .map((h) => h.nombre);

  let habTexto = "";

  if (avanzadas.length > 0) {
    const muestra = avanzadas.slice(0, 3).join(", ");
    habTexto = `Cuenta con dominio avanzado en ${muestra}${
      avanzadas.length > 3
        ? ` y ${avanzadas.length - 3} tecnologías más`
        : ""
    }.`;
  }

  const proyTexto =
    proyectos.length > 0
      ? `Ha desarrollado ${proyectos.length} proyecto${
          proyectos.length > 1 ? "s" : ""
        }, incluyendo ${proyectos[0].nombre}.`
      : "";

  const idiomaTexto =
    idiomas.length > 0
      ? `Habla ${idiomas
          .map((i) => `${i.idioma} (${i.nivel})`)
          .join(", ")}.`
      : "";

  return {
    nombre,
    carrera,
    ciudad,
    eduTexto,
    expTexto,
    habTexto,
    proyTexto,
    idiomaTexto,
    experiencias,
    idiomas,
    habs,
  };
}
function Dashboard() {
  return <h1>Dashboard de habilidades</h1>;
  const { cv } = useCV();
  const chartRef  = useRef(null);
  const chartInst = useRef(null);

  const habilidades = cv.habilidades || [];
  const r      = generarResumen(cv);
  const cats   = [...new Set(habilidades.map((h) => h.categoria))];
  const partes = [r.eduTexto, r.expTexto, r.habTexto, r.proyTexto, r.idiomaTexto].filter(Boolean);

  useEffect(() => {
    if (!chartRef.current || habilidades.length === 0) return;

    const { labels, data } = promediosPorCategoria(habilidades);

    if (chartInst.current) chartInst.current.destroy();

    const porcentajesPlugin = {
      id: "porcentajes",
      afterDatasetsDraw(chart) {
        const { ctx } = chart;
        chart.data.datasets.forEach((dataset, i) => {
          const meta = chart.getDatasetMeta(i);
          const total = dataset.data.reduce((a, b) => a + b, 0);
          meta.data.forEach((arc, index) => {
            const valor = dataset.data[index];
            const porcentaje = Math.round((valor / total) * 100) + "%";
            const { x, y } = arc.tooltipPosition();
            ctx.save();
            ctx.font = "bold 13px sans-serif";
            ctx.fillStyle = "#ffffff";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(porcentaje, x, y);
            ctx.restore();
          });
        });
      },
    };

    const colores = ["#c1a17d", "#ddc077", "#d2c58c", "#c9986e", "#8B7355", "#D4B896"];

    chartInst.current = new Chart(chartRef.current, {
      type: "pie",
      plugins: [porcentajesPlugin],
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: colores.slice(0, labels.length),
          borderWidth: 2,
          borderColor: "#fff",
        }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              padding: 16,
              font: { size: 12 },
              color: "rgba(61,61,58,0.75)",
              boxWidth: 12,
              boxHeight: 12,
            },
          },
          tooltip: { enabled: false },
        },
      },
    });

    return () => {
      if (chartInst.current) chartInst.current.destroy();
    };
  }, [habilidades]);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="dashboard__grid">

        <div className="dashboard__panel">
          <h3 className="dashboard__panel-title">Habilidades por categoría</h3>
          {habilidades.length === 0 ? (
            <p className="dashboard__empty">Agrega habilidades para ver la gráfica.</p>
          ) : (
            <div className="dashboard__radar-wrap" style={{ height: "280px" }}>
              <canvas ref={chartRef} role="img" aria-label="Distribución de habilidades por categoría" />
            </div>
          )}
        </div>

        <div className="dashboard__panel">
          <h3 className="dashboard__panel-title">Resumen profesional</h3>

          <p className="dashboard__nombre">{r.nombre}</p>
          <p className="dashboard__carrera">
            {r.carrera}{r.ciudad ? ` · ${r.ciudad}` : ""}
          </p>

          <hr className="dashboard__divider" />

          {partes.length > 0 ? (
            <p className="dashboard__texto">{partes.join(" ")}</p>
          ) : (
            <p className="dashboard__empty">
              Completa tus datos personales, educación y experiencia para ver el resumen.
            </p>
          )}

          {cats.length > 0 && (
            <div className="dashboard__badges">
              {cats.map((cat) => (
                <span key={cat} className="dashboard__badge">{cat}</span>
              ))}
            </div>
          )}

          <div className="dashboard__stats">
            <div className="dashboard__stat">
              <span className="dashboard__stat-num">{habilidades.length}</span>
              <span className="dashboard__stat-label">Habilidades</span>
            </div>
            <div className="dashboard__stat">
              <span className="dashboard__stat-num">{r.experiencias.length}</span>
              <span className="dashboard__stat-label">Experiencias</span>
            </div>
            <div className="dashboard__stat">
              <span className="dashboard__stat-num">{r.idiomas.length}</span>
              <span className="dashboard__stat-label">Idiomas</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;