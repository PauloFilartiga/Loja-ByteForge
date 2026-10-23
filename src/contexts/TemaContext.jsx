import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const CHAVE_STORAGE_TEMA = "@byteforge: tema";

const TemaContext = createContext(null);

export function TemaProvider({ children }) {
  const [tema, setTema] = useState(() => {
    try {
      const temaSalvo = localStorage.getItem(CHAVE_STORAGE_TEMA);
      if (temaSalvo === "light" || temaSalvo === "dark") {
        return temaSalvo;
      }
      // Se não tiver preferência salva, verificar a do S.O.
      return window.matchMedia("(prefers-color-schema: dark)").matches
        ? "dark"
        : "light";
    } catch {
      return "dark"; // Padrão da ByteForge (visual gamer/tech)
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_STORAGE_TEMA, tema);
      // Aplica o tema direto na raiz (HTML) para estilização via CSS
      document.documentElement.setAttribute("data-theme", tema);
    } catch (erro) {
      console.error("Erro ao salvar preferência de tema:", erro);
    }
  }, [tema]);

  function alternarTema() {
    setTema((temaAtual) => (temaAtual === "dark" ? "light" : "dark"));
  }

  const valorContexto = {
    tema,
    alternarTema,
    isEscuro: tema === "dark",
  };

  return (
    <TemaContext.Provider value={valorContexto}>
      {children}
    </TemaContext.Provider>
  );
}

TemaProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
