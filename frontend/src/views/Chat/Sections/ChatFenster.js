import React from 'react';
import io from "socket.io-client";
import ButtonPrimary from "../../../components/Button/ButtonPrimary";
import Grid from "@material-ui/core/Grid";
import {Button, Chip, IconButton, InputBase} from "@material-ui/core";
import TeamUpApi from "../../../api/TeamUpApi";
import { withRouter } from 'react-router-dom';
import SendIcon from "@material-ui/icons/Send";
import H2_bold from "../../../components/Fonts/h2_bold";
import ButtonChat from "../../../components/Button/ButtonChat";

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

    getGroupView = (group) =>{
        console.log("Profil/Gruppen anzeigen nicht implementiert")
    }

    getPartnerView = (partner) =>{
        console.log("Profil/Gruppen anzeigen nicht implementiert")
    }

    render() {
        const {chat, sendData} = this.state
        return (
            <div onKeyPress={this.onKeyUp}>
                {this.props.groupId ?
                    <div className="chatKopf">
                        <Button onClick={() => this.getGroupView(this.props.groupId)}>
                            {this.props.groupName}
                        </Button>
                    </div>
                        :
                    <div className="chatKopf">
                        <Button onClick={() => this.getPartnerView(this.state.partnerId)}>
                            {this.state.partnerName}
                        </Button>
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
    };
}
export default withRouter(ChatFenster);