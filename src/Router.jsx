import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayOut from "./components/LayOut/LayOut";
import Landing from "./Pages/Landing/Landing";
import SignUp from "./Pages/Auth/SignUp";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Category from "./components/Category/Category";

import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";

function Routing() {
  return (
    <Router>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<SignUp />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/orders" element={<Orders />} />
          
          <Route path="/cart" element={<Cart />} />
         
          <Route path="/category/:categoryName" element={<Results/>}/>
          <Route path="/product/:productId" element={<ProductDetail/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default Routing;
