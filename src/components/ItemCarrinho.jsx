function ItemCarrinho({ produto }) {
  const subtotal = produto.precoUnitario * produto.quantidade;

  const precoFormatado = produto.precoUnitario.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const subtotalFormatado = subtotal.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <article className="item-carrinho">
      <h3>{produto.nome}</h3>
      <p>Preço Unitário: {precoFormatado}</p>
      <p>Quantidade: {produto.quantidade}</p>
      <p>Subtotal: {subtotalFormatado}</p>
    </article>
  );
}

export default ItemCarrinho;
