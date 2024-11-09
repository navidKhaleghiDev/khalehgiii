import { useEffect, useState } from 'react';

export function ProgressBar({ durationInSeconds = 30 }) {
  const [progress, setProgress] = useState(0);
  const intervalDuration = (durationInSeconds * 1000) / 100; // Divide durationInSeconds by 100 to get the interval duration

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + 1;
      });
    }, intervalDuration);

    return () => {
      clearInterval(timer);
    };
  }, [intervalDuration]);

  return (
    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-lg">
      <div
        className="bg-teal-500 p-0.5 text-center text-xs font-medium leading-none text-primary-100 rounded-lg"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
}
