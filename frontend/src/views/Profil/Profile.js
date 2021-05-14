import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import "../../assets/App.css"
import SectionAvatar from "./Sections/SectionAvatar";
import SectionSteckbrief from "./Sections/SectionSteckbrief";
import SectionLerntyp from "./Sections/SectionLerntyp";
import SectionLerngruppe from "./Sections/SectionLerngruppe";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: "lightgray",
        margin: "auto",
    },
    test: {
        width: '20%'
    }

});

class Profile extends React.Component {

    render(){
        const { classes } = this.props;
        return (
            <>
                <Grid container direction="column" justify="space-between" alignItems="center">
                    <SectionAvatar/>
                    <SectionSteckbrief/>
                    <SectionLerntyp/>
                    <SectionLerngruppe/>
                </Grid>
            </>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);