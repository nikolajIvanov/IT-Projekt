import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import DropDown from "../../../components/Textfeld/Dropdown";
import Mod from "../../../components/Konstante(DropDown)/Module";
import theme from "../../../theme";

function Module(props) {

    const handleModul = (event) => {
        props.setModul(event.target.value);
    };

    return (
            <Paper style={props.mode}>
                <Typography style={theme.font.register}>Was willst du lernen?</Typography>
                <DropDown
                    handleChange = {handleModul}
                    input = {props.modul}
                    map = {Mod}
                    droplabel = {props.drop}
                />
            </Paper>
    );
}

export default Module;