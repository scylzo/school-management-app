import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";

export const fetchUser = createAsyncThunk(
  "user/getUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.getUserById(userId);
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchUser.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchUser.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
