import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import DropDown from "../../../components/Textfeld/Dropdown";

function Bild(props) {
    const handleBild = (event) => {
        props.setBild(event.target.value);
    };

    return (
            <Paper style={props.mode}>
                <Typography style={styles.font}>Bitte wähle ein Profilbild?</Typography>
                <input type="file" name="file" onChange={handleBild} />
            </Paper>
    );
}

export default Bild;

const styles = {
    font:{
        color: "#898989",
        marginBottom: "5%"
    }
}