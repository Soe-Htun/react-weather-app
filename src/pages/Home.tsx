import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import type { RootState } from "../stores";
import { setCurrentWeather } from "../stores/slices/weatherSlice";
import { fetchWeatherByCoords } from "../services/weatherService";

const Home: React.FC = () => {
  const savedCities = useSelector(
    (state: RootState) => state.weather.savedCities
  );
  const currentWeather = useSelector(
    (state: RootState) => state.weather.currentWeather
  );
  const dispatch = useDispatch();
  const fetchCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const weatherData = await fetchWeatherByCoords(latitude, longitude);

          const currentWeather = {
            id: weatherData.id,
            name: weatherData.name || "Unknown",
            country: weatherData?.sys?.country || "N/A",
            weather: weatherData.weather || [],
            timezone: weatherData.timezone,
            coord: {
              lat: latitude,
              lon: longitude,
            },
            main: {
              temp: weatherData.main?.temp ?? 0,
              temp_max: weatherData.main?.temp_max ?? 0,
              temp_min: weatherData.main?.temp_min ?? 0,
            },
          };

          dispatch(setCurrentWeather(currentWeather));
        } catch (error) {
          console.error("Error fetching current location weather:", error);
        }
      },
      (error) => console.error("Geolocation error:", error),
      // { enableHighAccuracy: true }
    );
  };

  useEffect(() => {
    fetchCurrentLocation();
  }, [dispatch]);

  return (
    <div className="flex flex-col items-center justify-center w-full space-y-4 p-4">
      <div className="w-full max-w-md">
        <SearchBar />
      </div>

      {/* Current Weather Card */}
      {currentWeather && (
        <div className="w-full max-w-md">
          <WeatherCard key={currentWeather.id} city={currentWeather} isCurrentWeather />
        </div>
      )}

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
