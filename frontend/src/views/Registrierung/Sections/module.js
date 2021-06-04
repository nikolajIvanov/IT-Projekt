import React from 'react';
import {Button, FormControlLabel, FormGroup, Paper, Radio, RadioGroup, Switch, Typography} from "@material-ui/core";
import Mod from "../../../components/Konstante(DropDown)/Module";
import theme from "../../../theme";
import DropDown from "../../../components/Textfeld/Dropdown";

function Module(props) {
    const [back, setBack] = React.useState([])

    /**const handleChange = async (mod) => {
        if (back.includes(mod) === false) {
            setBack(back => back.concat(mod))
        }
        else {
            //TODO anderes Datenformat
            setBack(back => [])
        }
    }

    const getResult = () => {
        console.log(back)
    }*/

    const handleModul = (event) => {
        props.setModul(event.target.value);
    };

    return (
            <Paper style={props.mode}>
                <Typography style={theme.font.register}>Was willst du lernen?</Typography>
                {/* <FormGroup>
                            {Mod.map((modul)=>
                                <FormControlLabel
                                    control={<Switch checked={back.includes(modul)}
                                                     onClick={(e) => {
                                                         e.preventDefault();
                                                        handleChange(modul)}} />}
                                    label={modul}
                                />
                            )}
                </FormGroup>
                <Button onClick={getResult}>Hier</Button>*/}
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