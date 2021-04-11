import React, {Component} from 'react';
import GetUser from "./GetUser";
import SetNewUser from "./SetNewUser";
import {BrowserRouter as Router} from "react-router-dom";

class Home extends Component {
    render() {
        return (
            <div>
                <h1 className="App">Willkommen</h1>
                <GetUser/>
                <SetNewUser/>
            </div>
        );
    }
}

export default Home;