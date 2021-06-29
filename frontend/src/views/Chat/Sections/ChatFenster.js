import React from 'react';
import io from "socket.io-client";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import Grid from "@material-ui/core/Grid";
import {Chip, IconButton, InputBase} from "@material-ui/core";
import TeamUpApi from "../../../api/TeamUpApi";
import { withRouter } from 'react-router-dom';
import SendIcon from "@material-ui/icons/Send";
import h2Bold from "../../../components/Fonts/h2_bold";

class ChatFenster extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            partnerId: null,
            sendData: "",
            chat:[],
            partnerName: null
        }
    }

    componentWillUnmount(){
        this.socket.close()
    }

    async componentDidMount(){
        //setzt die partnerId
        for (const teilnehmer of Object.entries(this.props.teilnehmer)) {
            let k = parseInt(teilnehmer[0])
            if(k !== this.props.myId){
                console.log(k)
                this.setState({
                    partnerName: teilnehmer[1],
                    partnerId: k
                })
            }
        }

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

    //TODO click Id's übergeben Gruppen-Partner
    render() {
        const {chat, sendData} = this.state
        return (
            <div onKeyPress={this.onKeyUp}>
                {this.props.groupId ?
                    <div className="chatKopf">
                        <h2Bold inhalt={this.props.groupName}/>
                    </div>
                        :
                    <div className="chatKopf">
                        <h2Bold inhalt={this.state.partnerName}/>
                        <ButtonPrimary onClick={this.createLerngruppe} inhalt={"Lerngruppe erstellen"}/>
                    </div>
                }
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