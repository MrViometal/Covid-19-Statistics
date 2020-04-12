import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButtonsGroup({ radioSelected }) {
  const [selectedValue, setSelectedValue] = React.useState('raw');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <FormControl component='fieldset'>
      <RadioGroup row aria-label='position' name='position' defaultValue='top'>
        <FormControlLabel
          value='top'
          control={
            <Radio
              checked={selectedValue === 'raw'}
              onChange={handleChange}
              value='raw'
              name='radio-button-demo'
            />
          }
          label='Raw Data'
          labelPlacement='top'
        />
        <FormControlLabel
          value='right'
          control={
            <Radio
              checked={selectedValue === 'log'}
              onChange={handleChange}
              value='log'
              name='radio-button-demo'
            />
          }
          label='Log Data'
          labelPlacement='top'
        />
        <FormControlLabel
          value='top'
          control={
            <Radio
              checked={selectedValue === 'dydx'}
              onChange={handleChange}
              value='dydx'
              name='radio-button-demo'
            />
          }
          label='Dy/Dx Data'
          labelPlacement='top'
        />
      </RadioGroup>
    </FormControl>
  );
}
