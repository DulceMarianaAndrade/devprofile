import { useState, useEffect } from "react";

function useTheme() {
  const [modoOscuro, setModoOscuro] = useState(() => {
    return localStorage.getItem("devprofile-tema") === "oscuro";
  });

  useEffect(() => {
    const raiz = document.documentElement;
    if (modoOscuro) {
      raiz.classList.add("dark");
      localStorage.setItem("devprofile-tema", "oscuro");
    } else {
      raiz.classList.remove("dark");
      localStorage.setItem("devprofile-tema", "claro");
    }
  }, [modoOscuro]);

  const alternarTema = () => setModoOscuro((prev) => !prev);

  return { modoOscuro, alternarTema };
}

export default useTheme;