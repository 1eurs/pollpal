import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "./pollSlice";
import { jwtDecode } from "jwt-decode";

export const signup = createAsyncThunk("user/signup", async (userData) => {
  try {
    const response = await axios.post(`${API}/api/users/`, userData);

    return response;
  } catch (error) {
    throw Error(error);
  }
});

export const authenticateUser = (formData) => async (dispatch) => {
  try {
    const response = await axios.post(`${API}/api/token/`, formData);
    dispatch(login(response.data));
    return response;
  } catch (error) {}
};
const storedAccessToken = localStorage.getItem("access_token");
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!storedAccessToken,
    user: storedAccessToken ? jwtDecode(storedAccessToken) : null,
  },
  reducers: {
    login: (state, action) => {
      const { access } = action.payload;
      localStorage.setItem("access_token", access);
      state.user = jwtDecode(access);
      state.isAuthenticated = true;
    },
    logout: (state) => {
      localStorage.removeItem("access_token");
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
