import React, { useState } from 'react';

type DropDownProps = {
  onChange: (val: string) => void;
  disabled: boolean;
  rec: boolean;
}

const DropDown:React.FC<DropDownProps> = ({ onChange, disabled,rec }) => {
  const [isOpen, setIsOpen] = useState(false); // State to track dropdown visibility
  const [selectedValue, setSelectedValue] = useState(`${rec?"Merge":"Bubble"}`); // State to store selected value

  const toggleDropdown = () => {
    setIsOpen(!isOpen); // Toggle dropdown visibility
  };


const handleSelect = (value: string) => {
    setSelectedValue(value); // Set the selected value to the button label
    setIsOpen(false); // Close the dropdown after selection
    onChange(value); // Call the onChange prop with the selected value
};

  return (
    <div className="relative"> {/* Parent div with relative positioning */}
      <button 
        id="dropdownDefaultButton" 
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
        onClick={toggleDropdown} // Toggle dropdown on button click
        disabled={disabled} // Disable button if disabled prop is true
      >
        {selectedValue} {/* Display selected value in button */}
        <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen&&!rec && (
        <div id="dropdown" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 overflow-auto max-h-56 mt-2">
          {/* Dropdown options */}
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
            <li>
              <button onClick={() => handleSelect('Bubble')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Bubble Sort
              </button>
            </li>
            <li>
              <button onClick={() => handleSelect('Selection')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Selection sort
              </button>
            </li>
            <li>
              <button onClick={() => handleSelect('Insertion')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Insertion Sort
              </button>
            </li>
            <li>
              <button onClick={() => handleSelect('Quick')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                Quick Sort
              </button>
            </li>
            
          </ul>
        </div>
      )}

      {/* Dropdown menu */}
      {isOpen&& rec && (
        <div id="dropdown" className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 overflow-auto max-h-56 mt-2">
        {/* Dropdown options */}
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
          <li>
            <button onClick={() => handleSelect('Merge')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
            Merge Sort
            </button>
          </li>
          <li>
            <button onClick={() => handleSelect('Quick')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Quick sort
            </button>
          </li>
          <li>
            <button onClick={() => handleSelect('Heap')} className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Heap Sort
            </button>
          </li>
        </ul>
      </div>
      )}

    </div>
  );
};

export default DropDown;
