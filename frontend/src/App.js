import React from "react";
import './App.css';
import firebaseConfig from "./firebaseconfig";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Gruppen from "./Gruppen";
import Profile from "./Profile";
import Navigation from "./Navigation";

class App extends React.Component {
  render() {
    return(
      <Router>
          <Navigation/>
        <Switch>
          <Route path="/" exact component={Home}/>
          <Route path="/gruppen"  component={Gruppen}/>
            <Route path="/profile"  component={Profile}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
