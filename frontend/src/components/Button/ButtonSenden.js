import Button from "@material-ui/core/Button";
import React from 'react';
import SendenIcon from "../../components/Icon/SendenIcon";
import theme from "../../theme";


function ButtonSenden(props) {
    return (
        <div>
                <Button
                    style={theme.button.primary}
                    onClick={props.onClick}
                    disabled={props.disabled}
                    startIcon={<SendenIcon />}
                >
                    {props.inhalt}
                </Button>
        </div>
    );
}

export default ButtonSenden;