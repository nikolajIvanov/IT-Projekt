import React from 'react';
import {Typography} from "@material-ui/core";
import theme from "../../theme";

function H1_regular(props) {
    return (
        <div>
            <Typography style={theme.h1.regular}>{props.inhalt}</Typography>
        </div>
    );
}

export default H1_regular;