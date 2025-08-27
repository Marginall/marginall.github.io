import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_KEY } from "../constants";
import { ServerData } from "../types";
import { transformResponse } from "../utils/transformResponse";

const BASE_URL = "http://api.weatherapi.com/v1/forecast.json";

export const weatherApi = createApi({
  reducerPath: "weatherApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query({
      query: (city: string) => `?q=${city}&key=${API_KEY}&days=3`,
      transformResponse: (res: unknown): ServerData => {
        return transformResponse(res);
      },
    }),
    getWeatherByGeo: builder.query<ServerData, { lat: number; lon: number }>({
      query: ({ lat, lon }) => `?q=${lat},${lon}&key=${API_KEY}&days=3`,
      transformResponse: (res: unknown): ServerData => {
        return transformResponse(res);
      },
    }),
  }),
});

export const { useGetWeatherByCityQuery, useLazyGetWeatherByGeoQuery } =
  weatherApi;
