import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useCarrinho } from "../hooks/useCarrinho";
import { formatarMoeda } from "../utils/moeda";
import { urlUnsplash, srcSetUnsplash } from "../utils/imagem";

// Larguras geradas para o srcset (proporção 4:3, igual ao CSS do card)
const LARGURAS_CARD = [320, 480, 640, 800];

// Quanto o card ocupa da tela em cada breakpoint de .catalogo-grid
const TAMANHOS_CARD =
  "(min-width: 1200px) 270px, (min-width: 1024px) calc((100vw - 96px) / 4), (min-width: 600px) calc((100vw - 72px) / 2), calc(100vw - 48px)";

function ProdutoCard({
  produto,
  parcelas = 10,
  descontoPix = 10,
  prioridade = false,
}) {
  const { adicionarItem } = useCarrinho();
  const [adicionado, setAdicionado] = useState(false);
  const [favorito, setFavorito] = useState(false);

  useEffect(() => {
    if (!adicionado) return;
    const timer = setTimeout(() => setAdicionado(false), 1600);
    return () => clearTimeout(timer);
  }, [adicionado]);

  const {
    id,
    nome,
    preco,
    precoAntigo,
    imagem,
    categoria,
    estoque = 0,
    avaliacao = 4.8,
  } = produto;

  const esgotado = estoque <= 0;
  const poucasUnidades = !esgotado && estoque <= 5;

  // Cálculos promocionais (estilo e-commerce de hardware)
  const desconto =
    precoAntigo && precoAntigo > preco
      ? Math.round((1 - preco / precoAntigo) * 100)
      : 0;
  const precoPix = preco * (1 - descontoPix / 100);
  const valorParcela = preco / parcelas;

  function handleAdicionar(e) {
    e.preventDefault();
    if (!esgotado) {
      adicionarItem(produto, 1);
      setAdicionado(true);
    }
  }

  function handleFavoritar(e) {
    e.preventDefault();
    e.stopPropagation();
    setFavorito((anterior) => !anterior);
  }

  return (
    <article className={`produto-card ${esgotado ? "card-esgotado" : ""}`}>
      {/* Área da Imagem e Badges */}
      <div className="produto-media-wrapper">
        <Link to={`/produtos/${id}`} className="produto-link-media">
          <img
            src={urlUnsplash(imagem, { largura: 400, altura: 300 })}
            srcSet={srcSetUnsplash(imagem, LARGURAS_CARD)}
            sizes={TAMANHOS_CARD}
            alt={nome}
            className="produto-imagem"
            width="400"
            height="300"
            loading={prioridade ? "eager" : "lazy"}
            fetchPriority={prioridade ? "high" : "auto"}
            decoding="async"
          />
        </Link>

        {/* Badges superiores flutuantes */}
        <div className="produto-chips-topo">
          {categoria && <span className="chip-categoria">{categoria}</span>}
          {desconto > 0 && <span className="chip-desconto">-{desconto}%</span>}
        </div>

        {/* Botão de Favoritar */}
        <button
          type="button"
          onClick={handleFavoritar}
          className={`botao-favoritar ${favorito ? "ativo" : ""}`}
          aria-label={
            favorito ? "Remover dos favoritos" : "Adicionar aos favoritos"
          }
          aria-pressed={favorito}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={favorito ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
      </div>

      {/* Conteúdo do Card */}
      <div className="produto-corpo">
        {/* Status de Estoque e Avaliação */}
        <div className="produto-meta-linha">
          <span
            className={`status-estoque ${
              esgotado
                ? "status-esgotado"
                : poucasUnidades
                  ? "status-poucas"
                  : "status-disponivel"
            }`}
          >
            <span className="dot-estoque" aria-hidden="true" />
            {esgotado
              ? "Esgotado"
              : poucasUnidades
                ? `Últimas ${estoque} un.`
                : `${estoque} em estoque`}
          </span>

          <span className="avaliacao-produto">
            <span className="estrela-icone" aria-hidden="true">
              ★
            </span>
            {avaliacao.toFixed(1)}
          </span>
        </div>

        {/* Título com Link */}
        <Link to={`/produtos/${id}`} className="produto-titulo-link">
          <h3 className="produto-nome" title={nome}>
            {nome}
          </h3>
        </Link>

        {/* Bloco de Preços Moderno */}
        <div className="produto-bloco-precos">
          {precoAntigo && precoAntigo > preco ? (
            <span className="preco-antigo">{formatarMoeda(precoAntigo)}</span>
          ) : (
            <span className="preco-antigo-espaco" aria-hidden="true" />
          )}

          <div className="linha-preco-pix">
            <span className="preco-pix">{formatarMoeda(precoPix)}</span>
            <span className="tag-pix">no Pix ({descontoPix}% off)</span>
          </div>

          <span className="preco-parcelado">
            ou {parcelas}x de {formatarMoeda(valorParcela)} sem juros
          </span>
        </div>

        {/* Botão de Adicionar ao Carrinho com Feedback */}
        <button
          type="button"
          onClick={handleAdicionar}
          disabled={esgotado}
          className={`botao-adicionar-carrinho ${
            esgotado ? "botao-desabilitado" : adicionado ? "botao-sucesso" : ""
          }`}
        >
          {esgotado ? (
            "Indisponível"
          ) : adicionado ? (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Adicionado!
            </>
          ) : (
            <>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="20" r="1.5" />
                <circle cx="18" cy="20" r="1.5" />
                <path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 7H6" />
              </svg>
              Adicionar ao carrinho
            </>
          )}
        </button>
      </div>
    </article>
  );
}

ProdutoCard.propTypes = {
  produto: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nome: PropTypes.string.isRequired,
    preco: PropTypes.number.isRequired,
    precoAntigo: PropTypes.number,
    imagem: PropTypes.string.isRequired,
    categoria: PropTypes.string.isRequired,
    estoque: PropTypes.number.isRequired,
    avaliacao: PropTypes.number,
  }).isRequired,
  parcelas: PropTypes.number,
  descontoPix: PropTypes.number,
  prioridade: PropTypes.bool,
};

export default ProdutoCard;
