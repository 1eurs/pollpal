import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { login, signup } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Container } from "@mui/material";
import PageTitle from "../utility/PageTitle";
import MyAlert from "../utility/MyAlert";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [alert1, setAlert1] = useState(false);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;
    if (!formData.first_name.trim()) {
      errors.first_name = "First Name is required";
      isValid = false;
    }

    if (!formData.last_name.trim()) {
      errors.last_name = "Last Name is required";
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
      isValid = false;
    }

    if (!formData.password.trim()) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
      isValid = false;
    } else if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(formData.password)) {
      errors.password = "Password must contain both letters and numbers";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(signup(formData)).then((action) => {
        if (action.type === "user/signup/fulfilled") {
          navigate("/login");
        } else if (action.type === "user/signup/rejected") {
          setAlert1(true);
        }
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <PageTitle
        title="PollPal - Sign Up"
        description="Enter your credentials to sign up."
        textAlign="center"
        variant="h1"
      />
      <Card sx={{ borderTop: 4, borderColor: "primary.main" }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <Box>
                <TextField
                  fullWidth
                  name="first_name"
                  label="First Name"
                  variant="outlined"
                  value={formData.first_name}
                  onChange={handleChange}
                  required
                  error={!!formErrors.first_name}
                  helperText={formErrors.first_name}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  name="last_name"
                  label="Last Name"
                  variant="outlined"
                  value={formData.last_name}
                  onChange={handleChange}
                  required
                  error={!!formErrors.last_name}
                  helperText={formErrors.last_name}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Box>
              <Box>
                <TextField
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  error={!!formErrors.password}
                  helperText={formErrors.password}
                />
              </Box>
            </Box>
            {alert1 && (
              <MyAlert
                severity="error"
                message={
                  formErrors.email || "User with this email already exists."
                }
              />
            )}
            <Box sx={{ display: "flex", flexDirection: "row-reverse", pt: 2 }}>
              <Button type="submit" variant="contained" color="primary">
                Sign Up
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Signup;
