import { useState, useRef, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HourlyForecast = ({ hourlyData, isDay }) => {
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

  const formatTime = (timeString) => {
    const time = timeString.split(' ')[1];
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12} ${ampm}`;
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-3 py-4 overflow-x-auto scrollbar-hide px-2"
        style={{ scrollBehavior: 'smooth' }}
      >
        {hourlyData.map((hour, index) => (
          <div
            key={index}
            className={`flex flex-col items-center backdrop-blur-sm ${isDay ? 'bg-white/20' : 'bg-white/10'} rounded-xl py-3 px-4 min-w-[100px] transition-all duration-300 hover:bg-white/30 border border-white/10`}
          >
            <p className="text-sm font-medium">{formatTime(hour.time)}</p>
            <img
              src={hour.condition.icon}
              alt={hour.condition.text}
              className="w-10 h-10 mx-auto my-1"
            />
            <p className="text-sm font-semibold">{Math.round(hour.temp_c)}°</p>
            <p className="text-xs opacity-80 mt-1">{hour.chance_of_rain}%</p>
          </div>
        ))}
      </div>

      {canScrollLeft && (
        <button
          onClick={scrollLeft}
          aria-label="Scroll Left"
          className="absolute left-0 top-1/2 backdrop-blur-sm bg-white/30 text-white transform -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/40 border border-white/20"
        >
          <FaChevronLeft className="w-3" />
        </button>
      )}

      {canScrollRight && (
        <button
          onClick={scrollRight}
          aria-label="Scroll Right"
          className="absolute right-0 top-1/2 backdrop-blur-sm bg-white/30 text-white transform -translate-y-1/2 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white/40 border border-white/20"
        >
          <FaChevronRight className="w-3" />
        </button>
      )}
    </div>
  );
};

export default HourlyForecast;