/**
 * Filtra uma lista de produtos pelo termo digitado no nome, sem diferenciar maiúsculas/minúsculas.
 * @param {Array<{ nome: string }>} produtos
 * @param {string} termo
 * @returns {Array}
 */
export function filtrarProdutos(produtos, termo) {
  if (!Array.isArray(produtos)) {
    return [];
  }

  if (!termo || typeof termo !== "string" || termo.trim() === "") {
    return produtos;
  }

  const termoLimpo = termo.trim().toLowerCase();

  return produtos.filter((produto) =>
    produto?.nome ? produto.nome.toLowerCase().includes(termoLimpo) : false,
  );
}
