import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';



const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function DropDown(props) {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <div>
                <TextField
                    id="outlined-select-currency-native"
                    select
                    label={props.droplabel}
                    value={props.input}
                    onChange={props.handleChange}
                    SelectProps={{
                        native: true,
                    }}
                    helperText="Triff eine Entscheidung!"
                    variant="outlined"
                >
                    {props.map.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </TextField>
            </div>
        </form>
    );
}