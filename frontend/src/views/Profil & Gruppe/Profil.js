import React from 'react';
import "../../assets/App.css"
import TeamUpApi from "../../api/TeamUpApi";
import firebase from 'firebase';
import {Card, CardActions, CardContent, Modal, Paper} from "@material-ui/core";
import theme from '../../theme'
import ButtonChat from "../../components/Button/ButtonChat";
import SectionProfilView from "./Sections/SectionProfilView";

class Profil extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modalOpen: false,
            data: null,
        }
    }

    componentDidMount() {
        this.setState({
            data: this.props.profil
        })
    }

    back = () =>{
        this.props.history.push("/chat");
    }

    render(){
        const {data}= this.state;

        return (
            <div style={theme.root}>
                {/* Überprüft ob die Daten vom User geladen sind und fügt sie dann in die Komponenten ein. */}
                {data ?
                    <Card style={theme.profileBorder}>
                        <CardContent>
                            {/* SectionProfilView enthält alle User Ansichtsdaten */}
                            <SectionProfilView apiObject={data}/>
                        </CardContent>
                        <CardActions style={theme.root}>
                            <ButtonChat inhalt={"Chatten"} onClick={this.back}/>
                        </CardActions>
                    </Card> : null }
            </div>
        );
    };
}

export default Profil;