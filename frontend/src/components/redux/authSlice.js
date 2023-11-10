import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "./pollSlice";

export const signup = createAsyncThunk("user/signup", async (userData) => {
  try {
    const response = await axios.post(`${API}/api/users/`, userData);

    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

export const authenticateUser = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API}/api/token/`, formData);

    dispatch(login(response.data));
  } catch (error) {
    console.log(error);
  }
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("token"),
    user: null,
    isAuthenticated: Boolean(localStorage.getItem("token")),
  },
  reducers: {
    login: (state, action) => {
      localStorage.setItem("token", action.payload.access);
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logout: (state, action) => {
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        console.log(action);
      })
      .addCase(signup.rejected, (state, action) => {
        console.log(state);
        console.log(action);
      });
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
