import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrderDetails = createAsyncThunk(
  'order-details/get',
  async (message, thunkAPI) => {
    try {
      const { data } = await axios.get(`/orders?query=${message}`);
      return data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);
