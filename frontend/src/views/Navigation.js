import React, {Component} from 'react';
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import { Link } from "react-router-dom"
import theme from "../theme";
import MenuIcon from '@material-ui/icons/Menu';
import {AppBar, Divider, Drawer, IconButton, ListItem, ListItemIcon, ListItemText, Toolbar} from "@material-ui/core";
import Logo from '../assets/Font-Logo.svg'
import MatchIcon from '../assets/Icon_TeamUp.svg'
import List from "@material-ui/core/List";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state={
            open: false
        }
    }

    setOpen = () =>{
        if(this.state.open === false){
            this.setState({
                open: true
            })
        }
        else{
            this.setState({
                open: false
            })
        }
    }

    render() {
        return (
                <AppBar className="nav" position="static"
                        style={{backgroundColor: "#2D89FF97"}}>
                    <Toolbar className="toolbar">
                        <Link to="/">
                            <img src={Logo} className="font-logo" alt="TeamUP Logo"/>
                        </Link>
                        <div className="nav-command">
                        <div className="web-nav">
                                <Link to="/">
                                    <BottomNavigationAction label="ProfilBO"
                                    icon={<img className="TeamUpIcon" src={MatchIcon}/>}/>
                                </Link>
                        <Link to="/me">
                            <BottomNavigationAction label="ProfilBO"
                                                icon={<PersonIcon style={theme.icon}/>} />
                        </Link>
                        <Link to="/chat">
                            <BottomNavigationAction label="Chat"
                                                icon={<ChatIcon style={theme.icon}/>} />
                        </Link>
                            <Link to="/" onClick={this.props.logOut}>
                                    <BottomNavigationAction label="Chat"
                                                            icon={<ExitToAppIcon className="logout-icon"/>}/>
                            </Link>
                        </div>
                        <IconButton edge="end" className="mobile-nav" aria-label="menu">
                            <MenuIcon onClick={this.setOpen}/>
                        </IconButton>
                        <Drawer
                            variant="persistent"
                            anchor="right"
                            open={this.state.open}
                            onClick={this.setOpen}
                        >
                            <div>
                                <IconButton onClick={this.setOpen}>
                                    <ChevronLeftIcon />
                                </IconButton>
                            </div>
                            <Divider />
                            <List>
                                <Link to="/me" className="link">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <PersonIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={"Profil"} />
                                    </ListItem>
                                </Link>
                                <Link to="/chat" className="link">
                                    <ListItem button>
                                        <ListItemIcon>
                                            <ChatIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={"Chat"} />
                                    </ListItem>
                                </Link>
                                <Link to="/" className="link">
                                    <ListItem button onClick={this.props.logOut}>
                                        <ListItemIcon>
                                            <ExitToAppIcon/>
                                        </ListItemIcon>
                                        <ListItemText primary={"Logout"} />
                                    </ListItem>
                                </Link>
                            </List>
                        </Drawer>
                        </div>
                    </Toolbar>
                </AppBar>
        );
    }
}

export default Navigation;