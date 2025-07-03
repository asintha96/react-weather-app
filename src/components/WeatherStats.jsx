import { WiHumidity } from 'react-icons/wi';
import { BsDropletHalf, BsSunrise, BsSunset } from 'react-icons/bs';
import { FaWind, FaEye } from 'react-icons/fa';

const WeatherStats = ({ weatherData }) => {
 
  const formatTime = (timeStr) => {
    return timeStr; 
   
  };

  return (
    <div className="backdrop-blur-sm bg-white/20 rounded-2xl p-4 mb-6 grid grid-cols-3 gap-4">
      <div className="text-center">
        <FaWind className="mx-auto text-lg" />
        <p className="text-sm mt-1">{weatherData.current.wind_kph} km/h</p>
        <p className="text-xs opacity-70">Wind</p>
      </div>
      <div className="text-center">
        <WiHumidity className="mx-auto text-2xl" />
        <p className="text-sm mt-1">{weatherData.current.humidity}%</p>
        <p className="text-xs opacity-70">Humidity</p>
      </div>
      <div className="text-center">
        <BsDropletHalf className="mx-auto text-lg" />
        <p className="text-sm mt-1">{weatherData.current.precip_mm}mm</p>
        <p className="text-xs opacity-70">Precip</p>
      </div>
      <div className="text-center">
        <FaEye className="mx-auto text-lg" />
        <p className="text-sm mt-1">{weatherData.current.vis_km} km</p>
        <p className="text-xs opacity-70">Visibility</p>
      </div>
      <div className="text-center">
        <BsSunrise className="mx-auto text-lg" />
        <p className="text-sm mt-1">
          {formatTime(weatherData.forecast.forecastday[0].astro.sunrise)}
        </p>
        <p className="text-xs opacity-70">Sunrise</p>
      </div>
      <div className="text-center">
        <BsSunset className="mx-auto text-lg" />
        <p className="text-sm mt-1">
          {formatTime(weatherData.forecast.forecastday[0].astro.sunset)}
        </p>
        <p className="text-xs opacity-70">Sunset</p>
      </div>
    </div>
  );
};

export default WeatherStats;