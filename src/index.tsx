import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Compose from "./context/ComposeContext";
import { AppContextProvider } from "./context/AppContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Compose components={[AppContextProvider]}>
      <App />
    </Compose>
  </React.StrictMode>
);

reportWebVitals();
