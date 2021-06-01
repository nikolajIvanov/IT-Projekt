import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import SearchBar from "../../components/Textfeld/SearchBar";
import GroupPersonSwitch from "../../components/Icon/GroupPersonSwitch"
import TestGruppen from "./TestGruppen";

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
                <TestGruppen/>
            </div>
        );
    }
}

Gruppen.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gruppen);