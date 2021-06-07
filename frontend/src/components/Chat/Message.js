import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';



export default function SimpleCard(props) {

  return (
    <ListItem key={props.count}>
      <Grid container>
        <Grid item xs={12}>
          <ListItemText align={props.align} primary={props.nachricht} secondary={props.zeit}></ListItemText>
        </Grid>
      </Grid>
    </ListItem>
  );
}
