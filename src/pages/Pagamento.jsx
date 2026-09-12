import { Link } from "react-router-dom";

function Pagamento() {
  return (
    <main className="pagina-pagamento">
      <h1>Pagamento</h1>
      <p>Preencha os dados do cartão para finalizar a compra.</p>

      <Link to="/">Voltar para o carrinho</Link>
    </main>
  );
}

export default Pagamento;
