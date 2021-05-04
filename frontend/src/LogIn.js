import React, {Component} from 'react';

class LogIn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>

                {/*Login Felder*/}

                <section className="login" style={{textAlign: "center"}}>
                    <div className="logincontainer">
                        <label>Email</label>
                        <input type="text" autoComplete="on" autoFocus required value={this.props.email}
                               onChange={(e) => this.props.setEmail(e.target.value)}/>
                        <p className="errorMsg">{this.props.emailError}</p>
                        <label>Password</label>
                        <input type="text" autoFocus required value={this.props.password}
                               onChange={(e) => this.props.setPassword(e.target.value)}/>
                        <p className="errorMsg">{this.props.passwordError}</p>
                        <div className="btnContainer">

                            {/*Anmeldungs- und Registrierungsoption wechseln*/}

                            {this.props.hasAccount ? (
                                <>
                                    <button onClick={this.props.handleLogIn}>Einloggen</button>
                                    <p>Noch kein Account? <span
                                        onClick={() => this.props.setHasAccount(!this.props.hasAccount)
                                        }>Anmelden</span></p>
                                </>
                            ) : (
                                <>
                                    <button onClick={this.props.handleSignUp}>Anmelden</button>
                                    <p>Bereits einen Account? <span
                                        onClick={() => this.props.setHasAccount(!this.props.hasAccount)}
                                    >Einloggen</span></p>
                                </>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default LogIn;