import React from "react";
import { Route, Redirect } from "react-router-dom";

function PrivateRoute({ currentUser, children, ...props }) {
  return (
    <Route
      {...props}
      render={({ location }) => {
        return currentUser ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;
