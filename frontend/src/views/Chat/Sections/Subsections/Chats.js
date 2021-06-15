import React, {useEffect} from 'react';
import {ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import ProfilAvatar from "../../../../components/Avatar/ProfilAvatar";
import {useHistory} from "react-router-dom";
import TeamUpApi from "../../../../api/TeamUpApi";

function Chats(props) {
    const redirect = useHistory()
    const [chats, setChats] = React.useState([])

    function getChat(){
        redirect.push("/chat/:id")
    }

    useEffect(() =>{
        TeamUpApi.getAPI().getChatrooms(1111).then(
            chats => {
                setChats(chats)
            }
        )
    }, [])

    return (
        <div>
            {chats.map(room =>
            <ListItem className="chatPreviews" onClick={getChat}>
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