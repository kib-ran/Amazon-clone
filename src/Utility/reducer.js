// import { ADD_TO_BASKET } from "./action-type";

// export const initialState = {
//   basket: [],
// };

// export const reducer = (state, action) => {
//   switch (action.type) {
//     case ADD_TO_BASKET:
//       const existingItem = state.basket.find(
//         (item) => item.id === action.item.id
//       );

//       if (existingItem) {
//         const updatedBasket = state.basket.map((item) =>
//           item.id === action.item.id
//             ? { ...item, amount: item.amount + 1 }
//             : item
//         );

//         return {
//           ...state,
//           basket: updatedBasket,
//         };
//       }

//       return {
//         ...state,
//         basket: [...state.basket, { ...action.item, amount: 1 }],
//       };

//     default:
//       return state;
//   }
// };











import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from "./action-type";

export const initialState = {
  basket: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_BASKET:
      const existingItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (existingItem) {
        const updatedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
        return { ...state, basket: updatedBasket };
      }
      return {
        ...state,
        basket: [...state.basket, { ...action.item, amount: 1 }],
      };

    case REMOVE_FROM_BASKET:
      const targetItem = state.basket.find(
        (item) => item.id === action.item.id
      );
      if (targetItem?.amount > 1) {
        const reducedBasket = state.basket.map((item) =>
          item.id === action.item.id
            ? { ...item, amount: item.amount - 1 }
            : item
        );
        return { ...state, basket: reducedBasket };
      }
      return {
        ...state,
        basket: state.basket.filter((item) => item.id !== action.item.id),
      };

    default:
      return state;
  }
};