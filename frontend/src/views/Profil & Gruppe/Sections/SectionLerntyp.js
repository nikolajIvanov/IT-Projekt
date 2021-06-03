import React from 'react';
import Grid from '@material-ui/core/Grid';
import AddIcon from "../../../components/Icon/AddIcon";
import DropDown from "../../../components/Textfeld/Dropdown";
import Lerntypen from "../../../components/Konstante(DropDown)/Lerntypen";
import theme from '../../../theme'


export default function SectionLerntyp(props) {

    // Speichert die neuen Werte für  die Variable: Lerntyp
    const handleLerntypChange = (e) => {
        let newObject = props.apiObject;
        newObject.setLerntyp(e.target.value)
        props.handleChange(newObject)
    }

    return (
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <p style={theme.h1.bold}>{props.text}</p>
                <div style={theme.root}>
                    <DropDown map={Lerntypen} input={props.apiObject.getLerntyp()} handleChange={handleLerntypChange}/>
                    <label>{props.lerntyp}</label>
                    <AddIcon />
                </div>
            </Grid>
        </div>
    );
}
