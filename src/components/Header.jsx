import { Link, NavLink } from "react-router-dom";
import { useCarrinho } from "../hooks/useCarrinho";
import { useTema } from "../hooks/useTema";
import logoByteForge from "../assets/images/logo-ByteForge.png";
import iconeTemaEscuro from "../assets/images/icons8-night-96.png";
import iconeTemaClaro from "../assets/images/icons8-partly-cloudy-day-96.png";
import iconeCarrinhoVazio from "../assets/images/icons8-shopping-cart-64.png";
import iconeCarrinhoCheio from "../assets/images/icons8-buying-64.png";

function Header() {
  const { quantidadeTotal } = useCarrinho();
  const { tema, alternarTema } = useTema();

  const carrinhoVazio = quantidadeTotal === 0;

  return (
    <header className="cabecalho-principal">
      <div className="cabecalho-conteudo">
        <Link
          to="/produtos"
          className="logo-container"
          aria-label="ByteForge Inicio"
        >
          <img src={logoByteForge} alt="ByteForge" className="logo-img" />
          <span className="logo-texto">ByteForge</span>
        </Link>

        <nav className="navegacao-principal" aria-label="Navegação Principal">
          <NavLink
            to="/produtos"
            className={({ isActive }) =>
              `link-navegacao ${isActive ? "link-ativo" : ""}`
            }
          >
            Catálogo
          </NavLink>

          <NavLink
            to="/carrinho"
            className={({ isActive }) =>
              `link-navegacao link-carrinho ${isActive ? "link-ativo" : ""}`
            }
            aria-label={`Carrinho com ${quantidadeTotal} itens`}
          >
            <div className="carrinho-icone-wrapper">
              <img
                src={carrinhoVazio ? iconeCarrinhoVazio : iconeCarrinhoCheio}
                alt=""
                aria-hidden="true"
                className="icone-carrinho-img"
              />
              {quantidadeTotal > 0 && (
                <span className="badge-carrinho" aria-live="polite">
                  {quantidadeTotal}
                </span>
              )}
            </div>
            <span>Carrinho</span>
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
              src={tema === "dark" ? iconeTemaClaro : iconeTemaEscuro}
              alt=""
              aria-hidden="true"
              className="icone-tema-img"
            />
            <span>{tema === "dark" ? "Modo Claro" : "Modo Escuro"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
