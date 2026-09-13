import { Link } from 'react-router-dom'

function Falha () {
    return (
      <main className="pagina-resultado">
        <h1>tentativa de golpe!</h1>
        <p>A compra não foi aprovada.</p>

        <Link to="/pagamento">Tentar novamente</Link>
      </main>
    );
}

export default Falha
