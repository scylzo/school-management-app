import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchPats = createAsyncThunk("pats/getPats", async () => {
  try {
    const { data } = await api.getAllPats();
    return data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    Notiflix.Notify.warning(errorMessage);
  }
});

export const patsSlice = createSlice({
  name: "pats",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchPats.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchPats.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchPats.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
