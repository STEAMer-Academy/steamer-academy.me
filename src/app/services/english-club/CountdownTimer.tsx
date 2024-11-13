"use client";

import { useEffect } from "react";
import { useQueryState } from "nuqs";

interface Time {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useQueryState<Time>("timeLeft", {
    defaultValue: {
      days: 3,
      hours: 12,
      minutes: 30,
      seconds: 22,
    },
    parse: (value) => JSON.parse(value),
    serialize: (value) => JSON.stringify(value),
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime: Time) => {
        const newTime = { ...prevTime };
        if (newTime.seconds > 0) {
          newTime.seconds--;
        } else if (newTime.minutes > 0) {
          newTime.minutes--;
          newTime.seconds = 59;
        } else if (newTime.hours > 0) {
          newTime.hours--;
          newTime.minutes = 59;
          newTime.seconds = 59;
        } else if (newTime.days > 0) {
          newTime.days--;
          newTime.hours = 23;
          newTime.minutes = 59;
          newTime.seconds = 59;
        } else {
          clearInterval(timer);
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [setTimeLeft]);

  return (
    <div className="align-center mb-4 flex items-center justify-center gap-4 text-center">
      <span className="font-bold">{timeLeft.days} Days</span>
      <span className="font-bold">{timeLeft.hours} Hours</span>
      <span className="font-bold">{timeLeft.minutes} Minutes</span>
      <span className="font-bold">{timeLeft.seconds} Seconds Left</span>
    </div>
  );
}
