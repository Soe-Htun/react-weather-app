import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import type { RootState } from "../stores";

const Home: React.FC = () => {
  const savedCities = useSelector((state: RootState) => state.weather.savedCities);

  return (
    <div className="flex flex-col items-center justify-center relative w-full space-y-4 p-4">
      <div className="w-full max-w-md">
        <SearchBar />
      </div>

      {/* Saved Cities List */}
      {savedCities.length > 0 && (
        <div className="w-full max-w-md mt-4 space-y-2">
          <h3 className="text-gray-600 font-semibold">Saved Cities</h3>
          <div className="flex flex-col space-y-2">
            {savedCities.map((city) => (
              <WeatherCard key={city.id} city={city} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
