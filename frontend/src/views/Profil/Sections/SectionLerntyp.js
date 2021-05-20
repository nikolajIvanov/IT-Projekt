import React from 'react';
import Grid from '@material-ui/core/Grid';
import AddIcon from "../../../components/Icon/AddIcon";
import H3 from "../../../components/Typography/H3";


export default function SectionLerntyp(props) {
    return (
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <H3 text={props.text}/>
                <div style={styles.lerntypBox}>
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
