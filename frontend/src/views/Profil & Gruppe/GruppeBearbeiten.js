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
import H3_regular from "../../components/Fonts/h3_regular";
import ButtonPrimary from "../../components/Button/ButtonPrimary";

function GruppeBearbeiten (props) {


    const verlassen = (<div style={theme.root}>
        <Paper style={theme.modalCard}>
            <h1>Wollen Sie die Gruppenerstellung wirklich verlassen?</h1>
            <ButtonDelete inhalt={"Verlassen"} onClick={() => redirect.push("/")}/>
        </Paper>
    </div>)

    const erfolg = (<div style={theme.root}>
        <Paper style={theme.modalCard}>
            <h1>Die gruppe wurde erfolgreich angelegt 🥳</h1>
            <ButtonPrimary inhalt={"Verlassen"} onClick={() => redirect.push("/")}/>
        </Paper>
    </div>)

    const fehlgeschlagen = (<div style={theme.root}>
        <Paper style={theme.modalCard}>
            <h1>Die gruppe wurde erfolgreich angelegt 🥳</h1>
            <ButtonPrimary inhalt={"Verlassen"} onClick={() => redirect.push("/")}/>
        </Paper>
    </div>)

    const redirect = useHistory()

    const [modal, setModal] = React.useState(false)
    const [modalType, setModalType] = React.useState(verlassen)
    const [name, setName] = React.useState('')
    const [beschreibung, setBeschreibung] = React.useState('')
    const [bild, setBild] = React.useState('')
    const [modul, setModul] = React.useState('')
    const [studiengang, setStudiengang] = React.useState('')
    const [lerntyp, setLerntyp] = React.useState('')
    const [frequenz, setFrequenz] = React.useState('')
    const [lernort, setLernort] = React.useState('')

    console.log(modul)


    const informationen = {
        name : name,
        beschreibung : beschreibung,
        lerntyp : lerntyp,
        modul : modul,
        profilBild : bild,
        mitglieder : [2],
        admin : 1,
        frequenz: "wöchentlich",
        lernort: "online"
    }


    async function handleCreate() {
        const gruppe = new LerngruppenBO()
        gruppe.setAll(informationen)
        console.log(gruppe)
        await TeamUpApi.getAPI().setGruppe(gruppe.getAll()).then(gruppe =>{
            if(gruppe === 200){
                setModalType(erfolg)
                setModal(true)
            }
            else{
                setModalType(fehlgeschlagen)
                setModal(true)
            }
        })
    }

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
                    {modalType}
                </Modal>
            </div>
        );
}

export default GruppeBearbeiten;