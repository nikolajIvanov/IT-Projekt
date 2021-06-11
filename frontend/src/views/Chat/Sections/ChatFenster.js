import React, {useEffect} from 'react';
import io from "socket.io-client";
import H1_bold from "../../../components/Fonts/h1_bold";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import InputFeld from "../../../components/Textfeld/InputFeld";
import H3_regular from "../../../components/Fonts/h3_regular";
/*
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
*/
class Dashboard extends React.Component {
    state = {
        socketData: "",
        socketStatus:"On"
    }
    componentWillUnmount() {
        this.socket.close()
        console.log("component unmounted")
    }
    componentDidMount() {
        var sensorEndpoint = "http://localhost:5000"
            this.socket = io.connect(sensorEndpoint, {
            reconnection: true,
            // transports: ['websocket']
        });
        console.log("component mounted")
            this.socket.on("responseMessage", message => {
                this.setState({'socketData': message.temperature})

                console.log("responseMessage", message)
            })

    }

    handleMessage = (e) =>{
        this.setState({
            socketData: e.target.value
        })
    }
    handleEmit=()=>{
        if(this.state.socketStatus==="On"){
        this.socket.emit("message", {'roomId': 1, 'message': this.state.socketData, 'userId': 1})
        this.setState({'socketStatus':"Off"})
    }
    else{
        this.socket.emit("message", {'roomId': 1, 'message': this.state.socketData, 'userId': 1})
        this.setState({'socketStatus':"On"})
        }
        console.log("Emit Clicked")
    }
    render() {
        return (
            <React.Fragment>
                <H1_bold inhalt={"HI"}/>
            <InputFeld onChange={this. handleMessage} value={this.state.socketData}/>
            <ButtonPrimary onClick={this.handleEmit} inhalt={"Senden"}/>
            </React.Fragment>
        )
    }
}
export default Dashboard;