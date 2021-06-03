import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import SearchBar from "../../components/Textfeld/SearchBar";
import GroupPersonSwitch from "../../components/Icon/GroupPersonSwitch"
import TestGruppen from "./TestGruppen";
import FilterIcon from "../../components/Icon/FilterIcon";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        margin: "auto",
    },
});

class Match extends Component {

    render(){
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <GroupPersonSwitch/>
                <SearchBar/>
                <FilterIcon/>
                <TestGruppen/>
            </div>
        );
    }
}

Match.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Match);
