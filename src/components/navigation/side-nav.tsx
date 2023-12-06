import React from "react";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import CodeIcon from "@mui/icons-material/Code";
import SettingsIcon from "@mui/icons-material/Settings";
import ViewStreamIcon from "@mui/icons-material/ViewStream";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import List from "@mui/material/List";
import { NavLink } from "react-router-dom";

export const SideNav: React.FC = () => {
  const drawerWidth = 240;
  const noStyle = { textDecoration: "none", color: "inherit" };

  const mainListItems = (
    <React.Fragment>
      <NavLink to="/sql" style={noStyle}>
        <ListItemButton>
          <ListItemIcon>
            <CodeIcon />
          </ListItemIcon>
          <ListItemText primary="SQL Editor" />
        </ListItemButton>
      </NavLink>
      <NavLink to="/jobs" style={noStyle}>
        <ListItemButton>
          <ListItemIcon>
            <ViewStreamIcon />
          </ListItemIcon>
          <ListItemText primary="Jobs" />
        </ListItemButton>
      </NavLink>
    </React.Fragment>
  );

  const secondaryListItems = (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Admin
      </ListSubheader>
      <NavLink to="/account" style={noStyle}>
        <ListItemButton>
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItemButton>
      </NavLink>
      <NavLink to="/billing" style={noStyle}>
        <ListItemButton>
          <ListItemIcon>
            <AccountBalanceIcon />
          </ListItemIcon>
          <ListItemText primary="Billing" />
        </ListItemButton>
      </NavLink>
    </React.Fragment>
  );

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          top: "auto",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <List>{mainListItems}</List>
      <List>{secondaryListItems}</List>
    </Drawer>
  );
};
