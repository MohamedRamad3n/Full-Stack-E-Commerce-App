import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOnline: true,
};

const networkSlice = createSlice({
    name: "network",
    initialState,
    reducers: {
        setIsOnline: (state, action) => {
            state.isOnline = action.payload
        }
    },
});

export const { setIsOnline } =
    networkSlice.actions;
export default networkSlice.reducer;
