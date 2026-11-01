import { Link } from "react-router-dom";
import iconeVoltar from "../assets/images/icons8-backhand-index-pointing-left-96.png";

function NaoEncontrada() {
  return (
    <div className="nao-encontrada-container">
      <div className="nao-encontrada-card">
        <span className="codigo-404">404</span>
        <h1 className="nao-encontrada-titulo">Página não encontrada</h1>
        <p className="nao-encontrada-texto">
          Ops! O endereço que você tentou acessar não existe, foi removido ou
          está temporariamente indisponível.
        </p>
        <Link to="/produtos" className="botao-voltar-catalogo">
          <img
            src={iconeVoltar}
            alt=""
            aria-hidden="true"
            className="icone-voltar-img"
          />
          <span>Voltar para o catálogo</span>
        </Link>
      </div>
    </div>
  );
}

export default NaoEncontrada;
