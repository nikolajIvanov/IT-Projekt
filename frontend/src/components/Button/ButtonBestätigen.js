import Button from "@material-ui/core/Button";
import React from 'react';


// Atomic Design Button mit Variablen Props zur Anzeige und Funktionalität des Buttons
function ButtonBestätigen(props) {
    return (
        <div>
            <Button
                onClick={props.onClick}
                style={style.button}
                disabled={props.disabled}
                >
                {props.inhalt}
            </Button>
        </div>
    );
}

export default ButtonBestätigen;

const style = {
    button :{
        backgroundColor: "black",
        color: "white",
    }
}