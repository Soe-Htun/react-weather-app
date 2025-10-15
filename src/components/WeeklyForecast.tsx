import React from "react";
import { WeeklyForecast } from "../types/weather";
import { getWeatherEmoji } from "../utils/mapWeather";

interface Props {
  weekly: WeeklyForecast[];
}

const WeeklyForecastComponent: React.FC<Props> = ({ weekly }) => {
  return (
    <div className="space-y-2">
      {weekly.slice(0,4).map((day, idx) => (
        <div key={idx} className="flex justify-between items-center bg-white rounded-lg p-2 px-4">
          <span className="font-medium">{day.day}</span>
          <span className="text-2xl">{getWeatherEmoji(day.icon)}</span>
          <span>{Math.round(day.temp)}°</span>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecastComponent;
