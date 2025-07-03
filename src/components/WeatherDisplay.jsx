import WeatherStats from './WeatherStats';
import HourlyForecast from './HourlyForecast';

const WeatherDisplay = ({ weatherData }) => {
  return (
    <div className="text-white">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-medium">{weatherData.location.name}</h2>
        <p className="text-sm opacity-80">{weatherData.location.region}, {weatherData.location.country}</p>
        
        <div className="flex justify-center items-center my-4">
          <img 
            src={weatherData.current.condition.icon} 
            className="h-24 w-24" 
            alt={weatherData.current.condition.text} 
          />
          <span className="text-5xl font-light ml-2">
            {Math.round(weatherData.current.temp_c)}°
          </span>
        </div>
        
        <p className="text-lg capitalize">{weatherData.current.condition.text}</p>
        <p className="text-sm opacity-80">
          Feels like {Math.round(weatherData.current.feelslike_c)}° • 
          H: {Math.round(weatherData.forecast.forecastday[0].day.maxtemp_c)}° • 
          L: {Math.round(weatherData.forecast.forecastday[0].day.mintemp_c)}°
        </p>
      </div>

      <WeatherStats weatherData={weatherData} />

      <div className="backdrop-blur-sm bg-white/20 rounded-2xl p-4">
        <h3 className="text-lg font-medium mb-3">Hourly Forecast</h3>
        <HourlyForecast 
          hourlyData={weatherData.forecast.forecastday[0].hour} 
          isDay={weatherData.current.is_day}
        />
      </div>
    </div>
  );
};

export default WeatherDisplay;