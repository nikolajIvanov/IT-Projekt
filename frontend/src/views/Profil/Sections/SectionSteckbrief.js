import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";
import MultiLine from "../../../components/Textfeld/MultiLine";
import InputFeld from "../../../components/Textfeld/InputFeld";

const useStyles =  makeStyles((theme) =>{
   root: {

   }
});

export default function SectionSteckbrief(props) {
    const classes = useStyles();
    return (
        <div>
            <Grid container direction="column" justify="space-between" alignItems="center">
                <Typography>Steckbrief</Typography>
                <MultiLine/>
                <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                    <Typography>Alter: </Typography>
                    <InputFeld inputValue={props.alter}/>
                </Grid>
                <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                    <Typography>Module: </Typography>
                    <InputFeld inputValue={props.module}/>
                </Grid>
            </Grid>
        </div>
    );
}
