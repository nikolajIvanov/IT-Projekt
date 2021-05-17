import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import DropDown from "../../../components/Textfeld/Dropdown";

const lerntypArten = [
    {
        value:'',
        label: '',
    },
    {
        value: 'visuell',
        label: 'Visuell',
    },
    {
        value: 'audio',
        label: 'Audio',
    },
    {
        value: 'wiederholung',
        label: 'Wiederholung',
    },
    {
        value: 'bulimie',
        label: 'Bulimie',
    },
]

function Lerntyp(props) {

    const handleLerntypArt = (event) => {
        props.setLerntypArt(event.target.value);
    };
    return (
        <Paper style={props.mode}>
            <Typography style={styles.font}>Wie lernst du?</Typography>
            <DropDown
                handleChange = {handleLerntypArt}
                input = {props.lerntypArt}
                map = {lerntypArten}
                droplabel = {props.drop}
            />
        </Paper>
    );
}

export default Lerntyp;

const styles = {
    font:{
        color: "#898989",
        marginBottom: "5%"
    }
}