import React from "react";
import { createRoot } from "react-dom/client";
import Routing from "./Router";
import { CartProvider } from "./context/CartProvider";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <Routing />
  </CartProvider>
);
