import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import ChatIcon from '@material-ui/icons/Chat';
import List from '@material-ui/core/List';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

class Chat extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
            messages: null,
            //id später übergeben lassen
            message: null,
        };
    }
  /*
  const [messages, setMessages] = useState(["Hello And Welcome"]);
  const [message, setMessage] = useState("");
    useEffect(() => {
    getMessages();
  }, [messages.length]);
   */

    getMessages = () => {
    socket.on("message", msg => {
      //   let allMessages = messages;
      //   allMessages.push(msg);
      //   setMessages(allMessages);
      setMessages([...messages, msg]);
    });
  };
    componentDidMount() {
      getMessages(),
          [messages.length];
    }
    componentDidUpdate() {
      getMessages(),
          [messages.length];
    }


  // On Change
  onChange = e => {
    setMessage(e.target.value);
  };

  // On Click
  onClick = () => {
    if (message !== "") {
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };

  return () {
    return(
              <List className={classes.root}>
        <div>
      {messages.length > 0 &&
        messages.map(msg => (
          <div>
            <p>{msg}</p>
          </div>
        ))}
      <input value={message} name="message" onChange={e => onChange(e)} />
      <button onClick={() => this.setState({message: this.setState.message})}>Send Message</button>
    </div>
      </List>
    );
  };

};
/*
const Chat = () => {
  const [messages, setMessages] = useState(["Hello And Welcome"]);
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
      <List className={classes.root}>
        <div>
      {messages.length > 0 &&
        messages.map(msg => (
          <div>
            <p>{msg}</p>
          </div>
        ))}
      <input value={message} name="message" onChange={e => onChange(e)} />
      <button onClick={() => onClick()}>Send Message</button>
    </div>
      </List>

  );
};
*/
export default Chat;