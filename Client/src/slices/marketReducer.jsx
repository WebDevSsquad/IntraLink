import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  offers: [],
  ranks: [],
};

export const marketSlice = createSlice({
  name: "market",
  initialState,
  reducers: {
    updateOffers: (state, action) => {
      state.offers = action.payload;
    },
    updateRanks: (state, action) => {
      state.ranks = action.payload;
    },
  },
});

export const { updateOffers, updateRanks } = marketSlice.actions;
export default marketSlice.reducer;
