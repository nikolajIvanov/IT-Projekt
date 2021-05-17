import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import InputFeld from "../../../components/Textfeld/InputFeld";

function Name(props) {

    const handleName = (event) => {
        props.setName(event.target.value)
    }

    return (
            <Paper style={props.mode}>
                <Typography style={styles.font}>Wie heißt du?</Typography>
                <InputFeld
                    inhalt={props.name}
                onChange={handleName}
                />
            </Paper>
    );
}

export default Name;

const styles = {
    font:{
        color: "#898989",
        marginBottom: "5%"
    }
}