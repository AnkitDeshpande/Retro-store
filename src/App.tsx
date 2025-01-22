import { Route, Routes } from "react-router";
import MainContent from "./components/MainContent";
import PopularBlog from "./components/PopularBlog";
import ProductPage from "./components/ProductPage";
import Sidebar from "./components/Sidebar";
import TopSeller from "./components/TopSeller";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="rounded w-full justify-center flex-wrap">
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
        <div className="flex flex-col md:absolute md:top-0 md:right-0 p-5 space-y-5 md:space-y-0 md:w-1/4">
          <TopSeller />
          <PopularBlog />
        </div>
      </div>
    </div>
  );
}

export default App;
