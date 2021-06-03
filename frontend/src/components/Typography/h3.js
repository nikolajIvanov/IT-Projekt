import {Typography} from "@material-ui/core";

import React from 'react';

function H3(props) {
    return (
        <div>
            <Typography variant="h3">{props.text}</Typography>
        </div>
    );
}

export default H3;