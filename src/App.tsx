import { Route, Routes } from "react-router";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";
import ProductPage from "./components/ProductPage";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="rounded w-full justify-between flex-wrap">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
