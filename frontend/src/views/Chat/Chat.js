import React, {Component} from 'react';
import Chatübersicht from "./Sections/Chatübersicht";
import ChatFenster from "./Sections/ChatFenster";
import Grid from "@material-ui/core/Grid";
import H1_bold from "../../components/Fonts/h1_bold";
import { withRouter } from 'react-router-dom';


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatSwitcher: true,
            roomId: null,
            teilnehmer: null
        }
    }

    //TODO wie erkenne ich das ich den Chat verlasse ? --> push verwenden und navbar ausblenden

    switchChat = () => {
        this.setState({
            chatSwitcher: false
        })
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

    render() {
        const {chatSwitcher, roomId, teilnehmer} = this.state

        return (

            <div>
                <Grid container className="chatComponent">
                    <Grid item sx={3} className="chatItem">
                        <Chatübersicht roomId={this.setRoomId}
                                       myId={this.props.setMyId}
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