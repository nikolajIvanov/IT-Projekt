import React from 'react';
import '../../assets/App.css';
import Home from "../Home/Home";
import '../../assets/App.css';
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
                console.log(user)
                this.setState({
                        user: user
                    }
                )

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

    setPasswordError = () =>{

    }

    setEmailError = () =>{

    }

    clearInput = () =>{
        this.setState({
            email : '',
            passwort: ''
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
        console.log(code)
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
            .catch(
                //Email und Passwort falsch oder existiert nicht Error Meldung
            )
            .then(() =>
            this.clearInput()
            )
            .then(() =>
            this.setInit()
            )
    }

    handleSignUp = () =>{
        firebase
            .auth()
            .createUserWithEmailAndPassword(
                this.state.email,
                this.state.password
            )
            .catch(
                //Email und Passwort existiert schon Error Meldung
            )
            .then(() =>
            this.clearInput()
             )
            .then(() =>
                this.setInit()
            )
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
