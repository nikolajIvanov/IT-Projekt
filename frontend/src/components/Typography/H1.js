import {Typography} from "@material-ui/core";

import React from 'react';

function H1(props) {
    return (
        <div>
            <Typography variant="h1" onChange={props.handleChange}>{props.text}</Typography>
        </div>
    );
}

export default H1;