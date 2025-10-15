import React from "react";
import { Link } from "react-router-dom";
import bgCloud from "../assets/img/bg-cloudy.svg";
import clearSky from "../assets/img/clear-sky.svg";
import sunny from "../assets/img/sunny.jpg";
import rainy from "../assets/img/rainy.jpg";

interface WeatherCardProps {
  city: {
    id?: number;
    name: string;
    country?: string;
    sys?: { country?: string };
    weather: { description: string; icon?: string; main: string }[];
    main: { temp: number };
  };
  isCurrentWeather?: boolean;
}

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  isCurrentWeather,
}) => {
  const weatherBackgrounds: Record<string, string> = {
    Clouds: bgCloud,
    Clear: clearSky,
    Sunny: sunny,
    Rain: rainy,
  };

  const weatherMain = city.weather?.[0]?.main;
  const bgImage = weatherBackgrounds[weatherMain] || clearSky;

  return (
    <Link
      to={`/weather/${city.name}`}
      className="relative flex justify-between items-center rounded-xl px-4 py-6 w-full overflow-hidden transition"
    >
      <img
        src={bgImage}
        alt={weatherMain}
        className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none"
      />

      <div className="relative flex flex-col gap-y-1 z-10">
        {isCurrentWeather ? (
          <>
            <span className="font-bold text-xl text-gray-800">My Location</span>
            <span className="font-bold text-sm capitalize text-gray-800">
              {city.name}, {city.country}
            </span>
          </>
        ) : (
          <>
            <span className="font-bold text-xl text-gray-800">
              {city.name}, {city.sys?.country}
            </span>
            <span className="text-sm capitalize text-gray-800">
              {city.weather[0].description}
            </span>
          </>
        )}
      </div>

      <div className="relative flex items-center space-x-2 z-10">
        <span className="text-2xl font-bold text-gray-800">
          {Math.round(city.main.temp)}°
        </span>
      </div>
    </Link>
  );
};

export default WeatherCard;
