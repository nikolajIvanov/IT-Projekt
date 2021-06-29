import React from 'react';
import {ButtonGroup} from "@material-ui/core";
import Button from "@material-ui/core/Button";


export default function ToggleButtons(props) {

  return (
    <ButtonGroup value={props.value} onClick={props.onClick} variant="contained" color="primary">
          <Button value={true} aria-label="person">
            Personen
          </Button>
          <Button value={false} aria-label="gruppe">
            Gruppen
          </Button>
    </ButtonGroup>
  );
}
