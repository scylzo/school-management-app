import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addSemestre = createAsyncThunk(
  "addingSemestre/postSemestre",
  async (semestreData, { rejectWithValue }) => {
    try {
      const { data } = await api.addSemestre(semestreData);
      Notiflix.Loading.standard(" Ajout semestre en cours...");
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

export const addSemestreSlice = createSlice({
  name: "addingSemestre",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addSemestre.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addSemestre.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addSemestre.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
