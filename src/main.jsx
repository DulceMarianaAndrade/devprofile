import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CVProvider } from "./context/CVContext";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/dark-mode.css"
import "./styles/About.css"
import "./styles/Home.css"
import "./styles/Navbar.css"
import "./styles/ThemeToggle.css"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CVProvider>
        <App />
      </CVProvider>
    </BrowserRouter>
  </StrictMode>
);