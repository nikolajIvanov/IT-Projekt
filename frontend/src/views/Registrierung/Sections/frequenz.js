import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import DropDown from "../../../components/Textfeld/Dropdown";
import frequenz from "../../../components/Konstante(DropDown)/Frequenz";

export default function Frequenz(props) {

    const handleFrequenz = (event) => {
        props.setFrequenz(event.target.value);
    };

    return (
        <Paper style={props.mode}>
            <Typography style={styles.font}>In welcher Frequenz möchtest du lernen?</Typography>
            <DropDown
                handleChange = {handleFrequenz}
                input = {props.frequenz}
                map = {frequenz}
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