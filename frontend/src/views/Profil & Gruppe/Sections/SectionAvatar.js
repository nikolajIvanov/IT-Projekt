import React from 'react';
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import InputFeld from "../../../components/Textfeld/InputFeld";


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

    return (
        <div style={styles.avatar}>
            <ProfilAvatar img={props.apiObject.getProfilBild()} handleChange={handleBildChange}/> {/*TODO: Prüfen wie man das Bild ändert */}
            <InputFeld text={props.apiObject.getName()} onChange={handleNameChange}/>
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