import React, {Component} from 'react';
import GetUser from "./GetUser";
import SetNewUser from "./SetNewUser";
import GetUid from './API/getUID'

class Home extends Component {
    render() {
        return (
            <div>
                <h1 className="App">Willkommen</h1>
                <GetUid/>
                <GetUser/>
                <SetNewUser/>
            </div>
        );
    }
}

export default Home;