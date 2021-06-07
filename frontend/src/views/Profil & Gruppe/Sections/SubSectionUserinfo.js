import React, {useEffect} from 'react';
import theme from "../../../theme";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../../components/Textfeld/Dropdown";
import Semester from "../../../components/Konstante(DropDown)/Semester";
import {Typography} from "@material-ui/core";

function SubSectionUserinfo(props) {

    const mobileDesign ={
        leftAligned:{
            display: "flex",
            justifyContent: "center",
            alignItems:"center",
        },
        rightAligned:{
            display: "flex",
            justifyContent: "center",
            alignItems:"center",
        },
        root:{
            height: "10px"
        },
        h3:{
            bold:{
                display: "none",
                height: "0px",
            }
        }
    }
    const[art, setTheme] = React.useState(theme)

    useEffect(() => {
        window.addEventListener('resize', handleResize);
    },[])

    function handleResize() {
        if(window.innerWidth < 600){
            setTheme(mobileDesign)
        }
        else{
            setTheme(theme)
        }
    }

    return (
        <div>
            <Grid style={theme.root} container spacing={3}>
                <Grid style={art.rightAligned} item xs={12} sm={4} >
                    <Typography style={theme.h3.bold}>Alter:</Typography>
                </Grid>
                <Grid style={art.root} item xs={12} sm={1} >
                    <Typography style={art.h3.bold}>-</Typography>
                </Grid>
                <Grid style={art.leftAligned} item xs={12} sm={7} >
                    <Typography style={theme.h3.bold}>{props.alter}</Typography>
                </Grid>
                <Grid  style={art.rightAligned} item xs={12} sm={4}>
                    <Typography style={theme.h3.bold}>Semester:</Typography>
                </Grid>
                <Grid style={art.root} item xs={12} sm={1} >
                    <Typography style={art.h3.bold}>-</Typography>
                </Grid>
                <Grid style={art.leftAligned} item xs={12} sm={7}>
                    <DropDown map={Semester}
                              input={props.semester}
                              handleChange={props.handleSemesterChange}/>
                </Grid>
                <Grid style={art.rightAligned} item xs={12} sm={4}>
                    <Typography style={theme.h3.bold}>Studiengang:</Typography>
                </Grid>
                <Grid style={art.root} item xs={12} sm={1} >
                    <Typography style={art.h3.bold}>-</Typography>
                </Grid>
                <Grid style={art.leftAligned} item xs={12} sm={7}>
                    <DropDown map={props.studien}
                              input={props.studiengang}
                              handleChange={props.handleStudiengangChange}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default SubSectionUserinfo;