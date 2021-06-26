import React from 'react';
import Grid from '@material-ui/core/Grid';
import AddIcon from "../../../components/Icon/AddIcon";
import DropDown from "../../../components/Textfeld/Dropdown";
import Lerntypen from "../../../components/Konstante(DropDown)/Lerntypen";
import theme from '../../../theme'
import {Card} from "@material-ui/core";
import H2_bold from "../../../components/Fonts/h2_bold";


export default function SectionLerntyp(props) {

    // Speichert die neuen Werte für  die Variable: Lerntyp
    const handleLerntypChange = (e) => {
        let newObject = props.apiObject;
        newObject.setLerntyp(e.target.value)
        props.handleChange(newObject)
    }

    return (
            <Card className="card">
                <H2_bold inhalt={"Lerntyp:"}/>
                    <DropDown map={Lerntypen} input={props.apiObject.getLerntyp()} handleChange={handleLerntypChange}/>
            </Card>
    );
}
