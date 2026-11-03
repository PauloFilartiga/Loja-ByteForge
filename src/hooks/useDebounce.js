import { useState, useEffect } from "react";

/**
 * Hook para atrasar a atualização de um valor até que termine um intervalo de digitação
 * @param {any} valor - Valor a ser monitorado
 * @param {number} delay - Tempo em milissegundos (padrão: 300ms)
 * @returns {any} Valor atualizado após o delay
 */

export function useDebounce(valor, delay = 300) {
  const [valorDebounced, setValorDebounced] = useState(valor);

  useEffect(() => {
    const timer = setTimeout(() => {
      setValorDebounced(valor);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [valor, delay]);

  return valorDebounced;
}
