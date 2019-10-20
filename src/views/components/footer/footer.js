import React, { Component } from "react";
import { Typography, Link } from "@material-ui/core";
import "./footer.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer__container">
        <Typography variant="body2" color="textSecondary" align="center">
          {"Copyright © "}
          <Link color="inherit" href="https://material-ui.com/">
            My WorkBoard
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </div>
    );
  }
}

export default Footer;
