import { describe, it, expect } from "vitest";
import { ehImagemUnsplash, urlUnsplash, srcSetUnsplash } from "../imagem";

const URL_UNSPLASH =
  "https://images.unsplash.com/photo-1547658718-1cdaa0852790?q=80&w=764&auto=format&fit=crop";

describe("Utilitários de imagem", () => {
  describe("ehImagemUnsplash", () => {
    it("reconhece URLs do Unsplash (caminho feliz)", () => {
      expect(ehImagemUnsplash(URL_UNSPLASH)).toBe(true);
      expect(
        ehImagemUnsplash(
          "https://plus.unsplash.com/premium_photo-1777867?w=800",
        ),
      ).toBe(true);
    });

    it("retorna false para outros domínios e valores inválidos", () => {
      expect(ehImagemUnsplash("https://via.placeholder.com/150")).toBe(false);
      expect(ehImagemUnsplash("nao-e-url")).toBe(false);
      expect(ehImagemUnsplash(undefined)).toBe(false);
    });
  });

  describe("urlUnsplash", () => {
    it("substitui largura, altura e qualidade sem duplicar parâmetros", () => {
      const resultado = new URL(
        urlUnsplash(URL_UNSPLASH, { largura: 320, altura: 240 }),
      );

      expect(resultado.searchParams.getAll("w")).toEqual(["320"]);
      expect(resultado.searchParams.get("h")).toBe("240");
      expect(resultado.searchParams.getAll("q")).toEqual(["60"]);
      expect(resultado.searchParams.get("fit")).toBe("crop");
    });

    it("devolve a URL original quando não é do Unsplash", () => {
      const outra = "https://via.placeholder.com/150";
      expect(urlUnsplash(outra, { largura: 100 })).toBe(outra);
    });
  });

    describe("srcSetUnsplash", () => {
      it("gera uma entrada por largura com o descritor w", () => {
        const srcset = srcSetUnsplash(URL_UNSPLASH, [320, 640]);
        const entradas = srcset.split(", ");

        expect(entradas).toHaveLength(2);
        expect(entradas[0]).toMatch(/w=320.* 320w$/);
        expect(entradas[1]).toMatch(/h=480.* 640w$/);
      });

      it("retorna undefined para imagens de outros domínios", () => {
        expect(
          srcSetUnsplash("https://via.placeholder.com/150", [320]),
        ).toBeUndefined();
      });
    });
});
