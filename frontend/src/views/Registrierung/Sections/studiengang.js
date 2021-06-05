import React from 'react';
import {Paper, Typography} from "@material-ui/core";
import theme from "../../../theme";
import DropDown from "../../../components/Textfeld/Dropdown";
import Drop from "../../../components/Konstante(DropDown)/Studiengang";
import TeamUpApi from "../../../api/TeamUpApi";

class Studiengang extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            studiengang : [],
        }
    }

    handleSemester = (event) => {
        this.props.setStudiengang(event.target.value);
    };

    componentDidMount = async() => {
        await TeamUpApi.getAPI().getStudiengang()
            .then((studiengang) => {
                const middle = {}
                studiengang.forEach(i => {
                    middle[i.getID()] = i.getStudiengang();
                })
                console.log(middle)
                return middle
            })
            .then((res) => {
               this.setState({
                    studiengang: [res]
                })
            }
        );
    }

    render() {
        const {studiengang} = this.state
        return (
            <Paper style={this.props.mode}>
                {studiengang ? <>
                    <Typography style={theme.font.register}>Was studierst du?</Typography>
                    <DropDown
                        handleChange={this.handleSemester}
                        input={studiengang}
                        map={studiengang}
                        droplabel={this.props.drop}
                    />
                </>: null
                }
            </Paper>
        );
    }
}

export default Studiengang;