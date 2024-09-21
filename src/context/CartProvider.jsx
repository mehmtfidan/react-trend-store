import { createContext, useReducer } from "react";

export const CartContext = createContext();

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const extCartItemIndex = state.items.findIndex(
        (item) => item.id === action.item.id
      );

      let updatedItems = [...state.items];

      if (extCartItemIndex !== -1) {
        updatedItems[extCartItemIndex] = {
          ...state.items[extCartItemIndex],
          amount: state.items[extCartItemIndex].amount + action.item.amount,
        };
      } else {
        updatedItems = [...state.items, action.item];
      }
      return {
        items: updatedItems,
        totalAmount: state.totalAmount + action.item.price * action.item.amount,
      };
    case "REMOVE":
      const filteredItems = state.items.filter((item) => item.id !== action.id);
      const itemToRemove = state.items.find((item) => item.id === action.id);
      return {
        items: filteredItems,
        totalAmount:
          state.totalAmount - itemToRemove.price * itemToRemove.amount,
      };
    case "CLEAR":
      return defaultCartState;
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: (item) => {
      dispatchCartAction({ type: "ADD", item });
    },
    removeItem: (id) => {
      dispatchCartAction({ type: "REMOVE", id });
    },
    clearItem: () => {
      dispatchCartAction({ type: "CLEAR" });
    },
  };
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
