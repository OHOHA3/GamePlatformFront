import React from "react";
import { Link } from "react-router-dom"; // Импортируем Link из react-router-dom
import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import headerLogo from "../../pictures/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="headerContainer">
      <Link to="/">
        {" "}
        {/* Заменили <a href="/"> на <Link to="/"> */}
        <img src={headerLogo} alt="logo" className="headerLogo" />
      </Link>
    </div>
  );
};

export default Header;
