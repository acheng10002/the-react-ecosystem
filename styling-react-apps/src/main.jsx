import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import themeA from "./theme-a.module.css";
import themeB from "./theme-b.module.css";
import { App, AppOne } from "./App";
import Button from "./Components/Button/Button";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* component can take a style as property
    different themes can be used 
    I can even define custom themes */}
    <App theme={themeA} />
    <App theme={themeB} />
    <Button />
    <AppOne />
  </StrictMode>
);
