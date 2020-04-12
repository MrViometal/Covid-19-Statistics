import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButtonsGroup({ radioSelected, radio }) {
  const [selectedValue, setSelectedValue] = React.useState('raw');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    radioSelected(event.target.value);
  };

  React.useEffect(() => {
    setSelectedValue(radio);
  }, [radio]);

  return (
    <FormControl component='fieldset'>
      {console.log('radio', radio)}
      <RadioGroup row aria-label='position' name='position' defaultValue='top'>
        <FormControlLabel
          value='top'
          control={
            <Radio
              checked={selectedValue === 'raw'}
              onChange={handleChange}
              value='raw'
              name='radio-button-demo'
              size='small'
            />
          }
          label='Raw Data'
          labelPlacement='right'
        />
        <FormControlLabel
          value='right'
          control={
            <Radio
              checked={selectedValue === 'log'}
              onChange={handleChange}
              value='log'
              name='radio-button-demo'
              size='small'
            />
          }
          label='Log Data'
          labelPlacement='right'
        />
        <FormControlLabel
          value='top'
          control={
            <Radio
              checked={selectedValue === 'dydx'}
              onChange={handleChange}
              value='dydx'
              name='radio-button-demo'
              size='small'
            />
          }
          label='Dy/Dx Data'
          labelPlacement='right'
        />
      </RadioGroup>
    </FormControl>
  );
}
