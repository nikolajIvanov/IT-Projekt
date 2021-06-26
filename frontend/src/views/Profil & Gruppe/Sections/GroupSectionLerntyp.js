import React from 'react';
import DropDown from "../../../components/Textfeld/Dropdown";
import Lerntypen from "../../../components/Konstante(DropDown)/Lerntypen";
import H3_bold from "../../../components/Fonts/h3_bold";

function GroupSectionLerntyp(props) {
    return (
        <div className="card">
            <H3_bold inhalt={"Gib den Lerntyp an"}/>
            <DropDown map={Lerntypen} input={props.lerntyp}
                      handleChange={(event) => props.setLerntyp(event.target.value)}/>
        </div>
    );
}

export default GroupSectionLerntyp;