import React, {useEffect} from 'react';
import "../../assets/theme.css"
import {Card, CardActions, CardContent, Modal, Paper} from "@material-ui/core";
import theme from '../../theme'
import ButtonChat from "../../components/Button/ButtonChat";
import SectionProfilView from "./Sections/SectionProfilView";
import TeamUpApi from "../../api/TeamUpApi";
import firebase from "../../api/Firebase";
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import {useHistory} from "react-router-dom";
import H2_bold from "../../components/Fonts/h2_bold";

function Profil(props) {
    const[data, setData] = React.useState(null)
    const[modal, setModal] = React.useState(false)
    const redirect = useHistory()

    useEffect(() => {
        setData(props.profil)
    },[props.profil])

    function back(){
        const userarray = {
            authId: firebase.auth().currentUser.uid,
            angefragterId: data.getID()
        }
        console.log(userarray)
        TeamUpApi.getAPI().sendChatRequest(userarray).then(
            res => {
                if (res === 200) {
                    setModal(true)
                }
                else{
                    console.log("Anfrage Misslungen")
                }
            }
        )
    }

    function home(){
        redirect.push("/")
    }

    const window = (
        <div className="root">
            <Paper className="card">
                <h1>🥳</h1>
                <H2_bold inhalt={"Anfrage erfolgreich versendet."}/>
                <ButtonPrimary inhalt={"home"} onClick={home}/>
            </Paper>
        </div>
    )

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
                            <ButtonChat inhalt={"Chatten"} onClick={back}/>
                        </CardActions>
                    </Card> : null }
                <Modal open={modal}>{window}</Modal>
            </div>
        );
}

export default Profil;