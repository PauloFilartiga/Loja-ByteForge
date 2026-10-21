import dbData from "../../db.json";

const API_BASE_URL = "http://localhost:3001";

/**
 * Obtém a lista completa de produtos.
 * Tenta consumir a API simulada (json-server). Se falhar ou estiver em produção,
 * utiliza o db.json importado como fallback para garantir o funcionamento.
 * @returns {Promise<Array>}
 */
export async function obterProdutos() {
  try {
    const resposta = await fetch(`${API_BASE_URL}/produtos`);
    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.statusText}`);
    }
    return await resposta.json();
  } catch (erro) {
    console.warn(
      "API indisponível ou em modo offline. Utilizando dados de fallback:",
      erro.message,
    );
    return dbData.produtos || [];
  }
}

/**
 * Obtém os detalhes de um produto específico pelo ID.
 * @param {string|number} id
 * @returns {Promise<Object>}
 */
export async function obterProdutoPorId(id) {
  try {
    const resposta = await fetch(`${API_BASE_URL}/produtos/${id}`);
    if (!resposta.ok) {
      throw new Error(`Erro na requisição: ${resposta.statusText}`);
    }
    return await resposta.json();
  } catch (erro) {
    console.warn(`Buscando produto ${id} no fallback local:`, erro.message);
    const produtoEncontrado = dbData.produtos?.find(
      (item) => String(item.id) === String(id),
    );

    if (!produtoEncontrado) {
      throw new Error("Produto não encontrado.", { cause: erro });
    }

    return produtoEncontrado;
  }
}
