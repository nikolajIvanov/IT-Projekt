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
            partnerId: null,
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

    render() {

        // onClick={() => function(parameter)} : () => brauchst du
        // damit die Funktion nicht beim rendern aufgerufen wird

        const {chatSwitcher} = this.state
        return (

            <div style={theme.card}>
                {chatSwitcher ?
                     <>
                         <Chatübersicht roomId={this.setRoomId} switch={this.switchChat}/>
                     </>
                    :
                    <>
                        <ChatFenster />
                    </>
                }
            </div>



        );
    }
}

export default Chat;