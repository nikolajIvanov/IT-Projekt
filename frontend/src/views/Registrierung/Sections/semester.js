import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import DropDown from "../../../components/Textfeld/Dropdown";
import Drop from "../../../components/Konstante(DropDown)/Semester";
import theme from "../../../theme";

function Semester(props) {

    const handleSemester = (event) => {
        props.setSemester(event.target.value);
    };

    return (
        <Paper style={props.mode}>
            <Typography style={theme.font.register}>In welchem Semester bist du?</Typography>
            <DropDown
                handleChange = {handleSemester}
                input = {props.semester}
                map = {Drop}
                droplabel = {props.drop}
            />
        </Paper>
    );
};

export default Semester;