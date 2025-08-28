export function loadCity(): string {
  return localStorage.getItem("city") || "London";
}

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
