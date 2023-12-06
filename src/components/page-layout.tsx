import React from "react";
import { NavBar } from "./navigation/desktop/nav-bar";
import { MobileNavBar } from "./navigation/mobile/mobile-nav-bar";
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';


interface Props {
  children: JSX.Element;
}

const defaultTheme = createTheme();


export const PageLayout: React.FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="page-layout">
        <NavBar />
        <MobileNavBar />
        <div className="page-layout__content">{children}</div>
      </div>
    </ThemeProvider>
  );
};
