import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Login from "../src/LoginandRegistration/Login";
import Registration from "../src/LoginandRegistration/Registration";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Registration} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
