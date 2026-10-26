import { Route, Routes } from "react-router-dom";
import { CarrinhoProvider } from "./contexts/CarrinhoProvider";
import { TemaProvider } from "./contexts/TemaProvider";
import Layout from "./components/Layout";
import Carrinho from "./pages/Carrinho";
import Pagamento from "./pages/Pagamento";
import Sucesso from "./pages/Sucesso";
import Falha from "./pages/Falha";

function App() {
  return (
    <TemaProvider>
      <CarrinhoProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Carrinho />} />
            <Route path="/pagamento" element={<Pagamento />} />
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
