import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { logout } from "../redux/authSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ isAuthenticated, user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <Container>
      <Box sx={{ display: "flex" }}>
        <Typography>PollPal</Typography>

        {isAuthenticated ? (
          <Button
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <Link to="/login">
              <Button variant="contained">Login</Button>
            </Link>
            <Link to="/login">
              <Button variant="contained">Signup</Button>
            </Link>
          </>
        )}
      </Box>
    </Container>
  );
};

export default NavBar;
