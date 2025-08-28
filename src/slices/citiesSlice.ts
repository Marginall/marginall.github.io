import { createSlice } from "@reduxjs/toolkit";

interface CitiesState {
  names: string[];
}

const initialState: CitiesState = {
  names: [],
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    addCity: (state, action) => {
      state.names.push(action.payload);
    },
    deleteCity: (state, action) => {
      state.names = state.names.filter((name) => name !== action.payload);
    },
  },
});

export const citiesActions = citiesSlice.actions;
export const { addCity, deleteCity } = citiesSlice.actions;
export default citiesSlice.reducer;
