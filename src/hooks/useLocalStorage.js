import { useState, useEffect } from "react";

function useLocalStorage(clave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const guardado = localStorage.getItem(clave);
      return guardado ? JSON.parse(guardado) : valorInicial;
    } catch (error) {
      console.error("Error al leer LocalStorage:", error);
      return valorInicial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch (error) {
      console.error("Error al guardar en LocalStorage:", error);
    }
  }, [clave, valor]);

  const eliminar = () => {
    try {
      localStorage.removeItem(clave);
      setValor(valorInicial);
    } catch (error) {
      console.error("Error al eliminar de LocalStorage:", error);
    }
  };

  return [valor, setValor, eliminar];
}

export default useLocalStorage;