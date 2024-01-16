import * as React from "react";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip, MenuItem, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";
import AdbIcon from "@mui/icons-material/Adb";

const pages = ["Create Poll", "Demo", "Pricing"];
const settings = ["Dashboard", "Logout"];

const NavBar = ({ isAuthenticated }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClikeSettings = (setting) => {
    if (setting === "Dashboard") {
      navigate("/drafts");
    } else if (setting === "Logout") {
      dispatch(logout());
      navigate("/");
    }
  };

  const handleClikePage = (page) => {
    if (page === "Create Poll") {
      navigate("/create/poll");
    } else if (page === "Demo") {
      navigate("/demo");
    } else if (page === "Pricing") {
      navigate("/pricing");
    }
  };

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <HowToVoteIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              ...theme.typography.logo,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            POLLPAL
          </Typography>

          {/* Mobile View - Start */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleCloseNavMenu();
                    handleClikePage(page);
                  }}
                >
                  <Typography textAlign="center" variant="subtitle2">
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Mobile View - End */}

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              ...theme.typography.logo,
              color: "inherit",
              textDecoration: "none",
            }}
          >
            POLLPAL
          </Typography>
          {/* Desktop View - Start */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleCloseNavMenu();
                  handleClikePage(page);
                }}
                sx={{ my: 2, color: "white", display: "block", ...theme.typography.button }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {/* Desktop View - End */}

          {/* User Authentication - Start */}
          {isAuthenticated ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      textAlign="center"
                      onClick={() => {
                        handleClikeSettings(setting);
                      }}
                    >
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box sx={{ display: "flex", gap: 0.1 }}>
              <Link to="/login">
                <Button variant="contained" disableElevation={true}>
                  Login
                </Button>
              </Link>
              <Link to="/Signup">
                <Button variant="contained" disableElevation={true}>
                  Signup
                </Button>
              </Link>
            </Box>
          )}
          {/* User Authentication - End */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
