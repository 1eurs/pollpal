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

const NavBar = ({ isAuthenticated, user }) => {
  const dispatch = useDispatch();

  return (
    <Container>
      <Box sx={{ display: "flex" }}>
        <Typography>PollPal</Typography>

        {isAuthenticated ? (
          <Button
            onClick={() => {
              console.log("logout");
              dispatch(logout());
            }}
          >
            Logout
          </Button>
        ) : (
          <>
            <a href="/login">
              <Button variant="contained">Login</Button>
            </a>
            <a href="/signup">
              <Button variant="contained">Signup</Button>
            </a>
          </>
        )}
      </Box>
    </Container>
  );
};

export default NavBar;
