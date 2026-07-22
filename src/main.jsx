import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

import { SleepProvider } from "./context/SleepContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <SleepProvider>
        <App />
      </SleepProvider>
    </BrowserRouter>
  </React.StrictMode>
);