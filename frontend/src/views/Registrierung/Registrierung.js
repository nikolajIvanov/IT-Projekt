import React from 'react';
import {Modal, Paper, Step, StepLabel, Stepper, Typography} from "@material-ui/core";
import Date from "./Sections/date";
import Gender from "./Sections/gender";
import Name from "./Sections/name";
import Lerntyp from "./Sections/lerntyp";
import Bild from "./Sections/bild";
import Module from "./Sections/module";
import Bio from "./Sections/bio";
import ButtonBestätigen from "../../components/Button/ButtonBestätigen";
import firebase from "firebase";
import User from "../../bo/UserBO";
import TeamUpApi from "../../api/TeamUpApi"
import Semester from "./Sections/semester";
import Studiengang from "./Sections/studiengang";

//Labels die über den DropDown Buttons der Komponenten stehen
const droplabels = [
    "Gender" , "Lerntyp", "Bild", "Module", 'Semester', "Studiengang",
]

//Werte die als Stepper Bezeichnungen genutzt werden - Reihenfolge ist wichtig!
function getSteps() {
    return ['Name', 'Geburtstag', 'Gender', 'Studiengang', 'Semester', 'Module', 'Lerntyp', 'Bild', 'Bio'];
}

//Übergeordnete Komponente für den Registrierungsprozess
function Registrierung(props) {
    //Konstanten der Komponenten und ihre state-Handler
    const [activeStep, setActiveStep] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [name, setName] = React.useState('');
    const [bio, setBio] = React.useState('');
    const [date, setDate] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [bild, setBild] = React.useState('');
    const [lerntypArt, setLerntypArt] = React.useState('');
    const [modul, setModul] = React.useState('');
    const [semester, setSemester] = React.useState('');
    const [studiengang, setStudiengang] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const steps = getSteps();

    //Object Instantiierungen für User und API
    const user = new User()

    //Komponenten die im Laufe des Registrierungsprozess über checkBox gerendert werden
    const components = [
        <Name setName={setName} name={name} mode={styles.card}/>,
        <Date setDate={setDate} date={date} mode={styles.card}/>,
        <Gender setGender={setGender} gender={gender} mode={styles.card} drop={droplabels[0]}/>,
        <Studiengang setStudiengang={setStudiengang} studiengang={studiengang} drop={droplabels[5]} mode={styles.card}/>,
        <Semester setSemester={setSemester} semester={semester} drop={droplabels[4]} mode={styles.card}/>,
        <Module setModul={setModul} modul={modul} mode={styles.card} drop={droplabels[3]}/>,
        <Lerntyp setLerntypArt={setLerntypArt} lerntypArt={lerntypArt} mode={styles.card} drop={droplabels[1]}/>,
        <Bild setBild={setBild} bild={bild} mode={styles.card}/>,
        <Bio setBio={setBio} mode={styles.card}/>
    ]

    //TODO Api Call aufruf und übergabe von Infos über BO (Nutzer) ans Backend
    const infos = {
        name: name,
        gender: gender,
        geburtsdatum: date,
        modul: modul,
        beschreibung: bio,
        lerntyp: lerntypArt,
        profilBild: bild,
        semester: semester,
        studiengang: studiengang,
        authId: firebase.auth().currentUser.uid,
        email: firebase.auth().currentUser.email,
    }



    //Öffnet das Modal
    const handleOpen = () => {
        setOpen(true);
    };

    //Schließt das Modal
    const handleClose = () => {
        setOpen(false);
    };

    //Wird benutzt um zu überprüfen ob die aktuelle Komponente leer ist
    const checkData = [name, date, gender, studiengang, semester, modul, lerntypArt, bild, bio]

    //modal ist ein Object, dass gerendert wird falls die Modalvariable "open" true ist.
    const modal = (
        <div style={styles.body}>
            <Paper style={styles.modalCard}>
                <h1>😱</h1>
                <Typography>
                   Bitte fülle die vorgegebenen Felder aus, um die Registrierung abzuschließen
                </Typography>
                <Typography style={styles.hinweis}>Klicke irgendwo hin um fortzufahren</Typography>
            </Paper>
        </div>
    )

    //Die Checkbox prüft welche Komponente momentan in der Registrierung angezeigt wird und ob die Input werte leer sind
    //Falls leere werte übergeben werden wird ein Modal über handleOpen() aufgerufen
    const checkBox = () => {
        if (checkData[count] === ''){
           handleOpen()
        }
        else{
            //TODO auf length setzen
            if(count === 8) {
                user.setAll(infos)
                TeamUpApi.getAPI().setUser(user.getAll())
                console.log(user.getAll())
                props.exist()
            }
            else{
                setCount(count + 1);
                handleNext()
            }
        }
    }

    //setzt den Komponenten-Counter und den Stepper einen wert zurück
    const handleCountBack = () => {
        setCount(count - 1);
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    //setzt den Stepper einen wert vor
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    return (
        <div style={styles.body}>
            <Stepper activeStep={activeStep} alternativeLabel style={styles.stepper}>
                {steps.map((label) => (
                    <Step key={label} style={styles.step}>
                        <StepLabel style={styles.label}>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Modal
                open={open}
                onClose={handleClose}>
                {modal}
            </Modal>
            {components[count]}
            <div>
                { components[count-1] ? (
                    <div style={styles.button}>
                    <ButtonBestätigen onClick={handleCountBack} inhalt={"Zurück"} />
                    <ButtonBestätigen onClick={checkBox} inhalt={"Weiter"}/>
                    </div>
                ):(
                    <div style={styles.button}>
                        <ButtonBestätigen onClick={checkBox} inhalt={"Weiter"}/>
                    </div>
                )}
            </div>
            <Typography style={styles.hi}>In ein paar Schritten kannst du loslegen 😎</Typography>
        </div>
    );
};



export default Registrierung;

const styles = {
    body:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent:"center",
    },
    card:{
        padding: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
    },
    modalCard: {
        marginTop: "15%",
        padding: "2%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems:"center",
    },
    stepper:{
        marginBottom: "5%",
    },
    step:{
        width: "80px",
    },
    hi:{
        marginTop: "2%",
    },
    button:{
        marginTop: "15%",
        display: "flex",
        flexDirection: "row",
    },
    hinweis:{
        marginTop: "2%",
        fontSize: "small",
        color: "#9a9a9a"
    }
}