function ResumoCompra({ quantidadeItens, total }) {
  const totalFormatado = total.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <aside className="resumo-compra" aria-labelledby="titulo-resumo">
      <h2 id="titulo-resumo">Resumo da compra</h2>
      <p>
        {quantidadeItens} {quantidadeItens === 1 ? "item" : "itens"}
      </p>
      <p>
        <strong>Total: {totalFormatado}</strong>
      </p>
    </aside>
  );
}

export default ResumoCompra;
