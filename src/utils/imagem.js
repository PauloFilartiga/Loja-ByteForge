const HOSTS_UNSPLASH = ["images.unsplash.com", "plus.unsplash.com"];

/**
 * Verifica se a URL aponta para o CDN de imagens do Unsplash.
 * @param {string} url
 * @returns {boolean}
 */
export function ehImagemUnsplash(url) {
  /**
   * Gera uma URL do Unsplash redimensionada e comprimida.
   * URLs de outros domínios são devolvidas sem alteração.
   * @param {string} url
   * @param {{ largura?: number, altura?: number, qualidade?: number }} opcoes
   * @returns {string}
   */
  try {
    return HOSTS_UNSPLASH.includes(new URL(url).hostname);
  } catch {
    return false;
  }
}

export function urlUnsplash(url, { largura, altura, qualidade = 60 } = {}) {
  if (!ehImagemUnsplash(url)) return url;

  const u = new URL(url);

  if (largura) u.searchParams.set("w", String(Math.round(largura)));
  if (altura) {
    u.searchParams.set("h", String(Math.round(altura)));
  } else {
    u.searchParams.delete("h");
  }

  u.searchParams.set("fit", "crop");
  u.searchParams.set("q", String(qualidade));
  u.searchParams.set("auto", "format");

  return u.toString();
}

/**
 * Monta o atributo srcset com várias larguras, mantendo a proporção.
 * Retorna undefined para imagens que não são do Unsplash.
 * @param {string} url
 * @param {number[]} larguras
 * @param {number} proporcao largura / altura (ex.: 4 / 3)
 * @returns {string | undefined}
 */
export function srcSetUnsplash(url, larguras, proporcao = 4 / 3) {
  if (!ehImagemUnsplash(url)) return undefined;

  return larguras
    .map(
      (largura) =>
        `${urlUnsplash(url, { largura, altura: largura / proporcao })} ${largura}w`,
    )
    .join(", ");
}
