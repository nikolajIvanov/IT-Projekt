import React, {Component} from 'react';
import Message from '../../components/Chat/EigeneMessage';
import ButtonSenden from "../../components/Button/ButtonSenden";
import InputFeld from "../../components/Textfeld/InputFeld";
import TestChat from "./TestChat";
import theme from "../../theme";
import Grid from "@material-ui/core/Grid";


class Chat extends Component {
    render() {
        return (
            <div style={theme.card}>
                <TestChat/>
                <Grid container style={theme.card} xs={6}>
                    <Grid item >
                        <InputFeld text="Neue Nachricht"/>
                        <ButtonSenden/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default Chat;

