import {Typography} from "@material-ui/core";

import React from 'react';

function H2(props) {
    return (
        <div>
            <Typography variant="h2">{props.text}</Typography>
        </div>
    );
}

export default H2;