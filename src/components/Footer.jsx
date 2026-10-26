function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="fodape-principal">
      <div className="rodape-conteudo">
        <p>
          © {anoAtual} <strong>ByteForge</strong>. Todos os direitos reservados.
        </p>
        <p className="rodape-subtexto">
          Componentes de alta perfomace e periféricos de nível entusiasta.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
