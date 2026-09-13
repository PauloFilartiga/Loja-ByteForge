import { Link } from 'react-router-dom'

function Sucesso() {
    return (
      <main className="pagina-resultado resultado-sucesso">
        <h1>Compra aprovada</h1>
        <p>Seu pagamento foi processado com sucesso.</p>

        <Link to="/">Voltar para carrinho</Link>
      </main>
    );
}

export default Sucesso
