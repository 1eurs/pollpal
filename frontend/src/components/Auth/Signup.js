import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { signup } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Container } from "@mui/material";
import PageTitle from "../utility/PageTitle";

const Signup = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [formData, setFormData] = useState({
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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData)).then((action) => {
      if (action.status === 201) {
        nevigate("/login");
        setFormData({
          first_name: "",
          last_name: "",
          email: "",
          password: "",
        });
      }
    });
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
                />
              </Box>
            </Box>
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
