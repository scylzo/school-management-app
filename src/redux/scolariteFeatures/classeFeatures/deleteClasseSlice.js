import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const deleteClasse = createAsyncThunk(
  "deletingClasse/postClasse",
  async (classeData, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteClasse(classeData);
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

export const deleteClasseSlice = createSlice({
  name: "deletingClasse",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [deleteClasse.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [deleteClasse.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [deleteClasse.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
