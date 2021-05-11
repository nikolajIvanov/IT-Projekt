import React, {Component} from 'react';
import GetUser from "./GetUser";
import SetNewUser from "./SetNewUser";
import GetUID from './api/GetUID'

class Home extends Component {
    render() {
        return (
            <div>
                <h1 className="App">Willkommen</h1>
                <GetUID/>
                <GetUser/>
                <SetNewUser/>
            </div>
        );
    }
}

export default Home;