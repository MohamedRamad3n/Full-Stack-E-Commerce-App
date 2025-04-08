import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../api/axios.config";
import { toaster } from "../../components/ui/toaster";
import CookieServices from "../../services/CookieServices";

export interface UserLoginState {
  data: null | object;
  loading: boolean;
  error: string | null;
}

const initialState: UserLoginState = {
  data: null,
  loading: false,
  error: null,
};

interface LoginPayload {
  identifier: string;
  password: string;
}

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user: LoginPayload, thunkAPI) => {
    let loadingToastId: string | null = null;
    try {
      loadingToastId = toaster.create({
        title: "Logging in...",
        type: "loading",
        meta: { closable: false },
      });
      const { data } = await axiosInstance.post(`/api/auth/local`, user);
      if (loadingToastId) {
        toaster.dismiss(loadingToastId);
      }

      toaster.create({
        title: "Login Successful",
        description: "Welcome back!",
        type: "success",
        meta: { closable: true },
      });
      return data;
    } catch (error) {
      if (loadingToastId) {
        toaster.dismiss(loadingToastId);
      }

      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.error?.message || error.message
        : "Something went wrong!";

      toaster.create({
        title: "Login Failed",
        description: errorMessage,
        type: "error",
        meta: { closable: true },
      });

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;

        // 👇 Store the token in cookies
        const data = new Date();
        const IN_DAYS = 1; // 1 Day expiration
        const EXPIRE_IN_DAYS = IN_DAYS * 24 * 60 * 60 * 1000; // Convert days to milliseconds
        data.setTime(data.getTime() + EXPIRE_IN_DAYS);
        const options = { path: "/", expires: data };
        CookieServices.setCookie("jwt", action.payload.jwt, options);
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const selectUserLogin = ({ login }: { login: UserLoginState }) => login;
export const { reducer: userLoginReducer } = loginSlice;
