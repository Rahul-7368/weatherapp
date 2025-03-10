import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    onSearch(city);
  }

  return (
    <div className='search-bar'>
      <input type="text" value={city} placeholder='Enter city name' onChange={(e) => setCity(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

function WeatherDisplay({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city) {
      setLoading(true);
      axios.get("https://api.weatherapi.com/v1/current.json", {
        params: {
          key: "5f1dff4c3092481f8fc94259240305",
          q: city,
        },
      }).then(res => {
        setWeatherData(res.data);
      }).catch(err => {
        console.error("Error fetching data");
        alert("Failed to fetch weather data");
      }).finally(() => {
        setLoading(false);
      });
    }
  }, [city]);

  const WeatherCard = ({ title, data }) => {
    return (
      <div className='weather-card'>
        <h3>{title}</h3>
        <p>{data}</p>
      </div>
    );
  };

  return (
    <div className='weather-display'>
      {loading && <p>Loading data...</p>}
      {!loading && weatherData && (
        <div className='weather-cards'>
          <WeatherCard title="Temperature" data={`${weatherData.current.temp_c}°C`} />
          <WeatherCard title="Humidity" data={`${weatherData.current.humidity}%`} />
          <WeatherCard title="Condition" data={`${weatherData.current.condition.text}`} />
          <WeatherCard title="Wind Speed" data={`${weatherData.current.wind_kph} kph`} />
        </div>
      )}
    </div>
  );
}

function App() {
  const [city, setCity] = useState("");

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  }

  return (
    <div className='container'>
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay city={city} />
    </div>
  );
}

export default App;



