import React from "react";
import ReactDOM from "react-dom";
import ActivityDetailPage from "./components/ActivityDetail";
import ActivitiesPage from "./components/Activities";
import Header from "./components/Header";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
const App = () => {
  return (
    <Router>
      <div className="container">
        <Header />
        <Switch>
          <Route exact path="/calls/:id" component={ActivityDetailPage} />
          <Route path="/archives" component={() => <ActivitiesPage type="archived" />} />
          <Route path="/" component={() => <ActivitiesPage type="active" />} />
          <Route path="/calls">
            <Redirect to="/" />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

export default App;
