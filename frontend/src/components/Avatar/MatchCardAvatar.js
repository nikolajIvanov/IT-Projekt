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
    large: {
        width: theme.spacing(15),
        height: theme.spacing(15),
    },
}));

function MatchCardAvatar(props) {
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

export default MatchCardAvatar;