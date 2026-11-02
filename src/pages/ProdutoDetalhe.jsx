import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { obterProdutoPorId } from "../services/api";
import { useCarrinho } from "../hooks/useCarrinho";
import { formatarMoeda } from "../utils/moeda";
import iconeVoltar from "../assets/images/icons8-backhand-index-pointing-left-96.png";
import { urlUnsplash, srcSetUnsplash } from "../utils/imagem";

function ProdutoDetalhe() {
  const { id } = useParams();
  const { adicionarItem } = useCarrinho();

  const [produto, setProduto] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);

  useEffect(() => {
    let cancelado = false;

    async function carregarDetalhes() {
      setCarregando(true);
      setErro(null);
      try {
        const dados = await obterProdutoPorId(id);
        if (!cancelado) {
          setProduto(dados);
        }
      } catch (err) {
        if (!cancelado) {
          setErro(err.message || "Produto não encontrado.");
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    carregarDetalhes();

    return () => {
      cancelado = true;
    };
  }, [id]);

  useEffect(() => {
    if (!adicionado) return;
    const timer = setTimeout(() => setAdicionado(false), 1600);
    return () => clearTimeout(timer);
  }, [adicionado]);

  if (carregando) {
    return (
      <div className="detalhe-container">
        <div className="estado-feedback estado-carregando" role="status">
          <div className="spinner" aria-hidden="true"></div>
          <p>Carregando especificação do produto...</p>
        </div>
      </div>
    );
  }

  if (erro || !produto) {
    return (
      <div className="detalhe-container">
        <div className="estado-feedback estado-erro" role="alert">
          <h2>Produto não encontrado</h2>
          <p>
            {erro ||
              "O item solicitado não existe ou foi removido do catálogo."}
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

  const { nome, descricao, preco, imagem, categoria, estoque = 0 } = produto;
  const esgotado = estoque <= 0;
  const precoPix = preco * 0.9; //10% de desconto no pix
  const valorParcela = preco / 10;

  function incrementar() {
    if (quantidade < estoque) {
      setQuantidade((q) => q + 1);
    }
  }

  function decrementar() {
    if (quantidade > 1) {
      setQuantidade((q) => q - 1);
    }
  }

  function handleAdicionar() {
    if (!esgotado) {
      adicionarItem(produto, quantidade);
      setAdicionado(true);
    }
  }

  return (
    <div className="detalhe-container">
      {/* Botão de retorno e Breadcrumb alinhados no topo */}
      <div className="detalhe-navegacao-topo">
        <Link to="/produtos" className="botao-voltar-topo">
          <img
            src={iconeVoltar}
            alt=""
            aria-hidden="true"
            className="icone-voltar-img"
          />
          <span>Voltar para o catálogo</span>
        </Link>

        <nav className="breadcrumb" aria-label="Navegação estrutural">
          <Link to="/produtos">Catálogo</Link>
          <span aria-hidden="true">/</span>
          <span className="breadcrumb-ativo">{nome}</span>
        </nav>
      </div>

      <section className="detalhe-grid">
        {/* Galeria / Imagem Principal */}
        <div className="detalhe-media">
          <img
            src={urlUnsplash(imagem, { largura: 720, altura: 540 })}
            srcSet={srcSetUnsplash(imagem, [480, 720, 960])}
            sizes="(min-width: 1120px) 440px, (min-width: 768px) 42vw, calc(100vw - 32px)"
            alt={nome}
            className="detalhe-imagem"
            width="720"
            height="540"
            fetchPriority="high"
            decoding="async"
          />
          {categoria && (
            <span className="detalhe-categoria-tag">{categoria}</span>
          )}
        </div>

        {/* Informações de compra */}
        <div className="detalhe-info">
          <h1 className="detalhe-titulo">{nome}</h1>

          <div className="detalhe-estoque-linha">
            <span
              className={`status-estoque ${esgotado ? "status-esgotado" : "status-disponivel"}`}
            >
              <span className="dot-estoque" aria-hidden="true" />
              {esgotado ? "Esgotado" : `${estoque} unidades disponíveis`}
            </span>
          </div>

          <div className="detalhe-bloco-precos">
            <div className="detalhe-pix-linha">
              <span className="detalhe-preco-pix">
                {formatarMoeda(precoPix)}
              </span>
              <span className="detalhe-pix-tag">à vista no Pix (10% OFF)</span>
            </div>
            <p className="detalhe-parcelas">
              ou {formatarMoeda(preco)} em até 10x de{" "}
              {formatarMoeda(valorParcela)} sem juros
            </p>
          </div>

          <div className="detalhe-descricao-box">
            <h3>Descrição do Produto</h3>
            <p>{descricao || "Sem descrição disponível para este produto."}</p>
          </div>

          {/* Seletor de Quantidade e Ação */}
          <div className="detalhe-acoes">
            <div className="seletor-quantidade">
              <button
                type="button"
                onClick={decrementar}
                disabled={quantidade <= 1 || esgotado}
                aria-label="Diminuir quantidade"
              >
                -
              </button>
              <span aria-live="polite">{quantidade}</span>
              <button
                type="button"
                onClick={incrementar}
                disabled={quantidade >= estoque || esgotado}
                aria-label="Aumentar quantidade"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdicionar}
              disabled={esgotado}
              className={`botao-adicionar-detalhe ${
                esgotado
                  ? "botao-desabilitado"
                  : adicionado
                    ? "botao-sucesso"
                    : ""
              }`}
            >
              {esgotado
                ? "Produto indisponível"
                : adicionado
                  ? "Adicionado ao carrinho!"
                  : "Adicionar ao carrinho"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProdutoDetalhe;
