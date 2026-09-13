import { useState } from "react";
import { todosDigitosIguais } from "../utils/pagamento";

function simularPagamneto(numeroCartao) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const compraAprovada = !todosDigitosIguais(numeroCartao);
      resolve(compraAprovada);
    }, 1500);
  });
}

function usePagamento() {
  const [processando, setProcessando] = useState(false);

  async function processarPagamento(numeroCartao) {
    if (processando) {
      return null;
    }

    setProcessando(true);

    try {
      const compraAprovada = await simularPagamneto(numeroCartao);
      return compraAprovada;
    } finally {
      setProcessando(false);
    }
  }

  return {
    processando,
    processarPagamento,
  };
}

export default usePagamento;
