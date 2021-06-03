import {Typography} from "@material-ui/core";

import React from 'react';

function h4(props) {
    return (
        <div>
            <Typography variant="h4">{props.text}</Typography>
        </div>
    );
}

export default h4;