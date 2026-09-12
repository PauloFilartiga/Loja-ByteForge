import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { esquemaPagamento } from "../utils/pagamento";

function Pagamento() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(esquemaPagamento),
  });

  function enviarFormulario() {
    console.log("Formulário validado com sucesso");
  }

  return (
    <main className="pagina-pagamento">
      <h1>Pagamento</h1>
      <p>Preencha os dados do cartão para finalizar a compra.</p>

      <form onSubmit={handleSubmit(enviarFormulario)} noValidate>
        <div>
          <label htmlFor="titular">Nome do titular</label>
          <input
            id="titular"
            type="text"
            autoComplete="cc-name"
            {...register("titular")}
          />
          {errors.titular && <p role="alert">{errors.titular.message}</p>}
        </div>

        <div>
          <label htmlFor="numeroCartao">Número do cartão</label>
          <input
            id="numeroCartao"
            type="text"
            inputMode="numeric"
            maxLength={16}
            autoComplete="cc-number"
            {...register("numeroCartao")}
          />
          {errors.numeroCartao && (
            <p role="alert">{errors.numeroCartao.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="validade">Validade (MM/AA)</label>
          <input
            id="validade"
            type="text"
            inputMode="numeric"
            maxLength={5}
            placeholder="MM/AA"
            autoComplete="cc-exp"
            {...register("validade")}
          />
          {errors.validade && <p role="alert">{errors.validade.message}</p>}
        </div>

        <div>
          <label htmlFor="cvv">CVV</label>
          <input
            id="cvv"
            type="text"
            inputMode="numeric"
            maxLength={3}
            autoComplete="cc-csc"
            {...register("cvv")}
          />
          {errors.cvv && <p role="alert">{errors.cvv.message}</p>}
        </div>

        <button type="submit">Continuar</button>
      </form>

      <Link to="/">Voltar para o carrinho</Link>
    </main>
  );
}

export default Pagamento;
