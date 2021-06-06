import Button from "@material-ui/core/Button";
import React from 'react';
import theme from "../../theme";
import {DeleteRounded} from "@material-ui/icons";


// Atomic Design Button mit Variablen Props zur Anzeige und Funktionalität des Buttons
function ButtonDelete(props) {
    return (
        <div>
            <Button
                onClick={props.onClick}
                style={theme.button.delete}
                disabled={props.disabled}
                startIcon={<DeleteRounded />}
            >
                {props.inhalt}
            </Button>
        </div>
    );
}

export default ButtonDelete;