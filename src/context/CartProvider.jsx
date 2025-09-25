// import { createContext, useContext, useReducer } from "react";

// const CartContext = createContext();

// const initialState = {
//   user: null,
//   basket: [],
//   loading: false,
//   error: null,
// };

// function reducer(state, action) {
//   switch (action.type) {
//     case "SET_USER":
//       console.log(" Auth state changed:", action.payload);
//       return { ...state, user: action.payload };

//     case "SET_LOADING":
//       return { ...state, loading: action.payload };

//     case "SET_ERROR":
//       return { ...state, error: action.payload };

//     case "ADD_TO_BASKET":
//       return { ...state, basket: [...state.basket, action.item] };

//     case "REMOVE_FROM_BASKET":
//       return {
//         ...state,
//         basket: state.basket.filter((_, index) => index !== action.index),
//       };

//     case "EMPTY_BASKET":
//       return { ...state, basket: [] };

//     default:
//       return state;
//   }
// }

// export function CartProvider({ children }) {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   return (
//     <CartContext.Provider value={{ ...state, dispatch }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error("useCart must be used within a CartProvider");
//   }
//   return context;
// };

import { createContext, useContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  user: null,
  basket: [],
  loading: false,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload };

    case "ADD_TO_BASKET": {
      const existingIndex = state.basket.findIndex(
        (item) => item.id === action.item.id
      );

      if (existingIndex >= 0) {
        const updatedBasket = [...state.basket];
        updatedBasket[existingIndex] = {
          ...updatedBasket[existingIndex],
          amount:
            updatedBasket[existingIndex].amount + (action.item.amount || 1),
        };
        return { ...state, basket: updatedBasket };
      }

      return {
        ...state,
        basket: [
          ...state.basket,
          { ...action.item, amount: action.item.amount || 1 },
        ],
      };
    }

    case "REMOVE_FROM_BASKET":
      return {
        ...state,
        basket: state.basket.filter((_, index) => index !== action.index),
      };

    case "EMPTY_BASKET":
      return { ...state, basket: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <CartContext.Provider value={{ ...state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
