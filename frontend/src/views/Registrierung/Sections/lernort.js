import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import DropDown from "../../../components/Textfeld/Dropdown";
import lernort from "../../../components/Konstante(DropDown)/Lernort";

export default function Lernort(props) {

    const handleLernort = (event) => {
        props.setLernort(event.target.value);
    };

    return (
        <Paper style={props.mode}>
            <Typography style={styles.font}>Wo Lernst du am liebsten (online/ offline)?</Typography>
            <DropDown
                handleChange = {handleLernort}
                input = {props.lernort}
                map = {lernort}
                droplabel = {props.drop}
            />
        </Paper>
    );
}

const styles = {
    font:{
        color: "#898989",
        marginBottom: "5%"
    }
}