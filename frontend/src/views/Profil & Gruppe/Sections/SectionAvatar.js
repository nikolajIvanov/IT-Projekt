import React from 'react';
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import InputFeld from "../../../components/Textfeld/InputFeld";


function SectionAvatar(props) {

    const handleBildChange = (e) => {
        let newUser = props.apiUser;
        newUser.setProfilBild(e.target.value)
        props.handleChange(newUser)
    }

    const handleNameChange = (e) => {
        let newUser = props.apiUser;
        newUser.setName(e.target.value)
        props.handleChange(newUser)
    }

    return (
        <div style={styles.avatar}>
            <ProfilAvatar img={props.apiUser.getProfilBild()} handleChange={handleBildChange}/> {/*TODO: Prüfen wie man das Bild ändert */}
            <InputFeld text={props.apiUser.getName()} onChange={handleNameChange}/>
        </div>
    );
}

export default SectionAvatar;

const styles = {
    avatar: {
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        justifyContent: "center"
    }
}