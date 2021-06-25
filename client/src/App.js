import React, { Fragment, useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import Dashboard from "./Components/Dashboard.js";
import Login from "./Components/Login.js";
import Register from "./Components/Register.js";
import Home from "./Components/Pages/Home";
import VideoPlayer from "./Components/Pages/VideoPlayer";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };
  return (
    <div className="App">
      <Fragment>
        <Router>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/video/:id" exact component={VideoPlayer} />

            <Route
              path="/login"
              exact
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              path="/register"
              exact
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              path="/dashboard"
              exact
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;
