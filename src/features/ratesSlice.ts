import { createSlice } from "@reduxjs/toolkit";
import { Rate } from "../types/Rate";

type DefaultState = {
  rates: Rate[],
}

const initialState: DefaultState = {
  rates: [],
}

const ratesSlice = createSlice({
  name: 'rates',
  initialState,
  reducers: {
    setRates: (state, { payload }) => {
      state.rates = payload;
    },
  }
})

export const { setRates } = ratesSlice.actions;
export default ratesSlice.reducer;
