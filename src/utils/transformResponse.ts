import { ServerDayData, ServerDayHourType } from "../types";
import { z } from "zod";

const ForcastSchema = z.object({
  location: z.object({
    name: z.string(),
    region: z.string(),
    country: z.string(),
  }),
  current: z.object({
    temp_c: z.number(),
    condition: z.object({
      text: z.string(),
      icon: z.string(),
    }),
  }),
  forecast: z.object({
    forecastday: z.array(
      z.object({
        date: z.string(),
        day: z.object({
          maxtemp_c: z.number(),
          mintemp_c: z.number(),
          condition: z.object({
            text: z.string(),
            icon: z.string(),
          }),
        }),
        hour: z.array(
          z.object({
            time: z.string(),
            temp_c: z.number(),
            wind_kph: z.number(),
            condition: z.object({
              text: z.string(),
              icon: z.string(),
            }),
          })
        ),
      })
    ),
  }),
});

export const transformResponse = (res: unknown) => {
  const forecast = ForcastSchema.parse(res);
  return {
    data: {
      temp: forecast.current.temp_c,
      condition: {
        text: forecast.current.condition.text,
        icon: forecast.current.condition.icon,
      },
      location: {
        name: forecast.location.name,
        region: forecast.location.region,
        country: forecast.location.country,
      },
      forecastday: forecast.forecast.forecastday.map(
        (day: ServerDayData, idx: number) => ({
          id: `${day.date}-${idx}`,
          date: day.date,
          location: forecast.location.name,
          maxTem: day.day.maxtemp_c,
          minTem: day.day.mintemp_c,
          condition: {
            text: day.day.condition.text,
            icon: day.day.condition.icon,
          },
          hours: day.hour.map((h: ServerDayHourType) => ({
            time: h.time,
            temp: h.temp_c,
            wind: h.wind_kph,
            condition: {
              text: h.condition.text,
              icon: h.condition.icon,
            },
          })),
        })
      ),
    },
  };
};
