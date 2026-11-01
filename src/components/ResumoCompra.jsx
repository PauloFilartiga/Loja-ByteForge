import PropTypes from "prop-types";
import { useCarrinho } from "../hooks/useCarrinho";
import { formatarMoeda } from "../utils/moeda";

function ResumoCompra({ onFinalizar, quantidadeItens, total }) {
  const carrinho = useCarrinho();

  // Usa as props se forem fornecidas (útil para testes ou reaproveitamento),
  // caso contrário pega direto do contexto global do carrinho:
  const qtd = quantidadeItens ?? carrinho.quantidadeTotal;
  const valor = total ?? carrinho.valorTotal;

  return (
    <aside className="resumo-compra" aria-labelledby="titulo-resumo">
      <h2 id="titulo-resumo">Resumo da compra</h2>

      <div className="resumo-linha">
        <span>Quantidade:</span>
        <span>
          {qtd} {qtd === 1 ? "item" : "itens"}
        </span>
      </div>

      <div className="resumo-total">
        <span>Total:</span>
        <span>{formatarMoeda(valor)}</span>
      </div>

      {onFinalizar && (
        <button
          type="button"
          onClick={onFinalizar}
          disabled={qtd === 0}
          className="botao-finalizar-compra"
        >
          Prosseguir para Pagamento
        </button>
      )}
    </aside>
  );
}

ResumoCompra.propTypes = {
  onFinalizar: PropTypes.func,
  quantidadeItens: PropTypes.number,
  total: PropTypes.number,
};

export default ResumoCompra;
