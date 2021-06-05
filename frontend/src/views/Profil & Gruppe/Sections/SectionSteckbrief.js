import React from 'react';
import Grid from '@material-ui/core/Grid';
import MultiLine from "../../../components/Textfeld/MultiLine";
import DatePicker from "../../../components/Textfeld/DatePicker"
import DropDown from "../../../components/Textfeld/Dropdown";
import Mod from "../../../components/Konstante(DropDown)/Module";
import Semester from "../../../components/Konstante(DropDown)/Semester";
import Studiengang from "../../../components/Konstante(DropDown)/Studiengang";
import theme from '../../../theme'
import SubSectionModule from "./SubSectionModule";
import Typography from "@material-ui/core/Typography";

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

    // Speichert die neuen Werte für  die Variable: Semester
    const handleSemesterChange = (e) => {
        let newObject = props.apiObject;
        newObject.setSemester(e.target.value)
        props.handleChange(newObject)
        console.log(props.apiObject)
    }

    // Speichert die neuen Werte für  die Variable: Studiengang
    const handleStudiengangChange = (e) => {
        let newObject = props.apiObject;
        newObject.setStudiengang(e.target.value)
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
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <MultiLine disabled={props.disabled}
                               inhalt={props.apiObject.getBeschreibung()}
                               handleChange={handleBeschreibungChange} />
                </Grid>
                <Grid item xs={6} >
                    <p style={theme.h3.bold}>Alter</p>
                </Grid>
                <Grid item xs={6} >
                    <p style={theme.h3.bold}>26</p>
                </Grid>
                <Grid item sx={6}>
                    <p style={theme.h3.bold}>Semester:</p>
                </Grid>
                <Grid item sx={6}>
                    <DropDown map={Semester}
                              input={props.apiObject.getSemester()}
                              handleChange={handleSemesterChange}/>
                </Grid>
                <Grid item xs={6}>
                    <p style={theme.h3.bold}>Studiengang:</p>
                </Grid>
                <Grid item xs={6}>
                    <DropDown map={Studiengang}
                              input={props.apiObject.getStudiengang()}
                              handleChange={handleStudiengangChange}/>
                </Grid>
                <Grid item xs={6}>
                    <p style={theme.h3.bold}>Ich suche:</p>
                </Grid>
                <Grid item xs={6}>
                    <SubSectionModule/>
                </Grid>
            </Grid>
        </div>
    );
}