import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchPer = createAsyncThunk("student/getPer", async () => {
  try {
    const { data } = await api.getAllPer();

    return data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    Notiflix.Notify.warning(errorMessage);
  }
});

export const perSlice = createSlice({
  name: "per",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchPer.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchPer.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchPer.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
