import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosInstance } from "../../api/axios.config";
import { toaster } from "../../components/ui/toaster";

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

let loadingToastId: string | null = null; 

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user: LoginPayload, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axiosInstance.post(`/api/auth/local`, user);
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.error?.message || error.message);
      } else {
        return rejectWithValue("Something went wrong!");
      }
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

        // 👇 Create loading toast and store the ID
        loadingToastId = toaster.create({
          title: "Logging in...",
          type: "loading",
          meta: { closable: false },
        });
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;

        // 👇 Dismiss loading toast
        if (loadingToastId) {
          toaster.dismiss(loadingToastId);
          loadingToastId = null;
        }

        toaster.create({
          title: "Login Successful",
          description: "Welcome back!",
          type: "success",
          meta: { closable: true },
        });
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;

        // 👇 Dismiss loading toast
        if (loadingToastId) {
          toaster.dismiss(loadingToastId);
          loadingToastId = null;
        }

        toaster.create({
          title: "Login Failed",
          description: state.error || "Something went wrong.",
          type: "error",
          meta: { closable: true },
        });
      });
  },
});

export const selectUserLogin = ({ login }: { login: UserLoginState }) => login;
export const { reducer: userLoginReducer } = loginSlice;
