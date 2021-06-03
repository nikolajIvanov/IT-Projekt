import React from 'react';
import Grid from '@material-ui/core/Grid';
import "../../assets/App.css"
import SectionAvatar from "./Sections/SectionAvatar";
import SectionSteckbrief from "./Sections/SectionSteckbrief";
import SectionLerntyp from "./Sections/SectionLerntyp";
import SectionLerngruppe from "./Sections/SectionLerngruppe";
import TeamUpApi from "../../api/TeamUpApi";
import firebase from 'firebase';
import ButtonBestätigen from "../../components/Button/ButtonBestätigen";
import {Paper} from "@material-ui/core";
import UserBO from "../../bo/UserBO";
import theme from '../../theme'

class Profile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            disabled: false,
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
        const { apiUser}= this.state;

        return (
            <div style={theme.root}>
                {/* Überprüft ob die Daten vom User geladen sind und fügt sie dann in die Komponenten ein. */}
                { apiUser ?  <Paper style={theme.card}>
                    <SectionAvatar apiObject={apiUser} handleChange={this.handleChange}/>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <SectionSteckbrief disabled={this.state.disabled} apiObject={apiUser}
                                               handleChange={this.handleChange} text={"Steckbrief"} />
                        </Grid>
                        <Grid style={theme.root} item xs={12}>
                            <SectionLerntyp apiObject={apiUser} text={"Lerntyp"} handleChange={this.handleChange}/>
                        </Grid>
                        <Grid style={theme.root} item xs={12}>
                            <SectionLerngruppe text={"Lerngruppen"}/>
                        </Grid>
                    </Grid>
                    <ButtonBestätigen disabled={this.state.disabled} inhalt={"Update"} onClick={this.handleClick}/>
                </Paper> : null }
            </div>
        );
    }
}

export default (Profile);