import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchNationalites = createAsyncThunk(
  "nationalite/getNationalites",
  async () => {
    try {
      const { data } = await api.getByNationalite();
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const nationaliteSlice = createSlice({
  name: "nationalite",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchNationalites.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchNationalites.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchNationalites.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
