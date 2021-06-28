import React, {useEffect} from 'react';
import {Collapse, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import Chatanfragen from "./Subsections/Chatanfragen";
import firebase from "../../../api/Firebase";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import Chats from "./Subsections/Chats";
import H1_bold from "../../../components/Fonts/h1_bold";
import {ExpandLess, ExpandMore} from "@material-ui/icons";

// Zeigt alle Chatanfragen und bestehende Chats eines Nutzers
function Chatübersicht(props) {
    const authId = firebase.auth().currentUser.uid
    const [open, setOpen] = React.useState(false)

    function handleClick(){
        if(open === true){
            setOpen(false)
        }
        else{
            setOpen(true)
        }
    }

    return (
        <div>
            <div className="chatUeberschrift">
                <H1_bold inhalt={"Chatübersicht"}/>
            </div>
                <List className="chatsBox">
                    <Chats
                        roomId={props.roomId}
                        groupId={props.groupId}
                        myId={props.myId}
                        teilnehmer={props.teilnehmer}
                        switch={props.switch}
                        authId={authId}
                    />
                    <ListItem button onClick={handleClick}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText primary="Chatanfragen" />
                        {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Chatanfragen handleClick={handleClick}
                            authId={authId}/>
                    </Collapse>

                </List>
        </div>
    );
}

export default Chatübersicht;