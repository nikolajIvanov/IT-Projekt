import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: "calc(100%-30px)",
        },
    },
}));

export default function InputFeld(props) {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="standard-error-helper-text"
                    label={props.text}
                    value={props.inhalt}
                    defaultValue={props.inputValue}
                    onChange={props.onChange}
                    style={props.style}
                />
            </div>
        </form>
    );
}