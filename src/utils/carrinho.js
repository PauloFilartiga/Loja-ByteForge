/**
 * Calcula o valor total de uma lista de itens do carrinho.
 * @param {Array<{ preco: number, quantidade: number }>} itens
 * @returns {number}
 */

export function calcularTotal(itens) {
  if (!Array.isArray(itens) || itens.length === 0) {
    return 0;
  }

  const total = itens.reduce((acumulador, item) => {
    const preco = typeof item?.preco === "number" ? item.preco : 0;
    const quantidade =
      typeof item?.quantidade === "number" ? item.quantidade : 0;
    return acumulador + preco * quantidade;
  }, 0);

  return Number(total.toFixed(2));
}

/**
 * Calcula a quantidade total de itens no carrinho.
 * @param {Array<{ quantidade: number }>} itens
 * @returns {number}
 */
export function calcularQuantidadeTotal(itens) {
  if (!Array.isArray(itens) || itens.length === 0) {
    return 0;
  }

  return itens.reduce((acumulador, item) => {
    const quantidade =
      typeof item?.quantidade === "number" ? item.quantidade : 0;
    return acumulador + quantidade;
  }, 0);
}
