import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { Box, Card, CardContent, Container } from "@mui/material";
import PageTitle from "../utility/PageTitle";
import MyAlert from "../utility/MyAlert";

const Login = () => {
  const dispatch = useDispatch();
  const nevigate = useNavigate();
  const [alert1, setAlert1] = useState(false);
  const [formData, setFormData] = useState({
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
    setAlert1(false);
    dispatch(authenticateUser(formData)).then((action) => {
      if (action.access) {
        nevigate("/");
      } else {
        setAlert1(true);
      }
    });
  };

  return (
    <Container maxWidth="sm">
      <PageTitle
        title="PollPal - Log In"
        description="Enter your credentials to log in."
        textAlign="center"
        variant="h1"
      />
      <Card sx={{ borderTop: 4, borderColor: "primary.main" }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
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
              {alert1 && (
                <MyAlert severity="error" message="Invalid credentials" />
              )}
              <Box
                sx={{ display: "flex", flexDirection: "row-reverse", pt: 2 }}
              >
                <Button type="submit" variant="contained" color="primary">
                  Log In
                </Button>
              </Box>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Login;
