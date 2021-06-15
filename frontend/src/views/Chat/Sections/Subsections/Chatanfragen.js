import React, {useEffect} from 'react';
import {Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import ProfilAvatar from "../../../../components/Avatar/ProfilAvatar";
import TeamUpApi from "../../../../api/TeamUpApi";
import H3_bold from "../../../../components/Fonts/h3_bold";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import AnfrageBO from "../../../../bo/AnfrageBO";

function Chatanfragen(props) {
    const [userRequests, setUserRequests] =React.useState([])
    const [groupRequests, setGroupRequests] =React.useState([])
    const [rendered, setRender] = React.useState(false)
    const [accept, setAccept] = React.useState('')

    useEffect(() => {
        //Api Call für alle gruppen die der Nutzer hat
        TeamUpApi.getAPI().getChatRequests(props.authId).then(
            async (requests) => {
                console.log(requests)
                await setUserRequests(requests.user)
                await setGroupRequests(requests.gruppen)
                setRender(true)
            }
        )
    }, [accept])

    function anfrageAnnehmen(requestId, partnerId){
        console.log(requestId,partnerId)
        const anfrage = new AnfrageBO()
        anfrage.setRequestId(requestId)
        anfrage.setAuthId(props.authId)
        anfrage.setPartnerId(partnerId)
        /*TeamUpApi.getAPI().acceptUserRequest(anfrage.getAll())
            .then((res) => console.log(res))
        if(accept === '')
            setAccept('1')
        else{
            setAccept('')
        }*/
    }

    function anfrageAblehnen(requestId, partnerId){
        //TODO noch implementieren
    }


    //TODO requests erhalten Buttons müssen API Call machen die Anfrage bestätigen oder löschen
    return (
        <div>
            {rendered ?
                <>
                    {(userRequests.gestellt.length > 0) || (userRequests.erhalten.length > 0) ?
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
                                        <IconButton>
                                            <AddIcon onClick={() =>
                                                anfrageAnnehmen(request.requestId, request['anUserId'])}/>
                                        </IconButton>
                                        <IconButton><ClearIcon/></IconButton>
                                    </div>
                                </ListItem>
                            )}
                        </> :
                        <p> Keine Useranfragen gestellt oder erhalten</p>
                    }

                    {groupRequests.erhalten.length > 0 ?
                        <>
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
                </>
                :
                <h1>Nicht gerendert</h1>
            }
        </div>
    );
}

export default Chatanfragen;