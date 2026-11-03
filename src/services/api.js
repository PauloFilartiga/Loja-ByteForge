import dbData from "../../db.json";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

// Em produção (Vercel/Netlify) não existe json-server: usa o db.json direto.
// Defina VITE_API_URL no painel do deploy se um dia tiver uma API real.
const USAR_DADOS_LOCAIS = import.meta.env.PROD && !import.meta.env.VITE_API_URL;

/**
 * Obtém a lista completa de produtos.
 * Tenta consumir a API simulada (json-server). Se falhar ou estiver em produção,
 * utiliza o db.json importado como fallback para garantir o funcionamento.
 * @returns {Promise<Array>}
 */
export async function obterProdutos() {
  if (USAR_DADOS_LOCAIS) {
    return dbData.produtos || [];
  }

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
  if (USAR_DADOS_LOCAIS) {
    const produto = dbData.produtos?.find(
      (item) => String(item.id) === String(id),
    );
    if (!produto) throw new Error("Produto não encontrado.");
    return produto;
  }
  
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
