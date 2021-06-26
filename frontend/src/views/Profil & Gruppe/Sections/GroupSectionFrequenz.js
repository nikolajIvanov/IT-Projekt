import React from 'react';
import H3_bold from "../../../components/Fonts/h3_bold";
import DropDown from "../../../components/Textfeld/Dropdown";
import frequenz from "../../../components/Konstante(DropDown)/Frequenz";

function GroupSectionFrequenz(props) {
    return (
        <div className="card">
            <H3_bold inhalt={"Gib die Lernfrequenz an"}/>
            <DropDown map={frequenz} input={props.frequenz}
                      handleChange={(event) => props.setFrequenz(event.target.value)}/>
        </div>
    );
}

export default GroupSectionFrequenz;