import { useCV } from "../context/CVContext";

function ExportPDFButton() {
  const { cv } = useCV();

  const handleExport = async () => {
    const elemento = document.getElementById("cv-preview-export");
    if (!elemento) {
      alert("No se encontró la previsualización del CV.");
      return;
    }

    const html2pdf = (await import("html2pdf.js")).default;
    const nombre = cv.personal?.nombre?.replace(/\s+/g, "_") || "CV";

    const opciones = {
      margin: [8, 8, 8, 8],
      filename: `${nombre}_CV.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        windowWidth: 900,
      },
      jsPDF: {
        unit: "mm",
        format: "a4",
        orientation: "portrait",
      },
      pagebreak: { mode: ["css", "legacy"] },
    };

    html2pdf().set(opciones).from(elemento).save();
  };

  return (
    <button className="export-pdf-btn" onClick={handleExport}>
      <span>
      Exportar</span>
    </button>
  );
}

export default ExportPDFButton;