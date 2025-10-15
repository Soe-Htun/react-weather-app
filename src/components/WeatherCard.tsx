// src/components/WeatherCard.tsx
import React from "react";
import { Link } from "react-router-dom";
import bgCloud from '../assets/img/bg-cloudy.svg';
import clearSky from "../assets/img/clear-sky.svg"
import sunny from "../assets/img/sunny.jpg"
import rainy from "../assets/img/rainy.jpg"

interface WeatherCardProps {
  city: {
    id?: number;
    name: string;
    sys?: { country?: string };
    weather: { description: string; icon?: string; main: string }[];
    main: { temp: number };
  };
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city }) => {

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
      className="relative flex justify-between items-center bg-white shadow-md rounded-xl px-4 py-6 hover:bg-gray-100 transition w-full overflow-hidden"
    >
      <img
        src={bgImage}
        alt={weatherMain}
        className="absolute inset-0 w-full h-full object-cover opacity-70 pointer-events-none"
      />

      <div className="relative flex flex-col gap-y-1 z-10">
        <span className="font-bold text-xl text-gray-800">
          {city.name}, {city.sys?.country}
        </span>
        <span className="text-sm text-gray-800 capitalize">
          {city.weather[0].description}
        </span>
      </div>

      <div className="relative flex items-center space-x-2 z-10">
        <span className="text-2xl text-gray-800 font-bold">
          {Math.round(city.main.temp)}°
        </span>
      </div>
    </Link>
  );
};

export default WeatherCard;
