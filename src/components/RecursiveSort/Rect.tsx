import React from "react";

interface RectType {
  key: string;
  status: string;
  height: number;
  width: number;
  isSorted: boolean;
  isSorting: boolean;
}

interface RectProps {
  rect: RectType;
  margin: number;
}

const Rect: React.FC<RectProps> = ({ rect, margin }) => {
  const getStatusClass = () => {
    // if(rect.isSorting)console.log(rect);
    if (rect.isSorted) return "bg-green-500";
    else if (rect.isSorting) return "bg-red-400";
    return "bg-blue-900";
  };

  return (
    <div
      className={`${getStatusClass()} w-5`}
      style={{
        height: `${rect.height}px`,  // Dynamic height as inline style
        margin: `${margin}px`,        // Dynamic margin as inline style
      }}>
        {/* {rect.height} */}
    </div>
  );
};

export default Rect;
