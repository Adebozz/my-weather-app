import axios from 'axios';

// Base URL for the weather API (ensure this matches the API you're using)
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

// Function to fetch weather data for a given location
export const fetchWeather = async (location: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, { // Adjusted endpoint for OpenWeatherMap
      params: {
        q: location, // The location to fetch weather for
        appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY, // Your API key
        units: 'metric', // Optional: can be 'metric', 'imperial', or leave out for default
      },
    });
    return response.data; // Return the weather data
  } catch (error) {
    console.error('Error fetching weather data:', error);
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error(`The location "${location}" is not valid.`);
    } else {
      throw new Error('An error occurred while fetching weather data. Please try again.');
    }
  }
};