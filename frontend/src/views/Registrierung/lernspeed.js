import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import DropDown from "../../components/Textfeld/Dropdown";

const lernSpeeds = [
    {
        value:'',
        label: '',
    },
    {
        value: 'langsam',
        label: 'Langsam',
    },
    {
        value: 'normal',
        label: 'Normal',
    },
    {
        value: 'schnell',
        label: 'Schnell',
    },
]

function Lernspeed(props) {
    const handleLernSpeed = (event) => {
        props.setLernSpeed(event.target.value);
    };

    return (
            <Paper style={props.mode}>
                <Typography style={styles.font}>Wie schnell lernst du?</Typography>
                <DropDown
                    handleChange = {handleLernSpeed}
                    input = {props.lernSpeed}
                    map = {lernSpeeds}
                    droplabel = {props.drop}
                />
            </Paper>
    );
}

export default Lernspeed;

const styles = {
    font:{
        color: "#898989",
        marginBottom: "5%"
    }
}