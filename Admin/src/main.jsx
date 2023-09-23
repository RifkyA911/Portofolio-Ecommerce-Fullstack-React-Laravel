import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./Redux/store"; // Import store dari file store.js
import App from "./App.jsx";
//UI
import "./index.css";
import "./assets/font/font-roboto.css"; //Roboto Font

import { FiSettings } from "react-icons/fi";

import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
