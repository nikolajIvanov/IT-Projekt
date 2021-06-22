import React from 'react';
import "../../assets/theme.css"
import TeamUpApi from "../../api/TeamUpApi";
import {Card, CardActions, CardContent, Divider, Modal, Paper} from "@material-ui/core";
import LerngruppenBO from "../../bo/LerngruppeBO";
import theme from '../../theme'
import ButtonSpeichern from "../../components/Button/ButtonSpeichern";
import ButtonDelete from "../../components/Button/ButtonDelete";
import GroupSectionBild from "./Sections/GroupSectionBild";
import GroupSectionBeschreibung from "./Sections/GroupSectionBeschreibung";
import {useHistory} from "react-router-dom";
import GroupSectionLerntyp from "./Sections/GroupSectionLerntyp";
import GroupSectionModul from "./Sections/GroupSectionModul";
import GroupSectionName from "./Sections/GroupSectionName";
import GroupSectionStudien from "./Sections/GroupSectionStudien";
import H3_bold from "../../components/Fonts/h3_bold";
import H3_regular from "../../components/Fonts/h3_regular";

function GruppeBearbeiten (props) {
    const redirect = useHistory()

    const [modal, setModal] = React.useState(false)
    const [myId, setMyId] = React.useState('')
    const [partnerId, setPartnerId] = React.useState('')
    const [name, setName] = React.useState('')
    const [beschreibung, setBeschreibung] = React.useState('')
    const [bild, setBild] = React.useState('')
    const [modul, setModul] = React.useState('')
    const [studiengang, setStudiengang] = React.useState('')
    const [lerntyp, setLerntyp] = React.useState('')

    console.log(modul)


    const informationen ={
        name : name,
        beschreibung : beschreibung,
        lerntyp : lerntyp,
        modul : modul,
        profilBild : bild,
        mitglieder : [partnerId],
        admin : myId
    }


    async function handleCreate() {
        const gruppe = new LerngruppenBO()
        gruppe.setAll(informationen)
        console.log(gruppe)
        await TeamUpApi.getAPI().setGruppe(gruppe.getAll()).then(gruppe =>{
            this.setState({
                apiGruppe: gruppe,
                update: true
            });
        })

    }

    const verlassen = (<div style={theme.root}>
        <Paper style={theme.modalCard}>
            <h1>Wollen Sie die Gruppenerstellung wirklich verlassen?</h1>
                <ButtonDelete inhalt={"Verlassen"} onClick={() => redirect.push("/")}/>
        </Paper>
    </div>)

        //TODO Abbrechen Modal hinzufügen
        return (
            <div className="card">
                    <Card>
                        <CardContent>
                            <GroupSectionName name={name} setName={setName}/>
                            <Divider/>
                            <GroupSectionBild bild={bild}
                                              setBild={setBild}/>
                            <Divider/>
                            <GroupSectionBeschreibung setBeschreibung={setBeschreibung}/>
                            <Divider/>
                            <GroupSectionLerntyp setLerntyp={setLerntyp}
                                                 lerntyp={lerntyp}/>
                            <Divider/>
                            <GroupSectionStudien setStudiengang={setStudiengang}
                                                 studiengang={studiengang}/>
                            <Divider/>
                            {studiengang ?
                                <GroupSectionModul setModul={setModul}
                                                   modul={modul}
                                                   studien={studiengang}
                                />
                                :
                                <H3_regular inhalt={"wähle ein Studiengang aus um ein " +
                                "Modul zu setzen"}/>
                            }
                        </CardContent>
                        <CardActions style={theme.root}>
                            <ButtonDelete inhalt={"Abbrechen"} onClick={() => setModal(true)}/>
                            <ButtonSpeichern inhalt={"Erstellen"} onClick={handleCreate}/>
                        </CardActions>
                    </Card>
                <Modal
                    open={modal}
                    onClose={() => setModal(false)}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >
                    {verlassen}
                </Modal>
            </div>
        );
}

export default GruppeBearbeiten;