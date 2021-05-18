import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import MultiLine from "../../../components/Textfeld/MultiLine";
import InputFeld from "../../../components/Textfeld/InputFeld";
import DatePicker from "../../../components/Textfeld/DatePicker"

const useStyles =  makeStyles((theme) =>{
   root: {

   }
});



export default function SectionSteckbrief(props) {

    const handleChange = (e) => {
        props.dateChange(e.target.value)
    }
    const classes = useStyles();
    return (
        <div>
            <Grid container direction="column" justify="space-between" alignItems="center">
                <Typography>Steckbrief</Typography>
                <MultiLine/>
                <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                    <Typography>Alter: </Typography>
                    <DatePicker inhalt={props.alter} change={handleChange}/>
                </Grid>
                <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                    <Typography>Module: </Typography>
                    <InputFeld inhalt={props.module}/>
                </Grid>
            </Grid>
        </div>
    );
}
