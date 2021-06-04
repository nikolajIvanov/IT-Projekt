import Button from "@material-ui/core/Button";
import React from "react";
import theme from "../../theme";
import {Save} from "@material-ui/icons";

// Atomic Design Button mit Variablen Props zur Anzeige und Funktionalität des Buttons
function ButtonSpeichern(props) {
    return (
        <div>
            <Button
                onClick={props.onClick}
                style={theme.button}
                disabled={props.disabled}
                startIcon={<Save />}
            >
                {props.inhalt}
            </Button>
        </div>
    );
}

export default ButtonSpeichern;