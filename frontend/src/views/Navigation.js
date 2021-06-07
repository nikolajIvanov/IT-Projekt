import React, {Component} from 'react';
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import { Link } from "react-router-dom"
import theme from "../theme";
import {AppBar, Toolbar} from "@material-ui/core";

class Navigation extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <AppBar position="sticky" style={theme.nav}>
                    <Toolbar style={theme.root}>
                    <Link to="/">
                        <BottomNavigationAction label="Home"
                                                icon={<HomeIcon style={theme.icon}/>} />
                    </Link>
                    <Link to="/me">
                        <BottomNavigationAction label="ProfilBO"
                                                icon={<PersonIcon style={theme.icon}/>} />
                    </Link>
                    <Link to="/chat">
                        <BottomNavigationAction label="Chat"
                                                icon={<ChatIcon style={theme.icon}/>} />
                    </Link>
                    <BottomNavigationAction label="Logout"
                                            icon={<ExitToAppIcon style={theme.icon}/>}
                                            onClick={this.props.logOut}/>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navigation;