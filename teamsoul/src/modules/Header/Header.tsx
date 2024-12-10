import React from "react";
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import headerLogo from "../../pictures/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="headerContainer">
      <a href="/">
          <img src={headerLogo} alt="logo" className="headerLogo" />
          </a>
    </div>
  );
};

export default Header;
