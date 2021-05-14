import React from 'react';
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";


function SectionAvatar(props) {
    return (
        <>
            <ProfilAvatar/>
        </>
    );
}

export default SectionAvatar;

const styles = {
    avatar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}