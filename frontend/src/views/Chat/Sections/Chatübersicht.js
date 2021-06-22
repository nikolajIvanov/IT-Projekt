import React, {useEffect} from 'react';
import {Divider, List} from "@material-ui/core";
import Chatanfragen from "./Subsections/Chatanfragen";
import firebase from "../../../api/Firebase";
import Chats from "./Subsections/Chats";
import H1_bold from "../../../components/Fonts/h1_bold";


// Zeigt alle Chatanfragen und bestehende Chats eines Nutzers
function Chatübersicht(props) {
    const authId = firebase.auth().currentUser.uid
    useEffect(async () => {
    }, [])

    return (
        <div>
            <H1_bold inhalt={"Chatübersicht"}/>
            <div>
                <List className="chatWindow">
                    <Chats
                        roomId={props.roomId}
                        myId={props.myId}
                        teilnehmer={props.teilnehmer}
                        switch={props.switch}
                        authId={authId}
                    />
                    <Divider/>
                    <Chatanfragen
                        authId={authId}/>
                </List>
            </div>
        </div>
    );
}

export default Chatübersicht;