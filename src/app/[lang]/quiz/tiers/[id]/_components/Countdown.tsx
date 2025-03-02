import React from 'react';

export default function Countdown() {
  return (
    <div className="relative size-40">
      <svg
        className="rotate-[135deg] size-full"
        viewBox="0 0 36 36"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* <!-- Background Circle (Gauge) --> */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-gray-200 dark:text-neutral-700"
          stroke-width="1.5"
          stroke-dasharray="75 100"
          stroke-linecap="round"
        ></circle>

        {/* <!-- Gauge Progress --> */}
        <circle
          cx="18"
          cy="18"
          r="16"
          fill="none"
          className="stroke-current text-blue-600 dark:text-blue-500"
          stroke-width="1.5"
          stroke-dasharray="37.5 100"
          stroke-linecap="round"
        ></circle>
      </svg>

      {/* <!-- Value Text --> */}
      <div
        className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2
          text-center"
      >
        <span className="text-4xl font-bold text-blue-600 dark:text-blue-500">
          50
        </span>
        <span className="text-blue-600 dark:text-blue-500 block">Score</span>
      </div>
    </div>
  );
}
