import React from 'react';
import {Typography} from "@material-ui/core";
import theme from "../../theme";

function H2_regular(props) {
    return (
        <div>
            <Typography style={theme.h2.regular}>{props.inhalt}</Typography>
        </div>
    );
}

export default H2_regular;