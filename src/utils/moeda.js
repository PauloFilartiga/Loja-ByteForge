const CONFIG_MOEDAS = {
  BRL: { locale: "pt-BR", currency: "BRL" },
  USD: { locale: "en-US", currency: "USD" },
  EUR: { locale: "de-DE", currency: "EUR" },
};

/**
 * Formata um valor numérico para o padrão de moeda brasileiro (R$ XX,XX).
 * @param {number} valor
 * @param {'BRL' | 'USD' | 'EUR'} [moeda='BRL']
 * @returns {string}
 */
export function formatarMoeda(valor, moeda = "BRL") {
  const config = CONFIG_MOEDAS[moeda] || CONFIG_MOEDAS.BRL;

  if (typeof valor !== "number" || isNaN(valor)) {
    return (0).toLocaleString(config.locale, {
      style: "currency",
      currency: config.currency,
    });
  }

  return valor.toLocaleString(config.locale, {
    style: "currency",
    currency: config.currency,
  });
}
