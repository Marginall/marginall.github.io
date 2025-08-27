import { describe, it, expect } from "vitest";
import { transformResponse } from "../transformResponse";

describe("transformResponse", () => {
  const mockApiResponse = {
    location: {
      name: "London",
      region: "City of London, Greater London",
      country: "United Kingdom",
    },
    current: {
      temp_c: 15.5,
      condition: {
        text: "Partly cloudy",
        icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
      },
    },
    forecast: {
      forecastday: [
        {
          date: "2025-08-27",
          day: {
            maxtemp_c: 20.5,
            mintemp_c: 12.3,
            condition: {
              text: "Sunny",
              icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
            },
          },
          hour: [
            {
              time: "2025-08-27 00:00",
              temp_c: 14.2,
              wind_kph: 8.5,
              condition: {
                text: "Clear",
                icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
              },
            },
            {
              time: "2025-08-27 01:00",
              temp_c: 13.8,
              wind_kph: 7.2,
              condition: {
                text: "Clear",
                icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
              },
            },
          ],
        },
      ],
    },
  };

  it("should transform API response correctly", () => {
    const result = transformResponse(mockApiResponse);

    expect(result).toEqual({
      data: {
        temp: 15.5,
        condition: {
          text: "Partly cloudy",
          icon: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        },
        location: {
          name: "London",
          region: "City of London, Greater London",
          country: "United Kingdom",
        },
        forecastday: [
          {
            id: "2025-08-27-0",
            date: "2025-08-27",
            location: "London",
            maxTem: 20.5,
            minTem: 12.3,
            condition: {
              text: "Sunny",
              icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
            },
            hours: [
              {
                time: "2025-08-27 00:00",
                temp: 14.2,
                wind: 8.5,
                condition: {
                  text: "Clear",
                  icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
                },
              },
              {
                time: "2025-08-27 01:00",
                temp: 13.8,
                wind: 7.2,
                condition: {
                  text: "Clear",
                  icon: "//cdn.weatherapi.com/weather/64x64/night/113.png",
                },
              },
            ],
          },
        ],
      },
    });
  });

  it("should handle multiple forecast days", () => {
    const multiDayResponse = {
      ...mockApiResponse,
      forecast: {
        forecastday: [
          mockApiResponse.forecast.forecastday[0],
          {
            ...mockApiResponse.forecast.forecastday[0],
            date: "2025-08-28",
          },
        ],
      },
    };

    const result = transformResponse(multiDayResponse);

    expect(result.data.forecastday).toHaveLength(2);
    expect(result.data.forecastday[0].id).toBe("2025-08-27-0");
    expect(result.data.forecastday[1].id).toBe("2025-08-28-1");
  });

  it("should throw error for invalid data structure", () => {
    const invalidResponse = {
      location: { name: "London" },
      // missing required fields
    };

    expect(() => transformResponse(invalidResponse)).toThrow();
  });

  it("should throw error for missing location", () => {
    const invalidResponse = {
      current: mockApiResponse.current,
      forecast: mockApiResponse.forecast,
      // missing location
    };

    expect(() => transformResponse(invalidResponse)).toThrow();
  });

  it("should throw error for missing current data", () => {
    const invalidResponse = {
      location: mockApiResponse.location,
      forecast: mockApiResponse.forecast,
      // missing current
    };

    expect(() => transformResponse(invalidResponse)).toThrow();
  });

  it("should throw error for missing forecast data", () => {
    const invalidResponse = {
      location: mockApiResponse.location,
      current: mockApiResponse.current,
      // missing forecast
    };

    expect(() => transformResponse(invalidResponse)).toThrow();
  });
});
