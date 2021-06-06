import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import MultiLine from "../../../components/Textfeld/MultiLine";
import DropDown from "../../../components/Textfeld/Dropdown";
import Semester from "../../../components/Konstante(DropDown)/Semester";
import theme from '../../../theme'
import SubSectionModule from "./SubSectionModule";
import {Card, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import TeamUpApi from "../../../api/TeamUpApi";
import ClassIcon from '@material-ui/icons/Class';

// Dient als Molekül für die Seite ProfilBO und Gruppe.
export default function SectionSteckbrief(props) {
    const [studien, setStudien] = React.useState([])

    useEffect(async () => {
        await TeamUpApi.getAPI().getStudiengang()
            .then((studiengang) => {
                const middle = []
                studiengang.forEach(i => {
                    middle.push({
                        key: i.getID(),
                        value: i.getStudiengang()
                    })
                })
                setStudien(middle)
            })
    }, [])

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

    const handleModul = (e) => {
        let newObject = props.apiObject;
        newObject.setModul(e)
        props.handleChange(newObject)
    }

    return (
        <div style={theme.card}>

            {/*Textfeld für die Beschreibung des Profils*/}

            <MultiLine disabled={props.disabled}
                       inhalt={props.apiObject.getBeschreibung()}
                       handleChange={handleBeschreibungChange} />

            {/* Container für Alter, Semester und Studiengang des Studenten*/}
        <Card style={{padding: "5%"}}>
            <Grid style={theme.root} container spacing={3}>
                    <Grid style={theme.rightAligned} item xs={12} sm={4} >
                        <p style={theme.h3.bold}>Alter:</p>
                    </Grid>
                        <Grid style={theme.root} item xs={12} sm={1} >
                            <p style={theme.h3.bold}>-</p>
                        </Grid>
                    <Grid style={theme.leftAligned} item xs={12} sm={7} >
                        <p style={theme.h3.bold}>26</p>
                    </Grid>
                    <Grid  style={theme.rightAligned} item xs={12} sm={4}>
                        <p style={theme.h3.bold}>Semester:</p>
                    </Grid>
                        <Grid style={theme.root} item xs={12} sm={1} >
                            <p style={theme.h3.bold}>-</p>
                        </Grid>
                    <Grid style={theme.leftAligned} item xs={12} sm={7}>
                        <DropDown map={Semester}
                                  input={props.apiObject.getSemester()}
                                  handleChange={handleSemesterChange}/>
                    </Grid>
                    <Grid style={theme.rightAligned} item xs={12} sm={4}>
                        <p style={theme.h3.bold}>Studiengang:</p>
                    </Grid>
                        <Grid style={theme.root} item xs={12} sm={1} >
                            <p style={theme.h3.bold}>-</p>
                        </Grid>
                    <Grid style={theme.leftAligned} item xs={12} sm={7}>
                        <DropDown map={studien}
                                  input={props.apiObject.getStudiengang()}
                                  handleChange={handleStudiengangChange}/>
                    </Grid>
            </Grid>
        </Card>

            {/*Grid Container mit  Lernmodulen und dem der Komponenten für die Auswahl der Module*/}
            <Card style={{padding: "5%", marginTop: "5%"}}>
                <Grid container>
                    <Grid style={theme.root} item xs={12}>
                        <p style={theme.h3.bold}>Meine Lernmodule:</p>
                    </Grid>
                    <Grid style={theme.root} item xs={12}>
                        <div style={theme.scrollBox}>
                            <List style={theme.card}>
                                {props.apiObject.getModul().map((mod) =>
                                    <ListItem>
                                        <ListItemIcon>
                                            <ClassIcon/>
                                        </ListItemIcon>
                                        <ListItemText>{mod}</ListItemText>
                                    </ListItem>
                                )}
                            </List>
                        </div>
                    </Grid>
                <Grid style={theme.root} item xs={12}>
                    <SubSectionModule setModul={handleModul} modul={props.apiObject.getModul()}
                                      studiengang={props.apiObject.getStudiengang()}/>
                </Grid>
            </Grid>
            </Card>
        </div>
    );
}