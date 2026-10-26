import { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProdutoCard from "../components/ProdutoCard";
import { useDebounce } from "../hooks/useDebounce";
import { obterProdutos } from "../services/api";
import { filtrarProdutos } from "../utils/busca";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  // Parâmetros sincronizados com a URL
  const [searchParams, setSearchParams] = useSearchParams();
  const termoUrl = searchParams.get("busca") || "";
  const categoriaUrl = searchParams.get("categoria") || "todas";
  const ordemUrl = searchParams.get("ordem") || "padrao";

  const [buscaInput, setBuscaInput] = useState(termoUrl);
  const termoDebounced = useDebounce(buscaInput, 300);

  // Carregamento de dados assíncronos sem setState síncrono no effect
  useEffect(() => {
    let cancelado = false;

    async function buscarDados() {
      try {
        const dados = await obterProdutos();
        if (!cancelado) {
          setProdutos(dados);
        }
      } catch (err) {
        if (!cancelado) {
          setErro(err.message || "Não foi possível carregar os produtos.");
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    }

    buscarDados();

    return () => {
      cancelado = true;
    };
  }, []);

  // Sincroniza o debounce de busca na URL de forma segura
  useEffect(() => {
    setSearchParams(
      (paramsAnteriores) => {
        const novosParams = new URLSearchParams(paramsAnteriores);
        if (termoDebounced.trim()) {
          novosParams.set("busca", termoDebounced.trim());
        } else {
          novosParams.delete("busca");
        }
        return novosParams;
      },
      { replace: true },
    );
  }, [termoDebounced, setSearchParams]);

  // Manipuladores de alteração de filtros (atualizam diretamente a URL)
  function handleCategoriaChange(novaCategoria) {
    setSearchParams(
      (paramsAnteriores) => {
        const novosParams = new URLSearchParams(paramsAnteriores);
        if (novaCategoria !== "todas") {
          novosParams.set("categoria", novaCategoria);
        } else {
          novosParams.delete("categoria");
        }
        return novosParams;
      },
      { replace: true },
    );
  }

  function handleOrdemChange(novaOrdem) {
    setSearchParams(
      (paramsAnteriores) => {
        const novosParams = new URLSearchParams(paramsAnteriores);
        if (novaOrdem !== "padrao") {
          novosParams.set("ordem", novaOrdem);
        } else {
          novosParams.delete("ordem");
        }
        return novosParams;
      },
      { replace: true },
    );
  }

  function handleLimparFiltros() {
    setBuscaInput("");
    setSearchParams({}, { replace: true });
  }

  // Categorias únicas baseadas nos produtos
  const categoriasDisponiveis = useMemo(() => {
    const lista = produtos.map((p) => p.categoria).filter(Boolean);
    return ["todas", ...new Set(lista)];
  }, [produtos]);

  // Filtragem e ordenação computada via useMemo
  const produtosFiltrados = useMemo(() => {
    let resultado = filtrarProdutos(produtos, termoUrl);

    if (categoriaUrl !== "todas") {
      resultado = resultado.filter((p) => p.categoria === categoriaUrl);
    }

    if (ordemUrl === "menor-preco") {
      resultado = [...resultado].sort((a, b) => a.preco - b.preco);
    } else if (ordemUrl === "maior-preco") {
      resultado = [...resultado].sort((a, b) => b.preco - a.preco);
    }

    return resultado;
  }, [produtos, termoUrl, categoriaUrl, ordemUrl]);

  return (
    <div className="catalogo-container">
      <header className="catalogo-cabecalho">
        <h1 className="catalogo-titulo">Catálogo de Produtos</h1>
        <p className="catalogo-subtitulo">
          Equipamentos e periféricos de alta performance para o seu setup.
        </p>
      </header>

      {/* Barra de Busca e Filtros */}
      <section className="catalogo-filtros" aria-label="Filtros do Catálogo">
        <div className="filtro-busca-wrapper">
          <input
            type="search"
            value={buscaInput}
            onChange={(e) => setBuscaInput(e.target.value)}
            placeholder="Buscar por nome do produto..."
            className="input-busca"
            aria-label="Buscar produtos por nome"
          />
          {buscaInput && (
            <button
              type="button"
              onClick={() => {
                setBuscaInput("");
                setSearchParams(
                  (prev) => {
                    const novo = new URLSearchParams(prev);
                    novo.delete("busca");
                    return novo;
                  },
                  { replace: true },
                );
              }}
              className="botao-limpar-busca"
              title="Limpar busca"
              aria-label="Limpar termo de busca"
            >
              ✕
            </button>
          )}
        </div>

        <div className="filtros-seletores">
          <label className="rotulo-seletor">
            <span>Categoria:</span>
            <select
              value={categoriaUrl}
              onChange={(e) => handleCategoriaChange(e.target.value)}
              className="select-filtro"
            >
              {categoriasDisponiveis.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "todas" ? "Todas as categorias" : cat}
                </option>
              ))}
            </select>
          </label>

          <label className="rotulo-seletor">
            <span>Ordenar por:</span>
            <select
              value={ordemUrl}
              onChange={(e) => handleOrdemChange(e.target.value)}
              className="select-filtro"
            >
              <option value="padrao">Padrão</option>
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
            </select>
          </label>
        </div>
      </section>

      {/* Feedbacks de Estado */}
      {carregando && (
        <div className="estado-feedback estado-carregando" role="status">
          <div className="spinner" aria-hidden="true" />
          <p>Carregando catálogo da ByteForge...</p>
        </div>
      )}

      {erro && !carregando && (
        <div className="estado-feedback estado-erro" role="alert">
          <h3>Ocorreu um problema ao carregar</h3>
          <p>{erro}</p>
          <button
            type="button"
            onClick={() => {
              setCarregando(true);
              setErro(null);
              obterProdutos()
                .then(setProdutos)
                .catch((err) => setErro(err.message))
                .finally(() => setCarregando(false));
            }}
            className="botao-tentar-novamente"
          >
            Tentar novamente
          </button>
        </div>
      )}

      {!carregando && !erro && produtosFiltrados.length === 0 && (
        <div className="estado-feedback estado-vazio">
          <h3>Nenhum produto encontrado</h3>
          <p>
            Não encontramos resultados para os filtros selecionados. Tente
            buscar por outro termo ou limpe os filtros.
          </p>
          <button
            type="button"
            onClick={handleLimparFiltros}
            className="botao-limpar-filtros"
          >
            Limpar todos os filtros
          </button>
        </div>
      )}

      {!carregando && !erro && produtosFiltrados.length > 0 && (
        <>
          <p className="catalogo-contador-resultados">
            Exibindo <strong>{produtosFiltrados.length}</strong>{" "}
            {produtosFiltrados.length === 1 ? "produto" : "produtos"}
          </p>
          <div className="catalogo-grid">
            {produtosFiltrados.map((produto) => (
              <ProdutoCard key={produto.id} produto={produto} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Produtos;
