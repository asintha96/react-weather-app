import React, { useRef, useState, useEffect } from 'react';
import './HourlyForecast.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function HourlyForecast({ hourlyData }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
  };

  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -scrollRef.current.offsetWidth * 0.8,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: scrollRef.current.offsetWidth * 0.8,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateScrollButtons);
      updateScrollButtons();
    }

    return () => container?.removeEventListener('scroll', updateScrollButtons);
  }, []);

  return (
    <div className="mt-6 relative">
      <div
        ref={scrollRef}
        className="flex gap-4 mx-10 py-2 overflow-x-auto scrollbar-hide"
        style={{ scrollBehavior: 'smooth' }}
      >
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className="flex flex-col items-center shadow-lg bg-green-100 py-2 rounded px-4 min-w-[80px]"
          >
            <p className="text-sm">{hour.time.split(' ')[1]}</p>
            <img
              src={hour.condition.icon}
              alt="weather icon"
              className="w-10 mx-auto"
            />
            <p className="text-sm">{hour.temp_c}°C</p>
          </div>
        ))}
      </div>

      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          aria-label="Scroll Left"
          role="button"
          className="absolute left-2 top-1/2 bg-green-500 text-white transform -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-600"
        >
          <FaChevronLeft className="w-4" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={scrollRight}
          aria-label="Scroll Right"
          role="button"
          className="absolute right-2 top-1/2 bg-green-500 text-white transform -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-green-600"
        >
          <FaChevronRight className="w-4" />
        </button>
      )}
    </div>
  );
}

export default HourlyForecast;
