import React, {Component} from 'react';
import Navigation from "../Navigation";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Profil from "../Profil & Gruppe/Profil";
import Gruppe from "../Profil & Gruppe/Gruppe";
import MyProfil from "../Profil & Gruppe/ProfilBearbeiten";
import Chat from "../Chat/Chat";
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
            groups: null,
            currentUser:null
        }
    }

    //loggt den nutzer aus soll zu home card redirecten
    handleLogOut(){
        firebase.auth().signOut()
    }

    //soll Aufgerufen werden beim Switch in Matching
    callGroups = async () => {
        await TeamUpApi.getAPI().getMatchGroupList(this.state.currentUser).then(lerngruppen => {
            this.setState({
                groups: lerngruppen.result
            });
        })
        await this.getGroups()
    }

    //Überprüft ob Group-matches gefunden wurden
    getGroups = async () => {
        if(this.state.groups.length === 0){
            this.setState({
                groupList: null
            });
        }
        else{
            await TeamUpApi.getAPI().getGroupByMatch(this.state.groups).then(matches => {
                this.setState({
                    groupList: matches
                });
                }
            )}
    }

    //Überprüft ob User-matches gefunden wurden
    getUsers = async () => {
        if(this.state.users.length === 0){
            await this.callGroups()
        }
        else{
        await TeamUpApi.getAPI().getUsersByMatch(this.state.users).then(matches => {
            this.setState({
                userList: matches
            });
            this.callGroups()}
        )}
    }

    // TODO es sollen 10 User/Gruppen geladen werden für Match, nach 5 Swipes weitere
    async componentDidMount() {
        //Setzt die userId
        await this.setState({
            currentUser: firebase.auth().currentUser.uid
        });
        //Api Call für die Matching-User muss auf current user gesetzt werden
        await TeamUpApi.getAPI().getMatchUserList(this.state.currentUser).then(users =>{
            this.setState({
                users: users.result
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
                                <h1 className="App">TeamUP</h1>
                                {userList && groupList ?
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
                        <Route path="/gruppe">
                            {suchobjekt ?
                                <Gruppe profil={suchobjekt}/>
                                : <h1 className="App">Gruppe konnte nicht geladen werden</h1>
                            }
                        </Route>
                        <Route path="/me" component={MyProfil}/>
                        <Route path="/chat"  component={Chat}/>
                        <Route path="/gruppensuche" component={GruppenSuche}/>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Home;