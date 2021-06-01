import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ProfilAvatar from "../../components/Avatar/ProfilAvatar";
import TagIcon from "../../components/Icon/TagIcon";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '100ch',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

export default function AlignItemsList(probs) {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="center">
        <ProfilAvatar/>
        <ListItemText
          primary= {probs.beschreibung}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {probs.details}
              </Typography>
              <TagIcon inhalt={probs.tagIcon1}/>
              <TagIcon inhalt={probs.tagIcon2}/>
              {probs.infos}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
