import React, {useEffect} from 'react';
import {
    Avatar,
    Card,
    Divider,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText
} from "@material-ui/core";
import ProfilAvatar from "../../../../components/Avatar/ProfilAvatar";
import TeamUpApi from "../../../../api/TeamUpApi";
import AddIcon from "@material-ui/icons/Add";
import AnfrageBO from "../../../../bo/AnfrageBO";
import H3_bold from "../../../../components/Fonts/h3_bold";

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
        const anfrage = new AnfrageBO()
        anfrage.setRequestId(requestId)
        anfrage.setAuthId(props.authId)
        anfrage.setPartnerId(partnerId)
        TeamUpApi.getAPI().acceptUserRequest(anfrage.getAll())
            .then((res) => console.log(res))
        props.handleClick()
        if(accept === '')
            setAccept('1')
        else{
            setAccept('')
        }
    }

    function anfrageAnnahmenGroup(lerngruppenId, partnerId){
        console.log(lerngruppenId, partnerId)
        const request = {
            lerngruppenId : lerngruppenId,
            userId : partnerId
        }
        TeamUpApi.getAPI().acceptGroupRequest(request)
            .then((res) => console.log(res))
        props.handleClick()
        if(accept === '')
            setAccept('1')
        else{
            setAccept('')
        }
    }

    //TODO Anfrage ablehnen

    return (
        <div>
            {rendered ?
                <>
                    {(userRequests.gestellt.length > 0) || (userRequests.erhalten.length > 0) ?
                        <>
                            {userRequests.gestellt.map(request =>
                                <div className="chatPreviews">
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={request.name}
                                            secondary="20:24"
                                        />
                                        <ListItemText primary={
                                            <H3_bold inhalt={"Angefragt"}/>
                                        }/>
                                    </ListItem>
                                </div>
                            )}
                            {userRequests.erhalten.map(request =>
                                <div className="chatPreviews">
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={request.name}
                                            secondary="19:14"
                                        />
                                            <IconButton>
                                                <AddIcon onClick={() =>
                                                    anfrageAnnehmen(request.requestId, request.vonUserId)}/>
                                            </IconButton>
                                    </ListItem>
                                </div>
                            )}
                        </> :
                            <Card className="leftUebersicht">
                                <p> Keine Useranfragen gestellt oder erhalten</p>
                            </Card>
                    }

                    {groupRequests.erhalten.length > 0 ?
                        <>
                            {groupRequests.erhalten.map(request =>
                                <div className="chatPreviews">
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar/>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={request.vonUserName}
                                            secondary={request.name}
                                        />
                                        <IconButton>
                                            <AddIcon onClick={() =>
                                                anfrageAnnahmenGroup(request.gruppenId, request.vonUserId)}/>
                                        </IconButton>
                                    </ListItem>
                                </div>
                            )}
                        </> :
                        <Card className="leftUebersicht">
                            <p> Keine Gruppenanfragen gestellt oder erhalten</p>
                        </Card>
                    }
                </>
                :
                <div className="root">
                    <H3_bold>Anfragen werden geladen...</H3_bold>
                </div>
            }
        </div>
    );
}

export default Chatanfragen;