import React, {useEffect} from 'react';
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
import H2_bold from "../../components/Fonts/h2_bold";
import GroupSectionFrequenz from "./Sections/GroupSectionFrequenz";
import GroupSectionLernort from "./Sections/GroupSectionLernort";

function GruppeBearbeiten (props) {


    const verlassen = (<div style={theme.root}>
        <Paper style={theme.modalCard}>
            <H2_bold inhalt={"Wollen Sie die Gruppenerstellung wirklich verlassen?"}/>
            <ButtonDelete inhalt={"Verlassen"} onClick={() => redirect.push("/")}/>
        </Paper>
    </div>)

    const erfolg = (<div style={theme.root}>
        <Paper style={theme.modalCard}>
            <H2_bold inhalt={"Die gruppe wurde erfolgreich angelegt 🥳"}/>
            <ButtonPrimary inhalt={"Verlassen"} onClick={() => redirect.push("/")}/>
        </Paper>
    </div>)

    const fehlgeschlagen = (<div style={theme.root}>
        <Paper style={theme.modalCard}>
            <H2_bold inhalt={"Es ist ein fehler bei der Erstellung aufgetreten 😰"}/>
            <H3_regular inhalt={"Um auf der Seite zu bleiben, auf die Fläche um das Fenster klicken."}/>
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

    const informationen = {
        name : name,
        beschreibung : beschreibung,
        lerntyp : lerntyp,
        modul : modul,
        profilBild : bild,
        mitglieder : [props.partnerId],
        admin : props.myId,
        frequenz: frequenz,
        lernort: lernort
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
                            <Divider/>
                            <GroupSectionFrequenz setFrequenz={setFrequenz}
                                                 frequenz={frequenz}/>
                            <Divider/>
                            <GroupSectionLernort setLernort={setLernort}
                                                 lernort={lernort}/>
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