import React, {Component} from 'react';
import Message from '../../components/Chat/EigeneMessage';
import SendenIcon from "../../components/Icon/SendenIcon";
import InputFeld from "../../components/Textfeld/InputFeld";
import TestChat from "./TestChat";
import theme from "../../theme";


class Chat extends Component {
    render() {
        return (
            <div style={theme.card}>
                <TestChat/>
            </div>
        );
    }
}

export default Chat;
