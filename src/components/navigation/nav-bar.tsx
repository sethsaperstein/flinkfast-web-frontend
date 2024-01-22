import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { NavLink } from "react-router-dom";
import { styled } from "@mui/material";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

export const NavBar: React.FC = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#0e0f18",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <img src="/flink.png" alt="Flink Logo" />
            <NavLink to="/">
              <Typography
                sx={{ marginLeft: "10px", fontFamily: "monaco" }}
                variant="h3"
                color="white"
              >
                flink
              </Typography>
            </NavLink>
          </Box>

          {!isAuthenticated && (
            <Box>
              <SignupButton />
              <LoginButton />
            </Box>
          )}
          {isAuthenticated && (
            <Box>
              <ConsoleButton />
              <LogoutButton />
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </Box>
  );
};

const SignupButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/sql",
      },
      authorizationParams: {
        prompt: "login",
        screen_hint: "signup",
      },
    });
  };

  return (
    <Button
      variant="contained"
      onClick={handleSignUp}
      sx={{
        backgroundColor: "#2f74f9",
        m: 2,
      }}
    >
      Sign Up
    </Button>
  );
};

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/sql",
      },
      authorizationParams: {
        prompt: "login",
      },
    });
  };

  return (
    <Button
      variant="outlined"
      onClick={handleLogin}
      sx={{
        backgroundColor: "inherit",
        m: 1,
      }}
    >
      Log In
    </Button>
  );
};

const LogoutButton: React.FC = () => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Button
      variant="contained"
      onClick={handleLogout}
      sx={{
        backgroundColor: "grey",
        m: 2,
      }}
    >
      Log Out
    </Button>
  );
};

const ConsoleButton: React.FC = () => (
  <Button sx={{marginRight: "20px"}}>
    <NavLink to="/sql">Console</NavLink>
  </Button>
);
