import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import "../../assets/App.css"
import SectionAvatar from "./Sections/SectionAvatar";

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
                <SectionAvatar/>

            </>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);