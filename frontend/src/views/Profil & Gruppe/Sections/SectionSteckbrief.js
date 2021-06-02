import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import MultiLine from "../../../components/Textfeld/MultiLine";
import InputFeld from "../../../components/Textfeld/InputFeld";
import DatePicker from "../../../components/Textfeld/DatePicker"
import H3 from "../../../components/Typography/H3";
import P from "../../../components/Typography/P";
import DropDown from "../../../components/Textfeld/Dropdown";
import Mod from "../../../components/Konstante(DropDown)/Module";

const useStyles =  makeStyles((theme) =>{
   root: {

   }
});

export default function SectionSteckbrief(props) {

    const handleDateChange = (e) => {
        let newUser = props.apiUser;
        newUser.setGeburtstag(e.target.value)
        props.handleChange(newUser)
        //props.dateChange(e.target.value)
    }

    const handleModulChange = (e) => {
        let newUser = props.apiUser;
        newUser.setModul(e.target.value)
        props.handleChange(newUser)
        //props.modulChange(e.target.value)
    }

    const handleBeschreibungChange = (e) => {
    let newUser = props.apiUser;
    newUser.setBeschreibung(e.target.value)
    props.handleChange(newUser)
    //props.modulChange(e.target.value)
    }
    const classes = useStyles();
    return (
        <div>
            <Grid container direction="column" justify="space-between" alignItems="center">
                <H3 text={"Steckbrief"}/>
                <MultiLine disabled={props.disabled} handleChange={handleBeschreibungChange} />
                <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                    <P text={"Alter"} />
                    <DatePicker inhalt={props.apiUser.getGeburtstag()} handleChange={handleDateChange}/>
                </Grid>
                <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                    <P text={"Modul"} />
                    <DropDown map={Mod} input={props.apiUser.getModul()} handleChange={handleModulChange}/>
                </Grid>
            </Grid>
        </div>
    );
}
