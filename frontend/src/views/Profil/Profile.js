import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import "../../assets/App.css"
import SectionAvatar from "./Sections/SectionAvatar";
import SectionSteckbrief from "./Sections/SectionSteckbrief";
import SectionLerntyp from "./Sections/SectionLerntyp";
import SectionLerngruppe from "./Sections/SectionLerngruppe";
import User from "../../bo/User";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        background: "lightgray",
        margin: "auto",
    },
    test: {
        width: '20%'
    },
    grid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});

class Profile extends React.Component {

    componentDidMount() {

    }

    render(){
        const { classes } = this.props;
        const user = new User()
        return (
            <div className={classes}>
                <Grid container direction="column" justify="center" spacing={5} alignItems="center">
                    <Grid item xs={3}>
                        <SectionAvatar userName={user.getName()}/>
                    </Grid>
                    <Grid item xs={3}>
                        <SectionSteckbrief alter={user.getGeburtstag()} module={user.getBeschreibung()}/>
                    </Grid>
                    <Grid item xs={3}>
                        <SectionLerntyp/>
                    </Grid>
                    <Grid item xs={3}>
                        <SectionLerngruppe/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);