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
  const getStatusClass = (status: string) => {
    if (status === "issorted" || rect.isSorted) return "bg-green-500";
    if (status === "issorting") return "bg-red-400";
    return "bg-blue-900";
  };

  return (
    <div
      className={`${getStatusClass(rect.status)} w-5`}
      style={{
        height: `${rect.height}px`,  // Dynamic height as inline style
        margin: `${margin}px`,        // Dynamic margin as inline style
      }}
    />
  );
};

export default Rect;
