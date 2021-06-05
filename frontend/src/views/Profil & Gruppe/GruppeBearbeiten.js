import React from 'react';
import Grid from '@material-ui/core/Grid';
import "../../assets/App.css"
import SectionAvatar from "./Sections/SectionAvatar";
import SectionSteckbrief from "./Sections/SectionSteckbrief";
import SectionLerntyp from "./Sections/SectionLerntyp";
import SectionLerngruppe from "./Sections/SectionLerngruppe";
import TeamUpApi from "../../api/TeamUpApi";
import ButtonBestätigen from "../../components/Button/ButtonBestätigen";
import {Card, CardActions, CardContent, Modal, Paper, Typography} from "@material-ui/core";
import UserBO from "../../bo/UserBO";
import theme from '../../theme'
import ButtonSpeichern from "../../components/Button/ButtonSpeichern";
import ButtonLöschen from "../../components/Button/ButtonLöschen";

class GruppeBearbeiten extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            apiGruppe: null,
            modalOpen: false,
            update: false
        }
    }


    handleUpdate  = async () => {
        const user = new UserBO()
        user.setAll(this.state.apiGruppe)
        console.log(user)
        await TeamUpApi.getAPI(props.gruppeId).updateGruppe().then(user =>{
            this.setState({
                apiGruppe: user,
                update: true
            });
        })

    }

    löschenModal = () => {
        this.setState({
            modalOpen: true
        })
        return(
            <div style={theme.root}>
                <Paper style={theme.modalCard}>
                    <h1>Wollen Sie die Gruppe wirklich löschen</h1>
                    <ButtonBestätigen inhalt={"Bestätigen"}/>
                </Paper>
            </div>
        )
    }

    handleChange = (gruppe) => {
        this.setState({
            apiGruppe: gruppe
        })
    }

    async componentDidMount() {

    }

    render(){
        const {apiGruppe}= this.state;

        return (
            <div style={theme.root}>
                {apiGruppe ?
                    <Card style={theme.profileBorder}>
                        <CardContent>
                            <SectionAvatar apiObject={apiGruppe} handleChange={this.handleChange}/>
                            <Grid container spacing={3}>
                                <Grid style={theme.root} item xs={12}>
                                    <SectionSteckbrief apiObject={apiGruppe}
                                                       handleChange={this.handleChange} text={"Steckbrief"} />
                                </Grid>
                                <Grid style={theme.root} item xs={12}>
                                    <SectionLerntyp apiObject={apiGruppe} handleChange={this.handleChange}/>
                                </Grid>
                                <Grid style={theme.root} item xs={12}>
                                    <SectionLerngruppe/>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions style={theme.root}>
                            <ButtonLöschen inhalt={"Löschen"} onClick={this.löschenModal}/>
                            <ButtonSpeichern inhalt={"Update"} onClick={this.handleUpdate}/>
                            { this.state.modalOpen ?
                                <Modal open={true}>
                                    <div style={theme.root}>
                                        <Paper style={theme.modalCard}>
                                            <p style={theme.h3.bold}>Willst du uns wirklich verlassen? 😢 </p>
                                            <p style={theme.p}>Du verlierst dadurch deinen Zugang zu TeamUP</p>
                                            <Grid container spacing={1} style={theme.root}>
                                                <Grid item sx={6}>
                                                    <ButtonLöschen inhalt={"Bestätigen"}/>
                                                </Grid>
                                                <Grid item sx={6}>
                                                    <ButtonBestätigen inhalt={"Doch bleiben"}
                                                                      onClick={() => this.setState({
                                                                          modalOpen: false
                                                                      })}/>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </div>
                                </Modal> : null}
                            {this.state.update ?
                                <Modal open={true}>
                                    <Paper style={theme.modalCard}>
                                        <p style={theme.h3.bold}>Dein Update war erfolgreich</p>
                                        <Grid container spacing={1} style={theme.root}>
                                            <Grid item sx={12}>
                                                <ButtonBestätigen inhalt={"Zurück"}
                                                                  onClick={() => this.setState({
                                                                      update: false
                                                                  })}/>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                </Modal>
                                : null
                            }
                        </CardActions>
                    </Card> : null }
            </div>
        );
    }
}

export default GruppeBearbeiten;