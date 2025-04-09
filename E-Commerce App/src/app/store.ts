import { configureStore } from "@reduxjs/toolkit";
import { userLoginReducer } from "./features/LoginSlice";
import cartReducer from "./features/cartSlice";
import globalReducer from "./features/globalSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistCartConfig = {
  key: "cart",
  storage,
};
const persistedCart = persistReducer(persistCartConfig, cartReducer);
export const store = configureStore({
  reducer: {
    userLogin: userLoginReducer,
    cart: persistedCart,
    global: globalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persister = persistStore(store);
