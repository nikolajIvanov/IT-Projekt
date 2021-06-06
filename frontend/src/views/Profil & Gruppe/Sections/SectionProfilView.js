import React from 'react';
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {green} from "@material-ui/core/colors";

const test = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        [theme.breakpoints.down('sm')]: {
            backgroundColor: theme.palette.secondary.main,
        },
        [theme.breakpoints.up('md')]: {
            backgroundColor: theme.palette.primary.main,
        },
        [theme.breakpoints.up('lg')]: {
            backgroundColor: green[500],
        },
    },
}));

function SectionProfilView(props) {
    const classes = test();
    return (
        <div className={classes.root}>
            <Typography>{'down(sm): red'}</Typography>
            <Typography>{'up(md): blue'}</Typography>
            <Typography>{'up(lg): green'}</Typography>
        </div>
    );
}

export default SectionProfilView;