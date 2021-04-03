import React, { useEffect, useState } from "react";
import { Route, Redirect } from "react-router-dom";
import Main from "../components/Main";

const AppRoutes = ({ detail }) => {
  return (
    <>
      <Route exact path="/login" render={() => <Redirect to="/" />} />
      <Route exact path="/" render={() => <Main detail={detail} />} />
    </>
  );
};
export default AppRoutes;
