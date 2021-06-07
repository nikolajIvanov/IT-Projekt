import React, {useEffect} from 'react';
import theme from "../../../theme";
import Grid from "@material-ui/core/Grid";
import DropDown from "../../../components/Textfeld/Dropdown";
import Semester from "../../../components/Konstante(DropDown)/Semester";

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
                    <p style={theme.h3.bold}>Alter:</p>
                </Grid>
                <Grid style={art.root} item xs={12} sm={1} >
                    <p style={art.h3.bold}>-</p>
                </Grid>
                <Grid style={art.leftAligned} item xs={12} sm={7} >
                    <p style={theme.h3.bold}>26</p>
                </Grid>
                <Grid  style={art.rightAligned} item xs={12} sm={4}>
                    <p style={theme.h3.bold}>Semester:</p>
                </Grid>
                <Grid style={art.root} item xs={12} sm={1} >
                    <p style={art.h3.bold}>-</p>
                </Grid>
                <Grid style={art.leftAligned} item xs={12} sm={7}>
                    <DropDown map={Semester}
                              input={props.semester}
                              handleChange={props.handleSemesterChange}/>
                </Grid>
                <Grid style={art.rightAligned} item xs={12} sm={4}>
                    <p style={theme.h3.bold}>Studiengang:</p>
                </Grid>
                <Grid style={art.root} item xs={12} sm={1} >
                    <p style={art.h3.bold}>-</p>
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