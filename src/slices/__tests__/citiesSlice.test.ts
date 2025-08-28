import { describe, it, expect } from "vitest";
import citiesReducer, { addCity, deleteCity } from "../citiesSlice";

describe("citiesSlice", () => {
  const initialState = {
    names: [],
  };

  it("should return the initial state", () => {
    expect(citiesReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  describe("addCity", () => {
    it("should add a city to empty array", () => {
      const previousState = { names: [] };
      const action = addCity("London");
      const expectedState = { names: ["London"] };

      expect(citiesReducer(previousState, action)).toEqual(expectedState);
    });

    it("should add a city to existing array", () => {
      const previousState = { names: ["London"] };
      const action = addCity("Kiev");
      const expectedState = { names: ["London", "Kiev"] };

      expect(citiesReducer(previousState, action)).toEqual(expectedState);
    });

    it("should allow duplicate cities", () => {
      const previousState = { names: ["London"] };
      const action = addCity("London");
      const expectedState = { names: ["London", "London"] };

      expect(citiesReducer(previousState, action)).toEqual(expectedState);
    });
  });

  describe("deleteCity", () => {
    it("should delete a city from array", () => {
      const previousState = { names: ["London", "Kiev", "Paris"] };
      const action = deleteCity("Kiev");
      const expectedState = { names: ["London", "Paris"] };

      expect(citiesReducer(previousState, action)).toEqual(expectedState);
    });

    it("should delete first occurrence of duplicate city", () => {
      const previousState = { names: ["London", "Kiev", "London"] };
      const action = deleteCity("London");
      // filter удаляет все вхождения, а не только первое
      const expectedState = { names: ["Kiev"] };

      expect(citiesReducer(previousState, action)).toEqual(expectedState);
    });

    it("should do nothing if city does not exist", () => {
      const previousState = { names: ["London", "Kiev"] };
      const action = deleteCity("Paris");
      const expectedState = { names: ["London", "Kiev"] };

      expect(citiesReducer(previousState, action)).toEqual(expectedState);
    });

    it("should handle empty array", () => {
      const previousState = { names: [] };
      const action = deleteCity("London");
      const expectedState = { names: [] };

      expect(citiesReducer(previousState, action)).toEqual(expectedState);
    });
  });
});
