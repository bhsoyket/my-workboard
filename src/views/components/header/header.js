import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  makeStyles
} from "@material-ui/core";
import { withRouter } from "react-router-dom";
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import clsx from "clsx";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1,
    textAlign: "start"
  },
  button: {
    margin: theme.spacing(1)
  }
}));

function Header({ handleDrawerOpen, open, currentUser, history }) {
  const classes = useStyles();
  return (
    <div className="header__container">      
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon open={open} />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            <Link className="header_link" to="/">
              Dashboard
            </Link>
          </Typography>
          {
          currentUser ? (
            <div className="userIcon">
              <PersonOutlineIcon style={{marginRight:"5px"}} />
              {currentUser.name}
            </div>
          ) : (
            <Button
              variant="outlined"
              color="inherit"
              className={classes.button}
              onClick={() => {
                history.push("/login");
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);
