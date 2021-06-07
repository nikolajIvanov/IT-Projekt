import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import InputFeld from "../../../components/Textfeld/InputFeld";

function Name(props) {

    const handleName = (event) => {
        props.setName(event.target.value)
    }

    const handleVorname = (event) => {
        props.setVorname(event.target.value)
    }

    return (
            <Paper style={props.mode}>
                <Typography style={styles.font}>Wie heißt du?</Typography>
                <InputFeld
                    text={"Vorname"}
                    inhalt={props.vorname}
                    onChange={handleVorname}
                />
                <InputFeld
                    text={"Nachname"}
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