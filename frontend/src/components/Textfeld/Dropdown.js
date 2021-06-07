import React from 'react';
import TextField from '@material-ui/core/TextField';



const Styles = ({
    button: {
            maxWidth: "200px",
            minWidth: "100px"
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