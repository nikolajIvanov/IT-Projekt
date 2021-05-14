import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";

export default function SectionLerntyp(props) {
    return (
        <div>
            <Grid container direction="column" justify="center" alignItems="center">
                <Typography>Lerntyp</Typography>
                <ProfilAvatar/>
            </Grid>
        </div>
    );
}
