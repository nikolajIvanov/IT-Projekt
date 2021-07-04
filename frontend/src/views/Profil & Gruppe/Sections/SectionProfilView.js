import React, {useEffect} from 'react';
import ProfilAvatar from "../../../components/Avatar/ProfilAvatar";
import H3_bold from "../../../components/Fonts/h3_bold";
import H2_bold from "../../../components/Fonts/h2_bold";
import H3_regular from "../../../components/Fonts/h3_regular";
import List from "@material-ui/core/List";
import {Collapse, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import {ExpandLess, ExpandMore} from "@material-ui/icons";

function SectionProfilView(props) {
    const[win, setWindow] = React.useState('')
    const[open, setOpen] = React.useState(false)

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    },[])

    function handleResize() {
        setWindow(window.innerWidth);
    }

    function handleOpen(){
        if(open === true){
            setOpen(false)
        }
        else{
            setOpen(true)
        }
    }

    return (
        <div className="card">
            <ProfilAvatar img={props.apiObject.getProfilBild()}/>
            <H2_bold inhalt={props.apiObject.getVorname() + ", " + props.apiObject.getName()}/>
            <H3_regular inhalt={props.apiObject.getBeschreibung()}/>
            <List>
                <ListItem className="matchPoints">
                    <H3_bold inhalt={"Studiengang"}/>
                    <ArrowRightIcon/>
                    <ListItemText primary={`${props.apiObject.getStudiengang()}`}/>
                </ListItem>
                <ListItem className="matchPoints">
                    <H3_bold inhalt={"Semester"}/>
                    <ArrowRightIcon/>
                    <ListItemText primary={props.apiObject.getSemester()}/>
                </ListItem>
                <ListItem className="matchPoints">
                    <H3_bold inhalt={"Lerntyp"}/>
                    <ArrowRightIcon/>
                    <ListItemText primary={props.apiObject.getLerntyp()}/>
                </ListItem>
                <ListItem button onClick={handleOpen}>
                    <ListItemIcon>
                        <FormatAlignJustifyIcon />
                    </ListItemIcon>
                    <ListItemText primary="Module" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {props.apiObject.getModul().map(modul =>
                            <ListItem>
                                <ListItemText primary={modul}/>
                            </ListItem>
                        )}
                    </List>
                </Collapse>
            </List>
        </div>
    );
}

export default SectionProfilView;