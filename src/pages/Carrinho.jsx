import { Link, useNavigate } from "react-router-dom";
import { useCarrinho } from "../hooks/useCarrinho";
import ItemCarrinho from "../components/ItemCarrinho";
import ResumoCompra from "../components/ResumoCompra";
import iconeVoltar from "../assets/images/icons8-backhand-index-pointing-left-96.png";

function Carrinho() {
  const { itens, limparCarrinho, quantidadeTotal } = useCarrinho();
  const navigate = useNavigate();

  const carrinhoVazio = itens.length === 0;

  function handleIrParaPagamento() {
    navigate("/pagamento");
  }

  if (carrinhoVazio) {
    return (
      <div className="carrinho-container">
        <div className="carrinho-vazio-card" role="status">
          <div className="carrinho-vazio-icone" aria-hidden="true">
            🛒
          </div>
          <h2 className="carrinho-vazio-titulo">Seu carrinho está vazio</h2>
          <p className="carrinho-vazio-texto">
            Parece que você ainda não adicionou nenhum item de hardware ou
            periférico
          </p>
          <Link to="/produtos" className="botao-voltar-catalogo">
            <img
              src={iconeVoltar}
              alt=""
              aria-hidden="true"
              className="icone-voltar-img"
            />
            <span> Explorar produtos</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="carrinho-container">
      <div className="carrinho-cabecalho-linha">
        <h1 className="carrinho-titulo">
          Carrinho de Compras ({quantidadeTotal}{" "}
          {quantidadeTotal === 1 ? "item" : "itens"})
        </h1>

        <button
          type="button"
          onClick={limparCarrinho}
          className="botao-limpar-carrinho"
        >
          Limpar carrinho
        </button>
      </div>

      <div className="carrinho-grid">
        <section
          className="carrinho-lista-itens"
          aria-label="Itens do carrinho"
        >
          {itens.map((item) => (
            <ItemCarrinho key={item.id} item={item} />
          ))}
        </section>

        <aside className="carrinho-resumo-coluna">
          <ResumoCompra onFinalizar={handleIrParaPagamento} />
        </aside>
      </div>
    </div>
  );
}

export default Carrinho;
