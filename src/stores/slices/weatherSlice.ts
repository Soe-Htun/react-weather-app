import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WeatherData } from "../../types/weather";

interface SavedWeatherState {
  savedCities: WeatherData[];
}

const initialState: SavedWeatherState = {
  savedCities: [],
};

const savedWeatherSlice = createSlice({
  name: "weatherReducer",
  initialState,
  reducers: {
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

export const { addCity, removeCity } = savedWeatherSlice.actions;
export default savedWeatherSlice.reducer;
