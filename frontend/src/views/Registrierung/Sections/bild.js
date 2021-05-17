import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import DropDown from "../../../components/Textfeld/Dropdown";
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import AddIcon from "../../../components/Icon/AddIcon";

function Bild(props) {

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    })

    const onChange = (file) => {

        if(!file) {
            props.setBild('');
            return;
        }

        fileToDataUri(file)
            .then(dataUri => {
                props.setBild(dataUri)
            })

    }


    return (
            <Paper style={props.mode}>
                <Typography style={styles.font}>Bitte wähle ein Profilbild?</Typography>
                <ProfilAvatar
                img={props.bild}
                />
                <label htmlFor="file-upload" className="custom-file-upload" style={styles.button}>
                    <AddIcon/>
                </label>
                <input id="file-upload" style={styles.b} type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
            </Paper>
    );
}

export default Bild;

const styles = {
    font:{
        color: "#898989",
        marginBottom: "5%"
    },
    b:{
        display: "none",
    },
    button:{
        marginTop:"5%"
    },
}