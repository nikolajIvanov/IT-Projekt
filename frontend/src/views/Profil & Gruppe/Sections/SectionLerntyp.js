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
        <div style={theme.card}>
            <p style={theme.h2.bold}>Lerntyp:</p>
            <Grid container spacing={1}>
                <Grid item sx={6}>
                    <DropDown map={Lerntypen} input={props.apiObject.getLerntyp()} handleChange={handleLerntypChange}/>
                </Grid>
                <Grid item sx={6}>
                    <label>{props.lerntyp}</label>
                    <AddIcon />
                </Grid>
            </Grid>
        </div>
    );
}
