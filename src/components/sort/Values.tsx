import React, { useState } from 'react';
import CountSlider from "../../common/CountSlider"
import RangeSlider from "../../common/RangeSlider"
import SpeedSlider from "../../common/SpeedSlider"
import DropDown from "../../common/DropDown"
import DoubleToggle from '../../common/DoubleToggle';


type ValuesProps = {

  disabled: boolean; // isRunning is boolean

  onDouble: (val: boolean) => void; 

  onRangeChange: (val: number[]) => void;

  onVisualize: (val: number[]) => void; // reverse substance


  onRandomize: () => void;

  onRefresh: () => void;

  onCountChange: (val: number) => void;

  onAlgo1Changed: (val: string) => void;
  
  onAlgo2Changed: (val: string) => void;

  onSpeedChanged: (val: number) => void;

  setRunning: (val: boolean) => void;

};


const Values: React.FC<ValuesProps> = ({ disabled, onRangeChange, onDouble, onVisualize, onRandomize, onCountChange, onAlgo1Changed,onAlgo2Changed, onSpeedChanged, setRunning }) => {

  const handleVisualize = () => {
    if (disabled) {
      setRunning(false);
      window.location.reload();
      
    } else if (onAlgo1Changed || onAlgo2Changed) {
      console.log("Visualizing", onAlgo1Changed);
      console.log("Visualizing", onAlgo2Changed);
      onVisualize([]);
    }
  }
  const [isChecked, setIsChecked] = useState(false);
  
  return (
    <div className="my-5 lg1080:flex lg1080:justify-evenly grid md:grid-cols-2 md:px-5 justify-center gap-5 bg-slate-100 ">
      <div className="flex ">
        <button className="bg-blue-300 rounded-lg m-4 p-2" onClick={onRandomize} disabled={disabled}>
          Randomize
        </button>
      </div>
      <div className="inline-block m-2">
        <RangeSlider onChange={onRangeChange} disabled={disabled} />
      </div>
      <div className="flex items-center">
        <CountSlider onChange={onCountChange} disabled={disabled} />
      </div>
      <div className="flex items-center">
        <SpeedSlider onChange={onSpeedChanged} disabled={disabled} />
      </div>
      <div className="flex items-center">
        <DropDown onChange={onAlgo1Changed} disabled={disabled} />
      </div>
      <div className="flex items-center">
          <DoubleToggle onChange={(val: boolean) => {setIsChecked(val); onDouble(!isChecked)}} disabled={disabled} />
      </div>
      { isChecked && <div className="flex items-center">
        <DropDown onChange={onAlgo2Changed} disabled={disabled} />
      </div>}
      <div className="flex ">
        <button className="bg-yellow-300 rounded-lg m-4 p-2" onClick={handleVisualize} >
          {`${disabled ? "Reset" : "Visualize"}`}
        </button>
      </div>
    </div>
  )
}

export default Values