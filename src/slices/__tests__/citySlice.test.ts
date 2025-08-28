import { describe, it, expect } from "vitest";
import cityReducer, { cityActions } from "../citySlice";
import { DEFAULT_CITY } from "../../constants";

const { setCity } = cityActions;

describe("citySlice", () => {
  const initialState = {
    cityName: DEFAULT_CITY,
  };

  it("should return the initial state", () => {
    expect(cityReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle setCity", () => {
    const previousState = { cityName: DEFAULT_CITY };
    const action = setCity("Kiev");
    const expectedState = { cityName: "Kiev" };

    expect(cityReducer(previousState, action)).toEqual(expectedState);
  });

  it("should handle setCity with empty string", () => {
    const previousState = { cityName: DEFAULT_CITY };
    const action = setCity("");
    const expectedState = { cityName: "" };

    expect(cityReducer(previousState, action)).toEqual(expectedState);
  });

  it("should handle setCity with special characters", () => {
    const previousState = { cityName: DEFAULT_CITY };
    const action = setCity("São Paulo");
    const expectedState = { cityName: "São Paulo" };

    expect(cityReducer(previousState, action)).toEqual(expectedState);
  });
});
