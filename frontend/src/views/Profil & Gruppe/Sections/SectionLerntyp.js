import React from 'react';
import Grid from '@material-ui/core/Grid';
import AddIcon from "../../../components/Icon/AddIcon";
import DropDown from "../../../components/Textfeld/Dropdown";
import Lerntypen from "../../../components/Konstante(DropDown)/Lerntypen";
import theme from '../../../theme'
import {Card} from "@material-ui/core";


export default function SectionLerntyp(props) {

    // Speichert die neuen Werte für  die Variable: Lerntyp
    const handleLerntypChange = (e) => {
        let newObject = props.apiObject;
        newObject.setLerntyp(e.target.value)
        props.handleChange(newObject)
    }

    return (
        <div style={theme.root}>
            <Card>
            <p style={theme.h3.bold}>Lerntyp:</p>
            <Grid container spacing={1} style={theme.card}>
                <Grid item sx={12}>
                    <DropDown map={Lerntypen} input={props.apiObject.getLerntyp()} handleChange={handleLerntypChange}/>
                </Grid>
                <Grid item sx={12}>
                    <label>{props.lerntyp}</label>
                    <AddIcon />
                </Grid>
            </Grid>
            </Card>
        </div>
    );
}
