import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';


export default function ToggleButtons(props) {

  return (
    <ToggleButtonGroup value={props.value} exclusive onClick={props.onClick} color="primary">
      <ToggleButton value={true} aria-label="person">
        Personen
      </ToggleButton>
      <ToggleButton value={false} aria-label="gruppe">
        Gruppen
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
