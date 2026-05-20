import React, { useState, useEffect } from 'react';
import { useWeather } from './WeatherContext';
import { motion } from 'framer-motion';

function MainScreen() {
  const { currentCity, favorites, toggleFavorite, isCelsius, API_KEY, apiError, setApiError } = useWeather();
  const [searchQuery, setSearchQuery] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [inputError, setInputError] = useState('');

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[a-zA-Z\s]+$/.test(value)) {
      setSearchQuery(value);
      setInputError('');
    } else {
      setInputError('Please input English letters only.');
    }
  };

  const isFavorited = favorites.some(f => f.id === currentCity.id);

  useEffect(() => {
    if (!currentCity.id) return;

    const fetchLiveDetails = async () => {
      try {
        // 1. Fetch Current Conditions
        const condRes = await fetch(`accuweather.com{currentCity.id}?apikey=${API_KEY}`);
        if (!condRes.ok) throw new Error();
        const condData = await condRes.json();

        // 2. Fetch 5-Day Forecast
        const foreRes = await fetch(`accuweather.com{currentCity.id}?apikey=${API_KEY}&metric=true`);
        if (!foreRes.ok) throw new Error();
        const foreData = await foreRes.json();

        setWeatherData({
          tempC: Math.round(condData[0].Temperature.Metric.Value),
          tempF: Math.round(condData[0].Temperature.Imperial.Value),
          condition: condData[0].WeatherText
        });

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        setForecast(foreData.DailyForecasts.map(f => ({
          day: days[new Date(f.Date).getDay()],
          temp: Math.round(f.Temperature.Maximum.Value)
        })));

      } catch (err) {
        setApiError('API call threshold limit reached or endpoint unavailable.');
      }
    };

    fetchLiveDetails();
  }, [currentCity, API_KEY, setApiError]);

  return (
    <motion.div 
      className="main-screen"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="search-bar">
        <input type="text" value={searchQuery} onChange={handleInputChange} placeholder="Search city..." />
        {(inputError || apiError) && <div className="error-toast">{inputError || apiError}</div>}
      </div>

      {weatherData && (
        <div className="weather-card">
          <div className="card-header">
            <h3>{currentCity.name}</h3>
            <button onClick={() => toggleFavorite(currentCity)}>
              {isFavorited ? '❤️ Favorited' : '🤍 Add to Favorites'}
            </button>
          </div>
          
          <h2>{isCelsius ? `${weatherData.tempC}°C` : `${weatherData.tempF}°F`}</h2>
          <h1>{weatherData.condition}</h1>

          <div className="forecast-grid">
            {forecast.map((f, i) => (
              <motion.div 
                key={i} 
                className="forecast-item"
                whileHover={{ scale: 1.05 }}
              >
                <p>{f.day}</p>
                <p>{f.temp}°</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default MainScreen;
