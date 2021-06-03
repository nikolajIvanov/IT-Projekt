import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import MultiLine from "../../../components/Textfeld/MultiLine";
import DatePicker from "../../../components/Textfeld/DatePicker"
import H4 from "../../../components/Typography/h4";
import P from "../../../components/Typography/p";
import DropDown from "../../../components/Textfeld/Dropdown";
import Mod from "../../../components/Konstante(DropDown)/Module";

// Dient als Molekül für die Seite Profil und Gruppe.
export default function SectionSteckbrief(props) {

    // Speichert die neuen Werte für  die Variable: Geburtstag
    const handleDateChange = (e) => {
        let newObject = props.apiObject;
        newObject.setGeburtstag(e.target.value)
        props.handleChange(newObject)
    }

    // Speichert die neuen Werte für  die Variable: Modul
    const handleModulChange = (e) => {
        let newObject = props.apiObject;
        newObject.setModul(e.target.value)
        props.handleChange(newObject)
    }

    // Speichert die neuen Werte für  die Variable: Beschreibung
    const handleBeschreibungChange = (e) => {
    let newObject = props.apiObject;
    newObject.setBeschreibung(e.target.value)
    props.handleChange(newObject)
    }
    return (
        <div>
            <Grid container direction="column" justify="space-between" alignItems="center">
                <H4 text={"Steckbrief"}/>
                <MultiLine disabled={props.disabled} handleChange={handleBeschreibungChange} />
                <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                    <P text={"Alter: 26"} />
                    <DatePicker inhalt={props.apiObject.getGeburtstag()} handleChange={handleDateChange}/>
                </Grid>
                <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                    <P text={"Modul"} />
                    <DropDown map={Mod} input={props.apiObject.getModul()} handleChange={handleModulChange}/>
                </Grid>
            </Grid>
        </div>
    );
}