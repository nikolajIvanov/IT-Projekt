import React, {useEffect} from 'react';
import io from "socket.io-client";
import H1_bold from "../../../components/Fonts/h1_bold";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import InputFeld from "../../../components/Textfeld/InputFeld";
import H3_regular from "../../../components/Fonts/h3_regular";

function ChatFenster() {
    const socket = io.connect()
    const [message, setMessage] = React.useState("User ist verbunden")
    const [chat, setChat] = React.useState([])

    socket.on('message', msg => receiveMessage(msg))
    socket.emit('message', {
        msg: "hi"
    })

    function receiveMessage(msg){
        console.log("income" + msg)
    }

    function handleMessage(e){
        setMessage(e.target.value)
    }

    function sendMessage() {
        console.log("send" + message)
        socket.emit('message', {
            msg: message
        })
    }

    return (
        <div>
            <H1_bold inhalt={"HI"}/>
            <H3_regular inhalt={chat[0]}/>
            <InputFeld onChange={handleMessage} value={message}/>
            <ButtonPrimary onClick={sendMessage} inhalt={"Senden"}/>
        </div>
    );
}

export default ChatFenster;