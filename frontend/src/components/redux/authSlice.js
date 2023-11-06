import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { performApiRequest } from "./pollSlice";

export const login = createAsyncThunk("user/login", async (userData) => {
  return performApiRequest("api/login/", "post", userData);
});

export const signup = createAsyncThunk("user/signup", async (userData) => {
  return performApiRequest("api/users/", "post", userData);
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      });
  },
});

export default authSlice.reducer;
