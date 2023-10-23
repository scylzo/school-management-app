import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const createTarif = createAsyncThunk(
  "creatingTarif/creatingTarifData",
  async (tarifData, { rejectWithValue }) => {
    try {
      const { data } = await api.createTarif(tarifData);
      Notiflix.Loading.standard("Ajout tarif en cours...");
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

export const createTarifSlice = createSlice({
  name: "creatingTarif",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [createTarif.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [createTarif.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [createTarif.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
