# Checkout React

Aplicação SPA desenvolvida em React para simular o fluxo de uma compra: carrinho, pagamento, aprovação e falha.

## Testes e depuração

O fluxo da aplicação foi testado manualmente:

- Carrinho com 3 produtos, 4 itens e total de R$ 829,60;
- Validação dos campos obrigatórios e formatos do cartão;
- Cartão válido direcionando para a página de sucesso;
- Cartão com todos os dígitos iguais direcionando para a página de falha;
- Botão desabilitado durante o processamento;
- Navegação entre carrinho, pagamento, sucesso e falha;
- Interface verificada em telas de celular e computador.

### Uso do debugger

O `debugger` foi utilizado temporariamente após o processamento do pagamento para inspecionar a variável `compraAprovada`.

- Cartão `1111111111111111`: resultado `false`;
- Cartão `1234567890123456`: resultado `true`.

Após a verificação, o comando `debugger` foi removido do código.

### Verificação técnica

- `npm run lint`: executado sem erros;
- `npm run build`: compilação concluída com sucesso.
