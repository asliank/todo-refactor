import React from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

import { Route, Redirect } from "react-router-dom";

const AuthRoutes = () => (
  <>
    <Route exact path="/" render={() => <Redirect to="/login" />} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/sign-up" component={SignUp} />
  </>
);

export default AuthRoutes;
