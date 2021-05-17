import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import DropDown from "../../../components/Textfeld/Dropdown";

const lerntypArten = [
    {
        value:'',
        label: '',
    },
    {
        value: 1,
        label: 'Visuell',
    },
    {
        value: 2,
        label: 'Auditiv',
    },
    {
        value: 3,
        label: 'Kommunikativ',
    },
    {
        value: 4,
        label: 'Motorisch',
    },
    {
        value: 5,
        label: 'Mischform'
    }
]

//TODO Infofeld für die Lerntypen

function Lerntyp(props) {

    const handleLerntypArt = (event) => {
        props.setLerntypArt(event.target.value);
    };
    return (
        <Paper style={props.mode}>
            <Typography style={styles.font}>Welcher Lerntyp bist du?</Typography>
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