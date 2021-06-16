import React, {Component} from 'react';
import theme from "../../theme";
import Chatübersicht from "./Sections/Chatübersicht";
import ChatFenster from "./Sections/ChatFenster";


class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatSwitcher: true

        }
    }

    //TODO wie erkenne ich das ich den Chat verlasse ? --> push verwenden und navbar ausblenden

    switchChat = () => {
        this.setState({
            chatSwitcher: false
        })
    }

    render() {

        const {chatSwitcher} = this.state
        return (

            <div style={theme.card}>
                {chatSwitcher ?
                     <>
                         <Chatübersicht switch={this.switchChat}/>
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