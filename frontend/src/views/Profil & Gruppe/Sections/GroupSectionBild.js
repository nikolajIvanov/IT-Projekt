import React from 'react';
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import AddIcon from "../../../components/Icon/AddIcon";
import H1_bold from "../../../components/Fonts/h1_bold";
import H3_bold from "../../../components/Fonts/h3_bold";

function GroupSectionBild(props) {

    const fileToDataUri = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result)
        };
        reader.readAsDataURL(file);
    })

    const onChange = (file) => {

        if(!file) {
            props.setBild('');
            return;
        }

        fileToDataUri(file)
            .then(dataUri => {
                props.setBild(dataUri)
            })

    }

    return (
        <div className="card">
            <H3_bold inhalt={"Bitte wähle ein Profilbild?"}/>
            <ProfilAvatar
                    img={props.bild}
                />
            <label htmlFor="file-upload" className="custom-file-upload" style={styles.button}>
                <AddIcon/>
            </label>
            <input id="file-upload" style={styles.b} type="file" onChange={(event) => onChange(event.target.files[0] || null)} />
        </div>
    );
}

export default GroupSectionBild;

const styles = {
    b:{
        display: "none",
    },
    button:{
        marginTop:"5%"
    },
}