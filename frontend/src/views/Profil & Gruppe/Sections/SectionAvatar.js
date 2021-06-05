import React from 'react';
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import InputFeld from "../../../components/Textfeld/InputFeld";
import theme from "../../../theme";
import Grid from "@material-ui/core/Grid";
import {Paper} from "@material-ui/core";


function SectionAvatar(props) {

    const handleBildChange = (e) => {
        let newUser = props.apiObject;
        newUser.setProfilBild(e.target.value)
        props.handleChange(newUser)
    }

    const handleNameChange = (e) => {
        let newUser = props.apiObject;
        newUser.setName(e.target.value)
        props.handleChange(newUser)
    }

    const handleVorname = (e) => {
        let newUser = props.apiObject;
        newUser.setVorname(e.target.value)
        props.handleChange(newUser)
    }

    return (
        <div style={theme.card}>
            <Grid container style={theme.root}>
                <Grid item xs={12} style={theme.root}>
                    <ProfilAvatar img={props.apiObject.getProfilBild()} handleChange={handleBildChange}/>
                </Grid>
                <Grid item xs={6} style={theme.rightAligned}>
                    <InputFeld inhalt={props.apiObject.getVorname()} onChange={handleVorname}/>
                </Grid>
                <Grid item xs={6} style={theme.leftAligned}>
                    <InputFeld inhalt={props.apiObject.getName()} onChange={handleNameChange}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default SectionAvatar;