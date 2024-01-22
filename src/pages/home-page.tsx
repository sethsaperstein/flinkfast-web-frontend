import React from "react";
import { PageLayout } from "../components/page-layout";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useAuth0 } from "@auth0/auth0-react";

export const HomePage: React.FC = () => {
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

  const gradientStyles = {
    backgroundImage: 'linear-gradient(to bottom right, white, #2f74f9)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };
  
  return (
    <PageLayout theme="dark">
      <Box 
        m={17}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Box style={gradientStyles} >
          <Typography variant="h1" color="transparent" align="center" fontWeight="600">
            One platform for ETL and Stream Processing?<br />
            Yeah, we do that!
          </Typography>
        </Box>
        <Typography variant="h4" color="#f5f5f5" align="center" fontWeight="300" m={3} >
          Powered by Apache Flink®, we provides a fast, easy, yet powerful stream processing 
          platform free from the pain, time, and cost of assembling the individual components.
        </Typography>
        <Box display="flex" flexDirection="row" alignItems="center">
          <Button 
            variant="contained" 
            size="large"
            onClick={handleSignUp}
            sx={{ marginRight: "30px", backgroundColor: "#2f74f9" }}
          >
            Sign Up
          </Button>
          <Button 
            variant="outlined" 
            size="large"
            component="a"
            href="https://nightlies.apache.org/flink/flink-docs-release-1.18/docs/dev/table/sql/gettingstarted/"
            target="_blank"
            sx={{ color: "#2f74f9" }}
          >
           Documentation
          </Button>
        </Box>
      </Box>
    </PageLayout>
  );

};
