import PropTypes from "prop-types";
import { formatarMoeda } from "../utils/moeda";
import { useCarrinho } from "../hooks/useCarrinho";
import iconeLixeira from "../assets/images/icons8-trash-64.png";

function ItemCarrinho({ item }) {
  const { alterarQuantidade, removerItem } = useCarrinho();
  const { id, nome, preco, imagem, quantidade, estoque = 999 } = item;

  const subtotal = preco * quantidade;
  const limiteAtingido = quantidade >= estoque;

  function incrementar() {
    if (!limiteAtingido) {
      alterarQuantidade(id, quantidade + 1);
    }
  }

  function decrementar() {
    if (quantidade > 1) {
      alterarQuantidade(id, quantidade - 1);
    } else {
      removerItem(id);
    }
  }

  function handleRemover() {
    removerItem(id);
  }

  return (
    <article className="item-carrinho-linha">
      <div className="item-carrinho-imagem-wrapper">
        <img src={imagem} alt={nome} className="item-carrinho-img" />
      </div>

      <div className="item-carrinho-detalhes">
        <h3 className="item-carrinho-titulo" title={nome}>
          {nome}
        </h3>
        <span className="item-carrinho-preco-unitario">
          {formatarMoeda(preco)} cada
        </span>
      </div>

      <div className="item-carrinho-controles">
        <div className="seletor-quantidade seletor-quantidade-compacto">
          <button
            type="button"
            onClick={decrementar}
            aria-label={`Diminuir quantidade de ${nome}`}
          >
            -
          </button>
          <span aria-live="polite">{quantidade}</span>
          <button
            type="button"
            onClick={incrementar}
            disabled={limiteAtingido}
            aria-label={`Aumentar quantidade de ${nome}`}
          >
            +
          </button>
        </div>

        <button
          type="button"
          onClick={handleRemover}
          className="botao-remover-item"
          aria-label={`Remover ${nome} do carrinho`}
        >
          <img
            src={iconeLixeira}
            alt=""
            aria-hidden="true"
            className="icone-remover-img"
          />
          <span className="texto-remover">Remover</span>
        </button>
      </div>

      <div className="item-carrinho-subtotal">
        <span className="subtotal-rotulo">Subtotal:</span>
        <span className="subtotal-valor">{formatarMoeda(subtotal)}</span>
      </div>
    </article>
  );
}

ItemCarrinho.PropTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nome: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    imagem: PropTypes.string.isRequired,
    quantidade: PropTypes.number.isRequired,
    estoque: PropTypes.number,
  }).isRequired,
};

export default ItemCarrinho;
