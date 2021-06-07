import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  rootright: {
    minWidth: '50%',
    maxWidth: '60%',
    marginRight: '10px',
    marginLeft: '50%',
    marginBottom: '5px',
    marginTop: '5px',
    textAlign: 'right',
    display: 'inline-block',
    align: 'right',
  },
  rootleft: {
    minWidth: '50%',
    maxWidth: '60%',
    marginRight: '50%',
    marginLeft: '10px',
    marginBottom: '5px',
    marginTop: '5px',
    textAlign: 'left',
    display: 'inline-block',
    align: 'right'
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard() {
  const classes = useStyles();

  return (
    <div>
      <Card className={classes.rootright}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Max Muster
          </Typography>
          <Typography variant="h5" component="h2">
            Hallo Michael
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            12:40 Uhr
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.rootleft}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Michael Muster
        </Typography>
        <Typography variant="h5" component="h2">
          Hallo Max
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          12:41 Uhr
        </Typography>
      </CardContent>
    </Card>
  </div>
  );
}
