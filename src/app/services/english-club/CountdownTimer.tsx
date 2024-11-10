"use client";

import { useState, useEffect } from "react";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 30,
    seconds: 22,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime.seconds > 0) {
          return { ...prevTime, seconds: prevTime.seconds - 1 };
        } else if (prevTime.minutes > 0) {
          return { ...prevTime, minutes: prevTime.minutes - 1, seconds: 59 };
        } else if (prevTime.hours > 0) {
          return {
            ...prevTime,
            hours: prevTime.hours - 1,
            minutes: 59,
            seconds: 59,
          };
        } else if (prevTime.days > 0) {
          return {
            ...prevTime,
            days: prevTime.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        } else {
          clearInterval(timer);
          return prevTime;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="align-center mb-4 flex items-center justify-center gap-4 text-center">
      <span className="font-bold">{timeLeft.days} Days</span>
      <span className="font-bold">{timeLeft.hours} Hours</span>
      <span className="font-bold">{timeLeft.minutes} Minutes</span>
      <span className="font-bold">{timeLeft.seconds} Seconds Left</span>
    </div>
  );
}
