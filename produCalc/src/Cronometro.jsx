import React, { useState, useEffect, useRef } from "react";
import PauseIcon from '@mui/icons-material/Pause';
import PlayIcon from '@mui/icons-material/PlayArrow';
import RefreshIcon from '@mui/icons-material/Refresh';

const Cronometro = ({ onTimeChange }) => {
  const [time, setTime] = useState(0); // Tiempo en segundos
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const toggleStartPause = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
    } else {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => {
          const newTime = prevTime + 1;
          onTimeChange(newTime / 3600); // Convertir segundos a horas y enviar al componente padre
          return newTime;
        });
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setTime(0);
    setIsRunning(false);
    onTimeChange(0); // Reiniciar el valor del tiempo en horas
  };

  useEffect(() => {
    const now = new Date();
    const timeToMidnight = 
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0) - now;

    const midnightTimeout = setTimeout(() => {
      handleReset();
    }, timeToMidnight);

    return () => clearTimeout(midnightTimeout);
  }, [time]);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div>
      <h1>{formatTime(time)}</h1>
      <button onClick={toggleStartPause}>
        {isRunning ? <PauseIcon/> : <PlayIcon/>}
      </button>
      <button onClick={handleReset}><RefreshIcon/></button>
    </div>
  );
};

export default Cronometro;
