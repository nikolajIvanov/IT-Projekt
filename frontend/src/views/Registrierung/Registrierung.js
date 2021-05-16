import React from 'react';
import {Button, Step, StepLabel, Stepper, Typography} from "@material-ui/core";
import Date from "./date";
import Gender from "./gender";
import Name from "./name";
import Lerntyp from "./lerntyp";
import Lernspeed from "./lernspeed";
import Module from "./module";
import Bio from "./bio";

const droplabels = [
    "Gender" , "Lerntyp", "Lernspeed", "Module"
]

function getSteps() {
    return ['Name', 'Geburtstag', 'Gender', 'Lerntyp', 'Lernspeed', 'Module', 'Bio'];
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
    const steps = getSteps();

    const components = [
        <Name setName={setName} mode={styles.card}/>,
        <Date setDate={setDate} mode={styles.card}/>,
        <Gender setGender={setGender} gender={gender} mode={styles.card} drop={droplabels[0]}/>,
        <Lerntyp setLerntypArt={setLerntypArt} lerntypArt={lerntypArt} mode={styles.card} drop={droplabels[1]}/>,
        <Lernspeed setLernSpeed={setLernSpeed} lernSpeed={lernSpeed} mode={styles.card} drop={droplabels[2]}/>,
        <Module setModul={setModul} modul={modul} mode={styles.card} drop={droplabels[3]}/>,
        <Bio setBio={setBio} mode={styles.card}/>
    ]

    const infos = {
        name: name,
        gender: gender,
        date: date,
        bio: bio,
        lerntyp: lerntypArt,
        lernspeed: lernSpeed,
        modul: modul
    }

    const handleCount = () => {
        if(count === 6) {
            props.exist()
        }
        checkBox()
        setCount(count + 1);
        handleNext()
    };

    const checkBox = () => {

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
            {components[count]}
            <div>
                { components[count-1] ? (
                    <div style={styles.button}>
                    <Button onClick={handleCountBack}>Zurück</Button>
                    <Button onClick={handleCount}>Weiter</Button>
                    </div>
                ):(
                    <div style={styles.button}>
                    <Button onClick={handleCount}>Weiter</Button>
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
        marginTop: "15%"
    }
}