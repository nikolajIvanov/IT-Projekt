import React, {Component} from 'react';
import firebase from "firebase";

class GetUid extends Component {
    constructor() {
        super();
        this.state={
            userId : ""
        }
    }

    componentDidMount() {
        const data = firebase.auth().currentUser
        this.setState({
            userId : data.uid
        })
        this.sendeDaten()
    }

    sendeDaten() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({"uid": this.state.userId}),
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:5000/users", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    render() {
        return (
            <div>
                <p>Hi {this.state.userId}</p>
            </div>
        );
    }
}

export default GetUid;