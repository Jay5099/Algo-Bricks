import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Rects from "./Rects";
import { bubbleSort, insertionSort, selectionSort, quickSort } from '../../algorithms/sortingAlgorithms';
import Values from "./Values";

interface RectType {
  key: string;
  status: string;
  height: number;
  width: number;
  isSorted: boolean;
  isSorting: boolean;
}

type Step = {
  xx: number;
  yy: number;
  changed: boolean;
};

const Sort: React.FC = () => {
  const [count, setCount] = useState<number>(5);
  const [range,setRange] = useState<number[]>([20,60]);
  const [rects, setRects] = useState<RectType[]>([]);
  const [rects2, setRects2] = useState<RectType[]>([]);
  const [doubles, setDoubles] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(50);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isRunning1, setIsRunning1] = useState<boolean>(false);
  const [isRunning2, setIsRunning2] = useState<boolean>(false);
  const [algo1, setAlgo1] = useState<number>(0);
  const [algo2, setAlgo2] = useState<number>(0);
  
  const nullRects: RectType[] = [];
  
  useEffect(() => {
    handleRandomize();
  }, [count]);
  
  const handleRandomize = () => {
    setRects(nullRects);
    // setRects2([]);
    const initialRects = getInitialRects(count, range);
    setRects(initialRects);
    setRects2([...initialRects]);
  };

  const handleRefresh = () => {
    setRects(rects.map(rect => ({ ...rect, status: '' })));
    setRects2(rects.map(rect => ({ ...rect, status: '' })));
  };

  const handleDouble = (val:boolean) => {
    setDoubles(val);
  }
  const handleRangeChange = (val: number[]) => {
    setRange(val);
    handleRandomize();
  }
  const handleCountChange = (val: number) => {
    setCount(val);
    handleRandomize();
  }

  const handleAlgoChanged = (pos: number, val: string) => {
    let v = 0;
    if(val==='Bubble') v = 0;
    if(val==='Selection') v = 1;
    if(val==='Insertion') v =2;
    if(val==='Quick') v=3;
    
    pos === 0 ? setAlgo1(v) : setAlgo2(v);
  }

  const handleSpeedChanged = (val: number) => {
    setSpeed(400 - val * 10);
  }

  const handleSort = async () => {
    try {
        setIsRunning(true);
        console.log(algo1);
        const steps1 = getStepsForAlgo(algo1, rects);
        console.log("Steps1:", steps1);
        const steps2 = doubles ? getStepsForAlgo(algo2, rects2) : [];

        if (doubles) {
            await Promise.all([handleFirst(steps1), handleSecond(steps2)]);
        } else {
            await handleFirst(steps1);
        }
    } catch (error) {
        console.error("Error during sorting:", error);
    } finally {
        setIsRunning(false);
    }
};
  
  const getStepsForAlgo = (algo: number, arr: RectType[]) => {
    switch (algo) {
      case 0: return bubbleSort(arr);
      case 1: return selectionSort(arr);
      case 2: return insertionSort(arr);
      case 3: return quickSort(arr);
      default: return bubbleSort(arr);
    }
  };
  
  const handleFirst = async (steps: Step[]) => {
    setIsRunning1(true);
    const updatedRects = [...rects];
  
    performSorting(steps, updatedRects, setRects, speed);
  
    setIsRunning1(false);
    if (!isRunning2) setIsRunning(false);
  };
  
  const handleSecond = async (steps: Step[]) => {
    setIsRunning2(true);
    const updatedRects2 = [...rects2];
    
    performSorting(steps, updatedRects2, setRects2, speed);
    
    setIsRunning2(false);
    if (!isRunning1) setIsRunning(false);
  };

  const performSorting = async (
    steps: Step[],
    updatedRects: RectType[],
    updateRects: React.Dispatch<React.SetStateAction<RectType[]>>,
    speed: number
  ) => {
    for (let i = 0; i < steps.length; i++) {
      if (i !== 0) {
        updatedRects[steps[i - 1].xx].status = '';
        updatedRects[steps[i - 1].yy].status = '';
      }
  
      const { xx, yy, changed } = steps[i];
      if (xx === yy) {
        updatedRects[xx] = { ...updatedRects[xx], isSorted: true, isSorting: false };
      } else if (changed) {
        [updatedRects[xx], updatedRects[yy]] = [updatedRects[yy], updatedRects[xx]];
        updatedRects[xx].status = 'issorting';
        updatedRects[yy].status = 'issorting';
      } else {
        updatedRects[xx].status = 'issorting';
        updatedRects[yy].status = 'issorting';
      }
  
      updateRects([...updatedRects]);
      await new Promise(resolve => setTimeout(resolve, speed));
    }

    for(let i=0;i<updatedRects.length;i++){
      updatedRects[i].isSorted = true;
    }
  };


  return (
    <div>
      <Navbar />
      <div className="bg-gray-400 text-white h-12 text-center items-center text-2xl p-1">Sorting Visualizer</div>
      <Values 
        disabled={isRunning}
        onDouble={(val: boolean) => handleDouble(val)}
        onRangeChange={(val: number[]) =>handleRangeChange(val)}
        onVisualize={handleSort}
        onRandomize={handleRandomize}
        onRefresh={handleRefresh}
        onCountChange={(val:number)=>handleCountChange(val)}
        onAlgo1Changed={(val: string) => handleAlgoChanged(0, val)}
        onAlgo2Changed={(val: string) => handleAlgoChanged(1, val)}
        onSpeedChanged={handleSpeedChanged}
        setRunning={setIsRunning}
      />
      <Rects speed={speed} rects={rects} />
      {doubles && <Rects speed={speed} rects={rects2} />}
    </div>
  );
};


const getInitialRects = (tot: number, range: number[]): RectType[] => {
  return Array.from({ length: tot }, (_, i) => ({ 
    key: `rect-${i}`,
    status: '',
    height: Math.floor(Math.random() * range[1]) + range[0]+30,
    width: 20, // or any appropriate value
    isSorted: false,
    isSorting: false,
  }));
};

export default Sort;
