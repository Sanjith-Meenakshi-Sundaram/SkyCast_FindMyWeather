import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Weather = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const city = location.state?.city;
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiKey = "ceb524d68253e9663148fcff19687ae7";
  useEffect(() => {
    if (!city) {
      navigate('/');
      return;
    }
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
        );
        setWeather(res.data);
      } catch (error) {
        alert('Failed to fetch weather. Try again.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchWeather();
  }, [city, navigate]);
  const fahrenheit = useMemo(() => {
    if (!weather) return null;
    return (weather.main.temp * 9) / 5 + 32;
  }, [weather]);

  return (
    <div className="container">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        weather && (
          <div className="card">
            <h2>Weather in {weather.name}</h2>
            <p>Temp: {weather.main.temp}°C / {fahrenheit.toFixed(2)}°F</p>
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <p>Condition: {weather.weather[0].description}</p>
            <button onClick={() => navigate('/')}>Search Again</button>
          </div>
        )
      )}
    </div>
  );
};
export default Weather;
