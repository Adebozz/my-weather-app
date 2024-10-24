import axios from 'axios';

const BASE_URL = 'https://api.weatherapi.com/v1';

export const fetchWeather = async (location: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/current.json`, {
      params: {
        key: process.env.NEXT_PUBLIC_WEATHER_API_KEY, // Adjusted for WeatherAPI
        q: location,
        aqi: 'no', // Optional: include AQI data or not
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    if (axios.isAxiosError(error) && error.response?.status === 400) {
      throw new Error(`The location "${location}" is not valid.`);
    } else {
      throw new Error('An error occurred while fetching weather data. Please try again.');
    }
  }
};
