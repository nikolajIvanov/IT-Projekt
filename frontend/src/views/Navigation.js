import React, {Component} from 'react';
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import { Link } from "react-router-dom"
import theme from "../theme";
import {Toolbar} from "@material-ui/core";
import Logo from '../assets/Font-Logo.svg'
import MatchIcon from '../assets/Icon_TeamUp.svg'

class Navigation extends Component {
    render() {
        return (
            <div>
                <div className="nav">
                    <img src={Logo} className="font-logo"/>
                    <Toolbar>
                        <Link to="/">
                            <BottomNavigationAction label="Home"
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
                        <Link to="/">
                        <BottomNavigationAction label="Logout"
                                                icon={<ExitToAppIcon className="logout-icon"/>}
                                                onClick={this.props.logOut}/>
                        </Link>
                    </Toolbar>
                </div>
            </div>
        );
    }
}

export default Navigation;