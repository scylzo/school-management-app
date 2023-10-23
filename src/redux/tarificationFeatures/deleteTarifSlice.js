import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const deleteTarif = createAsyncThunk(
  "deletingTarif/deleteTarif",
  async (tarifData, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteTarif(tarifData);
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

export const deleteTarifSlice = createSlice({
  name: "deletingTarif",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [deleteTarif.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [deleteTarif.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [deleteTarif.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
