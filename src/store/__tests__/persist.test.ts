import { describe, it, expect, beforeEach, vi } from "vitest";
import { loadCity, loadCities } from "../persist";

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

    it('should return default city "London" when no city in localStorage', () => {
      localStorageMock.getItem.mockReturnValue(null);

      const result = loadCity();

      expect(localStorageMock.getItem).toHaveBeenCalledWith("city");
      expect(result).toBe("London");
    });

    it("should return empty string if stored", () => {
      localStorageMock.getItem.mockReturnValue("");

      const result = loadCity();

      // Empty string is falsy, so it will return default "London"
      expect(result).toBe("London");
    });
  });

  describe("loadCities", () => {
    beforeEach(() => {
      // Mock loadCity to return 'London' by default
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "city") return "London";
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
        if (key === "city") return "London";
        if (key === "cities")
          return JSON.stringify(["London", "Kiev", "Paris"]);
        return null;
      });

      const result = loadCities();

      expect(result).toEqual(["London", "Kiev", "Paris"]);
    });

    it("should prepend current city if not in stored cities array", () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "city") return "Berlin";
        if (key === "cities") return JSON.stringify(["London", "Kiev"]);
        return null;
      });

      const result = loadCities();

      expect(result).toEqual(["Berlin", "London", "Kiev"]);
    });

    it("should not duplicate city if already in stored cities", () => {
      localStorageMock.getItem.mockImplementation((key) => {
        if (key === "city") return "Kiev";
        if (key === "cities")
          return JSON.stringify(["London", "Kiev", "Paris"]);
        return null;
      });

      const result = loadCities();

      expect(result).toEqual(["London", "Kiev", "Paris"]);
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

      expect(result).toEqual(["London", "Kiev"]);
    });
  });
});
