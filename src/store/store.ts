import { configureStore } from "@reduxjs/toolkit";
import { weatherApi } from "../services/weatherApi";
import themeReducer from "../slices/themeSlice";
import cityReducer from "../slices/citySlice";
import citiesReducer from "../slices/citiesSlice";
import { cityMiddleware } from "../middleware";
import { loadCities, loadCity } from "./persist";

export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    theme: themeReducer,
    city: cityReducer,
    cities: citiesReducer,
  },
  preloadedState: {
    city: { cityName: loadCity() },
    cities: { names: loadCities() },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware).concat(cityMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
