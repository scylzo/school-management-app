import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const deleteUe = createAsyncThunk(
  "deletingUe/deleteUe",
  async (semestreData, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteUe(semestreData);
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

export const deleteUeSlice = createSlice({
  name: "deletingUe",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [deleteUe.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [deleteUe.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [deleteUe.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
