import React, {Component} from 'react';
import Navigation from "../Navigation";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Profil from "../Profil & Gruppe/Profil";
import Gruppe from "../Profil & Gruppe/Gruppe";
import MyProfil from "../Profil & Gruppe/ProfilBearbeiten";
import Chat from "../Chat/Chat";
import Match from "../Matching/Match";
import TeamUpApi from "../../api/TeamUpApi";
import firebase from "../../api/Firebase";
import NoMatch from "./Subsection/NoMatch";
import GruppeBearbeiten from "../Profil & Gruppe/GruppeBearbeiten";

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
            currentUser:null,
            matches: true,
            myId: null,
            partnerId: null
        }
    }

    //loggt den nutzer aus soll zu home card redirecten
    handleLogOut(){
        firebase.auth().signOut()
    }

    //soll Aufgerufen werden beim Switch in Matching
    callGroups = async () => {
        await TeamUpApi.getAPI().getMatchGroupList(this.state.currentUser).then(async lerngruppen => {
            if (lerngruppen.status === 500) {
                console.log("Gruppen konnten nicht geladen werden")
            } else {
                this.setState({
                    groups: lerngruppen.result
                });
                await this.getGroups()
            }
        })
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

    async componentDidMount() {
        //Setzt die userId
        await this.setState({
            currentUser: firebase.auth().currentUser.uid
        });
        this.getUserList()
    }

    //Ruft die Kompatiblen/Match User auf
    getUserList = () =>{
        TeamUpApi.getAPI().getMatchUserList(this.state.currentUser).then(async users => {
            if (users.result.length < 1) {
                this.setState({
                    matches: false
                });
            }
            else {
                this.setState({
                    users: users.result
                });
                await this.getUsers()
            }
        })
    }

    setAuswahl = async (user) => {
       this.setState({
            suchobjekt: user
        })
    }

    setMyId = (id) => {
        this.setState({
            myId: id
        })
    }

    setPartnerId = (partnerId) => {
        this.setState({
            partnerId: partnerId
        })
    }

    setMatched = async () => {
        this.setState({
                userList: null
            })
        await this.getUserList()
    }

    render() {
        const {userList, suchobjekt, groupList, matches, myId, partnerId} = this.state
        return (
            <div>
                <Router>
                    <Redirect from='/' to='/' />
                    <Navigation logOut={this.handleLogOut}/>
                    <Switch>
                        <Route path="/" exact>
                                {userList ?
                                <Match userList={userList}
                                       groupList={groupList}
                                       getView={this.setAuswahl}
                                       setMatched={this.setMatched}
                                />
                                    :
                                    <>
                                        {matches ?
                                        <h1 className="App">Matching wird geladen...</h1>
                                                :
                                            <NoMatch/>
                                        }
                                    </>
                                    }
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
                        <Route path="/me"><MyProfil setMatched={this.setMatched}/></Route>
                        <Route path="/chat" exact ><Chat setMyId={this.setMyId}
                                                         myId={myId}
                                                         setPartnerId={this.setPartnerId}/></Route>
                        <Route path="/gruppe_erstellen"><GruppeBearbeiten myId={myId}
                                                                          setMatched={this.setMatched}
                                                                          partnerId={partnerId}/></Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default Home;