import { Middleware } from "@reduxjs/toolkit";
import { cityActions } from "./slices/citySlice";
import { citiesActions } from "./slices/citiesSlice";

export const cityMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (cityActions.setCity.match(action)) {
    localStorage.setItem("city", action.payload);
  }

  if (
    citiesActions.addCity.match(action) ||
    citiesActions.deleteCity.match(action)
  ) {
    const state = store.getState();
    localStorage.setItem("cities", JSON.stringify(state.cities.names));
  }

  return result;
};
