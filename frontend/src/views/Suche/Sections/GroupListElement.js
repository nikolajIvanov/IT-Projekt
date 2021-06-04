import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import List from '@material-ui/core/List';
import theme from "../../../theme";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";

// TODO: Muss komplett erstellt werden.
export default function GroupListElement(props) {
  const gruppen = props.apiGruppe;

  const listItems = gruppen.map((gruppe) =>
          (
              <Paper style={{marginBottom:"10%"}}>
                  <ListItem>
                      <Grid container spacing={1}>
                          <Grid  item xs={12} style={theme.root}>
                          <ProfilAvatar img={gruppe.getProfilBild()}/>
                          </Grid>
                          <Grid  item xs={12}>
                              <p style={theme.h2.bold}>{gruppe.getName()} </p>
                          </Grid>
                          <Grid  item xs={12}>
                              <p style={theme.h3.bold}>Lerninteresse: {gruppe.getName()} </p>
                          </Grid>
                          <Grid  item xs={12}>
                              <p style={theme.h3.bold}>Wir lernen: {gruppe.getModul()} </p>
                          </Grid>
                          <Grid  item xs={12}>
                             <p style={theme.h2.bold}>Lerntyp</p>
                          </Grid>
                          <Grid  item xs={12}>
                              <p style={theme.h3.bold}>{gruppe.getLerntyp()}</p>
                          </Grid>
                      </Grid>
                  </ListItem>
              </Paper>
          )
  );

  return(
      <div>
          <List>
              {listItems}
          </List>
      </div>
  )

}
