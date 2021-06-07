import React, {Component} from 'react';
import Message from '../../components/Chat/Message';
import SendenIcon from "../../components/Icon/SendenIcon";
import InputFeld from "../../components/Textfeld/InputFeld";

class Chat extends Component {
    render() {
        return (
            <div>
               <Message/>
               <InputFeld/>
               <SendenIcon/>
            </div>
        );
    }
}

export default Chat;
