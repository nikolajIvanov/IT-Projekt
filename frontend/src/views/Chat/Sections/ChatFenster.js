import React from 'react';
import io from "socket.io-client";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import Grid from "@material-ui/core/Grid";
import {Chip, IconButton, InputBase} from "@material-ui/core";
import TeamUpApi from "../../../api/TeamUpApi";
import { withRouter } from 'react-router-dom';
import SendIcon from "@material-ui/icons/Send";
import H2_bold from "../../../components/Fonts/h2_bold";

class ChatFenster extends React.Component{
    constructor(props) {
        super(props);
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
        if((message.userId !== this.props.myId) && (message.userId !== undefined)){
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
        console.log(this.props.roomId)
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
            <div onKeyPress={this.onKeyUp}>
                <div className="chatKopf">
                    <H2_bold inhalt={"Name"}/>
                    {this.props.groupId === null ?
                        <ButtonPrimary onClick={this.createLerngruppe} inhalt={"Lerngruppe erstellen"}/>
                        : null
                    }
                </div>
                <div className="chatOutlines">
                        {chat.map((chat) =>
                            <div>{chat}</div>
                        )}
                </div>
                <Grid container>
                    {/* Input Base sollte eingebunden werden --> e prevent error*/}
                    <Grid item sx={12} className="chatFooter">
                        <InputBase
                            className="textField"
                            placeholder="Schreib eine Nachricht"
                            value={sendData}
                            onChange={this.handleMessage}
                            inputProps={{ 'aria-label': 'search google maps' }}
                        />
                        <IconButton onClick={this.handleSend}>
                            <SendIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default withRouter(ChatFenster);