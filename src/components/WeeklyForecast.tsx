import React from "react";
import { WeeklyForecast } from "../types/weather";
import { getWeatherEmoji } from "../utils/mapWeather";

interface Props {
  weekly: WeeklyForecast[];
}

const WeeklyForecastComponent: React.FC<Props> = ({ weekly }) => {
  return (
    <div className="space-y-3">
      {weekly.slice(0, 4).map((day, idx) => (
        <div
          key={idx}
          className="flex justify-between items-center bg-secondary rounded-lg py-3 px-4"
        >
          <div className="flex gap-3 items-center">
            <span className="text-4xl bg-[#9ab6ff] pt-2 rounded-full w-16 h-16 text-center">
              {getWeatherEmoji(day.icon)}
            </span>
            <div>
              <p className="font-medium">{day.day}</p>
              <p>{day.condition}</p>
            </div>
          </div>
          <span>{Math.round(day.temp)}°</span>
        </div>
      ))}
    </div>
  );
};

export default WeeklyForecastComponent;
