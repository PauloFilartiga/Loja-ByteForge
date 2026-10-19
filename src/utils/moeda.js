/**
 * Formata um valor numérico para o padrão de moeda brasileiro (R$ XX,XX).
 * @param {number} valor
 * @returns {string}
 */
export function formatarMoeda(valor) {
  if (typeof valor !== "number" || isNaN(valor)) {
    return "R$ 0,00";
  }

  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
