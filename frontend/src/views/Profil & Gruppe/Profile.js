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
import UserBO from "../../bo/UserBO";

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
            disabled: true,
            apiUser: null
        }
    }
    // Wenn der Nutzer auf den Button "Update" klickt, wird diese Methode aufgerufen.
    // Es wird ein neues Objekt der Klasser UserBO erstellt und es werden alle Daten aus der state in das Objekt übertragen
    // und mittels API Call ans Backend übergeben
    handleClick  = async () => {
        const user = new UserBO()
        user.setAll(this.state.apiUser)
        console.log(user)
        await TeamUpApi.getAPI().updateUser(firebase.auth().currentUser.uid, user.getAll())
    }
    // Kümmert sich um die Änderungen, die der User auf der Seite macht und speichert sie im state
    handleChange = (user) => {
        this.setState({
            apiUser: user
        })
    }
    // Wird beim Aufruf der Seite Profil als erstes Aufgerufen und es werden alle Informationen über den aktuellen
    // User geladen und in den state gespeichert.
    async componentDidMount() {
        await TeamUpApi.getAPI().getUser(firebase.auth().currentUser.uid).then(user =>{
            this.setState({
                apiUser: user
            });
        })
        console.log(this.state.apiUser)
        // Prüft ob man in seinem eigenen Profil ist oder in einem anderen. Je nachdem wird die Ansicht verändert.
        // TODO: Der switch zwischen Anzeige und änderung muss noch angepasst werden.
        if (firebase.auth().currentUser.uid === this.state.apiUser.authId) {
            //this.state.disabled = false
            console.log("AuthId stimmt überein")
        }
    }

    render(){
        const { classes } = this.props;
        const { apiUser}= this.state;

        return (
            <div className={classes.root}>
                {/* Überprüft ob die Daten vom User geladen sind und fügt sie dann in die Komponenten ein. */}
                { apiUser ?  <>
                    <SectionAvatar apiObject={apiUser} handleChange={this.handleChange}/>
                    <Grid container direction="column" justify="center" spacing={1} alignItems="center">
                        <Grid item xs={3}>
                            <SectionSteckbrief disabled={this.state.disabled} apiObject={apiUser}
                                               handleChange={this.handleChange} text={"Steckbrief"} />
                        </Grid>
                        <Grid item xs={3}>
                            <SectionLerntyp apiObject={apiUser} text={"Lerntyp"} handleChange={this.handleChange}/>
                        </Grid>
                        <Grid item xs={3}>
                            <SectionLerngruppe text={"Lerngruppen"}/>
                        </Grid>
                    </Grid>
                    <ButtonBestätigen disabled={this.state.disabled} inhalt={"Update"} onClick={this.handleClick}/>
                </> : null }
            </div>
        );
    }
}

Profile.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);