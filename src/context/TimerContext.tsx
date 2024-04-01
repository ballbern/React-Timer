import {
  useContext,
  createContext,
  useState,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
  useMemo,
} from "react";
import beepSound from "../assets/sounds/beep-sound.mp3";
import beepSound2 from "../assets/sounds/beep-sound-2.wav";

export type TimerProviderProps = {
  children: ReactNode;
};

export type TimerProps = {
  timeRemaining: number;
  isRunning: boolean;
  startTime: number;
  hours: string;
  minutes: string;
  seconds: string;
  isLastTen: boolean;
  startTimer: () => void;
  stopTimer: () => void;
  resetTimer: () => void;
  setStartTime: Dispatch<SetStateAction<number>>;
  setTimeRemaining: Dispatch<SetStateAction<number>>;
  setCountdown: Dispatch<SetStateAction<number>>;
};

const TimerContext = createContext({} as TimerProps);

// eslint-disable-next-line react-refresh/only-export-components
export const useTimer = () => {
  return useContext(TimerContext);
};

export const TimerProvider = ({ children }: TimerProviderProps) => {
  const [startTime, setStartTime] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(startTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isLastTen, setIsLastTen] = useState(false);
  const [countDown, setCountdown] = useState(10);

  const audio = useMemo(() => new Audio(beepSound), []);
  const audio2 = useMemo(() => new Audio(beepSound2), []);

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev > 0) {
            if (prev <= countDown + 1 && prev > 1) {
              setIsLastTen(true);
              audio.play();
            }
            if (prev === 1) {
              audio2.play();
            }
            return prev - 1;
          } else {
            setIsRunning(false);
            setIsLastTen(false);
            return prev;
          }
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [audio, audio2, countDown, isRunning]);

  const startTimer = () => {
    if (timeRemaining === 0) {
      setTimeRemaining(startTime);
    }
    setIsRunning(true);
  };

  const stopTimer = () => setIsRunning(false);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeRemaining(0);
    setStartTime(0);
    setIsLastTen(false);
  };

  return (
    <TimerContext.Provider
      value={{
        timeRemaining,
        isRunning,
        startTime,
        hours: Math.floor(timeRemaining / 3600)
          .toString()
          .padStart(2, "0"),
        minutes: Math.floor((timeRemaining % 3600) / 60)
          .toString()
          .padStart(2, "0"),
        seconds: (timeRemaining % 60).toString().padStart(2, "0"),
        isLastTen,
        setTimeRemaining,
        startTimer,
        stopTimer,
        resetTimer,
        setStartTime,
        setCountdown,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
};
