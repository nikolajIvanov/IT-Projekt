import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';



const Styles = ({
    button: {
            width: "calc(100% - 10px)",
        },
});

export default function DropDown(props) {

    return (
        <form noValidate autoComplete="off">
            <div>
                <TextField
                    id="outlined-select-currency-native"
                    select
                    style={Styles.button}
                    label={props.droplabel}
                    value={props.input}
                    onChange={props.handleChange}
                    SelectProps={{
                        native: true,
                    }}
                    variant="outlined"
                >
                    {props.map.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.value}
                        </option>
                    ))}
                </TextField>
            </div>
        </form>
    );
}