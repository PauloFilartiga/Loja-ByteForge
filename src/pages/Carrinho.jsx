import { Link } from "react-router-dom";
import ItemCarrinho from "../components/ItemCarrinho";
import ResumoCompra from "../components/ResumoCompra";
import { produtos } from "../data/produtos";

function Carrinho() {
  const quantidadeItens = produtos.reduce(
    (total, produto) => total + produto.quantidade,
    0,
  );

  const totalCompra = produtos.reduce(
    (total, produto) => total + produto.precoUnitario * produto.quantidade,
    0,
  );

  return (
    <main className="pagina-carrinho">
      <header>
        <p>Checkout React</p>
        <h1>Carrinho de compras</h1>
      </header>

      <section aria-labelledby="titulo-produtos">
        <h2 id="titulo-produtos">Produtos</h2>

        <div className="lista-produtos">
          {produtos.map((produto) => (
            <ItemCarrinho key={produto.id} produto={produto} />
          ))}
        </div>
      </section>

      <Link className="link-finalizar" to="/pagamento">
        Finalizar compra
      </Link>
      
      <ResumoCompra quantidadeItens={quantidadeItens} total={totalCompra} />
    </main>
  );
}

export default Carrinho;
