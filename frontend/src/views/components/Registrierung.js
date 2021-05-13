import React from 'react';
import DropDown from "../../components/Textfeld/Dropdown";
import MultiLine from "../../components/Textfeld/MultiLine";

const genders = [
    {
        value: '1',
        label: 'Mann',
    },
    {
        value: '2',
        label: 'Frau',
    },
    {
        value: '3',
        label: 'Divers',
    },

]

const droplabels = [
    "Gender" , "Lerntyp 1", "Lerntyp 2", "Module"
]

const lerntypArten = [
    {
        value: '1',
        label: 'Visuell',
    },
    {
        value: '2',
        label: 'Audio',
    },
    {
        value: '3',
        label: 'Wiederholung',
    },
    {
        value: '4',
        label: 'Bulimie',
    },
]

const lernSpeeds = [
    {
        value: '1',
        label: 'Langsam',
    },
    {
        value: '2',
        label: 'Normal',
    },
    {
        value: '3',
        label: 'Schnell',
    },
]

const modula = [
    {
        value: '1',
        label: 'Programmieren',
    },
    {
        value: '2',
        label: 'Data Science',
    },
    {
        value: '3',
        label: 'Marketing',
    },
]



function Registrierung() {
    const [gender, setGender] = React.useState('');
    const [lerntypArt, setLerntypArt] = React.useState('');
    const [lernSpeed, setLernSpeed] = React.useState('');
    const [modul, setModul] = React.useState('');

    const handleGender = (event) => {
        setGender(event.target.value);
    };

    const handleLerntypArt = (event) => {
        setLerntypArt(event.target.value);
    };

    const handleLernSpeed = (event) => {
        setLernSpeed(event.target.value);
    };

    const handleModul = (event) => {
        setModul(event.target.value);
    };

    return (
        <div>
            <DropDown
                handleChange = {handleGender}
                input = {gender}
                map = {genders}
                droplabel = {droplabels[0]}
            />
            <DropDown
                handleChange = {handleLerntypArt}
                input = {lerntypArt}
                map = {lerntypArten}
                droplabel = {droplabels[1]}
            />
            <DropDown
                handleChange = {handleLernSpeed}
                input = {lernSpeed}
                map = {lernSpeeds}
                droplabel = {droplabels[2]}
            />
            <DropDown
                handleChange = {handleModul}
                input = {modul}
                map = {modula}
                droplabel = {droplabels[3]}
            />


            <MultiLine />

        </div>
    );
};



export default Registrierung;