import { Middleware } from "@reduxjs/toolkit";
import { cityActions } from "./slices/citySlice";
import { citiesActions } from "./slices/citiesSlice";
import { themeActions } from "./slices/themeSlice";
import type { RootState } from "./store/store";

export const cityMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  if (cityActions.setCity.match(action)) {
    localStorage.setItem("city", action.payload);
  }

  if (themeActions.toggleTheme.match(action)) {
    const state = store.getState() as RootState;
    localStorage.setItem("theme", state.theme.mode);
  }

  if (
    citiesActions.addCity.match(action) ||
    citiesActions.deleteCity.match(action)
  ) {
    const state = store.getState() as RootState;
    localStorage.setItem("cities", JSON.stringify(state.cities.names));
  }

  return result;
};
