import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LayOut from "./components/LayOut/LayOut";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Payment from "./Pages/Payment/Payment";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Category from "./components/Category/Category";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./components/ProtectedRout/ProtectedRoute";

const stripePromise = loadStripe(
  "pk_test_51S96SKE7yc7PwSCFhUJk2tD2aMBtKZfztJETBJqgkwvu6Obo9LrbQ8olC8dlZIiEakUIzmyUnNzqUVaUYTAORE1Y00uDJoajRe"
);

function Routing() {
  return (
    <Router>
      <Routes>
        <Route element={<LayOut />}>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/payment"
            element={
              <ProtectedRoute msg="You must login to pay" redirect="/payment">
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              </ProtectedRoute>
            }
          />
          <Route
            path="/orders"
            element={
              <ProtectedRoute
                msg="Login to view your orders"
                redirect="/orders"
              >
                <Orders />
              </ProtectedRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:categoryName" element={<Results />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Routing;
