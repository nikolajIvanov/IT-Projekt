import React from 'react';
import SectionAvatar from "../../Profil & Gruppe/Sections/SectionAvatar";
import SectionSteckbrief from "../../Profil & Gruppe/Sections/SectionSteckbrief";

function ProfilCard(props) {
    return (
        <div>
            <SectionAvatar />
            <SectionSteckbrief />
        </div>
    );
}

export default ProfilCard;