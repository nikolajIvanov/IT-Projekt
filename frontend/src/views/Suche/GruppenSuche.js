import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import GroupListElement from './GroupListElement';
import SearchBar from "../../components/Textfeld/SearchBar";
import GroupPersonSwitch from "../../components/Icon/GroupPersonSwitch"

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        margin: "auto",
    },
});

class Gruppen extends React.Component {

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <GroupPersonSwitch/>
                <SearchBar/>
                <GroupListElement tagIcon1="Programmieren" tagIcon2="Grundlagen" beschreibung="Python Grundlagen"
                                    details="In dieser Gruppe lernst du die Python Grundlagen"
                                    infos="Mitglieder-Ican 14 / Schneller Lerner / Programmieren"/>

            </div>
        );
    }
}

Gruppen.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gruppen);