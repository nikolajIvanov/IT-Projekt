import React from 'react';
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import InputFeld from "../../../components/Textfeld/InputFeld";
import theme from "../../../theme";


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
            <ProfilAvatar img={props.apiObject.getProfilBild()} handleChange={handleBildChange}/> {/*TODO: Prüfen wie man das Bild ändert */}
            <InputFeld inhalt={props.apiObject.getVorname()} onChange={handleVorname}/>
            <InputFeld inhalt={props.apiObject.getName()} onChange={handleNameChange}/>
        </div>
    );
}

export default SectionAvatar;