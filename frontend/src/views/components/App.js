import React from 'react';
import '../../assets/theme.css';
import Home from "../Home/Home";
import '../../assets/theme.css';
import firebase from "../../api/Firebase";
import Login2 from '../LogIn/Login 2';
import SignUp from '../SignUp/SignUP'
import Registrierung from "../Registrierung/Registrierung";
import TeamUpApi from "../../api/TeamUpApi";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            email : '',
            password :'',
            user: '',
            emailError: '',
            passwordError :'',
            hasAccount: true,
            exist: true,
            }
    }

    componentDidMount() {
        firebase.auth()
            .onAuthStateChanged(user => {
            if (user) {
                this.setState({
                        user: user
                    }
                )
                this.setInit()

            } else {
                this.setState({
                    user: ''
                })
            }
        });
    }

    setPassword = (password) =>{
        this.setState({
            password:password
        })
    }

    setEmail = (email) =>{
        this.setState({
            email:email
        })
    }

    switch = () =>{
        const {hasAccount} = this.state
        this.setState({
            email : '',
            password :'',
            emailError: '',
            passwordError :''
        })
        if(hasAccount){
            this.setState({
                hasAccount:false
            })
        }
        else{
            this.setState({
                hasAccount:true
            })
        }
    }

    setPasswordError = (err) =>{
        this.setState({
            emailError:'',
            passwordError: err,
            password:''
        })
    }

    setEmailError = (err) =>{
        this.setState({
            passwordError:'',
            emailError: err,
            email : ''
        })
    }

    clearInput = () =>{
        this.setState({
            email : '',
            passwort: '',
        })
    }

    setExist = () =>{
        this.setState({
            exist:true
        })
    }

    setInit = async () => {
        const user = firebase.auth().currentUser.uid
        const code = await TeamUpApi.getAPI().getInit(user)
        if(code === 200){
            this.setState({
                user:true,
                exist: true
            })
        }
        else{
            this.setState({
                user:true,
                exist: false
            })
        }
    }

    handleLogIn = () => {
        firebase
            .auth()
            .signInWithEmailAndPassword(
                this.state.email,
                this.state.password
            )
            .then(() =>
            this.clearInput()
            )
            .then(() =>
            this.setInit()
            )
            .catch( error => {
                    console.log(error.code)
                switch (error.code) {
                    case "auth/invalid-email":
                        this.setEmailError("Ungültige Email")
                        break
                    case "auth/user-not-found":
                        this.setEmailError("User nicht gefunden")
                        break
                    case "auth/email-already-in-use":
                        this.setEmailError("Es existiert ein Account mit dieser Email")
                        break
                    case "auth/wrong-password":
                        this.setPasswordError("Falsches Passwort")
                        break
                }
            }
            )
    }

    handleSignUp = () =>{
        firebase
            .auth()
            .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            )
            .then(() =>
            this.clearInput()
             )
            .then(() =>
                this.setInit()
            )
            .catch( error => {
            console.log(error.code)
                switch (error.code) {
                    case "auth/invalid-email":
                        this.setEmailError("Ungültige Email")
                        break
                    case "auth/weak-password":
                        this.setPasswordError("Ihr Password sollte min. 6 Zeichen enthalten")
                }
            })
    }


    render() {
    return(
        <div>
            {this.state.user ? (
                <>
                    {this.state.exist ? (
                            <Home/>
                                ):(
                            <>
                            <Registrierung exist={this.setExist}/>
                            </>
                    )}
                </>
                ) : (
                    <div>
                        {this.state.hasAccount ? (
                            <>
                                <Login2
                                    email={this.state.email}
                                    password={this.state.password}
                                    handleLogIn={this.handleLogIn}
                                    setEmail={this.setEmail}
                                    setPassword={this.setPassword}
                                    switch = {this.switch}
                                    passwordError ={this.state.passwordError}
                                    emailError = {this.state.emailError}
                                    init = {this.setInit}
                                />
                            </>
                            ) : (
                            <>
                                <SignUp
                                    email={this.state.email}
                                    password={this.state.password}
                                    setEmail={this.setEmail}
                                    setPassword={this.setPassword}
                                    handleSignUp={this.handleSignUp}
                                    switch = {this.switch}
                                    passwordError ={this.state.passwordError}
                                    emailError = {this.state.emailError}
                                    />
                            </>
                        )}

                    </div>
            )}
        </div>
    );
  }
}

export default App;
