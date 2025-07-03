import axios from 'axios';

const api_key = "5e6bf8cc16af41fb9ac20319250605";
const api_url = "https://api.weatherapi.com/v1";

export const fetchWeatherData = async(query) => {
    try {
        const response = await axios.get(`${api_url}/forecast.json?key=${api_key}&q=${query}&days=1`);
        return { data: response.data, error: null };
    } catch (err) {
        return { data: null, error: "There was an error or the city was not found." };
    }
};

export const fetchLocationSuggestions = async(query) => {
    if (query.length < 2) return [];

    try {
        const response = await axios.get(`${api_url}/search.json?key=${api_key}&q=${query}`);
        return response.data;
    } catch (err) {
        console.error("Error fetching suggestions:", err);
        throw new Error("Failed to fetch location suggestions");
    }
};

export const getCurrentLocationWeather = () => {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async(position) => {
                    const { latitude, longitude } = position.coords;
                    const query = `${latitude},${longitude}`;
                    const { data, error } = await fetchWeatherData(query);
                    if (error) reject(error);
                    else resolve(data);
                },
                (error) => {
                    reject("Unable to retrieve your location.");
                }
            );
        } else {
            reject("Geolocation not supported by this browser.");
        }
    });
};