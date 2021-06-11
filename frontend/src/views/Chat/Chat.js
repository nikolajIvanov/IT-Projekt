import React, {Component} from 'react';
import theme from "../../theme";
import Chatübersicht from "./Sections/Chatübersicht";


class Chat extends Component {
    render() {
        return (

            <div style={theme.card}>
                <Chatübersicht/>
            </div>



        );
    }
}

export default Chat;