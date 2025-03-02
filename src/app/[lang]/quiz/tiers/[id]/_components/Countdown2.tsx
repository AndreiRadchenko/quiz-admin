import React from 'react';

export default function Countdown2() {
  return (
    // <!-- Circular Progress -->
    <div className="relative size-45">
      <svg
        className="size-full -rotate-90"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <!-- Background Circle --> */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-muted dark:text-neutral-700"
          strokeWidth="1"
        ></circle>
        {/* <!-- Progress Circle --> */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-blue-600 dark:text-blue-500"
          strokeWidth="1"
          stroke-dasharray="100"
          stroke-dashoffset="65"
          strokeLinecap="round"
        ></circle>
      </svg>

      {/* <!-- Percentage Text --> */}
      <div className="absolute top-1/2 start-1/2 transform -translate-y-1/2 -translate-x-1/2">
        <span className="text-center text-2xl font-bold text-foreground dark:text-blue-500">
          10 sec
        </span>
      </div>
    </div>
    // <!-- End Circular Progress -->
  );
}
