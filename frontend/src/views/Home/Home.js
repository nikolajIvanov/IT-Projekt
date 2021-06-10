import React, {Component} from 'react';
import Navigation from "../Navigation";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Profil from "../Profil & Gruppe/Profil";
import Gruppen from "../Profil & Gruppe/Gruppe";
import MyProfil from "../Profil & Gruppe/ProfilBearbeiten";
import Chat2 from "../Chat/ChatTest2";
import GruppenSuche from "../Matching/GruppenSuche";
import Match from "../Matching/Match";
import TeamUpApi from "../../api/TeamUpApi";
import firebase from "../../api/Firebase";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: null,
            groupList: null,
            suchobjekt: null,
            dataLoad: false,
            users: null,
            currentUser:null
        }
    }

    //loggt den nutzer aus
    handleLogOut(){
        firebase.auth().signOut()
    }

    //soll Aufgerufen werden beim Switch in Matching
    callGroups = async () => {
        await TeamUpApi.getAPI().getAllGruppe().then(lerngruppen => {
            this.setState({
                groupList: lerngruppen,
                dataLoad: true
            });
        })
    }

    getUsers = async () => {
        await TeamUpApi.getAPI().getUsersByMatch(this.state.users).then(users => {
            console.log(users)
            this.setState({
                userList: users
            });
        })
    }

    // TODO es sollen 10 User/Gruppen geladen werden für Match, nach 5 Swipes weitere
    async componentDidMount() {
        await this.setState({
            currentUser: firebase.auth().currentUser.uid
        });
        //Api Call für die Matching-User muss auf current user gesetzt werden
        await TeamUpApi.getAPI().getMatchUserList(1111).then(users =>{
            console.log(users)
            this.setState({
                users: {
                    id: users
                }
            });
        })
        await this.getUsers()
    }

    setAuswahl = async (user) => {
        await this.setState({
            suchobjekt: user
        })
    }

    render() {
        /*
        * Profil --> bekommt das ausgewählte Nutzerobjekt
        * TODO Match --> Setzt das ausgewählte Nutzer- oder Gruppenobjekt --> onClick muss auswahl setzen
        *                                                                     und showView aufrufen
        * TODO MyProfil --> Profilansicht des Nutzers , Einstellungen (Zahnrad in Profil?) --> Profildaten ändern
        * */

        //TODO Skeleton wenn Nutzer nicht da ist
        const {userList, suchobjekt, groupList} = this.state
        return (
            <div>
                <Router>
                    <Navigation logOut={this.handleLogOut}/>
                    <Switch>
                        <Route path="/" exact>
                                <h1 className="App">Willkommen</h1>
                                {userList ?
                                <Match userList={userList}
                                       groupList={groupList}
                                       getView={this.setAuswahl}/>
                                    : <h1 className="App">User konnte nicht geladen werden</h1>}
                        </Route>
                        <Route path="/profil">
                            {suchobjekt ?
                            <Profil profil={suchobjekt}/>
                                : <h1 className="App">User konnte nicht geladen werden</h1>
                            }
                        </Route>
                        <Route path="/gruppen"><Gruppen/></Route>
                        <Route path="/me" component={MyProfil}/>
                        <Route path="/chat"  component={Chat2}/>
                        <Route path="/gruppensuche" component={GruppenSuche}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Home;