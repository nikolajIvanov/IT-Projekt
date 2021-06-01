import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import DropDown from "../../../components/Textfeld/Dropdown";

const modula = [
    {
        value:'',
        label: '',
    },
    {
        value: "programmieren",
        label: 'Programmieren',
    },
    {
        value: "data-science",
        label: 'Data Science',
    },
    {
        value: "marketing",
        label: 'Marketing',
    },
]

function Module(props) {

    const handleModul = (event) => {
        props.setModul(event.target.value);
    };

    return (
            <Paper style={props.mode}>
                <Typography style={styles.font}>Was willst du lernen?</Typography>
                <DropDown
                    handleChange = {handleModul}
                    input = {props.modul}
                    map = {modula}
                    droplabel = {props.drop}
                />
            </Paper>
    );
}

export default Module;

const styles = {
    font:{
        color: "#898989",
        marginBottom: "5%"
    }
}