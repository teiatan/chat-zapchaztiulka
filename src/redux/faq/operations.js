import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getQuestionGroups = createAsyncThunk(
  'faq/getQuestionGroups',
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get('/faqs');
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
