import { createSlice } from "@reduxjs/toolkit";

interface CityState {
  cityName: string;
}

const initialState: CityState = {
  cityName: "London",
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

export const { setCity } = citySlice.actions;
export default citySlice.reducer;
