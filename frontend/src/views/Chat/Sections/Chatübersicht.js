import React, {useEffect} from 'react';
import {Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import Header from "../../../components/Fonts/header";
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import H3_bold from "../../../components/Fonts/h3_bold";
import AddIcon from '@material-ui/icons/Add';
import ClearIcon from '@material-ui/icons/Clear';
import {useHistory} from "react-router-dom";
import TeamUpApi from "../../../api/TeamUpApi";

function Chatübersicht(props) {
    const redirect = useHistory()

    useEffect(() =>
    {
        //Api Call für alle gruppen die der Nutzer hat
    }, [])

    function getChat(){
        redirect.push("/chat/:id")
    }

    return (
        <div>
            <Header inhalt={"Chat"}/>
            <div>
                <List className="chatWindow">
                        <ListItem className="chatPreviews">
                            <ListItemAvatar>
                                <ProfilAvatar/>
                            </ListItemAvatar>
                            <ListItemText
                                primary="Nikolaj Ivaov"
                                secondary="20:24"
                            />
                            <div>
                            <H3_bold inhalt={"Angefragt"}/>
                            </div>
                        </ListItem>
                    <Divider/>
                    <ListItem className="chatPreviews">
                        <ListItemAvatar>
                            <ProfilAvatar/>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Heinz Ketchup"
                            secondary="19:14"
                        />
                        <div>
                            <IconButton><AddIcon/></IconButton>
                            <IconButton><ClearIcon/></IconButton>
                        </div>
                    </ListItem>
                    <Divider/>
                    <ListItem className="chatPreviews" onClick={getChat}>
                        <ListItemAvatar>
                            <ProfilAvatar/>
                        </ListItemAvatar>
                        <ListItemText
                            primary="Der Dave"
                            secondary='15:14 - gesendet'
                        />
                    </ListItem>
                </List>
            </div>
        </div>
    );
}

export default Chatübersicht;