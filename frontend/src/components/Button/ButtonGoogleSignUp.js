import React from 'react';
import Button from "@material-ui/core/Button";
import GoogleLogo from '../../assets/googleLogo.png'
import firebase from "firebase";

function ButtonGoogleSignUp(props) {
    const provider = new firebase.auth.GoogleAuthProvider();

    function handleSignUpWithGoogle(){
        firebase
            .auth()
            .signInWithPopup(provider)
            .then(() => {
                    props.init()
                }
            )
            .catch((error) => {
            //TODO Errors definieren
        });
    }

    return (
        <div>
            <Button variant="outlined"
                    onClick={handleSignUpWithGoogle}
                    color="primary"
                    style={{marginTop: "10%"}}
                    startIcon={<img style={{width: "1em", height:"1em"}}
                                    src={GoogleLogo}
                                    alt={"google Logo"}
                                    />}>
                SignUp With Google
            </Button>
        </div>
    );
}

export default ButtonGoogleSignUp;