import React from 'react';
import DatePickers from "../../components/Textfeld/DatePicker";
import {Paper, Typography} from "@material-ui/core";

function Date(props) {

    const handleDate = (event) =>{
        props.setDate(event.target.value)
    }

    return (
            <Paper style={props.mode}>
                <Typography style={styles.font}>Wann bist du geboren?</Typography>
                <DatePickers change={handleDate}/>
            </Paper>
    );
}

export default Date;

const styles = {
    font:{
        color: "#898989",
        marginBottom: "5%"
    }
}