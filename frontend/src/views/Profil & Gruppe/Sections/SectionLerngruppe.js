import React from 'react';
import {Collapse, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import ForumIcon from '@material-ui/icons/Forum';
import List from "@material-ui/core/List";

export default function SectionLerngruppe(props) {
    const[open, setOpen] = React.useState(false)

    function handleOpen(){
        if(open === true){
            setOpen(false)
        }
        else{
            setOpen(true)
        }
    }

    return (
        <div>
            <List>
                <ListItem button onClick={handleOpen}>
                    <ListItemIcon>
                        <ForumIcon />
                    </ListItemIcon>
                    <ListItemText primary="Lerngruppen" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                            <ListItem>
                                <ListItemText primary="Gruppe 1"/>
                            </ListItem>
                    </List>
                </Collapse>
            </List>
        </div>
    );
}
