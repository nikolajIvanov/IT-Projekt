import React from 'react';
import MultiLine from "../../components/Textfeld/MultiLine";
import {Paper, Typography} from "@material-ui/core";

function Bio(props) {
    const handleBio = (event) => {
        props.setBio(event.target.value)
    };

    return (
            <Paper style={props.mode}>
                <Typography style={styles.font}>Erzähle etwas über dich.</Typography>
                <MultiLine
                change={handleBio}
                />
            </Paper>
    );
}

export default Bio;

const styles = {
    font:{
        color: "#898989",
        marginBottom: "5%"
    }
}