import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeather, fetchWeatherForecast } from "../services/weatherService";
import { getHourlyForecast, getWeatherEmoji, getWeeklyForecast } from "../utils/mapWeather";
import HourlyForecastComponent from "../components/HourlyForecast";
import WeeklyForecastComponent from "../components/WeeklyForecast";
import BackButton from "../components/UI/BackButton";
import BasicIcons from "../components/UI/BasicIcons";
import { formattedDate } from "../constant";
import { addCity, removeCity } from "../stores/slices/weatherSlice";
import type { RootState } from "../stores";
import { HourlyForecast, WeeklyForecast } from "../types/weather";
import { toast } from "react-toastify";

const WeatherDetails: React.FC = () => {
  const { city } = useParams<{ city: string }>();
  const dispatch = useDispatch();
  const savedCities = useSelector((state: RootState) => state.weather.savedCities);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [hourly, setHourly] = useState<HourlyForecast[]>([]);
  const [weekly, setWeekly] = useState<WeeklyForecast[]>([]);

  const navigate = useNavigate();
  useEffect(() => {
  if (!city) return;

  const loadWeather = async () => {
    try {
      const data = await fetchWeather(city);

      // safer validity check
      if (!data || !data.coord || !data.main) {
        throw new Error("Invalid city data");
      }

      setWeatherData(data);

      const forecastList = await fetchWeatherForecast(data.coord.lat, data.coord.lon);
      setHourly(getHourlyForecast(forecastList));
      setWeekly(getWeeklyForecast(forecastList));
    } catch (error) {
      navigate('/');
      toast.error("Unable to load weather data. Please check the city name or try again later.");
    }
  };

  loadWeather();
}, [city, navigate]);


  if (!weatherData) return <div>Loading...</div>;

  const isSaved = savedCities.some((c) => c.id === weatherData.id);

  const handleToggleSave = () => {
    if (isSaved) {
      dispatch(removeCity(weatherData.id));
    } else {
      dispatch(addCity(weatherData));
    }
  };

  return (
    <div className="px-2 space-y-6 ">
      <div className="flex justify-between items-center">
        <BackButton />
        <h2 className="text-xl font-bold">{weatherData.name}, { weatherData.sys?.country }</h2>

        <button onClick={handleToggleSave}>
          {isSaved ? (
            <BasicIcons name="trash" className="w-6 h-6 text-red-500" />
          ) : (
            <BasicIcons name="plus" className="w-6 h-6" />
          )}
        </button>
      </div>

      <div className="text-center">
        <p>{formattedDate.format(new Date())}</p>
        <span className="text-2xl">
          {getWeatherEmoji(weatherData.weather[0].main)}
        </span>
        <p>{weatherData.main.temp}°C</p>

        <p>{weatherData.weather[0].description}</p>
      </div>

      <div>
        <h3 className="font-semibold mb-2">Hourly Forecast</h3>
        <HourlyForecastComponent hourly={hourly} />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Weekly Forecast</h3>
        <WeeklyForecastComponent weekly={weekly} />
      </div>
    </div>
  );
};

export default WeatherDetails;
