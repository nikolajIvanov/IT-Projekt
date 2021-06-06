import React from 'react';
import "../../assets/App.css"
import TeamUpApi from "../../api/TeamUpApi";
import firebase from 'firebase';
import {Card, CardActions, CardContent, Modal, Paper} from "@material-ui/core";
import UserBO from "../../bo/UserBO";
import theme from '../../theme'
import ButtonChat from "../../components/Button/ButtonChat";
import SectionProfilView from "./Sections/SectionProfilView";

class Profil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            apiUser: null,
            modalOpen: false,
        }
    }
    // Wenn der Nutzer auf den Button "Update" klickt, wird diese Methode aufgerufen.
    // Es wird ein neues Objekt der Klasse UserBO erstellt und es werden alle Daten aus der state in das Objekt übertragen
    // und mittels API Call ans Backend übergeben
    handleUpdate  = async () => {
        const user = new UserBO()
        user.setAll(this.state.apiUser)
        await TeamUpApi.getAPI().updateUser(firebase.auth().currentUser.uid, user.getAll()).then(user =>{
            this.setState({
                apiUser: user,
                update: true
            });
        })

    }

    // Wird beim Aufruf der Seite ProfilBO als erstes Aufgerufen und es werden alle Informationen über den aktuellen
    // User geladen und in den state gespeichert.
    async componentDidMount() {
        await TeamUpApi.getAPI().getUser(firebase.auth().currentUser.uid).then(user =>{
            console.log(user)
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
        const {passwort} = this.state

        return (
            <div style={theme.root}>
                {/* Überprüft ob die Daten vom User geladen sind und fügt sie dann in die Komponenten ein. */}
                {apiUser ?
                    <Card style={theme.profileBorder}>
                        <CardContent>
                            {/* SectionProfilView enthält alle User Ansichtsdaten */}
                            <SectionProfilView/>
                        </CardContent>
                        <CardActions style={theme.root}>
                            <ButtonChat inhalt={"Chatten"} onClick={this.handleUpdate}/>
                        </CardActions>
                    </Card> : null }
            </div>
        );
    }
}

export default Profil;