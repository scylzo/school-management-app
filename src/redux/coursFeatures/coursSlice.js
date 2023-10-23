import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const addCours = createAsyncThunk(
  "addingCours/postCours",
  async (CoursData, { rejectWithValue }) => {
    try {
      const { data } = await api.addCours(CoursData);
      Notiflix.Loading.standard("Ajout notification en cours...");
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

export const addCoursSlice = createSlice({
  name: "addingCours",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [addCours.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [addCours.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [addCours.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
