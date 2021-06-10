import React, {useEffect} from 'react';
import {FormControlLabel, FormGroup, Paper, Switch, Typography} from "@material-ui/core";
import theme from "../../../theme";
import TeamUpApi from "../../../api/TeamUpApi";

function Module(props){
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
                console.log(middle)
                setMod(middle)
            })
    });

    const handleChange = (mod) => {
        if (props.modul.includes(mod) === false) {
            props.setModul(modul => modul.concat(mod))
        }
        else {
            props.setModul(modul => modul.filter(item => item !== mod))
        }
    }

        return (
            <Paper style={props.mode}>
                {Mod ? <>
                    <Typography style={theme.font.register}>Was willst du lernen?</Typography>
                    <FormGroup style={theme.scrollBox}>
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
                </> : <Typography>Ups</Typography>}
            </Paper>
        );
}

export default Module;