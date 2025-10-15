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

      const forecastDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        hours,
        minutes
      );

      if (forecastDate.getTime() <= now.getTime()) {
        forecastDate.setDate(forecastDate.getDate() + 1);
      }

      return { ...h, forecastTime: forecastDate };
    })
    .filter((h): h is HourlyForecast & { forecastTime: Date } => !!h)
    .sort((a, b) => a.forecastTime.getTime() - b.forecastTime.getTime())
    .slice(0, 4);

  return (
    <div className="grid grid-cols-4 gap-x-6 w-full">
      {upcomingHours.map((h, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center justify-between bg-[#f5f5f5] rounded-lg w-full h-30 p-2 shadow-md"
        >
          <span className="text-5xl">{getWeatherEmoji(h.icon)}</span>
          <div className="space-y-2 text-center">
            <p className="text-sm font-semibold">{Math.round(h.temp)}°</p>
            <p className="text-sm">{idx === 0 ? "Now" : h.hour}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecastComponent;
