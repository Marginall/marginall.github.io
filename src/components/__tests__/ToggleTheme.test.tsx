import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { ToggleTheme } from "../ToggleTheme";
import themeReducer from "../../slices/themeSlice";

// Create test theme
const testTheme = createTheme();

const createTestStore = (initialThemeMode: "light" | "dark" = "light") => {
  return configureStore({
    reducer: {
      theme: themeReducer,
    },
    preloadedState: {
      theme: { mode: initialThemeMode },
    },
  });
};

const renderWithProviders = (
  ui: React.ReactElement,
  store = createTestStore()
) => {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={testTheme}>{ui}</ThemeProvider>
    </Provider>
  );
};

describe("ToggleTheme", () => {
  it("should render theme toggle switch", () => {
    renderWithProviders(<ToggleTheme />);

    expect(screen.getByText("theme")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("should show switch as checked when theme is light", () => {
    const store = createTestStore("light");
    renderWithProviders(<ToggleTheme />, store);

    const switchElement = screen.getByRole("checkbox");
    expect(switchElement).toBeChecked();
  });

  it("should show switch as unchecked when theme is dark", () => {
    const store = createTestStore("dark");
    renderWithProviders(<ToggleTheme />, store);

    const switchElement = screen.getByRole("checkbox");
    expect(switchElement).not.toBeChecked();
  });

  it("should toggle theme when switch is clicked", () => {
    const store = createTestStore("light");
    renderWithProviders(<ToggleTheme />, store);

    const switchElement = screen.getByRole("checkbox");

    // Initially light theme (checked)
    expect(switchElement).toBeChecked();
    expect(store.getState().theme.mode).toBe("light");

    // Click to toggle to dark
    fireEvent.click(switchElement);
    expect(store.getState().theme.mode).toBe("dark");

    // Click again to toggle back to light
    fireEvent.click(switchElement);
    expect(store.getState().theme.mode).toBe("light");
  });

  it("should display theme text and switch", () => {
    renderWithProviders(<ToggleTheme />);

    expect(screen.getByText("theme")).toBeInTheDocument();
    const switchElement = screen.getByRole("checkbox");
    expect(switchElement).toBeInTheDocument();
  });
});
