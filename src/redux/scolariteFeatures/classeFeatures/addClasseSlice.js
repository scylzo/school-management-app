import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addClasse = createAsyncThunk(
  "addingClasse/postClasse",
  async (classeData, { rejectWithValue }) => {
    try {
      const { data } = await api.addClasse(classeData);
      Notiflix.Loading.standard(" Ajout Classe en cours...");
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

export const addClasseSlice = createSlice({
  name: "addingClasse",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addClasse.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addClasse.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addClasse.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
