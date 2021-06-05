import React, {useEffect} from 'react';
import {Button, FormControlLabel, FormGroup, Paper, Switch, Typography} from "@material-ui/core";
import theme from "../../../theme";
import TeamUpApi from "../../../api/TeamUpApi";

function Module(props){
    const [back, setBack] = React.useState([])
    const [Mod, setMod] = React.useState([])

    useEffect( () => {
        TeamUpApi.getAPI().getModul("Wirtschaftsinformatik und digitale Medien")
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
    }, []);

    const handleChange = (mod) => {
        if (back.includes(mod) === false) {
            setBack(back => back.concat(mod))
        }
        else {
            setBack(back => back.filter(item => item !== mod))
        }
    }

    const getResult = () => {
        console.log(back)
    }

        return (
            <Paper style={props.mode}>
                {Mod ? <>
                    <Typography style={theme.font.register}>Was willst du lernen?</Typography>
                    <FormGroup>
                {Mod.map((modul) =>
                        <FormControlLabel
                            control={<Switch checked={back.includes(modul.value)}
                            onClick={(e) => {
                            e.preventDefault();
                            handleChange(modul.value)
                            }}/>}
                        label={modul.value}
                        />
                    )}
                    </FormGroup>
                    <Button onClick={getResult}>Hier</Button>
                </> : <Typography>Ups</Typography>}
            </Paper>
        );
}

export default Module;