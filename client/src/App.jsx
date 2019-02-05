import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import LandingPage from "./components/LandingPage/index.jsx";
import Signup from "./components/Auth/Signup.jsx";
import Login from "./components/Auth/Login.jsx";
import Dashboard from "./components/Dashboard/index.jsx";
import Protected from "./components/Global/Protected.jsx";
import Account from "./components/Account/index.jsx";
import BoardIndex from "./components/Match/index.jsx";
import WaitingPage from "./components/WaitingPage/index.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <Switch>
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route
            path="/acct"
            component={props => <Protected component={Account} {...props} />}
          />
          <Route
            path="/dashboard"
            component={props => <Protected component={Dashboard} {...props} />}
          />
          <Route path="/match/queue" component={WaitingPage} />
          <Route path="/match/:matchId" component={BoardIndex} />
          <Route exact path="/" component={LandingPage} />
          <Route path="*" component={Dashboard} />
        </Switch>
      </div>
    );
  }
}

export default App;