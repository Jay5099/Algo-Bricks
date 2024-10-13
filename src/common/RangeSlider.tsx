import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value: number) {
  return `${value}°C`;
}

export default function RangeSlider({onChange, disabled}: {onChange: (val: number[]) => void, disabled: boolean}) {
  const [value, setValue] = React.useState<number[]>([20, 60]);

  const handleChange = (_: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    onChange(newValue as number[]);
  };

  return (
    <>
        <label 
        htmlFor="Range" 
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white     ">
        Range: {value[0]} to {value[1]} {/* Display current value */}
      </label>
        <Box sx={{ width: 300 }}>
        <Slider
            getAriaLabel={() => 'Temperature range'}
            value={value}
            onChange={handleChange}
            disabled={disabled}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            />
        </Box>
    </>
  );
}
