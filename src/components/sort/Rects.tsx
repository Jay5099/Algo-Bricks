import Rect from './Rect';
import React from 'react'
import FlipMove from 'react-flip-move';

interface RectType {
  key: string;
  status: string;
  height: number;
  width: number;
  isSorted: boolean;
  isSorting: boolean;
}

interface RectsProps {
  rects: RectType[]; 
  speed: number;     
}

const Rects: React.FC<RectsProps> = ({ rects, speed }) => {
  
  const margin = rects.length > 20 ? 2 : 5;  
  
  return (
    <div className="flex justify-center items-end h-full p-4 " >
      
      <FlipMove 
        key={rects.length} 
        className="flex justify-center items-end bg-slate-200 p-5 rounded-md"
        duration={speed}
        >
      {rects.map((rect) => (
        <React.Fragment key={rect.key}>
          <Rect key={rect.key} rect={rect} margin={margin} />
        </React.Fragment>
      ))}
    </FlipMove>
    </div>
  );
};

export default Rects;
