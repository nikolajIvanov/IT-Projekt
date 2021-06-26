import React from 'react';
import H3_bold from "../../../components/Fonts/h3_bold";
import InputFeld from "../../../components/Textfeld/InputFeld";

function GroupSectionName(props) {
    return (
        <div className="card">
            <H3_bold inhalt={"Wie heißt die Gruppe?"}/>
            <InputFeld inhalt={props.name} onChange={(event) => props.setName(event.target.value)}/>
        </div>
    );
}

export default GroupSectionName;