import React, { ReactNode } from "react";
import { NavBar } from "./navigation/nav-bar";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, CssBaseline } from "@mui/material";
import { Palette } from "@mui/icons-material";


interface Props {
  children: JSX.Element;
  theme?: string,
}

const overrides = `
  html {
    font-size: 10px;
    text-rendering: geometricPrecision;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  html,
  body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  body {


    color: #fff;
    font-family: "Inter", sans-serif;

    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    overflow-y: scroll;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: "Space Grotesk", sans-serif;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.86);
  }

  h1,
  h2,
  h3 {
    margin-top: 3.2rem;
    margin-bottom: 1.6rem;
  }

  h4,
  h5,
  h6 {
    margin-top: 1.6rem;
    margin-bottom: 1.6rem;
  }

  h1 {
    font-size: 3.2rem;
  }

  h2 {
    font-size: 2.8rem;
  }

  h3 {
    font-size: 2.4rem;
  }

  h4 {
    font-size: 2rem;
  }

  h5 {
    font-size: 1.6rem;
  }

  h6 {
    font-size: 1.4rem;
  }

  p {
    margin: 0 0 1.6rem;
  }

  strong {
    font-weight: 500;
  }

  small {
    font-size: 1.2rem;
  }

  blockquote {
    padding: 1.6rem 3.2rem;
    margin: 0 0 3.2rem;

    border-left: 8px solid #eee;

    font-size: 1.6rem;
    font-style: italic;
  }

  body,
  button,
  input,
  select,
  textarea {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  button,
  input,
  select,
  textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  a {
    color: #fff;
    text-decoration: none;
  }

  figure {
    margin: 0;
  }
  img {
    vertical-align: middle;
  }
`;

const lightTheme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5'
    }
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: overrides,
    }
  }
});

const darkTheme = createTheme({
  palette: {
    background: {
      default: '#0e0f18'
    }
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: overrides,
    }
  }
});


export const PageLayout: React.FC<Props> = ({ children, theme }) => {
  const selectedTheme = theme === "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={selectedTheme}>
      <CssBaseline />
      <Box 
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          height: '100%',
          width: '100%'
        }}
      >
        <NavBar />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%"
          }}
        >
          {children}
        </Box>
      </Box>
    </ThemeProvider>
  );
};
