
import React from 'react';

interface ProgressBarProps {
  value: number; // value between 0 and 100
}

const ProgressBar = ({ value }: ProgressBarProps) => {
  const clampedValue = Math.max(0, Math.min(100, value));

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="bg-secondary h-2.5 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${clampedValue}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
