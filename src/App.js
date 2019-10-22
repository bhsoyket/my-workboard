import React, { useState } from "react";
import { CSVLink } from "react-csv";
import "./App.css";
import Header from "./views/components/header";
import MyDrawer from "./views/components/drawer";
import Content from "./views/components/content";
import Footer from "./views/components/footer";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import GetAppSharpIcon from "@material-ui/icons/GetAppSharp";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
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

const headers = [
  { label: "User Name",key: "user.name" },
  { label: "Designation", key: "user.designation" },
  { label: "Works", key: "works" }
];

const workData = [
  {
    user: {
      id: 1,
      name: "Belayet Hossain 1",
      designation: "Software Developer"
    },
    works: ["item", "item", "item", "item", "item", "item"]
  },
  {
    user: {
      id: 2,
      name: "Belayet Hossain 2",
      designation: "Software Developer"
    },
    works: ["item", "item", "item", "item", "item", "item"]
  },
  {
    user: {
      id: 3,
      name: "Belayet Hossain 3",
      designation: "Software Developer"
    },
    works: ["item", "item", "item", "item", "item", "item"]
  },
  {
    user: {
      id: 4,
      name: "Belayet Hossain 4",
      designation: "Software Developer"
    },
    works: ["item", "item", "item", "item", "item", "item"]
  }
];

function App() {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState(false);
  const [empState, setEmpState] = useState(workData);
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
          <CSVLink
            data={workData}
            headers={headers}
            filename={"my-file.csv"}
            className="btn btn-primary"
            target="_blank"
          >
            Download me
            <GetAppSharpIcon />
          </CSVLink>
        </Container>
      </main>
      <Footer />
    </div>
  );
}

export default App;
