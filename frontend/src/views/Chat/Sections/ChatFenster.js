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
            partnerId: null,
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
        //TODO kann gelöscht werden sobald ein 1 zu 1 chat steht (setzt die partnerId)
        await this.props.teilnehmer.forEach(teilnehmer => {
            if(teilnehmer !== this.props.myId){
                this.setState({
                    partnerId: teilnehmer
                })
            }
        })

        //Sucht den Inhalt zu einer RaumId, welche über Props übergeben werden
        await TeamUpApi.getAPI().getChatContent(this.props.roomId).then(
            content => content.forEach((message) => {
                    this.handlePartner(message)
                }
            )
        )
        const sensorEndpoint = "http://localhost:5000/chat"
        this.socket = io.connect(sensorEndpoint, {
            reconnection: true,
        });
        this.socket.on("message", message => {
            this.handlePartner(message)
        })
    }

    handlePartner = (message) => {
        if(message.userId === this.props.myId){
            this.setState({
                chat: [...this.state.chat, (
                    <Grid item className="leftChat" sx={6}>
                        <Chip color="primary" className="Chatbox" label={message.message} />
                    </Grid>
                )]
            })
        }
        if(message.userId === this.state.partnerId){
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
            roomId: this.props.roomId,
            message: this.state.sendData,
            userId: this.props.myId})
        console.log("Emit Clicked")
        this.setState({sendData: ""})
    }

    //Nur zu Demo-Zwecken
    handleSend2 = () => {
        this.socket.emit("message", {
            roomId: this.props.roomId,
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
                        <ButtonPrimary onClick={this.handleSend2} inhalt={"Lerngruppe erstellen"}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default ChatFenster;