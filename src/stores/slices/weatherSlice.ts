import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherData } from "../../types/weather";

interface SavedWeatherState {
  savedCities: WeatherData[];
  currentWeather?: WeatherData;
}

const initialState: SavedWeatherState = {
  savedCities: [],
  currentWeather: undefined
};

const savedWeatherSlice = createSlice({
  name: "weatherReducer",
  initialState,
  reducers: {
    setCurrentWeather: (state, action: PayloadAction<WeatherData>) => {
      state.currentWeather = action.payload;
    },
    addCity: (state, action: PayloadAction<WeatherData>) => {
      const exists = state.savedCities.find(
        (c) => c.id === action.payload.id
      );
      if (!exists) {
        state.savedCities.push(action.payload);
      }
    },
    removeCity: (state, action: PayloadAction<number>) => {
      state.savedCities = state.savedCities.filter(
        (c) => c.id !== action.payload
      );
    },
  },
});

export const { setCurrentWeather, addCity, removeCity } = savedWeatherSlice.actions;
export default savedWeatherSlice.reducer;
