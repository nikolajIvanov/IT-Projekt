import React, {useEffect} from 'react';
import ButtonBestätigen from "../../../components/Button/ButtonBestätigen";
import {FormControlLabel, FormGroup, Modal, Paper, Switch, Typography} from "@material-ui/core";
import theme from "../../../theme";
import Grid from "@material-ui/core/Grid";
import TeamUpApi from "../../../api/TeamUpApi";

function SubSectionModule(props) {
    const[click, handleClick] = React.useState(false)
    const [Mod, setMod] = React.useState([])

    useEffect( () => {
        TeamUpApi.getAPI().getModul(props.studiengang)
            .then((modul) => {
                const middle = []
                modul.forEach(i => {
                    middle.push({
                        key: i.getID(),
                        value: i.getModul()
                    })
                })
                setMod(middle)
            })
    }, []);

    const handleChange = (mod) => {
        if (props.modul.includes(mod) === false) {
            props.setModul(props.modul.concat(mod))
        }
        else {
            props.setModul(props.modul.filter(item => item !== mod))
        }
    }

    return (
        <div>
            <Modal open={click}>
                <div style={theme.root}>
                    <Paper style={theme.modalCard}>
                        <p style={theme.h3.bold}>Was willst du lernen? 🧐</p>
                        {Mod ? <>
                        <FormGroup>
                            {Mod.map((mod) =>
                                <FormControlLabel
                                    control={<Switch checked={props.modul.includes(mod.value)}
                                                     onClick={(e) => {
                                                         e.preventDefault();
                                                         handleChange(mod.value)
                                                     }}/>}
                                    label={mod.value}
                                />
                            )}
                        </FormGroup>
                        <Grid container spacing={1} style={theme.root}>
                            <Grid item sx={6}>
                                <ButtonBestätigen inhalt={"Bestätigen"}
                                                  onClick={() => handleClick(false)}/>
                            </Grid>
                        </Grid>
                        </> : <Typography>Oje</Typography> }
                    </Paper>
                </div>
            </Modal>
            <ButtonBestätigen onClick={handleClick} inhalt={"Module wählen"}/>
        </div>
    );
}

export default SubSectionModule;