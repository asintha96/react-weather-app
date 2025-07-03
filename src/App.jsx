import { useState, useEffect, useRef } from 'react';
import {
  fetchWeatherData,
  fetchLocationSuggestions,
  getCurrentLocationWeather
} from './backend';
import DateTimeDisplay from './components/DateTimeDisplay';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const locationButtonRef = useRef(null);
  const inputRef = useRef(null);

  // Load weather for current location on app start
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleSearch = async (query = city) => {
    if (!query.trim()) return;
    const { data, error } = await fetchWeatherData(query);
    if (error) {
      setError(error);
      setWeatherData(null);
    } else {
      setWeatherData(data);
      setError('');
    }
    setShowSuggestions(false);
  };

  const getCurrentLocation = async () => {
  try {
    const data = await getCurrentLocationWeather();
    setWeatherData(data);
    setCity(''); 
    setError('');
  } catch (err) {
    setError(err);
    setWeatherData(null);
  }
};

  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    try {
      const data = await fetchLocationSuggestions(query);
      setSuggestions(data);
      setShowSuggestions(true);
    } catch (err) {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleCityChange = (e) => {
    setCity(e.target.value);
    fetchSuggestions(e.target.value);
  };

  const handleSuggestionClick = async (suggestion) => {
    const query = suggestion.name;
    setCity(query);
    setSuggestions([]);
    setShowSuggestions(false);
    await handleSearch(query);
    inputRef.current.focus();
  };

  const getBackground = () => {
    if (!weatherData) return 'from-blue-500 to-purple-600';
    const code = weatherData.current.condition.code;
    const isDay = weatherData.current.is_day;

    if (!isDay) return 'from-gray-900 to-blue-900';
    if (code === 1000) return 'from-blue-400 to-cyan-300';
    if (code > 1000 && code < 1030) return 'from-gray-400 to-blue-300';
    if (code >= 1063 && code <= 1201) return 'from-gray-500 to-blue-400';
    if (code >= 1204 && code <= 1237) return 'from-gray-300 to-gray-500';
    if (code >= 1240 && code <= 1264) return 'from-gray-600 to-blue-500';

    return 'from-blue-500 to-purple-600';
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getBackground()} transition-all duration-1000`}>
      <div className="backdrop-blur-md bg-white/20 shadow-xl p-6 rounded-2xl w-full max-w-md mx-4 border border-white/10">
        <DateTimeDisplay />

        <SearchBar
          city={city}
          setCity={setCity}
          handleSearch={handleSearch}
          getCurrentLocation={getCurrentLocation}
          onSuggestionClick={handleSuggestionClick}
          inputRef={inputRef}
          locationButtonRef={locationButtonRef}
        />

        {error && (
          <p className="text-white text-center mt-4 backdrop-blur-sm bg-red-500/30 rounded-full py-2">
            {error}
          </p>
        )}

        {weatherData && <WeatherDisplay weatherData={weatherData} />}
      </div>
    </div>
  );
}

export default App;
