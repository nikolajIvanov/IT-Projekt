import React from 'react';
import {Typography} from "@material-ui/core";
import theme from "../../theme";

function H3_regular(props) {
    return (
        <div>
            <Typography style={theme.h3.regular}>{props.inhalt}</Typography>
        </div>
    );
}

export default H3_regular;