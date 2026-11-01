import { Route, Routes } from "react-router-dom";
import { CarrinhoProvider } from "./contexts/CarrinhoProvider";
import { TemaProvider } from "./contexts/TemaProvider";
import Layout from "./components/Layout";
import RotaPrivada from "./components/RotaPrivada";
import Produtos from "./pages/Produtos";
import ProdutoDetalhe from "./pages/ProdutoDetalhe";
import Carrinho from "./pages/Carrinho";
import Pagamento from "./pages/Pagamento";
import Sucesso from "./pages/Sucesso";
import Falha from "./pages/Falha";
import NaoEncontrada from "./pages/NaoEncontrada";

function App() {
  return (
    <TemaProvider>
      <CarrinhoProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Produtos />} />
            <Route path="/produtos" element={<Produtos />} />
            <Route path="/produtos/:id" element={<ProdutoDetalhe />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route
             path="/pagamento"
             element={
              <RotaPrivada>
               <Pagamento />
              </RotaPrivada>
             }
            />
            <Route path="*" element={<NaoEncontrada />} />
          </Route>
          {/* Páginas de resultado de checkout mantêm tela cheia/focada */}
          <Route path="/sucesso" element={<Sucesso />} />
          <Route path="/falha" element={<Falha />} />
        </Routes>
      </CarrinhoProvider>
    </TemaProvider>
  );
}

export default App;
