import React from 'react';
import {Button, Modal, Paper, Step, StepLabel, Stepper, Typography} from "@material-ui/core";
import Date from "./date";
import Gender from "./gender";
import Name from "./name";
import Lerntyp from "./lerntyp";
import Lernspeed from "./lernspeed";
import Module from "./module";
import Bio from "./bio";
import ButtonBestätigen from "../../components/Button/ButtonBestätigen";

const droplabels = [
    "Gender" , "Lerntyp", "Lernspeed", "Module"
]

function getSteps() {
    return ['Name', 'Geburtstag', 'Gender', 'Lerntyp', 'Lernspeed', 'Module', 'Bio'];
}

function SimpleModal() {
    return null;
}

function Registrierung(props) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [count, setCount] = React.useState(0);
    const [name, setName] = React.useState('');
    const [bio, setBio] = React.useState('');
    const [date, setDate] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [lernSpeed, setLernSpeed] = React.useState('');
    const [lerntypArt, setLerntypArt] = React.useState('');
    const [modul, setModul] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const steps = getSteps();

    const components = [
        <Name setName={setName} name={name} mode={styles.card}/>,
        <Date setDate={setDate} date={date} mode={styles.card}/>,
        <Gender setGender={setGender} gender={gender} mode={styles.card} drop={droplabels[0]}/>,
        <Lerntyp setLerntypArt={setLerntypArt} lerntypArt={lerntypArt} mode={styles.card} drop={droplabels[1]}/>,
        <Lernspeed setLernSpeed={setLernSpeed} lernSpeed={lernSpeed} mode={styles.card} drop={droplabels[2]}/>,
        <Module setModul={setModul} modul={modul} mode={styles.card} drop={droplabels[3]}/>,
        <Bio setBio={setBio} mode={styles.card}/>
    ]

    //TODO Api Call aufruf und übergabe von Infos über BO (Nutzer) ans Backend
    const infos = {
        name: name,
        gender: gender,
        date: date,
        bio: bio,
        lerntyp: lerntypArt,
        lernspeed: lernSpeed,
        modul: modul
    }

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const checkData = [name,date, gender, lerntypArt,lernSpeed,modul,bio]

    const modal = (
        <div style={styles.body}>
            <Paper style={styles.modalCard}>
                <h1>😱</h1>
                <Typography>
                   Bitte fülle die vorgegebenen Felder aus, um die Registrierung abzuschließen
                </Typography>
                <Typography style={styles.hinweis}>Klicke irgendwo hin um fortzufahren</Typography>
                <SimpleModal />
            </Paper>
        </div>
    )

    const checkBox = () => {
        if (checkData[count] === ''){
           handleOpen()
        }
        else{
            if(count === 6) {
                props.exist()
            }
            else{
                setCount(count + 1);
                handleNext()
            }
        }
    }

    const handleCountBack = () => {
        setCount(count - 1);
        handleBack()
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
                    <ButtonBestätigen onClick={handleCountBack} inhalt={"Zurück"} style={styles.einzelButton}/>
                    <ButtonBestätigen onClick={checkBox} inhalt={"Weiter"} style={styles.einzelButton}/>
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