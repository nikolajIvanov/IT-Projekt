import React, {useEffect} from 'react';
import {ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import ProfilAvatar from "../../../../components/Avatar/ProfilAvatar";
import TeamUpApi from "../../../../api/TeamUpApi";
import firebase from "../../../../api/Firebase";


//Ruft alle Chats ab die ein Nutzer hat um die Props an Chat.js zu übergeben um
// das ChatFenster aufrufen können und nachrichten schreiben zu können
function Chats(props) {
    const [chats, setChats] = React.useState([])


    //Übergibt alle RoomInformationen an die Vaterkomponente Chat
    function getChat(roomId, myId, teilnehmer, groupId){
        props.roomId(roomId)
        props.myId(myId)
        props.teilnehmer(teilnehmer)
        props.switch()
        console.log(groupId)
        props.groupId(groupId)
    }

    //Ruft alle Räume auf, in denen sich der aktuelle Nutzer befindet
    useEffect(() =>{
        TeamUpApi.getAPI().getChatrooms(firebase.auth().currentUser.uid).then(
            chats => {
                setChats(chats)
            }
        )
    }, [])

    return (
        <div>
            {chats.map(room =>
            <ListItem className="chatPreviews" onClick={() =>
                getChat(room.roomId, room.myId, room.teilnehmer, room.groupId)}>
                <ListItemAvatar>
                    <ProfilAvatar/>
                </ListItemAvatar>
                <ListItemText
                primary={room.name}
                secondary='15:14 - gesendet'
                />
            </ListItem>
            )}
        </div>
    );
}

export default Chats;