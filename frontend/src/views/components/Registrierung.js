import React from 'react';
import DropDown from "../../components/Textfeld/Dropdown";

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
    "Gender" , "Lerntyp 1", "Lerntyp 2"
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

const lernGeschwindigkeiten = [
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



function Registrierung() {
    const [gender, setGender] = React.useState('');
    const [lerntypArt, setLerntypArt] = React.useState('');
    const [lernGeschwindigkeit, setlernGeschwindigkeit] = React.useState('');

    const handleGender = (event) => {
        setGender(event.target.value);
    };

    const handleLerntypArt = (event) => {
        setLerntypArt(event.target.value);
    };

    const handlelernGeschwindigkeit = (event) => {
        setlernGeschwindigkeit(event.target.value);
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
                handleChange = {handleLerntypArt}
                input = {}
                map = {lerntypArten}
                droplabel = {droplabels[2]}
            />

        </div>
    );
};



export default Registrierung;