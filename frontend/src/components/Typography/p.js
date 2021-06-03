import {Typography} from "@material-ui/core";

import React from 'react';

function P(props) {
    return (
        <div>
            <Typography variant="subtitle1">{props.text}</Typography>
        </div>
    );
}

export default P;