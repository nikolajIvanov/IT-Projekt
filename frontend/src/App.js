import React, {Component} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Gruppen from "./Gruppen";
import Profile from "./Profile";
import Navigation from "./Navigation";
import './App.css';
import firebase from "./firebase";
import LogIn from "./LogIn";
import Chat2 from './ChatTest2';



class App extends React.Component {
    constructor() {
        super();
        this.state = {
            email : '',
            password :'',
            user: '',
            emailError: '',
            passwordError :'',
            hasAccount: false
        }
        this.setHasAccount = this.setHasAccount.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this)
    }

    componentDidMount() {
        this.authListener()
    }

    setEmailError(value){
        this.setState({
            emailError: value
        })
    }

    setPasswordError(value){
        this.setState({
            passwordError: value
        })
    }

    setEmail(value){
        this.setState({
            email: value
        })
    }

    setPassword(value){
        this.setState({
            password: value
        })
    }

    setHasAccount(value){
        this.setState({
            hasAccount: value
        })
    }

    handleLogIn(){
        this.clearErrors();
        firebase
            .auth()
            .signInWithEmailAndPassword(this.state.email, this.state.password)
            .catch(err => {
                switch(err.code){
                    case "auth/invalid-email":
                    case "auth/user-disabled":
                    case "auth/user-not-found":
                        this.setEmailError(err.message);
                        break;
                    case "auth/wrong-password":
                        this.setPasswordError(err.message);
                }
            })
    }

    handleSignUp(){
        this.clearErrors();
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .catch(err => {
                switch(err.code){
                    case "auth/email-already-in-use":
                    case "auth/invalid-email":
                        this.setEmailError(err.message);
                        break;
                    case "auth/weak-password":
                        this.setPasswordError(err.message);
                }
            })
    }

    handleLogOut(){
        firebase
            .auth().signOut();
    }

    authListener(){
        firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    this.clearInput();
                    this.setState({
                        user: user
                    })
                } else {
                    this.setState({
                        user: ''
                    })
                }
            }
        )
    }

    clearInput(){
        this.setState({
            email:'',
            password: '',

        })
    }

    clearErrors(){
        this.setState({
            emailError:'',
            passwordError:''
        })
    }

  render() {
    return(
        <div>
            {this.state.user ? (
                    <Router>
                        <Navigation logOut={this.handleLogOut}/>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/gruppen"  component={Gruppen}/>
                            <Route path="/profile"  component={Profile}/>
                            <Route path="/chat"  component={Chat2}/>
                        </Switch>
                    </Router>
            ) : (
                <LogIn email={this.state.email} setEmail={this.setEmail}
                       password={this.state.password} setPassword={this.setPassword}
                       handleLogIn={this.handleLogIn} handleSignUp={this.handleSignUp}
                       hasAccount={this.state.hasAccount} setHasAccount={this.setHasAccount}
                       emailError={this.state.emailError} passwordError={this.state.passwordError}/>
            )}
        </div>
    );
  }
}

export default App;
