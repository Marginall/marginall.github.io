import { describe, it, expect } from "vitest";
import themeReducer, { toggleTheme } from "../themeSlice";

describe("themeSlice", () => {
  const initialState = {
    mode: "light" as const,
  };

  it("should return the initial state", () => {
    expect(themeReducer(undefined, { type: "@@INIT" })).toEqual(initialState);
  });

  it("should toggle from light to dark", () => {
    const previousState = { mode: "light" as const };
    const action = toggleTheme();
    const expectedState = { mode: "dark" as const };

    expect(themeReducer(previousState, action)).toEqual(expectedState);
  });

  it("should toggle from dark to light", () => {
    const previousState = { mode: "dark" as const };
    const action = toggleTheme();
    const expectedState = { mode: "light" as const };

    expect(themeReducer(previousState, action)).toEqual(expectedState);
  });

  it("should handle multiple toggles", () => {
    let state = { mode: "light" as "light" | "dark" };

    // light -> dark
    state = themeReducer(state, toggleTheme());
    expect(state.mode).toBe("dark");

    // dark -> light
    state = themeReducer(state, toggleTheme());
    expect(state.mode).toBe("light");

    // light -> dark again
    state = themeReducer(state, toggleTheme());
    expect(state.mode).toBe("dark");
  });
});
