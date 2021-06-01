import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import DropDown from "../../../components/Textfeld/Dropdown";

const genders = [
    {
        value:'',
        label: '',
    },
    {
        value: "mann",
        label: 'Mann',
    },
    {
        value: "frau",
        label: 'Frau',
    },
    {
        value: "divers",
        label: 'Divers',
    },

]

function Gender(props) {

    const handleGender = (event) => {
        props.setGender(event.target.value);
    };

    return (
            <Paper style={props.mode}>
                <Typography style={styles.font}>Welches Geschlecht hast du?</Typography>
                <DropDown
                    handleChange = {handleGender}
                    input = {props.gender}
                    map = {genders}
                    droplabel = {props.drop}
                />
            </Paper>
    );
}

export default Gender;

const styles = {
    font:{
        color: "#898989",
        marginBottom: "5%"
    }
}