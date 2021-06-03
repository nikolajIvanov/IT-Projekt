import React, {Component} from 'react';
import '../../assets/App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../Home/Home";
import Profile from "../Profil & Gruppe/Profile";
import Gruppen from "../Profil & Gruppe/Gruppe"
import Navigation from "../Navigation";
import '../../assets/App.css';
import firebase from "../../api/Firebase";
import Chat2 from '../Chat/ChatTest2';
import Login2 from '../LogIn/Login 2';
import SignUp from '../SignUp/SignUP'
import Registrierung from "../Registrierung/Registrierung";
import TeamUpApi from "../../api/TeamUpApi";
import GruppenSuche from "../Suche/GruppenSuche";
import UserBO from "../../bo/UserBO";
import Match from "../Suche/Match";



class App extends React.Component {
    constructor() {
        super();
        this.state = {
            email : '',
            password :'',
            //Object Instantiierungen für User und API
            sendUser: new UserBO(),
            user: '',
            emailError: '',
            passwordError :'',
            hasAccount: true,
            text: 'Hi',
            //TODO die Prüfung von exist soll über ein API call erfolgen der Prüft ob ein Name
            // vorhanden ist (Rückschluss= alles muss da sein)
            exist: true,
            }
        this.setHasAccount = this.setHasAccount.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.switch = this.switch.bind(this)
    }


    componentDidMount() {
        this.authListener()
    }

    setExist = () => {
        this.setState({
            exist: true
        })
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

     checkIfExist = async () => {
        const check =  await TeamUpApi.getAPI().getUser(firebase.auth().currentUser.uid)
        if(check.name === "" || check.onError()){
            this.setState({
                exist: false
            })
        }
        else{
            this.setExist()
        }
    }

    setUp = async () => {
        const check =  await TeamUpApi.getAPI().setUser(firebase.auth().currentUser.uid)
    }

    //TODO Errormeldungen noch personalisieren

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
            });
        this.checkIfExist();
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
            });
        this.setUp();
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
    switch(){
        this.setState({
            hasAccount:!this.state.hasAccount
        })
    }
  render() {
    return(
        <div>
            {this.state.user ? (
                <>
                {this.state.exist ? (
                        <Router>
                            <Navigation logOut={this.handleLogOut}/>
                            <Switch>
                                <Route path="/" exact component={Home}/>
                                <Route path="/gruppen"  component={Gruppen}/>
                                <Route path="/profile"  component={Profile}/>
                                <Route path="/chat"  component={Chat2}/>
                                <Route path="/gruppensuche" component={GruppenSuche}/>
                                <Route path="/matching" component={Match}/>
                            </Switch>
                        </Router>
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
                                passwordError ={this.setPasswordError}
                                emailError = {this.setEmailError}
                />
                                </>
                    ) : (
                        <>
                            <SignUp
                                setEmail={this.setEmail}
                                setPassword={this.setPassword}
                                handleSignUp={this.handleSignUp}
                                switch = {this.switch}
                                passwordError={this.setPasswordError}
                                emailError={this.setEmailError}
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
