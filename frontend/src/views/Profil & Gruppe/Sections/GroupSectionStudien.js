import React, {useEffect} from 'react';
import TeamUpApi from "../../../api/TeamUpApi";
import H3_bold from "../../../components/Fonts/h3_bold";
import DropDown from "../../../components/Textfeld/Dropdown";

function GroupSectionStudien(props) {
    const[studien, setStudien] = React.useState(null)

    useEffect(() =>{
         TeamUpApi.getAPI().getStudiengang()
            .then((studiengang) => {
                const middle = []
                studiengang.forEach(i => {
                    middle.push({
                        key: i.getID(),
                        value: i.getStudiengang()
                    })
                })
                setStudien(middle)
            });
    }, [])

    return (
        <div className="card">
            {studien ?
                <>
                    <H3_bold inhalt={"Gib den Studiengang ein"}/>
                    <DropDown map={[{key:0, value:"-Wähle ein Studiengang-"}].concat(studien)} input={props.studiengang}
                              handleChange={(event) => props.setStudiengang(event.target.value)}/>
                </> :
                <H3_bold inhalt={"Studiengänge konnten nicht geladen werden"}/>
            }
        </div>
    );
}

export default GroupSectionStudien;