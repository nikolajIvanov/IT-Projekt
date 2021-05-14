import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from "@material-ui/core/styles";

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
                <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                    <Typography>Alter: </Typography>
                    <Typography>26</Typography>
                </Grid>
                <Grid container spacing={2} direction="row" justify="center" alignItems="center">
                    <Typography>Lerninteresse: </Typography>
                    <Typography> Programmieren</Typography>
                </Grid>
            </Grid>
        </div>
    );
}
