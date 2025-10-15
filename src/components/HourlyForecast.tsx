import React from "react";
import { getWeatherEmoji } from "../utils/mapWeather";
import { HourlyForecast } from "../types/weather";

interface Props {
  hourly: HourlyForecast[];
}

const HourlyForecastComponent: React.FC<Props> = ({ hourly }) => {
  const now = new Date();
  const today = now.getDate();
  const upcomingHours = hourly
    .map((h) => {
      if (!h.hour) return null;

      const [time, modifier] = h.hour.split(" ");
      if (!time || !modifier) return null;

      let [hours, minutes] = time.split(":").map(Number);
      if (isNaN(hours) || isNaN(minutes)) return null;

      if (modifier === "PM" && hours < 12) hours += 12;
      if (modifier === "AM" && hours === 12) hours = 0;

      const forecastTime = new Date(
        now.getFullYear(),
        now.getMonth(),
        today,
        hours,
        minutes
      );

      return { ...h, forecastTime };
    })
    .filter((h): h is HourlyForecast & { forecastTime: Date } => {
      return !!h && h.forecastTime.getTime() > now.getTime();
    })
    .slice(0, 4);

  return (
    <div className="grid grid-cols-4 gap-2 w-full">
      {upcomingHours.map((h, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center bg-white rounded-lg p-2 w-full"
        >
          <span className="text-sm">{idx === 0 ? "Now" : h.hour}</span>
          <span className="text-2xl">{getWeatherEmoji(h.icon)}</span>
          <span className="text-sm font-semibold">{Math.round(h.temp)}°</span>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecastComponent;
