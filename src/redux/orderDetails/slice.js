import { createSlice } from '@reduxjs/toolkit';

import { getOrderDetails } from './operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const initialState = {
  orders: [],
};

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(getOrderDetails.pending, handlePending)
      .addCase(getOrderDetails.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getOrderDetails.rejected, handleRejected);
  },
});

export const orderDetailsReducer = orderDetailsSlice.reducer;
