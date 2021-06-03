import React from 'react';
import Grid from '@material-ui/core/Grid';
import MultiLine from "../../../components/Textfeld/MultiLine";
import DatePicker from "../../../components/Textfeld/DatePicker"
import DropDown from "../../../components/Textfeld/Dropdown";
import Mod from "../../../components/Konstante(DropDown)/Module";
import Lerntypen from "../../../components/Konstante(DropDown)/Lerntypen";
import theme from '../../../theme'

// Dient als Molekül für die Seite ProfilBO und Gruppe.
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
            <Grid style={theme.root} container>
                <MultiLine disabled={props.disabled} handleChange={handleBeschreibungChange} />
                <Grid style={theme.root} container spacing={12} >
                    <p style={theme.h3.bold}>Alter:</p>
                    <DatePicker inhalt={props.apiObject.getGeburtstag()} handleChange={handleDateChange}/>
                </Grid>
                <Grid style={theme.root} container spacing={12}>
                    <p style={theme.h3.bold}>Semester:</p>
                    <DropDown map={Mod}/>
                </Grid>
                <Grid style={theme.root} container spacing={12} >
                    <p style={theme.h3.bold}>Studiengang:</p>
                    <DropDown map={Mod}/>
                </Grid>
                <Grid style={theme.root} container spacing={12} >
                    <p style={theme.h3.bold}>Ich suche:</p>
                    <DropDown map={Mod} input={props.apiObject.getModul()} handleChange={handleModulChange}/>
                </Grid>
            </Grid>
        </div>
    );
}