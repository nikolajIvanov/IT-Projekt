import React, {Component} from 'react';
import Chatübersicht from "./Sections/Chatübersicht";
import ChatFenster from "./Sections/ChatFenster";
import Grid from "@material-ui/core/Grid";
import ChatsGraphic from "../../assets/ChatGraphic.svg"

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatSwitcher: true,
            roomId: null,
            groupId: '',
            teilnehmer: null,
            groupName: ''
        }
    }

    //TODO wie erkenne ich das ich den Chat verlasse ? --> push verwenden und navbar ausblenden

    switchChat = () => {
        if(this.state.chatSwitcher === true) {
            this.setState({
                chatSwitcher: false
            })
        }
        else{
            this.setState({
                chatSwitcher: true
            })
        }
    }

    setRoomId = (roomId) =>{
        this.setState({
            roomId: roomId
        })
    }

    setTeilnehmer = (teilnehmer) =>{
        this.setState({
            teilnehmer: teilnehmer
        })
    }

    setGroup = (groupId) =>{
        this.setState({
            groupId: groupId
        })
    }

    setName = (name) => {
        this.setState({
            groupName: name
        })
    }

    render() {
        const {chatSwitcher, roomId, teilnehmer, groupId, groupName} = this.state

        return (

            <div>
                <Grid container className="chatComponent">
                    <Grid item sx={3} className="sideBar">
                        <Chatübersicht roomId={this.setRoomId}
                                       myId={this.props.setMyId}
                                       groupId={this.setGroup}
                                       groupName={this.setName}
                                       teilnehmer={this.setTeilnehmer}
                                       switch={this.switchChat}/>
                    </Grid>
                    <Grid item sx={9} className="chatBox">
                        {chatSwitcher ?
                             <>
                                 <div className="emptyChatWindow">
                                     <img className="chatBild" src={ChatsGraphic} alt={"chatBild"}/>
                                 </div>
                             </>
                            :
                            <>
                                <ChatFenster roomId={roomId}
                                             myId={this.props.myId}
                                             teilnehmer={teilnehmer}
                                             groupId={groupId}
                                             setPartnerId={this.props.setPartnerId}
                                             groupName={groupName}
                                />
                            </>
                        }
                    </Grid>
                </Grid>
            </div>



        );
    }
}

export default Chat;