import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "services/api";

export const fetchEmpTemps = createAsyncThunk(
  "empTemps/getEmpTemps",
  async (empData, { rejectWithValue }) => {
    try {
      const { data } = await api.getEmpTemps(empData);
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
    }
  }
);

export const getEmpTempsSlice = createSlice({
  name: "empTemps",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchEmpTemps.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchEmpTemps.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchEmpTemps.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
