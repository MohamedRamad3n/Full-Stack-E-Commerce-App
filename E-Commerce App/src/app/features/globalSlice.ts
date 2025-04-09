import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenCartDrawer: false,
  onOpenCartDrawer: false,
  onCloseCartDrawer: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    toggleCartDrawer: (state) => {
      state.isOpenCartDrawer = !state.isOpenCartDrawer;
    },
    openCartDrawer: (state) => {
      state.onOpenCartDrawer = true;
      state.isOpenCartDrawer = true;
    },
    closeCartDrawer: (state) => {
      state.onCloseCartDrawer = true;
      state.isOpenCartDrawer = false;
    },
  },
});

export const { closeCartDrawer, openCartDrawer, toggleCartDrawer } =
  globalSlice.actions;
export default globalSlice.reducer;
