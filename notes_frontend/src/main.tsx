import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/theme.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container #root not found");
}
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
