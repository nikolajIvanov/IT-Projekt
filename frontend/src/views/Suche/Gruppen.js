import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import GroupListElement from './GroupListElement';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: "lightblue",
        margin: "auto",
    },
});

class Gruppen extends React.Component {

    render(){
        const { classes } = this.props;
        return (
            <div>
            <List className={classes.root}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <ImageIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <WorkIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Work" secondary="Jan 7, 2014" />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <BeachAccessIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                </ListItem>
            </List>
                <GroupListElement tagIcon1="Programmieren" tagIcon2="Grundlagen" beschreibung="Python Grundlagen"
                                    details="In dieser Gruppe lernst du die Python Grundlagen" infos="Mitglieder-Ican 14 / Schneller Lerner / Programmieren"/>

            </div>
        );
    }
}

Gruppen.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gruppen);