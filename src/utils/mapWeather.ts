import { timeFormat } from "../constant";
import { HourlyForecast, WeeklyForecast, IconList } from "../types/weather";

export const mapWeatherIcon = (icon: string): IconList => {
  switch (icon) {
    case "01d":
    case "01n":
      return "clear";
    case "02d":
    case "02n":
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return "clouds";
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      return "rain";
    case "11d":
    case "11n":
      return "thunderstorm";
    default:
      return "clouds";
  }
};

export const getHourlyForecast = (list: any[]): HourlyForecast[] => {
  return list.slice(0, 12).map((item) => ({
    temp: item.main.temp,
    // hour: item.dt_txt.split(" ")[1].slice(0, 5),
    hour: timeFormat.format(new Date(item.dt_txt)),
    icon: mapWeatherIcon(item.weather[0].icon),
  }));
};

export const getWeeklyForecast = (list: any[]): WeeklyForecast[] => {
  const daysMap: Record<string, any[]> = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!daysMap[date]) daysMap[date] = [];
    daysMap[date].push(item);
  });

  return Object.keys(daysMap).map((date) => {
    const items = daysMap[date];
    const avgTemp = items.reduce((sum, i) => sum + i.main.temp, 0) / items.length;
    const condition = items[0].weather[0].description;
    const icon: IconList = mapWeatherIcon(items[0].weather[0].icon);
    const day = new Date(date).toLocaleDateString("en-US", { weekday: "short" });
    return { temp: avgTemp, day, condition, icon };
  });
};

// export const getWeatherIcon = (weatherMain?: string): IconList => {
//   if (!weatherMain || typeof weatherMain !== "string") return "cloudy"; // Default

//   const iconMap: Record<string, IconList> = {
//     rain: "rainy",
//     thunderstorm: "night-storm",
//     clouds: "cloudy",
//     clear: "partly-cloudy",
//   };

//   return iconMap[weatherMain.toLowerCase()] || "cloudy";
// };

export const getWeatherEmoji = (icon: IconList) => {
  const map: Record<string, string> = {
    "rain": "🌧️",
    "clouds": "☁️",
    "clear": "⛅",
    "thunderstorm": "🌩️",
  };
  return map[icon.toLowerCase()] 
};
