import React, {Component} from 'react';
import Chatübersicht from "./Sections/Chatübersicht";
import ChatFenster from "./Sections/ChatFenster";
import Grid from "@material-ui/core/Grid";
import H1_bold from "../../components/Fonts/h1_bold";


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatSwitcher: true,
            roomId: null,
            groupId: '',
            teilnehmer: null
        }
    }

    //TODO wie erkenne ich das ich den Chat verlasse ? --> push verwenden und navbar ausblenden

    switchChat = () => {
        if(this.state.chatSwitcher === true) {
            this.setState({
                chatSwitcher: false
            })
        }
        else{
            this.setState({
                chatSwitcher: true
            })
        }
    }

    setRoomId = (roomId) =>{
        this.setState({
            roomId: roomId
        })
    }

    setTeilnehmer = (teilnehmer) =>{
        this.setState({
            teilnehmer: teilnehmer
        })
    }

    setGroup = (groupId) =>{
        this.setState({
            groupId: groupId
        })
    }

    render() {
        const {chatSwitcher, roomId, teilnehmer, groupId} = this.state

        return (

            <div>
                <Grid container className="chatComponent">
                    <Grid item sx={3} className="chatItem">
                        <Chatübersicht roomId={this.setRoomId}
                                       myId={this.props.setMyId}
                                       groupId={this.setGroup}
                                       teilnehmer={this.setTeilnehmer}
                                       switch={this.switchChat}/>
                    </Grid>
                    <Grid item sx={9} className="chatItem">
                        {chatSwitcher ?
                             <>
                                 <div className="root">
                                     <H1_bold inhalt={"Chatfenster"}/>
                                 </div>
                             </>
                            :
                            <>
                                <ChatFenster roomId={roomId}
                                             myId={this.props.myId}
                                             teilnehmer={teilnehmer}
                                             groupId={groupId}
                                             setPartnerId={this.props.setPartnerId}
                                />
                            </>
                        }
                    </Grid>
                </Grid>
            </div>



        );
    }
}

export default Chat;