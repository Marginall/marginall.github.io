import { describe, it, expect } from "vitest";
import cityReducer, { setCity } from "../citySlice";

describe("citySlice", () => {
  const initialState = {
    cityName: "London",
  };

  it("should return the initial state", () => {
    expect(cityReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should handle setCity", () => {
    const previousState = { cityName: "London" };
    const action = setCity("Kiev");
    const expectedState = { cityName: "Kiev" };

    expect(cityReducer(previousState, action)).toEqual(expectedState);
  });

  it("should handle setCity with empty string", () => {
    const previousState = { cityName: "London" };
    const action = setCity("");
    const expectedState = { cityName: "" };

    expect(cityReducer(previousState, action)).toEqual(expectedState);
  });

  it("should handle setCity with special characters", () => {
    const previousState = { cityName: "London" };
    const action = setCity("São Paulo");
    const expectedState = { cityName: "São Paulo" };

    expect(cityReducer(previousState, action)).toEqual(expectedState);
  });
});
