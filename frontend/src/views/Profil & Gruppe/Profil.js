import React, {useEffect} from 'react';
import "../../assets/theme.css"
import {Card, CardActions, CardContent} from "@material-ui/core";
import theme from '../../theme'
import ButtonChat from "../../components/Button/ButtonChat";
import SectionProfilView from "./Sections/SectionProfilView";
import {useHistory} from "react-router-dom";

function Profil(props) {
    const redirect = useHistory()
    const[data, setData] = React.useState(null)

    useEffect(() => {
        setData(props.profil)
    },[props.profil])

    function back(){
        redirect.push("/chat")
    }

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
            </div>
        );
}

export default Profil;