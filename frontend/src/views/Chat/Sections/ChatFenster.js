import React from 'react';
import io from "socket.io-client";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import Grid from "@material-ui/core/Grid";
import {Chip, IconButton, Input, InputBase} from "@material-ui/core";
import ButtonSend from "../../../components/Button/ButtonSend";
import TeamUpApi from "../../../api/TeamUpApi";
import { withRouter } from 'react-router-dom';
import SendIcon from "@material-ui/icons/Send";

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

    handleSend = (e) => {
        this.socket.emit("message", {
            roomId: this.props.roomId,
            message: this.state.sendData,
            userId: this.props.myId})
        this.setState({sendData: ""})
    }

    createLerngruppe = (e) =>{
        this.props.setPartnerId(this.state.partnerId)
        this.props.history.push("/gruppe_erstellen")
    }

    onKeyUp = (event) => {
        if ((event.charCode === 13) && (this.state.sendData !== '')){
            this.handleSend()
        }
    }

    render() {
        const {chat, sendData} = this.state
        return (
            <div className="card" onKeyPress={this.onKeyUp}>
                <div className="chatOutlines">
                        {chat.map((chat) =>
                            <div>{chat}</div>
                        )}
                </div>
                <Grid container className="card">
                    {/* Input Base sollte eingebunden werden --> e prevent error*/}
                    <Grid item sx={12}>
                        <InputBase
                            placeholder="Schreib was"
                            value={sendData}
                            onChange={this.handleMessage}
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton onClick={this.handleSend}>
                            <SendIcon />
                        </IconButton>
                        {this.props.groupId === null ?
                        <ButtonPrimary onClick={this.createLerngruppe} inhalt={"Lerngruppe erstellen"}/>
                            : null
                        }
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default withRouter(ChatFenster);