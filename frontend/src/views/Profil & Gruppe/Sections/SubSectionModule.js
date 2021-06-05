import React from 'react';
import ButtonBestätigen from "../../../components/Button/ButtonBestätigen";
import {Modal, Paper, Typography} from "@material-ui/core";
import theme from "../../../theme";
import Grid from "@material-ui/core/Grid";
import ButtonLöschen from "../../../components/Button/ButtonLöschen";

function SubSectionModule(props) {
    const[click, handleClick] = React.useState(false)

    return (
        <div>
            <Modal open={click}>
                <div style={theme.root}>
                    <Paper style={theme.modalCard}>
                        <p style={theme.h3.bold}>Was willst du lernen? 🧐</p>
                        <Grid container spacing={1} style={theme.root}>
                            <Grid item sx={6}>
                                <ButtonBestätigen inhalt={"Bestätigen"}
                                                  onClick={() => handleClick(false)}/>
                            </Grid>
                        </Grid>
                    </Paper>
                </div>
            </Modal>
            <ButtonBestätigen onClick={handleClick} inhalt={"Module wählen"}/>
        </div>
    );
}

export default SubSectionModule;