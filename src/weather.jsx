import React, { useState } from 'react';
import axios from 'axios';
import MapComponent from './MapComponent';
import './utility/Weather.css';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapPosition, setMapPosition] = useState([51.505, -0.09]); // Default London position

  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || '6df1484b343249fe945185240252803';

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );
      setWeather(response.data);
      // Update map position with the city's coordinates
      setMapPosition([response.data.location.lat, response.data.location.lon]);
    } catch (err) {
      setError(err.response?.data?.error?.message || "City not found");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      
      <div className="search-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button onClick={fetchWeather}>
          {loading ? 'Loading...' : 'Search'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {weather && (
        <>
          <div className="weather-info">
            <h2>{weather.location.name}, {weather.location.country}</h2>
            <div className="weather-main">
              <img 
                src={`https:${weather.current.condition.icon}`} 
                alt={weather.current.condition.text} 
              />
              <p className="temp">{weather.current.temp_c}°C</p>
            </div>
            <p className="description">{weather.current.condition.text}</p>
          </div>

          <MapComponent 
            position={mapPosition}
            cityName={weather.location.name}
            country={weather.location.country}
          />
        </>
      )}
    </div>
  );
}

export default Weather;