import { Route, Routes } from "react-router-dom";
import { CarrinhoProvider } from "./contexts/CarrinhoContext";
import Carrinho from "./pages/Carrinho";
import Pagamento from "./pages/Pagamento";
import Sucesso from "./pages/Sucesso";
import Falha from "./pages/Falha";

function App() {
  return (
    <CarrinhoProvider>
      <Routes>
        <Route path="/" element={<Carrinho />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/sucesso" element={<Sucesso />} />
        <Route path="/falha" element={<Falha />} />
      </Routes>
    </CarrinhoProvider>
  );
}

export default App;
