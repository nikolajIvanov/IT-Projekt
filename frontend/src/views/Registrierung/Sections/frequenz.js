import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import DropDown from "../../../components/Textfeld/Dropdown";

//TODO Infofeld für die Frequenz

export default function Frequenz(props) {

    const handleFrequenz = (event) => {
        props.setFrequenz(event.target.value);
    };

    const frequenz = [
        {
        value: '',
        label: '',
        },
        {
        value:'täglich',
        label: 'täglich',
        },
        {
        value: 'wöchentlich',
        label: 'wöchentlich',
        },
        {
        value: 'Last Minute',
        label: 'Last Minute',
        }
        ]

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