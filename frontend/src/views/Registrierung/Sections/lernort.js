import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import DropDown from "../../../components/Textfeld/Dropdown";

//TODO Infofeld für die Lernorte

export default function Lernort(props) {

    const handleLernort = (event) => {
        props.setLernort(event.target.value);
    };

    const lernort = [
        {
        value: '',
        label: '',
        },
        {
        value:'online',
        label: 'online',
        },
        {
        value: 'offline',
        label: 'offline',
        }
    ]

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