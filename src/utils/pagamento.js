import { z } from "zod";

export const esquemaPagamento = z.object({
  titular: z.string().trim().min(1, "Informe o nome do titular"),

  numeroCartao: z
    .string()
    .regex(/^\d{16}$/, "Digite exatamente 16 números, sem espaço ou hífens"),

  validade: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Informe uma validade no formato MM/AA"),

  cvv: z.string().regex(/^\d{3}$/, "Digite exatamente 3 números"),
});
