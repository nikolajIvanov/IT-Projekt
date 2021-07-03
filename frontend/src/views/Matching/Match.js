import React, {Component} from 'react';
import GroupPersonSwitch from "../../components/Icon/GroupPersonSwitch"
import FilterIcon from "../../components/Icon/FilterIcon";
import UserMatchSection from "./Sections/UserMatchSection";
import GroupMatchSection from "./Sections/GroupMatchSection";
import {Card} from "@material-ui/core";

class Match extends Component {

    constructor(props) {
        super(props)
        this.state = {
            apiUsers: null, // Speichert alle User Daten aus dem Backend
            isPerson: true, // Wird für den Switch von Person auf Gruppe und umgekehrt genutzt
            apiGruppen: null, // Speichert alle Gruppen Daten aus dem Backend
        }
    }

    // Ladet direkt die User Daten aus dem Backend
    componentDidMount() {
        this.setState({
            apiUsers: this.props.userList,
            apiGruppen: this.props.groupList
        });
    }
    // Setzt den Wert für
    handleClick = () => {
        this.setState(previousState => {
          return {
            isPerson: !previousState.isPerson
          };
        });
    }

    render(){
        const { apiUsers, isPerson, apiGruppen}= this.state;

        return (
            <div className="card">
                <GroupPersonSwitch onClick={this.handleClick} value={isPerson}/>
                {apiUsers ? <>
                    <FilterIcon/>
                    { isPerson ?
                        <>
                            <UserMatchSection apiUsers={apiUsers}
                                              setMatched={this.props.setMatched}
                            />
                        </>
                    :
                                <>
                                    {apiGruppen ?
                                        <GroupMatchSection apiGroups={apiGruppen}
                                                           setMatched={this.props.setMatched}
                                        />
                                        :
                                        <Card className="card">
                                            <h2>Du hast leider keine Gruppen-Matches 😢</h2>
                                        </Card>
                                    }
                                </>
                        }
                </> : null }
            </div>
        );
    }
}

export default Match;
