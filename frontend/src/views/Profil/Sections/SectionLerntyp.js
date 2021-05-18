import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AddIcon from "../../../components/Icon/AddIcon";


export default function SectionLerntyp(props) {
    return (
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <Typography>Lerntyp</Typography>
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
