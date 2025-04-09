import { createSlice } from "@reduxjs/toolkit";
import { addItemToShoppingCart, ICartItem } from "../../utils";
import { toaster } from "../../components/ui/toaster";

interface CartState {
  cartProducts: ICartItem[];
}

const initialState: CartState = {
  cartProducts: [],
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cartProducts = addItemToShoppingCart(
        action.payload,
        state.cartProducts
      );
    },
    removeFromCart: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.id !== action.payload.id
      );
      toaster.create({
        title: "Removed from cart",
        description: "Item removed from cart",
        type: "warning",
        duration: 2000,
      });
    },
    clearCart: (state) => {
      state.cartProducts = [];
      toaster.create({
        title: "Cart cleared",
        description: `All items removed from cart`,
        type: "warning",
        duration: 2000,
      });
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
