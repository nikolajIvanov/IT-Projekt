import Button from "@material-ui/core/Button";
import React from 'react';
import theme from "../../theme";
import ChatIcon from '@material-ui/icons/Chat';

// Atomic Design Button mit Variablen Props zur Anzeige und Funktionalität des Buttons
function ButtonChat(props) {
    return (
        <div>
            <Button
                onClick={props.onClick}
                style={theme.button.primary}
                disabled={props.disabled}
                startIcon={<ChatIcon />}
            >
                {props.inhalt}
            </Button>
        </div>
    );
}

export default ButtonChat;