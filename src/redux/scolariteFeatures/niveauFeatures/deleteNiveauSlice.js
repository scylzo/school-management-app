import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const deleteNiveau = createAsyncThunk(
  "deletingNiveau/deleteNiveau",
  async (niveauData, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteNiveau(niveauData);
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

export const deleteNiveauSlice = createSlice({
  name: "deletingNiveau",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [deleteNiveau.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [deleteNiveau.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [deleteNiveau.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
