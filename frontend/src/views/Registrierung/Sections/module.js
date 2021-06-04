import React from 'react';
import {Button, Paper, Typography} from "@material-ui/core";
import DropDown from "../../../components/Textfeld/Dropdown";
import Mod from "../../../components/Konstante(DropDown)/Module";
import theme from "../../../theme";
import Grid from "@material-ui/core/Grid";

function Module(props) {

    const out = ["outlined", "contained"]

    const setActive = () =>{

    }

    const Module = []

    const handleModul = (event) => {
        props.setModul(event.target.value);
    };

    return (
            <Paper style={props.mode}>
                <Typography style={theme.font.register}>Was willst du lernen?</Typography>
                <p>{Module.length}</p>
                <Grid container spacing={1}>
                    {Mod.map((modul, key)=>
                        <Grid item xs={4}>
                            <Button variant={out[0]} handleChange={setActive}>{modul.value}</Button>
                        </Grid>
                    )}
                </Grid>
                {/* <DropDown
                    handleChange = {handleModul}
                    input = {props.modul}
                    map = {Mod}
                    droplabel = {props.drop}
                />*/}
            </Paper>
    );
}

export default Module;