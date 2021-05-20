import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import "../../assets/App.css"
import SectionAvatar from "./Sections/SectionAvatar";
import SectionSteckbrief from "./Sections/SectionSteckbrief";
import SectionLerntyp from "./Sections/SectionLerntyp";
import SectionLerngruppe from "./Sections/SectionLerngruppe";
import TeamUpApi from "../../api/TeamUpApi";
import firebase from 'firebase';
import ButtonBestätigen from "../../components/Button/ButtonBestätigen";

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
    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }
    setDate = (date) => {
        this.setState({
            user:{
                geburtsdatum : date
            }
        });
}

    async componentDidMount() {
        const user = await TeamUpApi.getAPI().getUser(firebase.auth().currentUser.uid)
        this.setState({
            user: user
        })
        console.log(this.state.user)
    }

    render(){
        const { classes } = this.props;

        return (
            <div className={classes}>
                <Grid container direction="column" justify="center" spacing={5} alignItems="center">
                    <Grid item xs={3}>
                        <SectionAvatar userName={this.state.user.name} img={this.state.user.profilBild}/>
                    </Grid>
                    <Grid item xs={3}>
                        <SectionSteckbrief alter={this.state.user.geburtsdatum} module={this.state.user.modul}
                                           dateChange={this.setDate} />
                    </Grid>
                    <Grid item xs={3}>
                        <SectionLerntyp lerntyp={this.state.user.lerntyp}/>
                    </Grid>
                    <Grid item xs={3}>
                        <SectionLerngruppe/>
                    </Grid>
                    <ButtonBestätigen inhalt={"Update"}/>
                </Grid>
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);