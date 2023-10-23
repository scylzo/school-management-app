import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const editClasse = createAsyncThunk(
  "editingClasse/putClasse",
  async (classeData, { rejClassetWithValue }) => {
    try {
      const { data } = await api.editClasse(classeData);
      Notiflix.Loading.standard(" mis à jour Classe en cours...");
      if (data) {
        Notiflix.Loading.remove();
        window.location.reload(true);
      }
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      rejClassetWithValue(errorMessage);
    }
  }
);

export const editClasseSlice = createSlice({
  name: "editingClasse",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [editClasse.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [editClasse.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [editClasse.rejClasseted]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
