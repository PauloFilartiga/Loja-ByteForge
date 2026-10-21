import { describe, it, expect } from "vitest";
import { formatarMoeda } from "../moeda";
import { calcularTotal, calcularQuantidadeTotal } from "../carrinho";
import { filtrarProdutos } from "../busca";
import { todosDigitosIguais } from "../pagamento";

describe("Regras de Negócio - Utils", () => {
  // 1. Testes de formatação de moeda
  describe("formatarMoeda", () => {
    it("deve formatar número positivo para padrão Real brasileiro (caminho feliz)", () => {
      const resultado = formatarMoeda(249.9);
      // substitui espaço não separável por espaço padrão para evitar divergência de locale
      expect(resultado.replace(/\u00a0/g, " ")).toContain("R$ 249,90");
    });

    it("deve retornar 'R$ 0,00' se receber valor inválido ou não numérico (caminho triste)", () => {
      expect(formatarMoeda(null)).toBe("R$ 0,00");
      expect(formatarMoeda(undefined)).toBe("R$ 0,00");
      expect(formatarMoeda("texto")).toBe("R$ 0,00");
    });
  });

  // 2. Testes de cálculo de totais do carrinho
  describe("calcularTotal e calcularQuantidadeTotal", () => {
    const itensExemplo = [
      { preco: 100, quantidade: 2 },
      { preco: 50.5, quantidade: 1 },
    ];

    it("deve calcular a soma correta dos valores com base na quantidade (caminho feliz)", () => {
      const total = calcularTotal(itensExemplo);
      expect(total).toBe(250.5);
    });

    it("deve somar o total de unidades corretamente (caminho feliz)", () => {
      const qtdTotal = calcularQuantidadeTotal(itensExemplo);
      expect(qtdTotal).toBe(3);
    });

    it("deve retornar 0 quando a lista for vazia ou inválida (caminho triste)", () => {
      expect(calcularTotal([])).toBe(0);
      expect(calcularTotal(null)).toBe(0);
      expect(calcularQuantidadeTotal([])).toBe(0);
    });
  });

  // 3. Testes de filtragem de busca
  describe("filtrarProdutos", () => {
    const produtosMock = [
      { id: "1", nome: "Teclado Mecânico RGB" },
      { id: "2", nome: "Mouse Sem Fio" },
      { id: "3", nome: "Headset Gamer" },
    ];

    it("deve encontrar itens ignorando maiúsculas e minúsculas (caminho feliz)", () => {
      const resultado = filtrarProdutos(produtosMock, "teclado");
      expect(resultado).toHaveLength(1);
      expect(resultado[0].nome).toBe("Teclado Mecânico RGB");
    });

    it("deve retornar lista completa se o termo for vazio ou apenas espaços", () => {
      expect(filtrarProdutos(produtosMock, "")).toHaveLength(3);
      expect(filtrarProdutos(produtosMock, "   ")).toHaveLength(3);
    });

    it("deve retornar array vazio se não houver correspondência ou lista for inválida (caminho triste)", () => {
      expect(filtrarProdutos(produtosMock, "monitor inexistente")).toEqual([]);
      expect(filtrarProdutos(null, "mouse")).toEqual([]);
    });
  });

  // 4. Testes da regra do cartão (todos os dígitos iguais)
  describe("todosDigitosIguais", () => {
    it("deve retornar true quando o cartão tiver 16 dígitos idênticos (caminho feliz)", () => {
      expect(todosDigitosIguais("1111111111111111")).toBe(true);
      expect(todosDigitosIguais("9999999999999999")).toBe(true);
    });

    it("deve retornar false quando o cartão tiver dígitos variados ou tamanho diferente de 16 (caminho triste)", () => {
      expect(todosDigitosIguais("1234567812345678")).toBe(false);
      expect(todosDigitosIguais("1111")).toBe(false);
    });
  });
});
