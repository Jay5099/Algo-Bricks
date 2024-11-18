import React, { useEffect, useState,useRef } from "react";
import Navbar from "../Navbar";
import Rects from "./Rects";
import { rquickSort,mergeSort,heapSort } from '../../algorithms/sortingAlgorithms';
import Values from "./Values";

interface RectType {
  key: string;
  status: string;
  height: number;
  width: number;
  isSorted: boolean;
  isSorting: boolean;
}

type RectTypeM = {
  width: number;
  height: number;
  isLeft?: boolean;
  isSorting?: boolean;
  isRight?: boolean;
  isRange?: boolean;
  isSorted?: boolean;
};

type Step = {
  xx: number;
  yy: number;
  changed: boolean;
};

type StepH = {
  left: number;
  right: number;
  sorted: boolean;
};


type StepM = {
  left: number;
  right: number;
  mid: number;
  val: RectType[];
};

const RecursiveSort: React.FC = () => {
  const [count, setCount] = useState<number>(10);
  const [range,setRange] = useState<number[]>([20,60]);
  const [rects, setRects] = useState<RectType[]|RectTypeM[]>([]);
  const [rects2, setRects2] = useState<RectType[]|RectTypeM[]>([]);
  const [doubles, setDoubles] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(500); //less is faster
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isRunning1, setIsRunning1] = useState<boolean>(false);
  const [isRunning2, setIsRunning2] = useState<boolean>(false);
  const [algo1, setAlgo1] = useState<number>(0);
  const [algo2, setAlgo2] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const pausedRef = useRef(paused);
  const resetRef = useRef(false);
  const speedRef = useRef(speed);
  const nullRects: any = [];
  
  useEffect(() => {
    handleRandomize();
  }, [count]);
  
  const handleRandomize = () => {
    setRects(nullRects);

    const heights = Array.from({ length: count }, () => Math.floor(Math.random() * range[1]) + range[0]+30);

    switch (algo1) {
    case 0: {
      const initialRects = getInitialRectsM(heights);
      setRects(initialRects);
      break;
    }
    case 1: {
      const initialRects = getInitialRects(heights);
      setRects(initialRects);
      break;
    }
    case 2: {
      const initialRects = getInitialRects(heights);
      setRects(initialRects);
      break;
    }
  }
    switch (algo2) {
      case 0: {
        const initialRects = getInitialRectsM(heights);
        setRects2(initialRects);
        break;
      }
      case 1: {
        const initialRects = getInitialRects(heights);
        setRects2(initialRects);
        break;
      }
      case 2: {
        const initialRects = getInitialRects(heights);
        setRects2(initialRects);
        break;
      }
  }
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
    if(val==='Merge') v = 0;
    if(val==='Quick') v = 1;
    if(val==='Heap') v =2;
    
    pos === 0 ? setAlgo1(v) : setAlgo2(v);
  }

  const handleSpeedChanged = (val: number) => {
    setSpeed(400 - val * 10);
    speedRef.current=speed;
  }

  const handleSort = async () => {
    try {
        setIsRunning(true);
        resetRef.current = false;
        console.log(rects);
        const steps1 = getStepsForAlgo(algo1, rects);
        // console.log("Steps1:", steps1);
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
  
  const getStepsForAlgo = (algo: number, arr: RectType[]|RectTypeM[]) => {
    switch (algo) {
      case 0: return mergeSort(arr) as StepM[];
      case 1: return rquickSort(arr.filter((rect): rect is RectType => 'key' in rect && 'status' in rect)) as Step[];
      case 2: return heapSort(arr.filter((rect): rect is RectType => 'key' in rect && 'status' in rect));
      default: return mergeSort(arr) as StepM[];
    }
  };
  
  const handleFirst = async (steps: unknown) => {
    setIsRunning1(true);
    const updatedRects = [...rects];
    if(algo1===0)performSortingM(steps as StepM[], updatedRects as RectTypeM[], setRects, setIsRunning1,pausedRef,resetRef,speedRef);
    else if(algo1===1)performSortingQ(steps as Step[], updatedRects as RectType[], setRects, setIsRunning1,pausedRef,resetRef,speedRef);
    else if(algo1===2)performSortingH(steps as StepH[], updatedRects, setRects, setIsRunning1,pausedRef,resetRef,speedRef);
  };
  
  const handleSecond = async (steps: unknown ) => {
    setIsRunning2(true);
    const updatedRects2 = [...rects2];
    if(algo1===0)performSortingM(steps as StepM[], updatedRects2 as RectTypeM[], setRects, setIsRunning1,pausedRef,resetRef,speedRef);
    else if(algo1===1)performSortingQ(steps as Step[], updatedRects2 as RectType[], setRects, setIsRunning1,pausedRef,resetRef,speedRef);
    else if(algo1===2)performSortingH(steps as StepH[], updatedRects2, setRects, setIsRunning1,pausedRef,resetRef,speedRef);
  };

  const performSortingQ = async (
    steps: Step[],
    updatedRects: RectType[],
    setRects: React.Dispatch<React.SetStateAction<RectType[]>>,
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
    pausedRef: React.MutableRefObject<boolean>,
    resetRef: React.MutableRefObject<boolean>,
    speedRef: React.MutableRefObject<number>
  ) => {
    setIsRunning(true);
  
    let hasChanged = -1;
    let changed: Step | null = null;
  
    // Reset rects state
    for (let j = 0; j < updatedRects.length; j++) {
      updatedRects[j] = { ...updatedRects[j], isLeft: false, isSorting: false, isRight: false, isRange: false, isSorted: false };
    }
    setRects([...updatedRects]);
  
    for (let i = 0; i < steps.length; i++) {
      if (resetRef.current) {
        console.log("QuickSort reset at step:", i);
        return;
      }
  
      while (pausedRef.current) {
        console.log("QuickSort paused");
        await new Promise(resolve => setTimeout(resolve, 100));
      }
  
      const step = steps[i];
  
      // Clear previous highlights if there was a change
      if (hasChanged !== -1 && changed) {
        const { left, right } = changed;
        updatedRects[left] = { ...updatedRects[left], isLeft: false, isSorting: false, isRight: false, isRange: false };
        updatedRects[right] = { ...updatedRects[right], isLeft: false, isSorting: false, isRight: false, isRange: false };
      }
  
      if (step.changedRange) {
        await new Promise(resolve => setTimeout(resolve, speedRef.current * 4));
        const { left, right } = step;
  
        for (let j = 0; j < updatedRects.length; j++) {
          updatedRects[j] = { ...updatedRects[j], isLeft: false, isSorting: false, isRight: false, isRange: false };
        }
  
        for (let j = left; j <= right; j++) {
          updatedRects[j] = { ...updatedRects[j], isLeft: false, isSorting: false, isRight: true, isRange: true };
        }
  
        setRects([...updatedRects]);
        await new Promise(resolve => setTimeout(resolve, speedRef.current * 4));
  
        for (let j = 0; j < updatedRects.length; j++) {
          updatedRects[j] = { ...updatedRects[j], isLeft: false, isSorting: false, isRight: false };
        }
      } else if (step.swap) {
        const { left, right } = step;
        updatedRects[left] = { ...updatedRects[left], isLeft: false, isSorting: true, isRight: false, isRange: false };
        updatedRects[right] = { ...updatedRects[right], isLeft: true, isSorting: false, isRight: false, isRange: false };
  
        // Swap rects
        [updatedRects[left], updatedRects[right]] = [updatedRects[right], updatedRects[left]];
        hasChanged = 1;
        changed = step;
      }
  
      setRects([...updatedRects]);
      await new Promise(resolve => setTimeout(resolve, speedRef.current));
  
      if (i === steps.length - 1) {
        // Mark as sorted
        for (let j = 0; j < updatedRects.length; j++) {
          updatedRects[j] = { ...updatedRects[j], isLeft: false, isSorting: false, isRight: false, isSorted: false, isRange: false };
        }
        setRects([...updatedRects]);
  
        for (let j = 0; j < updatedRects.length; j++) {
          updatedRects[j] = { ...updatedRects[j], isLeft: false, isSorting: false, isRight: false, isSorted: true, isRange: false };
          updateRects([...updatedRects]);
          await new Promise(resolve => setTimeout(resolve, 10));
        }
  
        setIsRunning(false);
      }
    }
  };
  

  

const performSortingM = async (
    steps: StepM[],
    updatedRects: RectTypeM[],
    updateRects: React.Dispatch<React.SetStateAction<RectTypeM[]>>,
    setIsRunning: React.Dispatch<React.SetStateAction<boolean>>,
    pausedRef: React.MutableRefObject<boolean>,
    resetRef: React.MutableRefObject<boolean>,
    speedRef: React.MutableRefObject<number>
) => {
    console.log("Steps:", steps);

    for (let i = 0; i < steps.length; i++) {
        if (resetRef.current) {
            console.log("Reset triggered at step", i);
            return;
        }

        while (pausedRef.current) {
            console.log("Paused");
            await new Promise(resolve => setTimeout(resolve, 100));
        }

        const step = steps[i];
        // Reset previous rectangle states
        updatedRects = updatedRects.map(rect => ({
            ...rect,
            isLeft: false,
            isSorting: false,
            isRight: false,
        }));

        // Set rectangles in the left and right ranges of the current step
        for (let j = step.left; j <= step.mid; j++) {
            updatedRects[j] = { ...updatedRects[j], isLeft: true, isSorting: false };
        }
        for (let j = step.mid + 1; j <= step.right; j++) {
            updatedRects[j] = { ...updatedRects[j], isRight: true, isSorting: false };
        }
        updateRects([...updatedRects]);
        await new Promise(resolve => setTimeout(resolve, speedRef.current * 3));

        // Update each rectangle in the range with the sorted values
        for (let j = step.left; j <= step.right; j++) {
            updatedRects[j] = { ...updatedRects[j], width: step.val[j - step.left].width, isSorting: true };
            updateRects([...updatedRects]);
            await new Promise(resolve => setTimeout(resolve, speedRef.current));
        }

        // If it's the last step, mark all rectangles as sorted
        if (i === steps.length - 1) {
            updatedRects = updatedRects.map(rect => ({ ...rect, isSorted: true, isLeft: false, isRight: false, isSorting: false }));
            updateRects([...updatedRects]);
            await new Promise(resolve => setTimeout(resolve, speedRef.current));
        }

        updateRects([...updatedRects]);
        await new Promise(resolve => setTimeout(resolve, speedRef.current));
    }

    setIsRunning(false);
};

  const togglePause = () => {
    setPaused((prev=>{
      pausedRef.current = !prev;
      return !prev;
    }));
  };
  
  const handleReset = ()=>{
    resetRef.current = true;
    setPaused(false);
    pausedRef.current = false;

    setIsRunning(false);
    setIsRunning1(false);
    setIsRunning2(false);

    setTimeout(() => {
      handleRandomize();
    },100)

  }

  return (
    <div>
      <Navbar />
      <div className="bg-gray-400 text-white h-12 text-center items-center text-2xl p-1">Recursive Sorting Visualizer</div>
      <Values 
        disabled={isRunning||isRunning1||isRunning2}
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
        onReset={handleReset}
        ispaused={paused}
        togglePause={togglePause}
        recursive={true}
      />
      <Rects speed={speed} rects={rects} />
      {doubles && <Rects speed={speed} rects={rects2} />}
      
    </div>
  );
};


const getInitialRects = (heights: number[]): RectType[] => {
  return Array.from({ length: heights.length }, (_, i) => ({ 
    key: `rect-${i}`,
    status: '',
    height: heights[i],
    width: 20, // or any appropriate value
    isSorted: false,
    isSorting: false,
  }));
};

const getInitialRectsM = (heights: number[]): RectTypeM[] => {
  return Array.from({ length: heights.length }, (_, i) => ({
    height: heights[i],
    width: 20,
    isLeft: false,
    isSorting: false,
    isRight: false,
    isRange: false,
    isSorted: false,
  }));
}

export default RecursiveSort;
