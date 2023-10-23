import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Notiflix from "notiflix";
import api from "services/api";

export const fetchTarifications = createAsyncThunk(
  "tarifications/getTarifications",
  async () => {
    try {
      const { data } = await api.getAllTarification();
      return data;
    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      Notiflix.Notify.warning(errorMessage);
    }
  }
);

export const tarificationSlice = createSlice({
  name: "tarifications",
  initialState: {
    data: [],
    isSuccess: false,
    loading: false,
  },
  extraReducers: {
    [fetchTarifications.pending]: (state) => {
      state.loading = true;
      state.isSuccess = false;
    },
    [fetchTarifications.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = true;
      state.data = payload;
    },
    [fetchTarifications.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
    },
  },
});
