import { DEFAULT_CITY } from "../constants";

export const loadCity = () => {
  return localStorage.getItem("city") || DEFAULT_CITY;
};

export function loadCities(): string[] {
  const city = loadCity();
  try {
    const cities = JSON.parse(localStorage.getItem("cities") || "[]");
    if (!cities.includes(city)) {
      cities.unshift(city);
    }
    return cities;
  } catch {
    return [city];
  }
}
