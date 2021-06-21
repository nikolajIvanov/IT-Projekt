import React, {Component} from 'react';
import theme from "../../theme";
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
            teilnehmer: null,
            myId: null,
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

    setId = (myId) =>{
        this.setState({
            myId: myId
        })
    }

    render() {
        const {chatSwitcher, roomId, teilnehmer, myId} = this.state

        return (

            <div>
                <Grid container className="chatComponent">
                    <Grid item sx={3} className="chatItem">
                        <Chatübersicht roomId={this.setRoomId}
                                       myId={this.setId}
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
                                             myId={myId}
                                             teilnehmer={teilnehmer}
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