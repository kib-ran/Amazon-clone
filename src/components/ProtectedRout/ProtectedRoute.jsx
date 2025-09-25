import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/CartProvider";

const ProtectedRoute = ({ children, msg, redirect }) => {
  const navigate = useNavigate();
  const { user } = useContext(CartContext);

  useEffect(() => {
    if (!user) {
      navigate("/auth", { state: { msg, redirect } });
    }
  }, [user, navigate, msg, redirect]);

  return user ? children : null;
};

export default ProtectedRoute;
