import { Link, NavLink } from "react-router-dom";
import logoByteForge from "../assets/images/logo-ByteForge.png";
import { useCarrinho } from "../hooks/useCarrinho";
import { useTema } from "../hooks/useTema";
import nightIcon from "../assets/images/icons8-night-96.png";
import dayIcon from "../assets/images/icons8-partly-cloudy-day-96.png"

function Header() {
  const { quantidadeTotal } = useCarrinho();
  const { tema, alternarTema } = useTema();

  return (
    <header className="cabecalho-principal">
      <div className="cabecalho-conteudo">
        <Link to="/" className="logotipo">
          <img
            src={logoByteForge}
            alt="Logotipo ByteForge"
            className="logo-imagem"
          />
        </Link>

        <nav className="navegacao-principal" aria-label="Navegação Principal">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "link-nav link-ativo" : "link-nav"
            }
          >
            Catálogo
          </NavLink>

          <NavLink
            to="/carrinho"
            className={({ isActive }) =>
              isActive ? "link-nav link-ativo" : "link-nav"
            }
          >
            <span>Carrinho</span>
            {quantidadeTotal > 0 && (
              <span
                className="badge-carrinho"
                aria-label={`${quantidadeTotal} itens no carrinho`}
              >
                {quantidadeTotal}
              </span>
            )}
          </NavLink>
        </nav>

        <div className="acoes-cabecalho">
          <button
            type="button"
            className="botao-tema"
            onClick={alternarTema}
            aria-label={`Alternar para tema ${tema === "dark" ? "claro" : "escuro"}`}
            title={`Tema atual: ${tema === "dark" ? "Escuro" : "Claro"}`}
          >
            <img
              src={tema === "dark" ? nightIcon : dayIcon}
              alt=""
              aria-hidden="true"
              className="icone-tema-img"
            />
            <span>{tema === "dark" ? "Claro" : "Escuro"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
