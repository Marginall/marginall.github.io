import { createSlice } from "@reduxjs/toolkit";
import { DEFAULT_CITY } from "../constants";

interface CityState {
  cityName: string;
}

const initialState: CityState = {
  cityName: DEFAULT_CITY,
};

const citySlice = createSlice({
  name: "city",
  initialState,
  reducers: {
    setCity: (state, action) => {
      state.cityName = action.payload;
    },
  },
});

export const cityActions = citySlice.actions;
export const { setCity } = citySlice.actions;
export default citySlice.reducer;
