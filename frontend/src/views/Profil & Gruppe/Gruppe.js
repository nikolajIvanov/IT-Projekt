import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import "../../assets/App.css"
import SectionAvatar from "./Sections/SectionAvatar";
import SectionSteckbrief from "./Sections/SectionSteckbrief";
import SectionLerntyp from "./Sections/SectionLerntyp";
import SectionLerngruppe from "./Sections/SectionLerngruppe";
import TeamUpApi from "../../api/TeamUpApi";
import firebase from 'firebase';
import ButtonPrimary from "../../components/Button/ButtonPrimary";
import UserBO from "../../bo/UserBO";
import LerngruppeBO from "../../bo/LerngruppeBO";


const styles = theme => ({
    root: {
        maxWidth: '100%',
        margin: "auto",
        overflow: "none"
    },
    test: {
        width: '20%'
    },
    grid: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
});

class Gruppen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiGruppe: null
        }
    }

    handleClick  = async () => {
        const lerngruppe = new LerngruppeBO()
        lerngruppe.setAll(this.state.apiGruppe)
        console.log(lerngruppe)
        await TeamUpApi.getAPI().updateGruppe(lerngruppe.getName(), lerngruppe.getAll())
    }

    render(){
        return (
            <div>
                <SectionAvatar userName={"GruppenameFILLEr"} text={"Name"}/>
                <Grid container direction="column" justify="center" spacing={1} alignItems="center">
                    <Grid item xs={3}>
                        <SectionSteckbrief text={"Steckbrief"} />
                    </Grid>
                    <Grid item xs={3}>
                        <SectionLerntyp lerntyp={"Auditiv"} text={"Lerntyp"}/>
                    </Grid>
                    <Grid item xs={3}>
                        <SectionLerngruppe text={"Lerngruppen"}/>
                    </Grid>
                </Grid>
                <ButtonPrimary inhalt={"Update"}/>
            </div>
        );
    }
}

Gruppen.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Gruppen);
