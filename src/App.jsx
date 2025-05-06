import { useState, useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import cloud from './assets/cloud.png';
import HourlyForecast from './components/HourlyForecast';
import axios from 'axios';

function App() {
  const api_key = "5e6bf8cc16af41fb9ac20319250605";
  const api_url = "https://api.weatherapi.com/v1/forecast.json";

  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState("");

  const locationButtonRef = useRef(null);

  useEffect(() => {
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
    });
  }, []);

  useEffect(() => {
    if (locationButtonRef.current) {
      locationButtonRef.current.click(); // Simulate click on load
    }
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const query = `${latitude},${longitude}`;
          fetchData(query);
        },
        (error) => {
          setError("Unable to retrieve your location.");
        }
      );
    } else {
      setError("Geolocation not supported by this browser.");
    }
  };

  const fetchData = async (query) => {
    try {
      const response = await axios.get(`${api_url}?key=${api_key}&q=${query}&days=1`);
      setWeatherData(response.data);
      setError('');
    } catch (err) {
      setError("There was an error or the city was not found.");
      setWeatherData(null);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      fetchData(city);
    }
  };

  return (
    <div className="bg-green-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg mt-10 p-5 rounded w-full max-w-sm">
        <div className="flex">
          <div className="flex border rounded items-center px-2 py-2 w-full">
            <FaSearch className="h-5 w-5 text-gray-500" />
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyUp={handleKeyPress}
              placeholder="Enter City Name"
              className="pl-2 border-none focus:outline-none w-full"
            />
          </div>
          <button
            ref={locationButtonRef}
            onClick={getCurrentLocation}
            className="px-4 py-2 bg-green-500 text-white ml-2 rounded hover:bg-green-600"
          >
            <FaMapMarkerAlt className="w-5 h-5" />
          </button>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {weatherData && (
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold">{weatherData.location.name}</h2>
            <img src={weatherData.current.condition.icon} className="mx-auto h-40" alt="weather" />
            <p className="text-lg font-semibold">{weatherData.current.temp_c} °C</p>
            <p className="text-sm capitalize font-semibold">{weatherData.current.condition.text}</p>

            <HourlyForecast hourlyData={weatherData.forecast.forecastday[0].hour} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
