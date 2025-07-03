import { useState, useRef, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaTimes, FaSpinner } from 'react-icons/fa';
import { fetchLocationSuggestions } from '../backend';

const SearchBar = ({ 
  city, 
  setCity, 
  handleSearch, 
  getCurrentLocation,
  onSuggestionClick,
  inputRef
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestionError, setSuggestionError] = useState(null);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const debounceTimeout = useRef(null);

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  const fetchSuggestions = async (query) => {
    if (query.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    setSuggestionError(null);

    try {
      const data = await fetchLocationSuggestions(query);
      setSuggestions(data);
      setActiveSuggestion(-1);
      setShowSuggestions(true);
    } catch (err) {
      setSuggestionError("Failed to load suggestions");
      setSuggestions([]);
      setShowSuggestions(false);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  const handleInputChange = (value) => {
    setCity(value);
    
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveSuggestion(prev => 
        Math.min(prev + 1, suggestions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveSuggestion(prev => Math.max(prev - 1, -1));
    } else if (e.key === "Enter") {
      if (activeSuggestion >= 0) {
        onSuggestionClick(suggestions[activeSuggestion]);
      } else {
        handleSearch();
      }
    }
  };

  return (
    <div className="flex mb-6 relative">
      <div className="flex backdrop-blur-sm bg-white/30 rounded-full items-center px-4 py-2 w-full">
        {isLoadingSuggestions ? (
          <FaSpinner className="h-5 w-5 text-white animate-spin" />
        ) : (
          <FaSearch className="h-5 w-5 text-white" />
        )}
        <input
          ref={inputRef}
          type="text"
          value={city}
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => city.length >= 2 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Search city..."
          className="pl-3 bg-transparent border-none focus:outline-none w-full text-white placeholder-white/70"
        />
        {city && (
          <button 
            onClick={() => {
              setCity('');
              setSuggestions([]);
              setShowSuggestions(false);
              inputRef.current.focus();
            }}
            className="text-white/70 hover:text-white"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        )}
      </div>
      <button
        onClick={getCurrentLocation}
        className="ml-2 p-2 backdrop-blur-sm bg-white/30 text-white rounded-full hover:bg-white/40 transition-colors"
      >
        <FaMapMarkerAlt className="w-5 h-5" />
      </button>

      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-1 z-10 backdrop-blur-sm bg-white/30 rounded-xl shadow-lg overflow-hidden">
          {isLoadingSuggestions ? (
            <div className="px-4 py-2 text-white flex items-center">
              <FaSpinner className="animate-spin mr-2" />
              Loading suggestions...
            </div>
          ) : suggestionError ? (
            <div className="px-4 py-2 text-white/70">{suggestionError}</div>
          ) : suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <div
                key={`${suggestion.id || index}-${suggestion.name}`}
                className={`px-4 py-2 hover:bg-white/20 cursor-pointer flex items-center ${
                  index === activeSuggestion ? 'bg-white/20' : ''
                }`}
                onClick={() => onSuggestionClick(suggestion)}
                onMouseEnter={() => setActiveSuggestion(index)}
              >
                <FaMapMarkerAlt className="text-white/70 mr-2" />
                <div>
                  <p className="text-white">{suggestion.name}</p>
                  <p className="text-xs text-white/70">
                    {suggestion.region}, {suggestion.country}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-white/70">No locations found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;