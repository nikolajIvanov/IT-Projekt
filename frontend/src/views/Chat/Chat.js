import React, {Component} from 'react';
import theme from "../../theme";
import Chatübersicht from "./Sections/Chatübersicht";
import ChatFenster from "./Sections/ChatFenster";


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

            <div style={theme.card}>
                {chatSwitcher ?
                     <>
                         <Chatübersicht roomId={this.setRoomId}
                                        myId={this.setId}
                                        teilnehmer={this.setTeilnehmer}
                                        switch={this.switchChat}/>
                     </>
                    :
                    <>
                        <ChatFenster roomId={roomId}
                                     myId={myId}
                                     teilnehmer={teilnehmer}
                        />
                    </>
                }
            </div>



        );
    }
}

export default Chat;