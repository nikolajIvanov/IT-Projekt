import React, {useEffect} from 'react';
import {Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import ProfilAvatar from "../../../../components/Avatar/ProfilAvatar";
import TeamUpApi from "../../../../api/TeamUpApi";
import H3_bold from "../../../../components/Fonts/h3_bold";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";

function Chatanfragen(props) {
    const [userRequests, setUserRequests] =React.useState([])
    const [groupRequests, setGroupRequests] =React.useState([])

    useEffect(async () => {
        //Api Call für alle gruppen die der Nutzer hat
        await TeamUpApi.getAPI().getChatRequests(props.authId).then(
            async (requests) => {
                await setUserRequests(requests.user)
                await setGroupRequests(requests.gruppen)
                console.log(requests)
            }
        )
    }, [])


    //TODO requests erhalten Buttons müssen API Call machen die Anfrage bestätigen oder löschen

    return (
        <div>
            {userRequests ?
                <>
                    {userRequests.gestellt.map(request =>
                        <ListItem className="chatPreviews">
                            <ListItemAvatar>
                                <ProfilAvatar/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={request.name}
                                secondary="20:24"
                            />
                            <div>
                                <H3_bold inhalt={"Angefragt"}/>
                            </div>
                        </ListItem>
                    )}
                    <Divider/>
                    {userRequests.erhalten.map(request =>
                        <ListItem className="chatPreviews">
                            <ListItemAvatar>
                                <ProfilAvatar/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={request.name}
                                secondary="19:14"
                            />
                            <div>
                                <IconButton><AddIcon/></IconButton>
                                <IconButton><ClearIcon/></IconButton>
                            </div>
                        </ListItem>
                    )}
                </> :
                <p> Keine Useranfragen gestellt oder erhalten</p>
            }
            {groupRequests ?
                <>
                    {groupRequests.gestellt.map(request =>
                        <ListItem className="chatPreviews">
                            <ListItemAvatar>
                                <ProfilAvatar/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={request.name}
                                secondary="20:24"
                            />
                            <div>
                                <H3_bold inhalt={"Angefragt"}/>
                            </div>
                        </ListItem>
                    )}
                    <Divider/>
                    {groupRequests.erhalten.map(request =>
                        <ListItem className="chatPreviews">
                            <ListItemAvatar>
                                <ProfilAvatar/>
                            </ListItemAvatar>
                            <ListItemText
                                primary={request.name}
                                secondary="19:14"
                            />
                            <div>
                                <IconButton><AddIcon/></IconButton>
                                <IconButton><ClearIcon/></IconButton>
                            </div>
                        </ListItem>
                    )}
                </> :
                <p> Keine Gruppenanfragen gestellt oder erhalten</p>
            }
        </div>
    );
}

export default Chatanfragen;