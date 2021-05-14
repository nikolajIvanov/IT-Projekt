import React, {Component} from 'react';
import firebase from "firebase";

class GetUID extends Component {
    constructor() {
        super();
        this.state={
            userId : "",
            email : "",
            benutzername: "test"
        }
    }

    async componentDidMount() {
        const data = await firebase.auth().currentUser
        this.setState({
            userId: data.uid,
            email: data.email
        })
        this.sendeDaten()
    }

    sendeDaten() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "uid": this.state.userId,
                "name" : this.state.benutzername,
                "email" : this.state.email,
            }),
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

export default GetUID;