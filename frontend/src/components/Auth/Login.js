import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";

const Login = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
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
    dispatch(login(formData)).then((action) => {
      console.log(action);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        name="username"
        label="Username"
        variant="outlined"
        value={formData.username}
        onChange={handleChange}
        required
      />
      <TextField
        name="password"
        label="Password"
        type="password"
        variant="outlined"
        value={formData.password}
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
