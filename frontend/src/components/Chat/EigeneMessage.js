import React from 'react';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import theme from "../../theme";



export default function SimpleCard(props) {

  return (

      <Grid container>
        <Grid item xs={12} style={theme.rightAligned}>
          <Typography style={theme.rightAligned}>{props.nachricht} {props.zeit}</Typography>
        </Grid>
      </Grid>

  );
}
