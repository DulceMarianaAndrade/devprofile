import { useCV } from "../context/CVContext";
import { useEffect, useRef } from "react";
import { Chart, ArcElement, PieController, Legend, Tooltip, BarController, CategoryScale, LinearScale, BarElement } from "chart.js";
import "../styles/Dashboard.css";

Chart.register(ArcElement, PieController, Legend, Tooltip, BarController, CategoryScale, LinearScale, BarElement);

const NIVEL_VALOR = { Básico: 33, Intermedio: 66, Avanzado: 100, Nativo: 100 };
const NIVEL_COLOR = { Básico: "#D4B896", Intermedio: "#C9A96E", Avanzado: "#8B7355" };

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
  const nombre  = p.nombre  || "el usuario";
  const carrera = p.carrera || "su área profesional";
  const ciudad  = p.ciudad  || "";

  const experiencias = (cv.experiencia || []).filter((e) => e.tipo === "experiencia");
  const idiomas      = (cv.experiencia || []).filter((e) => e.tipo === "idioma");
  const edus         = cv.educacion || [];
  const habs         = cv.habilidades || [];
  const proyectos    = cv.proyectos || [];

  const eduPrincipal = edus.find((e) => e.institucion && e.programa) || null;
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

  const avanzadas = habs.filter((h) => h.nivel === "Avanzado").map((h) => h.nombre);
  let habTexto = "";
  if (avanzadas.length > 0) {
    const muestra = avanzadas.slice(0, 3).join(", ");
    habTexto = `Cuenta con dominio avanzado en ${muestra}${avanzadas.length > 3 ? ` y ${avanzadas.length - 3} tecnologías más` : ""}.`;
  }

  const proyTexto =
    proyectos.length > 0
      ? `Ha desarrollado ${proyectos.length} proyecto${proyectos.length > 1 ? "s" : ""}, incluyendo ${proyectos[0].nombre}.`
      : "";

  const idiomaTexto =
    idiomas.length > 0
      ? `Habla ${idiomas.map((i) => `${i.idioma} (${i.nivel})`).join(", ")}.`
      : "";

  return {
    nombre, carrera, ciudad,
    eduTexto, expTexto, habTexto, proyTexto, idiomaTexto,
    experiencias, idiomas, habs,
  };
}

function Dashboard() {
  const { cv } = useCV();
  const chartRef     = useRef(null);
  const chartInst    = useRef(null);
  const barChartRef  = useRef(null);
  const barChartInst = useRef(null);

  const habilidades  = cv.habilidades || [];
  const experiencias = (cv.experiencia || []).filter((e) => e.tipo === "experiencia");
  const idiomas      = (cv.experiencia || []).filter((e) => e.tipo === "idioma");
  const r            = generarResumen(cv);
  const cats         = [...new Set(habilidades.map((h) => h.categoria))];
  const partes       = [r.eduTexto, r.expTexto, r.habTexto, r.proyTexto, r.idiomaTexto].filter(Boolean);

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
        datasets: [{ data, backgroundColor: colores.slice(0, labels.length), borderWidth: 2, borderColor: "#fff" }],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom", labels: { padding: 16, font: { size: 12 }, color: "rgba(61,61,58,0.75)", boxWidth: 12, boxHeight: 12 } },
          tooltip: { enabled: false },
        },
      },
    });

    return () => { if (chartInst.current) chartInst.current.destroy(); };
  }, [habilidades]);

  useEffect(() => {
    if (!barChartRef.current || habilidades.length === 0) return;

    if (barChartInst.current) barChartInst.current.destroy();

    const labels = habilidades.map((h) => h.nombre);
    const data   = habilidades.map((h) => NIVEL_VALOR[h.nivel] || 0);
    const colors = habilidades.map((h) => NIVEL_COLOR[h.nivel] || "#D4B896");

    barChartInst.current = new Chart(barChartRef.current, {
      type: "bar",
      data: {
        labels,
        datasets: [{ data, backgroundColor: colors, borderRadius: 4, borderSkipped: false }],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false },
        },
        scales: {
          x: {
            min: 0, max: 100,
            ticks: {
              stepSize: 33,
              callback: (v) => ({ 0: "", 33: "Básico", 66: "Intermedio", 100: "Avanzado" }[v] || ""),
              color: "rgba(61,61,58,0.55)",
              font: { size: 10 },
            },
            grid: { color: "rgba(61,61,58,0.07)" },
            border: { display: false },
          },
          y: {
            ticks: { color: "rgba(61,61,58,0.75)", font: { size: 11 } },
            grid: { display: false },
            border: { display: false },
          },
        },
      },
    });

    return () => { if (barChartInst.current) barChartInst.current.destroy(); };
  }, [habilidades]);

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>

      <div className="dashboard__grid">

        <div className="dashboard__panel">
          <h3 className="dashboard__panel-title">Habilidades por categoría</h3>
          {habilidades.length === 0 ? (
            <p className="dashboard__empty">Agrega habilidades para ver la grafica</p>
          ) : (
            <div className="dashboard__radar-wrap" style={{ height: "280px" }}>
              <canvas ref={chartRef} role="img" aria-label="Distribución de habilidades por categoría" />
            </div>
          )}
        </div>




        <div className="dashboard__panel">
          <h3 className="dashboard__panel-title">Resumen profesional</h3>
          <p className="dashboard__nombre">{r.nombre}</p>
          <p className="dashboard__carrera">{r.carrera}{r.ciudad ? ` · ${r.ciudad}` : ""}</p>
          <hr className="dashboard__divider" />
          {partes.length > 0 ? (
            <p className="dashboard__texto">{partes.join(" ")}</p>
          ) : (
            <p className="dashboard__empty">Completa tus datos personales, educación y experiencia para ver el resumen</p>
          )}
          {cats.length > 0 && (
            <div className="dashboard__badges">
              {cats.map((cat) => <span key={cat} className="dashboard__badge">{cat}</span>)}
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

      {habilidades.length > 0 && (
        <div className="dashboard__panel dashboard__panel--full">
          <h3 className="dashboard__panel-title">Nivel por habilidad</h3>
          <div style={{ height: `${Math.max(200, habilidades.length * 36 + 40)}px` }}>
            <canvas ref={barChartRef} role="img" aria-label="Nivel de cada habilidad" />
          </div>
        </div>
      )}

      {(idiomas.length > 0 || experiencias.length > 0) && (
        <div className="dashboard__grid">

          {idiomas.length > 0 && (
            <div className="dashboard__panel">
              <h3 className="dashboard__panel-title">Idiomas</h3>
              <table className="dashboard__tabla">
                <thead>
                  <tr>
                    <th>Idioma</th>
                    <th>Nivel</th>
                    <th>Certificación</th>
                  </tr>
                </thead>
                <tbody>
                  {idiomas.map((id) => (
                    <tr key={id.id}>
                      <td>{id.idioma}</td>
                      <td><span className="dashboard__badge">{id.nivel}</span></td>
                      <td>{id.descripcion || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {experiencias.length > 0 && (
            <div className="dashboard__panel">
              <h3 className="dashboard__panel-title">Experiencia</h3>
              <table className="dashboard__tabla">
                <thead>
                  <tr>
                    <th>Puesto</th>
                    <th>Institución</th>
                    <th>Periodo</th>
                  </tr>
                </thead>
                <tbody>
                  {experiencias.map((exp) => (
                    <tr key={exp.id}>
                      <td>{exp.puesto}</td>
                      <td>{exp.institucion}</td>
                      <td>{exp.periodo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      )}

    </div>
  );
}

export default Dashboard;