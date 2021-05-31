import React from 'react';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Button from '@material-ui/core/Button';


export default function ToggleButtons() {
  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup
      value={alignment}
      exclusive
      onChange={handleAlignment}
      color="primary"
    >

      <ToggleButton value="person" aria-label="left aligned">
        <Button>Person</Button>
      </ToggleButton>
      <ToggleButton value="gruppe" aria-label="centered">
        <Button>Gruppe</Button>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
