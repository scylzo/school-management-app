import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const deleteEc = createAsyncThunk(
  "deletingEc/deleteEc",
  async (ecData, { rejectWithValue }) => {
    try {
      const { data } = await api.deleteEc(ecData);
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

export const deleteEcSlice = createSlice({
  name: "addingEc",
  initialState: {
    data: {},
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [deleteEc.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [deleteEc.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [deleteEc.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
