import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addNiveau = createAsyncThunk(
  "addingNiveau/postNiveau",
  async (niveauData, { rejectWithValue }) => {
    try {
      const { data } = await api.addNiveau(niveauData);
      Notiflix.Loading.standard(" Ajout niveau en cours...");
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

export const addNiveauSlice = createSlice({
  name: "addingNiveau",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addNiveau.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addNiveau.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addNiveau.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
