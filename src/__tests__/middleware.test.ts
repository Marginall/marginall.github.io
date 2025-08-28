import { describe, it, expect, beforeEach, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { cityMiddleware } from "../middleware";
import { cityActions } from "../slices/citySlice";
import { addCity, deleteCity } from "../slices/citiesSlice";
import cityReducer from "../slices/citySlice";
import citiesReducer from "../slices/citiesSlice";

const { setCity } = cityActions;

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: localStorageMock,
});

describe("cityMiddleware", () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    vi.clearAllMocks();

    store = configureStore({
      reducer: {
        city: cityReducer,
        cities: citiesReducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(cityMiddleware),
    });
  });

  describe("setCity action", () => {
    it("should save city to localStorage when setCity is dispatched", () => {
      const cityName = "Kiev";
      store.dispatch(setCity(cityName));

      expect(localStorageMock.setItem).toHaveBeenCalledWith("city", cityName);
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
    });

    it("should save empty string to localStorage", () => {
      store.dispatch(setCity(""));

      expect(localStorageMock.setItem).toHaveBeenCalledWith("city", "");
    });

    it("should save city with special characters", () => {
      const cityName = "São Paulo";
      store.dispatch(setCity(cityName));

      expect(localStorageMock.setItem).toHaveBeenCalledWith("city", cityName);
    });
  });

  describe("addCity action", () => {
    it("should save cities array to localStorage when addCity is dispatched", () => {
      store.dispatch(addCity("London"));

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "cities",
        JSON.stringify(["London"])
      );
    });

    it("should save updated cities array after multiple additions", () => {
      store.dispatch(addCity("London"));
      store.dispatch(addCity("Kiev"));

      expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
        "cities",
        JSON.stringify(["London", "Kiev"])
      );
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
    });
  });

  describe("deleteCity action", () => {
    beforeEach(() => {
      // Add some cities first
      store.dispatch(addCity("London"));
      store.dispatch(addCity("Kiev"));
      store.dispatch(addCity("Paris"));
      vi.clearAllMocks();
    });

    it("should save updated cities array to localStorage when deleteCity is dispatched", () => {
      store.dispatch(deleteCity("Kiev"));

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "cities",
        JSON.stringify(["London", "Paris"])
      );
    });

    it("should save empty array if all cities are deleted", () => {
      store.dispatch(deleteCity("London"));
      store.dispatch(deleteCity("Kiev"));
      store.dispatch(deleteCity("Paris"));

      expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
        "cities",
        JSON.stringify([])
      );
    });

    it("should not affect localStorage if city does not exist", () => {
      store.dispatch(deleteCity("NonExistentCity"));

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "cities",
        JSON.stringify(["London", "Kiev", "Paris"])
      );
    });
  });

  describe("other actions", () => {
    it("should not call localStorage for unrelated actions", () => {
      store.dispatch({ type: "SOME_OTHER_ACTION" });

      expect(localStorageMock.setItem).not.toHaveBeenCalled();
    });
  });

  describe("middleware flow", () => {
    it("should not prevent action from reaching reducer", () => {
      store.dispatch(setCity("TestCity"));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((store.getState() as any).city.cityName).toBe("TestCity");
    });

    it("should call localStorage after state is updated", () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const initialCitiesLength = (store.getState() as any).cities.names.length;

      store.dispatch(addCity("NewCity"));

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      expect((store.getState() as any).cities.names).toHaveLength(
        initialCitiesLength + 1
      );
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "cities",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        JSON.stringify((store.getState() as any).cities.names)
      );
    });
  });
});
