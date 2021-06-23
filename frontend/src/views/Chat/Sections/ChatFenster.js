import React from 'react';
import io from "socket.io-client";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import Grid from "@material-ui/core/Grid";
import {Chip} from "@material-ui/core";
import ButtonSend from "../../../components/Button/ButtonSend";
import TeamUpApi from "../../../api/TeamUpApi";
import { withRouter } from 'react-router-dom';

class ChatFenster extends React.Component{
    constructor() {
        super();
        this.state = {
            partnerId: null,
            sendData: "",
            chat:[]
        }
    }

    componentWillUnmount(){
        this.socket.close()
    }

    async componentDidMount(){
        //setzt die partnerId
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

    handleSend = () => {
        this.socket.emit("message", {
            roomId: this.props.roomId,
            message: this.state.sendData,
            userId: this.props.myId})
        console.log("Emit Clicked")
        this.setState({sendData: ""})
    }

    createLerngruppe = () =>{
        this.props.setPartnerId(this.state.partnerId)
        this.props.history.push("/gruppe_erstellen")
    }

    render() {
        const {chat, sendData} = this.state
        return (
            <div className="card">
                <div className="chatOutlines">
                        {chat.map((chat) =>
                            <div>{chat}</div>
                        )}
                </div>
                <Grid container className="card">
                    <Grid item sx={12}>
                        <ButtonSend onClick={this.handleSend} onChange={this.handleMessage}
                                        inhalt={sendData}/>
                        <ButtonPrimary onClick={this.createLerngruppe} inhalt={"Lerngruppe erstellen"}/>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default withRouter(ChatFenster);