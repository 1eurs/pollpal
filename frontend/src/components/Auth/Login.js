import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authenticateUser(formData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="email"
        label="Email"
        variant="outlined"
        value={formData.Email}
        onChange={handleChange}
        required
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        value={formData.Password}
        onChange={handleChange}
        required
      />
      <Button type="submit" variant="contained" color="primary">
        Log In
      </Button>
    </form>
  );
};

export default Login;
