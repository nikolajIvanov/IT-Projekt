import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import theme from "../../../theme";
import DropDown from "../../../components/Textfeld/Dropdown";
import Drop from "../../../components/Konstante(DropDown)/Studiengang";

function Studiengang(props) {

    const handleSemester = (event) => {
        props.setStudiengang(event.target.value);
    };

    return (
        <Paper style={props.studiengang}>
            <Typography style={theme.font.register}>Was studierst du?</Typography>
            <DropDown
                handleChange = {handleSemester}
                input = {props.modul}
                map = {Drop}
                droplabel = {props.drop}
            />
        </Paper>
    );
}

export default Studiengang;