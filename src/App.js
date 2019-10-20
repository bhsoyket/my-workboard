import React, { useState } from "react";
import "./App.css";
import Header from "./views/components/header";
import MyDrawer from "./views/components/drawer";
import Content from "./views/components/content";
import Footer from "./views/components/footer";
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto"
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}));

function App() {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState(false);
  const [empState, setEmpState] = useState([1,2,3,4,5]);
  const handleDrawerOpen = () => {
    setDrawerState(!drawerState);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header open={drawerState} handleDrawerOpen={handleDrawerOpen} />
      <MyDrawer open={drawerState} handleDrawerOpen={handleDrawerOpen} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Content employees={empState} />
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
