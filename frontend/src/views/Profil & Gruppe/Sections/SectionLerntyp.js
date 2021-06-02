import React from 'react';
import Grid from '@material-ui/core/Grid';
import AddIcon from "../../../components/Icon/AddIcon";
import H3 from "../../../components/Typography/H3";
import DropDown from "../../../components/Textfeld/Dropdown";
import Lerntypen from "../../../components/Konstante(DropDown)/Lerntypen";


export default function SectionLerntyp(props) {

    // Speichert die neuen Werte für  die Variable: Lerntyp
    const handleLerntypChange = (e) => {
        let newObject = props.apiObject;
        newObject.setLerntyp(e.target.value)
        props.handleChange(newObject)
    }

    return (
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <H3 text={props.text}/>
                <div style={styles.lerntypBox}>
                    <DropDown map={Lerntypen} input={props.apiObject.getLerntyp()} handleChange={handleLerntypChange}/>
                    <label>{props.lerntyp}</label>
                    <AddIcon />
                </div>
            </Grid>
        </div>
    );
}

const styles = {
    lerntypBox: {
        marginTop: '20%',
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center"
    }
}
