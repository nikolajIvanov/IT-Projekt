import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import SearchBar from "../../components/Textfeld/SearchBar";
import GroupPersonSwitch from "../../components/Icon/GroupPersonSwitch"
import FilterIcon from "../../components/Icon/FilterIcon";
import TeamUpApi from "../../api/TeamUpApi";
import ProfilListElement from "./Sections/ProfilListElement";

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        margin: "auto",
    },
});

class Match extends Component {

    constructor(props) {
    super(props)
    this.state = {
        apiUsers: null
        }
    }

    getData = () => {
        TeamUpApi.getAPI().getAllUsers().then(users =>{
        this.setState({
            apiUsers: users
        });
    })
    }
    componentDidMount() {
        this.getData()
    }

    render(){
        const { classes } = this.props;
        const { apiUsers }= this.state;
        return (
            <div className={classes.root}>
                {apiUsers ? <>
                    <GroupPersonSwitch/>
                    <SearchBar/>
                    <FilterIcon/>
                    <ProfilListElement apiUsers={apiUsers}/>
                </> : null }
            </div>
        );
    }
}

Match.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Match);
