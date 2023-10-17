import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
const NavBar = () => {
  return (
    <AppBar elevation={0} position="static" sx={{ mb: 5 }}>
      <Container>
        <Toolbar>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <Typography
                variant="logo"
                sx={{
                  flexGrow: 1,
                }}
              >
                <QueryStatsIcon fontSize="medium" />
                PollPal
              </Typography>
            </Box>
            <Box>
              <Button>Login</Button>
              <Button>Singup</Button>
            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
