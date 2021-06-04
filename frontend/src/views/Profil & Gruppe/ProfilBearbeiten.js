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
import {Card, CardActions, CardContent, Modal, Paper, Typography} from "@material-ui/core";
import UserBO from "../../bo/UserBO";
import theme from '../../theme'
import ButtonSpeichern from "../../components/Button/ButtonSpeichern";
import ButtonLöschen from "../../components/Button/ButtonLöschen";

class ProfilBearbeiten extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            apiUser: null,
            modalOpen: false
        }
    }
    // Wenn der Nutzer auf den Button "Update" klickt, wird diese Methode aufgerufen.
    // Es wird ein neues Objekt der Klasser UserBO erstellt und es werden alle Daten aus der state in das Objekt übertragen
    // und mittels API Call ans Backend übergeben
    handleUpdate  = async () => {
        const user = new UserBO()
        user.setAll(this.state.apiUser)
        console.log(user)
        await TeamUpApi.getAPI().updateUser(firebase.auth().currentUser.uid, user.getAll())
    }

    //Button-Klick löst einen TeamUP-API call aus der den über die Nutzer aus der DB löscht
    handleLöschen = async () => {
        const user = new UserBO()
        user.setAll(this.state.apiUser)
        console.log(user)
        await TeamUpApi.getAPI().deleteUser(firebase.auth().currentUser.uid)
    }

    löschenModal = () => {
        this.setState({
            modalOpen: true
        })
        return(
            <div style={theme.root}>
                <Paper style={theme.modalCard}>
                    <h1>Wollen Sie ihr Profil wirklich löschen</h1>
                    <ButtonBestätigen inhalt={"Bestätigen"}/>
                </Paper>
            </div>
        )
    }


    // Kümmert sich um die Änderungen, die der User auf der Seite macht und speichert sie im state
    handleChange = (user) => {
        this.setState({
            apiUser: user
        })
    }
    // Wird beim Aufruf der Seite ProfilBO als erstes Aufgerufen und es werden alle Informationen über den aktuellen
    // User geladen und in den state gespeichert.
    async componentDidMount() {
        await TeamUpApi.getAPI().getUser(firebase.auth().currentUser.uid).then(user =>{
            this.setState({
                apiUser: user
            });
        })
        console.log(this.state.apiUser)
        // Prüft ob man in seinem eigenen ProfilBO ist oder in einem anderen. Je nachdem wird die Ansicht verändert.
        // TODO: Der switch zwischen Anzeige und änderung muss noch angepasst werden.
        if (firebase.auth().currentUser.uid === this.state.apiUser.authId) {
            //this.state.disabled = false
            console.log("AuthId stimmt überein")
        }
    }

    render(){
        const {apiUser}= this.state;

        return (
            <div style={theme.root}>
                {/* Überprüft ob die Daten vom User geladen sind und fügt sie dann in die Komponenten ein. */}
                { apiUser ?
                    <Card style={theme.profileBorder}>
                    <CardContent>
                    <SectionAvatar apiObject={apiUser} handleChange={this.handleChange}/>
                    <Grid container spacing={3}>
                        <Grid style={theme.root} item xs={12}>
                            <SectionSteckbrief apiObject={apiUser}
                                               handleChange={this.handleChange} text={"Steckbrief"} />
                        </Grid>
                        <Grid style={theme.root} item xs={12}>
                            <SectionLerntyp apiObject={apiUser} handleChange={this.handleChange}/>
                        </Grid>
                        <Grid style={theme.root} item xs={12}>
                            <SectionLerngruppe text={"Lerngruppen"}/>
                        </Grid>
                    </Grid>
                    </CardContent>
                        <CardActions style={theme.root}>
                            <ButtonLöschen inhalt={"Löschen"} onClick={this.löschenModal}/>
                            <ButtonSpeichern inhalt={"Update"} onClick={this.handleUpdate}/>
                            { this.state.modalOpen ?
                                <Modal open={true}>
                                    <div style={theme.root}>
                                        <Paper style={theme.modalCard}>
                                                <p style={theme.h3.bold}>Willst du uns wirklich verlassen? 😢 </p>
                                            <p style={theme.p}>Du verlierst dadurch deinen Zugang zu TeamUP</p>
                                            <Grid container spacing={1} style={theme.root}>
                                                <Grid item sx={6}>
                                                    <ButtonLöschen inhalt={"Bestätigen"}/>
                                                </Grid>
                                                <Grid item sx={6}>
                                                <ButtonBestätigen inhalt={"Doch bleiben"}
                                                                  onClick={() => this.setState({
                                                                      modalOpen: false
                                                                  })}/>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </div>
                                </Modal> : null}
                        </CardActions>
                </Card> : null }
            </div>
        );
    };
}

export default (ProfilBearbeiten);