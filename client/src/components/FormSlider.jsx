import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import {makeStyles, withStyles} from '@mui/styles';

const useStyles = makeStyles({
    root: {
        width: 100,
        height: 10,
    },
});

const CustomSlider = withStyles({
    rail: {
        backgroundImage: 'linear-gradient(to right, #12c2e9, #c471ed, #f64f59)',
    },
    track: {
        backgroundImage: 'linear-gradient(to right, #12c2e9, #c471ed, #6365f1)',
        border: 'none !important',
    },
    thumb: {
        backgroundImage: 'linear-gradient(to right, #6365f1, #7c7ef2, #6365f1)',
        backgroundColor: '#6365f1;',
    },
})(Slider);

function valuetext(value) {
    return value;
}

export default function DiscreteSlider({
                                           minValue,
                                           maxValue,
                                           name,
                                           labelName,
                                           handleChange,
                                       }) {
    const classes = useStyles();

    return (
        <Box>
            <label htmlFor={name} className='block text-sm font-medium text-gray-900'>
                {labelName}
            </label>
            <CustomSlider
                sx={{height: 10}}
                aria-label={labelName}
                defaultValue={0}
                getAriaValueText={valuetext}
                valueLabelDisplay='auto'
                step={1}
                name={name}
                min={minValue}
                max={maxValue}
                onChange={handleChange}
            />
        </Box>
    );
}
