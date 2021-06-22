import React, {useEffect} from 'react';
import H3_bold from "../../../components/Fonts/h3_bold";
import DropDown from "../../../components/Textfeld/Dropdown";
import TeamUpApi from "../../../api/TeamUpApi";

function GroupSectionModul(props) {
    const [dropdown, setDropdown] = React.useState('')

    useEffect(() =>{
        TeamUpApi.getAPI().getModul(props.studien)
            .then((modul) => {
                const middle = []
                modul.forEach(i => {
                    middle.push({
                        key: i.getID(),
                        value: i.getModul()
                    })
                })
                console.log(middle)
                setDropdown(middle)
            })
    }, [])

    return (
        <div className="card">
            {dropdown ?
                <>
                    <H3_bold inhalt={"Gib das Lermodul an"}/>
                    <DropDown map={dropdown} input={props.modul}
                              handleChange={(event) => props.setModul(event.target.value)}/>
                </>
                :
                <H3_bold inhalt={"Module werden geladen..."}/>
            }
        </div>
    );
}

export default GroupSectionModul;