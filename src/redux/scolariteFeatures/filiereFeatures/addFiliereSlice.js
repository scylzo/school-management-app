import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addFiliere = createAsyncThunk(
  "addingFiliere/postFiliere",
  async (filiereData, { rejectWithValue }) => {
    try {
      const { data } = await api.addFiliere(filiereData);
      Notiflix.Loading.standard(" Ajout Filière en cours...");
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

export const addFiliereSlice = createSlice({
  name: "addingFiliere",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addFiliere.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addFiliere.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addFiliere.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
