import { timeFormat } from "../constant";
import { HourlyForecast, WeeklyForecast, IconList } from "../types/weather";

export const mapWeatherMain = (main: string): IconList => {
  switch (main.toLowerCase()) {
    case "clear":
      return "clear";
    case "clouds":
      return "clouds";
    case "rain":
    case "drizzle":
      return "rain";
    case "thunderstorm":
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
    icon: mapWeatherMain(item.weather[0].main),
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
    const icon: IconList = mapWeatherMain(items[0].weather[0].main);
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
