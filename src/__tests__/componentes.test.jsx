import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProdutoCard from "../components/ProdutoCard";
import ItemCarrinho from "../components/ItemCarrinho";
import { CarrinhoProvider } from "../contexts/CarrinhoProvider";

function renderizarComProviders(ui) {
  return render(
    <BrowserRouter>
      <CarrinhoProvider>{ui}</CarrinhoProvider>
    </BrowserRouter>,
  );
}

describe("Testes de Componentes - ByteForge", () => {
  const produtoExemplo = {
    id: "101",
    nome: "Teclado Mecânico RGB ByteForge",
    preco: 350.0,
    imagem: "https://via.placeholder.com/150",
    categoria: "Periféricos",
    estoque: 5,
  };

  describe("ProdutoCard", () => {
    it("deve renderizar o nome, categoria e preco formatado do produto", () => {
      renderizarComProviders(<ProdutoCard produto={produtoExemplo} />);

      expect(
        screen.getByText("Teclado Mecânico RGB ByteForge"),
      ).toBeInTheDocument();
      expect(screen.getByText("Periféricos")).toBeInTheDocument();

      expect(screen.getByText(/315,00/)).toBeInTheDocument();
      expect(screen.getByText(/35,00/)).toBeInTheDocument();
    });

    it("deve desabilitar o botao quando o estoque for zero", () => {
      const produtoEsgotado = { ...produtoExemplo, estoque: 0 };
      renderizarComProviders(<ProdutoCard produto={produtoEsgotado} />);

      const botao = screen.getByRole("button", { name: /indisponível/i });
      expect(botao).toBeDisabled();
      expect(screen.getByText(/esgotado/i)).toBeInTheDocument();
    });
  });

  describe("ItemCarrinho", () => {
    const itemNoCarrinho = {
      id: "101",
      nome: "Teclado Mecânico RGB ByteForge",
      preco: 350.0,
      imagem: "https://via.placeholder.com/150",
      quantidade: 2,
      estoque: 5,
    };

    it("deve exibir a quantidade e o subtotal calculado", () => {
      renderizarComProviders(<ItemCarrinho item={itemNoCarrinho} />);

      expect(screen.getByText("2")).toBeInTheDocument();
      expect(screen.getByText(/700,00/)).toBeInTheDocument();
    });

    it("deve renderizar os controles acessiveis de quantidade e remocao", () => {
      renderizarComProviders(<ItemCarrinho item={itemNoCarrinho} />);

      expect(
        screen.getByRole("button", { name: /diminuir quantidade/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /aumentar quantidade/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /remover.*do carrinho/i }),
      ).toBeInTheDocument();
    });
  });
});
