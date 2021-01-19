import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import WeatherList from "../components/WeatherList";
import WeatherData from "../components/WeatherData";
import history from "../history";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Switch>
            <Route path="/" exact component={WeatherList} />
            <Route path="/:id" exact component={WeatherData} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
