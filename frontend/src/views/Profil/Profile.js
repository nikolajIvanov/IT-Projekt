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
import User from "../../bo/User";

const styles = theme => ({
    root: {
        maxWidth: '100%',
        margin: "auto",
        overflow: "none"
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

    handleClick  = async () => {
        const user = new User()
        user.setAll(this.state.user)
        await TeamUpApi.getAPI().setUser(user.getAll())
    }

    setDate = (date) => {
        this.setState({
            user:{
                geburtsdatum : date
            }
        });

}

    setModul = (date) => {
        this.setState({
            user: {
                module: module
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
            <div className={classes.root}>
                <SectionAvatar userName={this.state.user.name} img={this.state.user.profilBild} text={"Name"}/>
                <Grid container direction="column" justify="center" spacing={1} alignItems="center">
                    <Grid item xs={3}>
                        <SectionSteckbrief alter={this.state.user.geburtsdatum} module={this.state.user.modul}
                                           dateChange={this.setDate} modulChange={this.setModul} text={"Steckbrief"}/>
                    </Grid>
                    <Grid item xs={3}>
                        <SectionLerntyp lerntyp={this.state.user.lerntyp} text={"Lerntyp"}/>
                    </Grid>
                    <Grid item xs={3}>
                        <SectionLerngruppe text={"Lerngruppen"}/>
                    </Grid>
                </Grid>
                <ButtonBestätigen inhalt={"Update"} onClick={this.handleClick}/>
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);