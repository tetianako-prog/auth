import React, { useEffect } from "react";
import Register from "./views/Register";
import Login from "./views/Login";
import { Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./components/Navigation";
import styles from "./App.module.css";
import { getProfileFetch } from "./reducers/users";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userSelector } from "./reducers/users";
import Contacts from "./components/Contacts";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => dispatch(getProfileFetch()), [dispatch]);
  return (
    <div className={styles.wrapper}>
      <Navigation />
      <Switch>
        {
          <Route
            path="/"
            exact
            render={() => (
              <div>
                <h1>Home page</h1>
              </div>
            )}
          />
        }
        {/* <Route path="/register" component={Register} />
        <Route path="/login" component={Login} /> */}
        <PrivateRoute
          path="/contacts"
          redirectTo="/login"
          component={Contacts}
        />
        <PublicRoute
          path="/login"
          restricted
          redirectTo="/contacts"
          component={Login}
        />
        <PublicRoute
          path="/register"
          restricted
          redirectTo="/contacts"
          component={Register}
        />
      </Switch>
    </div>
  );
};

const PrivateRoute = ({ component: Component, redirectTo, ...routeProps }) => {
  const { token } = useSelector(userSelector);
  return (
    <Route
      {...routeProps}
      render={(props) =>
        token ? <Component {...props} /> : <Redirect to={redirectTo} />
      }
    />
  );
};

const PublicRoute = ({ component: Component, redirectTo, ...routeProps }) => {
  const { token } = useSelector(userSelector);
  return (
    <Route
      {...routeProps}
      render={(props) =>
        token && routeProps.restricted ? (
          <Redirect to={redirectTo} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default App;
