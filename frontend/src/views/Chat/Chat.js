import React, {Component} from 'react';
import Message from '../../components/Chat/Message';
import SendenIcon from "../../components/Icon/SendenIcon";
import InputFeld from "../../components/Textfeld/InputFeld";
import TestChat from "./TestChat";


class Chat extends Component {
    render() {
        return (
            <div>
                <TestChat/>
            </div>
        );
    }
}

export default Chat;
