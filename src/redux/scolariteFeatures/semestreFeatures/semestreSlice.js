import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchSemestre = createAsyncThunk(
  "semestre/getSemestre",
  async () => {
    try {
      const { data } = await api.getAllSemestre();
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const semestreSlice = createSlice({
  name: "anneeAcad",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchSemestre.pending]: (state) => {
      state.loading = true;
    },
    [fetchSemestre.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchSemestre.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
