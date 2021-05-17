import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

function ProfilAvatar(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Avatar
                src={props.img}
            alt="Profilbild"
                className={classes.large}
            />
        </div>
    );
}

export default ProfilAvatar;

