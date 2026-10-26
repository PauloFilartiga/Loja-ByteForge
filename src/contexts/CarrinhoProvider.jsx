import { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { CarrinhoContext } from "./CarrinhoContext";
import { calcularTotal, calcularQuantidadeTotal } from "../utils/carrinho";

const CHAVE_STORAGE = "@byteforge:carrinho";

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    try {
      const salvo = localStorage.getItem(CHAVE_STORAGE);
      return salvo ? JSON.parse(salvo) : [];
    } catch (erro) {
      console.error("Erro ao carregar carrinho do localStorage:", erro);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens));
    } catch (erro) {
      console.error("Erro ao salvar carrinho no localStorage:", erro);
    }
  }, [itens]);

  /**
   * RF07: Adiciona produto ao carrinho ou incrementa se já existir,
   * respeitando o limite de estoque disponível.
   */
  function adicionarItem(produto, quantidade = 1) {
    if (!produto || !produto.id) return;

    setItens((itensAtuais) => {
      const indiceExixtente = itensAtuais.findIndex(
        (item) => String(item.id) === String(produto.id),
      );

      const estoqueMaximo = produto.estoque ?? 999;

      if (indiceExixtente >= 0) {
        const itemAtual = itensAtuais[indiceExixtente];
        const novaQuantidade = Math.min(
          itemAtual.quantidade + quantidade,
          estoqueMaximo,
        );

        return itensAtuais.map((item, index) =>
          index === indiceExixtente
            ? { ...item, quantidade: novaQuantidade }
            : item,
        );
      }

      const quantidadeInicial = Math.min(quantidade, estoqueMaximo);

      return [
        ...itensAtuais,
        {
          id: produto.Id,
          nome: produto.nome,
          preco: produto.preco ?? produto.precoUnitario,
          imagem: produto.imagem,
          categoria: produto.categoria,
          estoque: estoqueMaximo,
          quantidade: quantidadeInicial,
        },
      ];
    });
  }

  function removerItem(id) {
    setItens((itensAtuais) =>
      itensAtuais.filter((item) => String(item.id) !== String(id)),
    );
  }

  function alterarQuantidade(id, novaQuantidade) {
    if (novaQuantidade <= 0) {
      removerItem(id);
      return;
    }

    setItens((itensAtuais) =>
      itensAtuais.map((item) => {
        if (String(item.id) !== String(id)) return item;
        const limite = item.estoque ?? 999;
        return {
          ...item,
          quantidade: Math.min(novaQuantidade, limite),
        };
      }),
    );
  }

  function limparCarrinho() {
    setItens([]);
  }

  //Calculos com funções puras de utils
  const valorTotal = useMemo(() => calcularTotal(itens), [itens]);
  const quantidadeTotal = useMemo(
    () => calcularQuantidadeTotal(itens),
    [itens],
  );

  const valorContexto = {
    itens,
    valorTotal,
    quantidadeTotal,
    adicionarItem,
    removerItem,
    alterarQuantidade,
    limparCarrinho,
  };

  return (
    <CarrinhoContext.Provider value={valorContexto}>
      {children}
    </CarrinhoContext.Provider>
  );
}

CarrinhoProvider.PropTypes = {
  children: PropTypes.node.isRequired,
};
