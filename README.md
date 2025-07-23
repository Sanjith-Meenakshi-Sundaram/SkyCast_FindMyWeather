# SkyCast - Find My Weather
## Date: 23/07/2025
## Objective:
To build a responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API. This project demonstrates the use of Axios for API calls, React Router for navigation, React Hooks for state management, controlled components with validation, and basic styling with CSS.
## Tasks:

#### 1. Project Setup
Initialize React app.

Install necessary dependencies: npm install axios react-router-dom

#### 2. Routing
Set up BrowserRouter in App.js.

Create two routes:

/ – Home page with input form.

/weather – Page to display weather results.

#### 3. Home Page (City Input)
Create a controlled input field for the city name.

Add validation to ensure the input is not empty.

On valid form submission, navigate to /weather and store the city name.

#### 4. Weather Page (API Integration)
Use Axios to fetch data from the OpenWeatherMap API using the city name.

Show temperature, humidity, wind speed, and weather condition.

Convert and display temperature in both Celsius and Fahrenheit using useMemo.

#### 5. React Hooks
Use useState for managing city, weather data, and loading state.

Use useEffect to trigger the Axios call on page load.

Use useCallback to optimize form submit handler.

Use useMemo for temperature conversion logic.

#### 6. UI Styling (CSS)
Create a responsive and clean layout using CSS.

Style form, buttons, weather display cards, and navigation links.

## Programs:
```
Home.jsx

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('City name cannot be empty');
      return;
    }
    setError('');
    navigate('/weather', { state: { city } });
  }, [city, navigate]);

  return (
    <div className="container">
      <h1>SkyCast</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};
export default Home;

```
```
Weather_page.jsx

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

```
```
CSS

body{
  font-family: 'Segoe UI', sans-serif;
  background: #f0f4f8;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}
.container{
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 90%;
  max-width: 400px;
}
form{
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
input{
  padding: 0.75rem;
  width: 100%;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
button{
  padding: 0.75rem;
  background-color: #0077b6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}
button:hover{
  background-color: #005f87;
}
.card{
  background: #ffffff;
  border-radius: 10px;
  padding: 1.5rem;
  margin-top: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: left;
}
.error{
  color: red;
  margin-top: 0.5rem;
}


```

## Output:
<img width="1326" height="836" alt="image" src="https://github.com/user-attachments/assets/6a79f6ba-f440-4d2c-89e3-68f4fd189595" />


## Result:
A responsive single-page application using React that allows users to enter a city name and retrieve real-time weather information using the OpenWeatherMap API has been built successfully. 
=======
