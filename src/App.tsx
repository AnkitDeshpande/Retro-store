import { Route, Routes } from "react-router";
import MainContent from "./components/MainContent";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="rounded w-full justify-between flex-wrap">
        <Routes>
          <Route path="/" element={<MainContent />} />
          {/* <Route path="/product/:id" element={<ProductDetail />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
