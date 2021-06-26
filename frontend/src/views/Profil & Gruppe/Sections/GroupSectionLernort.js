import React from 'react';
import H3_bold from "../../../components/Fonts/h3_bold";
import DropDown from "../../../components/Textfeld/Dropdown";
import lernort from "../../../components/Konstante(DropDown)/Lernort";

function GroupSectionLernort(props) {
    return (
        <div className="card">
            <H3_bold inhalt={"Gib den Lernort an"}/>
            <DropDown map={lernort} input={props.lernort}
                      handleChange={(event) => props.setLernort(event.target.value)}/>
        </div>
    );
}

export default GroupSectionLernort;