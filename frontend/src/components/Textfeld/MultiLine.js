import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '100%',
        },
    },
}));

// Atomic Design für ein Multi Line Textfeld. Die Variablen werden dynamisch mittels props angepasst.
export default function MultiLine(props) {
    const classes = useStyles();
    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="beschreibung"
                    label="Bio"
                    multiline
                    rows={4}
                    onChange={props.handleChange}
                    defaultValue={props.inhalt}
                    variant="outlined"
                />
            </div>
        </form>
    );
}