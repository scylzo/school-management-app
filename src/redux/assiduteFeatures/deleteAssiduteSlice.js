import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const deleteAssidute = createAsyncThunk(
  "deletingAssidute/deleteAssidute",
  async (assiduteId, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteAssidute(assiduteId);
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

export const deleteAssiduteSlice = createSlice({
  name: "deletingAssidute",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [deleteAssidute.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [deleteAssidute.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [deleteAssidute.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
