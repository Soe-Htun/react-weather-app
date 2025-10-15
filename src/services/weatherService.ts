import { type WeatherData } from "../types/weather";
import type { AxiosErrorResponse } from "../types/axiosError";
import { toast } from "react-toastify";
import http from "../api/http"

const handleApiError = (error: unknown, customMessage = "An unexpected error occurred") => {
  const axiosError = error as AxiosErrorResponse;
  const errorMessage = axiosError.response?.data?.message || axiosError.message || customMessage;
  toast.error(errorMessage)

  throw new Error(customMessage);
};

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  try {
    const response = await http.get(
      `/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch weather data.");
    return Promise.reject(error);
  }
};

export const fetchCitySuggestions = async (query: string) => {
  try {
    const response = await http.get(
      `/geo/1.0/direct?q=${query}&limit=5&appid=${process.env.REACT_APP_API_KEY}`
    );
    return response.data.map((item: any) => `${item.name}, ${item.country}`);
  } catch (error) {
    handleApiError(error, "Failed to fetch city suggestions.");
    return Promise.reject(error);
  }
};

export const fetchWeatherByCoords = async (lat: number, lon: number): Promise<WeatherData> => {
  try {
    const response = await http.get(
      `/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
    );
    return response.data;
  } catch (error) {
    handleApiError(error, "Failed to fetch weather data.");
    return Promise.reject(error);
  }
};

export const fetchWeatherForecast = async (lat: number, lon: number) => {
  try {
    const response = await http.get(`/data/2.5/forecast`, {
      params: { lat, lon, units: "metric", appid: process.env.REACT_APP_API_KEY },
    });
    return response.data.list;
  } catch (error) {
    handleApiError(error, "Failed to fetch weather data.");
    return Promise.reject(error);
  }
};
