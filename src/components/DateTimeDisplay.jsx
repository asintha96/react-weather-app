import { useState, useEffect } from 'react';

const DateTimeDisplay = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="text-white text-center mb-4">
      <p className="text-xl font-light">{time.toLocaleTimeString()}</p>
      <p className="text-sm font-light">
        {time.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
      </p>
    </div>
  );
};

export default DateTimeDisplay;