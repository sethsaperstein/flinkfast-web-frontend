import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { PageLayout } from "../../components/page-layout";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { Jobs } from "../../components/dashboard/jobs";
import { SideNav } from "../../components/navigation/side-nav";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Sql } from "src/components/dashboard/sql";

export const SqlPage: React.FC = () => {
  return (
    <PageLayout>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <SideNav />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100%",
          }}
        >
          <AppBar
            position="static"
            sx={{ backgroundColor: "white", color: "black" }}
          >
            <Toolbar>
              <Typography variant="h4" component="div">
                SQL Editor
              </Typography>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Sql />
          </Container>
        </Box>
      </Box>
    </PageLayout>
  );
};
