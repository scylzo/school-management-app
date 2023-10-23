import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchBibliotheque = createAsyncThunk(
  "bibliotheque/getBibliotheque",
  async () => {
    try {
      const { data } = await api.getBibliotheque();
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const bibliothequeSlice = createSlice({
  name: "bibliotheque",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchBibliotheque.pending]: (state) => {
      state.loading = true;
    },
    [fetchBibliotheque.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchBibliotheque.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
