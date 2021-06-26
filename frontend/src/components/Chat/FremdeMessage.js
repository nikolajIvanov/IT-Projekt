import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import {Typography} from "@material-ui/core";
import theme from "../../theme";



export default function SimpleCard(props) {

  return (

      <Grid container style={theme.leftAligned}>
        <Grid item xs={12} style={theme.leftAligned}>
          <Typography style={theme.rightAligned}>{props.zeit}  {props.nachricht}</Typography>
        </Grid>
      </Grid>

  );
}
