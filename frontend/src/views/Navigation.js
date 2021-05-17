import React, {Component} from 'react';
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import ChatIcon from '@material-ui/icons/Chat';
import { Link } from "react-router-dom"

class Navigation extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <BottomNavigation className="Nav">
                    <Link to="/">
                        <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                    </Link>
                    <Link to="/gruppen">
                        <BottomNavigationAction label="Gruppe" icon={<GroupIcon />} />
                    </Link>
                    <Link to="/profile">
                        <BottomNavigationAction label="Profil" icon={<PersonIcon />} />
                    </Link>
                    <Link to="/chat">
                        <BottomNavigationAction label="Chat" icon={<ChatIcon />} />
                    </Link>
                    <BottomNavigationAction label="Logout" icon={<ExitToAppIcon/>}
                                            onClick={this.props.logOut}/>
                </BottomNavigation>
            </div>
        );
    }
}

export default Navigation;