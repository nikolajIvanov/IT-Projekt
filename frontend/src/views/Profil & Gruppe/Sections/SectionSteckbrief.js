import React, {useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import MultiLine from "../../../components/Textfeld/MultiLine";
import DropDown from "../../../components/Textfeld/Dropdown";
import theme from '../../../theme'
import SubSectionModule from "./SubSectionModule";
import {Card, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import TeamUpApi from "../../../api/TeamUpApi";
import ClassIcon from '@material-ui/icons/Class';
import SubSectionUserinfo from "./SubSectionUserinfo";
import Semester from "../../../components/Konstante(DropDown)/Semester";

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
    }

    // Speichert die neuen Werte für  die Variable: Studiengang
    const handleStudiengangChange = (e) => {
        let newObject = props.apiObject;
        newObject.setModul([])
        console.log(newObject.getModul())
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
            <SubSectionUserinfo studiengang={props.apiObject.getStudiengang()}
                                alter={props.apiObject.getGeburtstag()}
                                semester={props.apiObject.getSemester()}
                                handleSemesterChange={handleSemesterChange}
                                handleStudiengangChange={handleStudiengangChange}
                                studien={studien}/>
        </Card>

            {/*Grid Container mit  Lernmodulen und dem der Komponenten für die Auswahl der Module*/}
            <Card style={{padding: "5%", marginTop: "5%"}}>
                <Grid container>
                    <Grid style={theme.root} item xs={12}>
                        <Typography style={theme.h3.bold}>Meine Lernmodule:</Typography>
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