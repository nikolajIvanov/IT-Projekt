import React from 'react';
import {IconButton, InputBase, Paper} from "@material-ui/core";
import SendIcon from '@material-ui/icons/Send';

function ButtonSend(props) {
    return (
        <div>
            <Paper component="form">
                <InputBase
                    placeholder="Schreib was"
                    value={props.inhalt}
                    onChange={props.onChange}
                    inputProps={{ 'aria-label': 'search google maps' }}
                />
                <IconButton onClick={props.onClick}>
                    <SendIcon />
                </IconButton>
            </Paper>
        </div>
    );
}

export default ButtonSend;