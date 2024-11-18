import  React, { useState } from 'react';

type SpeedSliderProps = {
  onChange: (val: number) => void;
}

const SpeedSlider:React.FC<SpeedSliderProps> = ({onChange}) => {

  const [value, setValue] = useState(5); // Initial value of the slider is 5

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <label 
        htmlFor="speed-range" 
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Speed: {value} {/* Display current value */}
      </label>
      <input 
        id="minmax-range" 
        type="range" 
        min="10" 
        max="50" 
        value={value} 
        // disabled={disabled} // Disable the slider when the sorting is in progress
        onChange={handleChange} // Change the value when the slider is moved
        className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
    </div>
  );
}

export default SpeedSlider  ;
