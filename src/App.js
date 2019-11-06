import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./views/components/header";
import MyDrawer from "./views/components/drawer";
import Login from "./views/components/login";
import AddTask from "./views/components/add_task";
import Register from "./views/components/register";
import PrivateRoute from "./views/components/private_route";
import Footer from "./views/components/footer";
import { CssBaseline } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Home from "./views/pages/home";
import EmpDetails from "./views/pages/emp_details";
import { Redirect } from "react-router-dom";
import { auth, firestore, createUserDocument } from "./firebase/my-firebase"; // for firebae

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

function App() {
  const classes = useStyles();
  const [drawerState, setDrawerState] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [empState, setEmpState] = useState([]);
  const handleDrawerOpen = () => {
    setDrawerState(!drawerState);
  };

  const handleRegister = userData => {
    auth
      .createUserWithEmailAndPassword(userData.email, userData.password)
      .then(async authUser => {
        const { password, confirm_password, ...user } = userData;
        const userRef = await createUserDocument(authUser, user);
        userRef.onSnapshot(snapShot => {
          const loggedInUser = {
            id: snapShot.id,
            ...snapShot.data()
          };

          setCurrentUser(loggedInUser);
        });
      })
      .catch(error => {
        console.error(error.code, error.message);
      });
  };

  const userData = () => {
    firestore
      .collection("users")
      .get()
      .then(snapshot => {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      })
      .then(users => {
        setEmpState(users);
      })
      .catch(function(error) {
        console.error("Error adding document: ", error);
      });
  };

  useEffect(() => {
    userData();
    let unSubscribeFromAuth = auth.onAuthStateChanged(async authUser => {
      if (authUser) {
        firestore
          .collection("users")
          .doc(`${authUser.uid}`)
          .get()
          .then(snapShot => {
            const user = {
              id: snapShot.id,
              ...snapShot.data()
            };
            setCurrentUser(user);
          });
      } else {
        setCurrentUser(authUser);
      }
    });
    return () => {
      unSubscribeFromAuth();
    };
  }, [setCurrentUser]);

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <Header open={drawerState} handleDrawerOpen={handleDrawerOpen} currentUser={currentUser} />
        <MyDrawer open={drawerState} handleDrawerOpen={handleDrawerOpen} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Switch>
              <Route
                path="/login"
                render={props =>
                  currentUser ? <Redirect to="/" /> : <Login {...props} />
                }
              ></Route>
              <Route
                exact
                path="/register"
                render={props =>
                  currentUser ? (
                    <Redirect to="/" />
                  ) : (
                    <Register handleRegister={handleRegister} {...props} />
                  )
                }
              />

              <PrivateRoute exact path="/new_task" currentUser={currentUser}>
                <AddTask currentUser={currentUser} />
              </PrivateRoute>
              <PrivateRoute
                exact
                path="/emp_details/:id"
                currentUser={currentUser}
              >
                <EmpDetails />
              </PrivateRoute>
              <PrivateRoute
                exact
                path="/edit_work/:work"
                currentUser={currentUser}
              >
                <AddTask currentUser={currentUser} />
              </PrivateRoute>
              <PrivateRoute exact path="/" currentUser={currentUser}>
                <Home employees={empState} />
              </PrivateRoute>
            </Switch>
          </Container>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
