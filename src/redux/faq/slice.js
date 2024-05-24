import { createSlice } from '@reduxjs/toolkit';

import { getQuestionGroups } from './operations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const initialState = {
  questionGroups: [],
};

export const faqSlice = createSlice({
  name: 'faq',
  initialState,

  extraReducers: builder => {
    builder
      .addCase(getQuestionGroups.pending, handlePending)
      .addCase(getQuestionGroups.fulfilled, (state, { payload }) => {
        Object.assign(state, payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getQuestionGroups.rejected, handleRejected);
  },
});

export const faqReducer = faqSlice.reducer;
