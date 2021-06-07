import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import List from '@material-ui/core/List';
import theme from "../../../theme";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import Link from "@material-ui/core/Link";
import * as PropTypes from "prop-types";

function Redirect(props) {
    return null;
}

Redirect.propTypes = {to: PropTypes.string};
export default function ProfilListElement(props) {
  const users = props.apiUsers;

  function setUser(user){
      console.log("hi")
      props.getView(user)
  }

  const listItems = users.map((user) =>
          (
              <Paper style={{marginBottom:"10%"}}>
                  <ListItem>
                      <Grid container spacing={1}>
                          <Grid  item xs={12} style={theme.root}>
                          <ProfilAvatar img={user.getProfilBild()}/>
                          </Grid>
                          <Grid  item xs={12}>
                              <p style={theme.h2.bold}>
                                  {user.getVorname()}, {""}
                                  {user.getGeburtstag()} </p>
                          </Grid>
                          <Grid  item xs={12}>
                              <p style={theme.h3.bold}>Semester: {user.getSemester()} </p>
                          </Grid>
                          <Grid  item xs={12}>
                              <p style={theme.h3.bold}>Studiengang: {user.getStudiengang()} </p>
                          </Grid>
                          <Grid  item xs={12}>
                              <p style={theme.h3.bold}>Lerninteresse: {user.getBeschreibung()} </p>
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
                        <ButtonPrimary inhalt={"User anzeigen"}/>
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
