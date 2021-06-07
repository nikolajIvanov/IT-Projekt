import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import React from "react";

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
      color="primary">

      <ToggleButton value="person" aria-label="left aligned">
        Person
      </ToggleButton>
      <ToggleButton value="gruppe" aria-label="right aligned">
        Gruppe
      </ToggleButton>
    </ToggleButtonGroup>
  );
}