"use client";

import { useEffect, useState } from "react";

export default function Loading() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="content-center fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
      <svg className="h-24 w-24 animate-spin text-white" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <h2 className="mt-4 text-3xl font-bold text-white">STEAMer Academy</h2>
      <p className="mt-2 text-lg text-white">Igniting young minds</p>
      <div className="mt-8 h-2 w-64 rounded-full bg-white bg-opacity-20">
        <div
          className="h-full rounded-full bg-white transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="mt-2 text-white">{Math.round(progress)}%</p>
    </div>
  );
}
