import React from 'react';
import io from "socket.io-client";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import InputFeld from "../../../components/Textfeld/InputFeld";
import Grid from "@material-ui/core/Grid";
import {Chip} from "@material-ui/core";
import ButtonSend from "../../../components/Button/ButtonSend";
import TeamUpApi from "../../../api/TeamUpApi";

class ChatFenster extends React.Component{
    constructor() {
        super();
        this.state = {
            myId: 1,
            partnerId: 2,
            sendData: "",
            //Nur zur Demo
            sendData2: "",
            myData: [],
            partnerData: [],
            chat:[]
        }
    }

    //TODO statt Grid --> Liste machen

    componentWillUnmount(){
        this.socket.close()
    }

    async componentDidMount(){
        //Chat später über Props beziehen von Chat
        await TeamUpApi.getAPI().getChatContent(1).then(
            content => content.forEach((message) => {
                    console.log(message)
                    this.handlePartner(message)
                }
            )
        )
        const sensorEndpoint = "http://localhost:5000/chat"
        this.socket = io.connect(sensorEndpoint, {
            reconnection: true,
        });
        console.log("Chat ist offen")
        this.socket.on("message", message => {
            this.handlePartner(message)
            console.log("message", message)
        })
    }

    handlePartner = (message) => {
        //hier soll die eigene Id eingesetzt werden
        if(message.userId === 1){
            this.setState({
                chat: [...this.state.chat, (
                    <Grid item className="leftChat" sx={6}>
                        <Chip color="primary" className="Chatbox" label={message.message} />
                    </Grid>
                )]
            })
        }
        if(message.userId === 2){
            this.setState({
                chat: [...this.state.chat, (
                    <Grid item className="rightChat" sx={6}>
                        <Chip color="secondary" className="Chatbox" label={message.message} />
                    </Grid>
                )]
            })
        }
    }

    handleMessage = (e) =>{
        this.setState({
            sendData: e.target.value
        })
    }

    //Nur zu DemoZwecken
    handleMessage2 = (e) =>{
        this.setState({
            sendData2: e.target.value
        })
    }

    handleSend1 = () => {
        this.socket.emit("message", {
            roomId: 1,
            message: this.state.sendData,
            userId: this.state.myId})
        console.log("Emit Clicked")
        this.setState({sendData: ""})
    }

    //Nur zu Demo-Zwecken
    handleSend2 = () => {
        this.socket.emit("message", {
            roomId: 1,
            message: this.state.sendData2,
            userId: this.state.partnerId})
        console.log("Emit Clicked")
        this.setState({sendData2: ""})
    }

    render() {
        const {chat, sendData, sendData2} = this.state
        return (
            <div className="card">
                <Grid container className="chatOutlines">
                        {chat.map((chat) =>
                            <div>{chat}</div>
                        )}
                    <Grid item sx={12} className="sendBox">
                        <ButtonSend onClick={this.handleSend1} onChange={this.handleMessage}
                                    inhalt={sendData}/>
                    </Grid>
                </Grid>
                <Grid container className="chatOutlines">
                    <Grid item sx={12}>
                        <InputFeld onChange={this.handleMessage2} inhalt={sendData2}/>
                        <ButtonPrimary onClick={this.handleSend2} inhalt={"Senden"}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default ChatFenster;