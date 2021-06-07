import Button from "@material-ui/core/Button";
import React from 'react';
import ChatIcon from '@material-ui/icons/Chat';
import theme from "../../theme";

// Atomic Design Button mit Variablen Props zur Anzeige und Funktionalität des Buttons
function ButtonChat(props) {
    return (
        <div>
                <Button
                    style={theme.button.primary}
                    onClick={props.onClick}
                    disabled={props.disabled}
                    startIcon={<ChatIcon />}
                >
                    {props.inhalt}
                </Button>
        </div>
    );
}

export default ButtonChat;