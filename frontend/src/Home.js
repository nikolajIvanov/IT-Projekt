import React, {Component} from 'react';
import SetNewUser from "./SetNewUser";

class Home extends Component {
    render() {
        return (
            <div>
                <h1 className="App">Willkommen</h1>
                <SetNewUser/>
            </div>
        );
    }
}

export default Home;