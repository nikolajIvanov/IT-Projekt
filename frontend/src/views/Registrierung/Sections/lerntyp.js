import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import DropDown from "../../../components/Textfeld/Dropdown";
import Lerntypen from "../../../components/Konstante(DropDown)/Lerntypen";

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
                map = {Lerntypen}
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