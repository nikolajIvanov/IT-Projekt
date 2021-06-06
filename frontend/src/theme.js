const theme = {
        root:{
            display: "flex",
            justifyContent: "center",
            alignItems:"center",
        },
        leftAligned:{
            display: "flex",
            justifyContent: "flex-start",
            alignItems:"center",
        },
        rightAligned:{
            display: "flex",
            justifyContent: "flex-end",
            alignItems:"center",
        },
        scrollBox:{
            height: 150,
            width: 300,
            overflow: "auto",
            display:"flex",
            flexDirection: "row",
            marginBottom: "5%"
        },
        profileBorder:{
            width: "50%",
            marginTop: "2%",
            marginBottom: "2%"
        },
        button:{
            primary: {
                backgroundColor: '#2D89FF97',
                color: "white"
            },
            secondary:{
                backgroundColor: '#E2E2E296',
                color: "black"
            },
            delete:{
                backgroundColor: '#FF030397',
                color: "white"
            }
        },
        primary:{
            main: '#2D89FF97'
        },
        secondary:{
            main: '#8d8d8d'
        },
        font:{
            register:{
                color: "#898989",
                marginBottom: "5%"
            }
        },
        card:{
            padding: "2%",
            display: "flex",
            flexDirection: "column",
            alignItems:"center",
        },
        modalCard: {
            marginTop: "15%",
            padding: "2%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems:"center",
        },
        row:{
            display: "flex",
            flexDirection: "row"
        },
        h1:{
            regular:{
                fontSize: 'xx-large'
                },
            bold:{
                fontSize: 'xx-large',
                fontWeight: 'bold'
            },
        },
        h2:{
            regular:{
                fontSize: 'x-large'
            },
            bold:{
                fontSize: 'x-large',
                fontWeight: 'bold',
            },
        },
        h3:{
            regular:{
                fontSize: 'large'
            },
            bold:{
                fontSize: 'large',
                fontWeight: 'bold'
            },
        },
        p:{
            regular:{
                fontSize: 'medium'
            },
            bold:{
                fontSize: 'medium',
                fontWeight: 'bold'
            },
        }
};

export default theme