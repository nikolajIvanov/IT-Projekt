import Button from "@material-ui/core/Button";
import React from 'react';
import theme from "../../theme";


// Atomic Design Button mit Variablen Props zur Anzeige und Funktionalität des Buttons
function ButtonLöschen(props) {
    return (
        <div>
            <Button
                onClick={props.onClick}
                style={theme.button}
                disabled={props.disabled}
            >
                {props.inhalt}
            </Button>
        </div>
    );
}

export default ButtonLöschen;