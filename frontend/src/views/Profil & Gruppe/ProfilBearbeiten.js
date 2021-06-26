import React from 'react';
import Grid from '@material-ui/core/Grid';
import "../../assets/theme.css"
import SectionAvatar from "./Sections/SectionAvatar";
import SectionSteckbrief from "./Sections/SectionSteckbrief";
import SectionLerntyp from "./Sections/SectionLerntyp";
import SectionLerngruppe from "./Sections/SectionLerngruppe";
import TeamUpApi from "../../api/TeamUpApi";
import firebase from 'firebase';
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import {Card, CardActions, CardContent, Modal, Paper} from "@material-ui/core";
import UserBO from "../../bo/UserBO";
import theme from '../../theme'
import ButtonSpeichern from "../../components/Button/ButtonSpeichern";
import ButtonDelete from "../../components/Button/ButtonDelete";
import InputFeld from "../../components/Textfeld/InputFeld";

class ProfilBearbeiten extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            apiUser: null,
            updateUser: null,
            modalOpen: false,
            delete: false,
            passwort: null,
        }
    }
    // Wenn der Nutzer auf den Button "Update" klickt, wird diese Methode aufgerufen.
    // Es wird ein neues Objekt der Klasse UserBO erstellt und es werden alle Daten aus der state in das Objekt übertragen
    // und mittels API Call ans Backend übergeben
    handleUpdate  = async () => {
        console.log(this.state.apiUser)
        const user = new UserBO()
        user.setAll(this.state.apiUser)
        await TeamUpApi.getAPI().updateUser(user.getAll()).then(user =>{
            this.props.history.push("/");
            this.setState({
                apiUser: user,
            });
        })

    }

    //Button-Klick löst einen TeamUP-API call aus der den über die Nutzer aus der DB löscht
    handleDelete = async () => {
        const u = firebase.auth().currentUser;
        const credential = firebase.auth.EmailAuthProvider.credential(
            u.email,
            this.state.passwort
        );
        //User neu authentifizieren um ihn aus der Datenbank zu löschen
        await u.reauthenticateWithCredential(credential);
        //User aus DB löschen
        await TeamUpApi.getAPI().deleteUser(firebase.auth().currentUser.uid)
            .then((res) => {
                if(res === 200){
                    //User von Firebase löschen
                    firebase.auth().currentUser.delete()
                }
                else{
                    //TODO schönere fehlermeldung evtl. eine errorCard
                    alert("Löschen fehlgeschlagen")
                }
            }
        )
    }

    deleteModal = () => {
        this.setState({
            modalOpen: true
        })
    }


    // Kümmert sich um die Änderungen, die der User auf der Seite macht und speichert sie im state
    handleChange = (user) => {
        this.setState({
            apiUser: user
        })
    }

    handlePwChange = (e) =>{
        this.setState({
            passwort: e.target.value
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
    }

    render(){
        const {apiUser, passwort}= this.state;

        return (
            <div style={theme.root}>
                {/* Überprüft ob die Daten vom User geladen sind und fügt sie dann in die Komponenten ein. */}
                {apiUser ?
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
                            <SectionLerngruppe/>
                        </Grid>
                    </Grid>
                    </CardContent>
                        <CardActions style={theme.root}>
                            <ButtonDelete inhalt={"Löschen"} onClick={this.deleteModal}/>
                            <ButtonSpeichern inhalt={"Update"} onClick={this.handleUpdate}/>
                            { this.state.modalOpen ?
                                <Modal open={true}>
                                    <div style={theme.root}>
                                        <Paper style={theme.modalCard}>
                                                <p style={theme.h3.bold}>Willst du uns wirklich verlassen? 😢 </p>
                                            <p style={theme.p}>Du verlierst dadurch deinen Zugang zu TeamUP</p>
                                            <Grid container spacing={1} style={theme.root}>
                                                <Grid item sx={6}>
                                                    <ButtonDelete onClick={() => this.setState({
                                                        modalOpen: false,
                                                        delete: true})} inhalt={"Bestätigen"}/>
                                                </Grid>
                                                <Grid item sx={6}>
                                                <ButtonPrimary inhalt={"Doch bleiben"}
                                                               onClick={() => this.setState({modalOpen: false})}/>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </div>
                                </Modal> : null}
                            {this.state.delete ?
                                <Modal open={true}>
                                    <div style={theme.root}>
                                        <Paper style={theme.modalCard}>
                                            <p style={theme.h3.bold}>Gib dein passwort um dein Account zu löschen:</p>
                                                <InputFeld onChange={this.handlePwChange} inhalt={passwort}/>
                                            <Grid container spacing={1} style={theme.root}>
                                                <Grid item sx={6}>
                                                    <ButtonDelete onClick={this.handleDelete} inhalt={"Bestätigen"}/>
                                                </Grid>
                                                <Grid item sx={6}>
                                                    <ButtonPrimary inhalt={"Bleiben"}
                                                                   onClick={() => this.setState({
                                                                          delete: false
                                                                      })}/>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </div>
                                </Modal> : null }
                        </CardActions>
                </Card> : null }
            </div>
        );
    }
}

export default (ProfilBearbeiten);