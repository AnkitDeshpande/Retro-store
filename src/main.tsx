import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";
import { FilterContextProvider } from "./components/FilterContext.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FilterContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </FilterContextProvider>
  </StrictMode>
);
