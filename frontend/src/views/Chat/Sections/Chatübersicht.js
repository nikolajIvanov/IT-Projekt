import React, {useEffect} from 'react';
import {Divider, List} from "@material-ui/core";
import Header from "../../../components/Fonts/header";
import Chatanfragen from "./Subsections/Chatanfragen";
import Chats from "./Subsections/Chats";
import firebase from "../../../api/Firebase";

function Chatübersicht(props) {
    const authId = firebase.auth().currentUser.uid

    useEffect(async () => {

    }, [])

    return (
        <div>
            <Header inhalt={"Chat"}/>
            <div>
                <List className="chatWindow">
                    <Divider/>
                    <Chats authId={authId}/>
                </List>
            </div>
        </div>
    );
}

export default Chatübersicht;