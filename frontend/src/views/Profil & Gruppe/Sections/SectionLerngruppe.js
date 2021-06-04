import React from 'react';
import theme from '../../../theme'
import {Collapse, Grid, IconButton} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function SectionLerngruppe(props) {
    return (
        <div>
            <Grid container spacing={1} style={theme.root}>
                <Grid item sx={6}>
                    <p style={theme.h2.bold}>{props.text}</p>
                </Grid>
                <Grid item sx={6}>
                    <IconButton aria-label="show more"><ExpandMoreIcon /></IconButton>
                </Grid>
            <Collapse in={false} timeout="auto" unmountOnExit>
            </Collapse>
            </Grid>
        </div>
    );
}
