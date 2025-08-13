import { useState, useEffect } from 'react';
import { Thermometer, Droplets, Sun, Cloud } from 'lucide-react';

export const useWeatherData = () => {
  const [weatherData, setWeatherData] = useState([
    { label: 'Temperature', value: 28, unit: '°C', icon: Thermometer, bgcolor1: 'from-orange-50', bgcolor2: 'to-orange-100', color: 'text-orange-500', min: 15, max: 40, step: 1 },
    { label: 'Humidity', value: 65, unit: '%', icon: Droplets, bgcolor1: 'from-blue-50', bgcolor2: 'to-blue-100', color: 'text-blue-500', min: 20, max: 100, step: 2 },
    { label: 'UV Index', value: 7.2, unit: '', icon: Sun, bgcolor1: 'from-yellow-50', bgcolor2: 'to-yellow', color: 'text-yellow-500', min: 0, max: 11, step: 0.3 },
    { label: 'Rainfall', value: 12, unit: 'mm', icon: Cloud, bgcolor1: 'from-gray-50', bgcolor2: 'to-gray-100', color: 'text-gray-500', min: 0, max: 50, step: 1 }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setWeatherData(prev =>
        prev.map(stat => {
          const change = (Math.random() * (stat.step * 2)) - stat.step;
          const newValue = Math.min(stat.max, Math.max(stat.min, stat.value + change));
          return { ...stat, value: newValue };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return weatherData;
};
