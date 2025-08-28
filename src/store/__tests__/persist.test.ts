import { describe, it, expect, vi, beforeEach } from "vitest";
import { loadCity, loadCities } from "../persist";
import { DEFAULT_CITY } from "../../constants";

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

describe("persist utilities", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("loadCity", () => {
    it("should return stored city from localStorage", () => {
      localStorageMock.getItem.mockReturnValue("Kiev");

      const result = loadCity();

      expect(localStorageMock.getItem).toHaveBeenCalledWith("city");
      expect(result).toBe("Kiev");
    });

    it("should return default city when no city in localStorage", () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = loadCity();

      expect(localStorageMock.getItem).toHaveBeenCalledWith("city");
      expect(result).toBe(DEFAULT_CITY);
    });

    it("should return empty string if stored", () => {
      localStorageMock.getItem.mockReturnValue("");

      const result = loadCity();

      // Empty string is falsy, so it will return default city
      expect(result).toBe(DEFAULT_CITY);
    });
  });

  describe("loadCities", () => {
    beforeEach(() => {
      // Mock loadCity to return DEFAULT_CITY by default
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "city") return DEFAULT_CITY;
        if (key === "cities") return null;
        return null;
      });
    });

    it("should return array with current city when no cities in localStorage", () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "city") return "Kiev";
        if (key === "cities") return null;
        return null;
      });

      const result = loadCities();

      expect(result).toEqual(["Kiev"]);
    });

    it("should return stored cities when they exist in localStorage", () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "city") return DEFAULT_CITY;
        if (key === "cities")
          return JSON.stringify([DEFAULT_CITY, "Kiev", "Paris"]);
        return null;
      });

      const result = loadCities();

      expect(result).toEqual([DEFAULT_CITY, "Kiev", "Paris"]);
    });

    it("should prepend current city if not in stored cities array", () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "city") return "Berlin";
        if (key === "cities") return JSON.stringify([DEFAULT_CITY, "Kiev"]);
        return null;
      });

      const result = loadCities();

      expect(result).toEqual(["Berlin", DEFAULT_CITY, "Kiev"]);
    });

    it("should not duplicate city if already in stored cities", () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "city") return "Kiev";
        if (key === "cities")
          return JSON.stringify([DEFAULT_CITY, "Kiev", "Paris"]);
        return null;
      });

      const result = loadCities();

      expect(result).toEqual([DEFAULT_CITY, "Kiev", "Paris"]);
    });

    it("should handle empty cities array", () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "city") return "Tokyo";
        if (key === "cities") return JSON.stringify([]);
        return null;
      });

      const result = loadCities();

      expect(result).toEqual(["Tokyo"]);
    });

    it("should handle invalid JSON in cities localStorage", () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "city") return "Sydney";
        if (key === "cities") return "invalid-json";
        return null;
      });

      const result = loadCities();

      // Should fallback to default empty array and add current city
      expect(result).toEqual(["Sydney"]);
    });

    it("should handle null city", () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "city") return null;
        if (key === "cities") return JSON.stringify(["Kiev"]);
        return null;
      });

      const result = loadCities();

      expect(result).toEqual([DEFAULT_CITY, "Kiev"]);
    });
  });
});
