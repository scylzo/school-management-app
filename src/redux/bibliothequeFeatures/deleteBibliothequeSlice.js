import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const deleteBibliotheque = createAsyncThunk(
  "deletingBibliotheque/deleteBibliotheque",
  async (notifData, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteSyllabus(notifData);
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

export const deleteBibliothequeSlice = createSlice({
  name: "deletingBibliotheque",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [deleteBibliotheque.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [deleteBibliotheque.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [deleteBibliotheque.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
