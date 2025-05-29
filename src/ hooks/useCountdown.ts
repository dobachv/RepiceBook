import { useState, useEffect } from 'react';

export function useCountdown(seconds: number, onComplete: () => void) {
  const [secondsLeft, setSecondsLeft] = useState(seconds);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
     let timerId: NodeJS.Timeout;
    if (isActive && secondsLeft > 0){
     timerId = setTimeout(() => setSecondsLeft(prev => prev - 1), 1000);
    } else if (secondsLeft === 0 && isActive) {
      onComplete();
      setIsActive(false);
    }

    return () => clearTimeout(timerId);
  }, [isActive, secondsLeft, onComplete]);

  const start = () => {
    setSecondsLeft(seconds);
    setIsActive(true);
  }

  return { secondsLeft, start, isActive };
}