import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useCarrinho } from "../hooks/useCarrinho";

function Sucesso() {
  const { limparCarrinho } = useCarrinho();

  // Compra aprovada: esvazia o carrinho ao chegar nesta tela
  useEffect(() => {
    limparCarrinho();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="pagina-resultado resultado-sucesso">
      <h1>Compra aprovada</h1>
      <p>Seu pagamento foi processado com sucesso.</p>

      <Link to="/produto">Continuar comprando</Link>
    </main>
  );
}

export default Sucesso;
