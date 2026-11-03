import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function Layout() {
  return (
    <div className="layout-app">
      <Header />
      <main className="conteudo-principal">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
