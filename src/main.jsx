import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./routes/AppRouter";
import { HelmetProvider } from "react-helmet-async";
import "./styles/style.scss";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <AppRouter />
    </HelmetProvider>
  </StrictMode>
);
