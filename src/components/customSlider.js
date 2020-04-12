import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 900,
  },
});

export default function DiscreteSlider({ select, max, value, date }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography align='center' variant='h5'>
        {date}
      </Typography>
      <Slider
        defaultValue={0}
        aria-labelledby='discrete-slider-small-steps'
        step={1}
        marks
        min={0}
        max={max}
        value={value}
        valueLabelDisplay='auto'
        onChange={(event, value) => select(value)}
      />
    </div>
  );
}
