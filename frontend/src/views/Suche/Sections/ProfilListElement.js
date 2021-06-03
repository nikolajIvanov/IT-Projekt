import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import List from '@material-ui/core/List';
import theme from "../../../theme";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";

export default function ProfilListElement(props) {
  const users = props.apiUsers;

  const listItems = users.map((user) =>
          (
              <Paper style={{marginBottom:"10%"}}>
                  <ListItem>
                      <Grid container spacing={1}>
                          <Grid  item xs={12} style={theme.root}>
                          <ProfilAvatar img={user.getProfilBild()}/>
                          </Grid>
                          <Grid  item xs={12}>
                              <p style={theme.h2.bold}>{user.getName()} </p>
                          </Grid>
                          <Grid  item xs={12}>
                              <p style={theme.h3.bold}>Semester: {user.getName()} </p>
                          </Grid>
                          <Grid  item xs={12}>
                              <p style={theme.h3.bold}>Studiengang: {user.getName()} </p>
                          </Grid>
                          <Grid  item xs={12}>
                              <p style={theme.h3.bold}>Lerninteresse: {user.getName()} </p>
                          </Grid>
                          <Grid  item xs={12}>
                              <p style={theme.h3.bold}>Ich suche: {user.getModul()} </p>
                          </Grid>
                          <Grid  item xs={12}>
                             <p style={theme.h2.bold}>Lerntyp</p>
                          </Grid>
                          <Grid  item xs={12}>
                              <p style={theme.h3.bold}>{user.getLerntyp()}</p>
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
