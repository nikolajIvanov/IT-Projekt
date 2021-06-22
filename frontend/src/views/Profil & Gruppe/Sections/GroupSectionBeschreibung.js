import React from 'react';
import MultiLine from "../../../components/Textfeld/MultiLine";
import H3_bold from "../../../components/Fonts/h3_bold";

function GroupSectionBeschreibung(props) {
    return (
        <div>
            <H3_bold inhalt={"Beschreibe die Lerngruppe"}/>
            <MultiLine
                handleChange={(event) => props.setBeschreibung(event.target.value)}
            />
        </div>
    );
}

export default GroupSectionBeschreibung;