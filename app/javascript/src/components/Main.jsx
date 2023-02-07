import React, { useEffect, useState } from "react";

import { PageLoader } from "neetoui";
import PropTypes from "prop-types";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { isPresent } from "utils";

import { setAuthHeaders, registerIntercepts } from "apis/axios";
import initializeI18n from "common/i18n";
import { initializeLogger } from "common/logger";
import PrivateRoute from "components/commons/PrivateRoute";
import Hero from "components/Hero";
import {
  AUTH_ROUTES,
  PRIVATE_ROUTES,
  DASHBOARD_PATH,
  LOGIN_PATH,
} from "components/routeConstants";
import { useAuthState, useAuthDispatch } from "contexts/auth";
import { useUserDispatch, useUserState } from "contexts/user";
import {
  clearLocalStorageCredentials,
  getFromLocalStorage,
} from "utils/storage";

const Main = props => {
  const [loading, setLoading] = useState(true);
  const { authToken } = useAuthState();
  const { user: userContextState } = useUserState();
  const userDispatch = useUserDispatch();
  const authDispatch = useAuthDispatch();
  const currentUser = userContextState || props?.user;
  const isLoggedIn = isPresent(authToken) && isPresent(currentUser);

  useEffect(() => {
    userDispatch({ type: "SET_USER", payload: { user: props?.user } });
    initializeLogger();
    initializeI18n();
    registerIntercepts(authDispatch);
    setAuthHeaders(setLoading);
  }, [authDispatch, props?.user, userDispatch]);

  useEffect(() => {
    const previousLoginAuthEmail = getFromLocalStorage("authEmail");
    const hasDeviseUserSessionExpired = !props?.user;
    const sessionExpiredButLocalStorageCredsExist =
      hasDeviseUserSessionExpired && previousLoginAuthEmail;

    if (sessionExpiredButLocalStorageCredsExist) clearLocalStorageCredentials();
  }, [props?.user?.email]);

  if (loading) {
    return (
      <div className="h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Switch>
        {AUTH_ROUTES.map(route => (
          <Route
            exact
            component={route.component}
            key={route.path}
            path={route.path}
          />
        ))}
        {!isLoggedIn && <Route exact component={Hero} path={DASHBOARD_PATH} />}
        {PRIVATE_ROUTES.map(route => (
          <PrivateRoute
            component={route.component}
            condition={isLoggedIn}
            key={route.path}
            path={route.path}
            redirectRoute={LOGIN_PATH}
          />
        ))}
      </Switch>
    </BrowserRouter>
  );
};

Main.propTypes = {
  user: PropTypes.object,
};

export default Main;
