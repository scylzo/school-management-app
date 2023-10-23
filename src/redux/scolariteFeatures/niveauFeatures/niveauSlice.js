import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchNiveau = createAsyncThunk("niveau/getNiveau", async () => {
  try {
    const { data } = await api.getAllNiveau();
    return data;
  } catch (error) {
    const errorMessage = error?.response?.data?.message;
    Notiflix.Notify.warning(errorMessage);
  }
});

export const niveauSlice = createSlice({
  name: "anneeAcad",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchNiveau.pending]: (state) => {
      state.loading = true;
    },
    [fetchNiveau.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchNiveau.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
