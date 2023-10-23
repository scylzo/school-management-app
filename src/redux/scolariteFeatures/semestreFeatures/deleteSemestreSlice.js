import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const deleteSemestre = createAsyncThunk(
  "deletingSemestre/deleteSemestre",
  async (semestreData, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteSemestre(semestreData);
      Notiflix.Loading.standard(" Suppression en cours...");
      if (data) {
        Notiflix.Loading.remove();
        window.location.reload(true);
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejectWithValue(errorMessage);
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const deleteSemestreSlice = createSlice({
  name: "deletingSemestre",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [deleteSemestre.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [deleteSemestre.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [deleteSemestre.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
