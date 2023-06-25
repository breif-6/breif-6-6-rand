import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apikey = '325492954b6b8d97475f87bc7fbfcbb0';
const apiurl = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&q=';

const Weather = () => {
  const [temperature, setTemperature] = useState(null);
  const [date, setDate] = useState(null);

  const fetchWeatherData = async (city) => {
    try {
      const response = await axios.get(`${apiurl}${city}&appid=${apikey}`);

      const { list } = response.data;
      if (list && list.length > 0) {
        const firstForecast = list[0];
        const { main, dt_txt } = firstForecast;
        const { temp } = main;
        setTemperature(temp);
        setDate(dt_txt);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    const city = window.localStorage.getItem('address');
    fetchWeatherData(city);
  }, []);

  return (
    <div>
      <h2>Weather Information</h2>
      {temperature && (
        <p>
          Temperature: {temperature}°C
        </p>
      )}
      {date && (
        <p>
          Date: {date}
        </p>
      )}
    </div>
  );
};

export default Weather;