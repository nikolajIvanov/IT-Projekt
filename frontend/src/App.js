import React from "react";
import './App.css';
import firebaseConfig from "./firebaseconfig";
import GetUser from "./GetUser";
import SetNewUser from "./SetNewUser";

class App extends React.Component {
  render() {
    return(
      <div>
        <h1 className="App">Willkommen</h1>
          <GetUser/>
          <SetNewUser/>
      </div>
    );
  }
}

export default App;
