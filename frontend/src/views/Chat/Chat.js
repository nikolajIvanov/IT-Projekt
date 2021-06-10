/*
import React, {Component} from 'react';
import Message from '../../components/Chat/EigeneMessage';
import ButtonSenden from "../../components/Button/ButtonSenden";
import InputFeld from "../../components/Textfeld/InputFeld";
import TestChat from "./TestChat";
import theme from "../../theme";
import Grid from "@material-ui/core/Grid";
import Chat3 from "./components/chat"


class Chat extends Component {
    render() {
        return (

            <div style={theme.card}>
                <TestChat/>
                <Grid container style={theme.card} xs={6}>
                    <Grid item >
                        <InputFeld text="Neue Nachricht"/>
                        <ButtonSenden/>
                    </Grid>
                </Grid>
            </div>



        );
    }
}

export default Chat;
*/

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ButtonSenden from "../../components/Button/ButtonSenden";
import InputFeld from "../../components/Textfeld/InputFeld";
import Grid from "@material-ui/core/Grid";
import theme from "../../theme";
import EigeneMessage from "../../components/Chat/EigeneMessage";

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);


const Chat = () => {
  const [messages, setMessages] = useState([""]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMessages();
  }, [messages.length]);

  const getMessages = () => {
    socket.on("message", msg => {
      //   let allMessages = messages;
      //   allMessages.push(msg);
      //   setMessages(allMessages);
      setMessages([...messages, msg]);
    });
  };

  // On Change
  const onChange = e => {
    setMessage(e.target.value);
  };

  // On Click
  const onClick = () => {
    if (message !== "") {
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };

  return (
    <div style={theme.card}>
      {messages.length > 0 &&
        messages.map(msg => (
          <Grid container style={theme.card} xs={6}>
            <EigeneMessage nachricht={msg}/>
          </Grid>
        ))}
      <Grid item >
          <InputFeld value={message} text="Neue Nachricht" onChange={e => onChange(e)}/>
          <ButtonSenden onClick={() => onClick()}/>
      </Grid>
    </div>
  );
};

export default Chat;