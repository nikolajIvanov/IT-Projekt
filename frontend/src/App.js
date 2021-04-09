import React from "react";
import './App.css';
import firebaseConfig from "./firebaseconfig";
import Test from "./Test";

class App extends React.Component {
  render() {
    return(
      <div>
        <h1 className="App">Lern Bumble</h1>
          <Test/>
      </div>
    );
  }
}

export default App;
