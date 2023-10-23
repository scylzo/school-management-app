import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addSyllabus = createAsyncThunk(
  "addingSyllabus/postSyllabusData",
  async (SyllabusData, { rejectWithValue }) => {
    try {
      const { data } = await api.addSyllabus(SyllabusData);
      Notiflix.Loading.standard("Ajout en cours...");
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

export const addSyllabusSlice = createSlice({
  name: "addingSyllabus",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addSyllabus.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addSyllabus.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addSyllabus.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
