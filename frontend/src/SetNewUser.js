import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class SetNewUser extends Component {
    constructor() {
        super();
        this.state = {
            name: "",
            email: "",
        }
        this.handleMail = this.handleMail.bind(this);
        this.handleName = this.handleName.bind(this);
    }

    sendeDaten() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
            "name": this.state.name,
            "email": this.state.email
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://127.0.0.1:5000/users", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }

    handleName = event => {
        this.setState({ name: event.target.value });
        console.log(this.state.name)
    };

    handleMail = event => {
        this.setState({ email: event.target.value });
        console.log(this.state.email)
    };

    render() {
        return (
            <div>
                <form style={{textAlign: "center"}}>
                    <TextField onChange={this.handleName} label="Name" required="true" variant="outlined" />
                    <TextField onChange={this.handleMail} label="Email" required="true" variant="outlined" />
                </form>
                <Button onClick={() => this.sendeDaten(this.state.name,this.state.email)
                } variant="contained" color="primary">
                    Absenden
                </Button>
            </div>
        );
    }
}

export default SetNewUser;