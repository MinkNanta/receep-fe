import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import MenuContextProvider from "./contexts/MenuContext";
import OrderContextProvider from "./contexts/OrderContext";
import ErrorContextProvider from "./contexts/ErrorContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ErrorContextProvider>
      <AuthContextProvider>
        <MenuContextProvider>
          <OrderContextProvider>
            <App />
          </OrderContextProvider>
        </MenuContextProvider>
      </AuthContextProvider>
    </ErrorContextProvider>
  </BrowserRouter>
);
