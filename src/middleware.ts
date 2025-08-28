import { Middleware } from "@reduxjs/toolkit";
import { setCity } from "./slices/citySlice";
import { addCity, deleteCity } from "./slices/citiesSlice";

export const cityMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (setCity.match(action)) {
    localStorage.setItem("city", action.payload);
  }

  if (addCity.match(action) || deleteCity.match(action)) {
    const state = store.getState();
    localStorage.setItem("cities", JSON.stringify(state.cities.names));
  }

  return result;
};
